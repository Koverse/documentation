.. _Sources:

Sources
=======

Koverse Sources are designed to read data from a specific type of data source, such as a relational database or a remote file system.

Koverse uses MapReduce to import data from Sources which can allow import jobs to take advantage of multiple machines. However, many data sources consist of a process running on a single machine, which can limit the speed of data import.

Sources are configured through defining parameters that are presented to users via the User Interface. This way the source can obtain necessary information such as the hostname and port of the server containing the source data, or a username and password.

There are three basic classes used to implement a custom Source: one for reading files from a file system, one for reading from a relational database, and a third for implementing all other types of Sources.

We'll cover how to implement each type of Source.

To start the project, we'll need to include the Koverse SDK.
See :ref:`LinkingSDK` for details.

File System Based Sources
-------------------------

For this example, we'll write a custom Source designed to read records from files in a remote file system. We'll handle connecting to an FTP server and importing all the files found in a given directory.

To implement a file based Source, create a Java class that extends AbstractFileBasedSource. We'll walk through how to write each of the methods that our subclass must implement::

 package com.koverse.examples.dataflow;

 import com.koverse.sdk.data.Parameter;
 import com.koverse.sdk.source.AbstractFileBasedSource;
 import com.koverse.sdk.source.ImportSourcePath;

 import org.apache.commons.net.ftp.FTPClient;
 import org.apache.commons.net.ftp.FTPFile;

 import java.io.IOException;
 import java.io.InputStream;
 import java.net.URL;
 import java.net.URLConnection;
 import java.util.ArrayList;
 import java.util.Collections;
 import java.util.List;

 public class FtpSource extends AbstractFileBasedSource {
    // methods to be implemented shortly
 }

The first thing we'll do is to define what Parameters our source needs in order to connect to a remote FTP server. In this case we'll need the hostname and port of the server, a username and password, and the path to the directory containing the file we wish to import.

Each one of these pieces of information is described using a Parameter object. This allows us to avoid hard coding connection information and write an FTP source once that can be used to connect to as many different FTP servers as we want. Parameters are used by the Koverse platform to present options that are specified end-users through the Koverse User Interface.

Typically developers declare the names of all their Parameters as constants up front so we'll do the same::

 public class CustomFileBasedSource extends AbstractFileBasedSource {

   protected static final String FTP_HOSTNAME = "hostname";
   protected static final String FTP_PORT = "port";
   protected static final String FTP_PATH = "path";
   protected static final String FTP_USERNAME = "username";
   protected static final String FTP_PASSWORD = "password";

   private String username;
   private String hostname;
   private int port;
   private String password;
   private String pathToFiles;

Next we'll implement **getParameters()** and use these constants to tell the Koverse platform how to collect the information we need from end users. For more details on specifying Parameter objects see :ref:`parameters` ::

 @Override
 public List<Parameter> getParameters() {
   List<Parameter> params = new ArrayList();

   params.add(Parameter.newBuilder()
           .parameterName(FTP_HOSTNAME)
           .displayName("Host Name")
           .type(Parameter.TYPE_STRING)
           .parameterGroup("Access")
           .required(Boolean.TRUE)
           .build());
   params.add(
           Parameter.newBuilder()
           .parameterName(FTP_PORT)
           .displayName("Port")
           .type(Parameter.TYPE_INTEGER)
           .parameterGroup("Access")
           .defaultValue("21")
           .required(Boolean.TRUE).build());
   params.add(
           Parameter.newBuilder()
           .parameterName(FTP_USERNAME)
           .displayName("Username")
           .type(Parameter.TYPE_STRING)
           .parameterGroup("Access")
           .required(Boolean.TRUE)
           .build());
   params.add(
           Parameter.newBuilder()
           .parameterName(FTP_PASSWORD)
           .displayName("Password")
           .type(Parameter.TYPE_STRING)
           .parameterGroup("Access")
           .hideInput(Boolean.TRUE)
           .required(Boolean.TRUE)
           .build());
   params.add(Parameter.newBuilder()
           .parameterName(FTP_PATH)
           .displayName("File Path")
           .type(Parameter.TYPE_STRING)
           .parameterGroup("Target")
           .required(Boolean.TRUE)
           .build());

    return params;
 }

Next we'll write the method that extracts the values the end user has provided to our Source and store them. Sources have a method called **getContext()** that returns an object containing configuration information, included the values that the end user has specified for each of our Parameters. We simply ask for the value of each and store the resulting values in member fields::

 @Override
 public void configureFileBasedSource() throws IOException {

   hostname = (String) getContext().getParameterValues().get(FTP_HOSTNAME);
   port = Integer.parseInt((String) getContext().getParameterValues().get(FTP_PORT));

   username = (String) getContext().getParameterValues().get(FTP_USERNAME);
   password = (String) getContext().getParameterValues().get(FTP_PASSWORD);
   pathToFiles = (String) getContext().getParameterValues().get(FTP_PATH);
 }

Now our Source needs everything it knows to connect to an FTP server. File based sources import data in two steps: first, we connect to the remote server and find out what files exist to be imported, and second we'll import each file. The two step process allows Koverse to process individual files using multiple machines, which speeds up the import process. We'll now implement the method that tells Koverse which files we'll be importing, **enumerateUnfilteredList()**::

  @Override
  public Iterable<ImportSourcePath> enumerateUnfilteredList() throws Exception {
    List<ImportSourcePath> importPaths = new ArrayList<>();

    FTPClient ftpClient = new FTPClient();

    ftpClient.connect(hostname, port);
    ftpClient.login(username, password);
    FTPFile[] files = ftpClient.listFiles(pathToFiles);

    if (files.length == 0) {
      throw new IOException(
              String.format("No files found for path %s. Check path or username and password", pathToFiles));
    }

    // we have the files listed already, so don't need the connection any longer
    ftpClient.disconnect();

    for (FTPFile file : files) {
      String connectionString = new StringBuilder()
              .append("ftp://")
              .append(username)
              .append(':')
              .append(password)
              .append('@')
              .append(hostname)
              .append(':')
              .append(port)
              .append(pathToFiles)
              .append(file)
              .toString();

      importPaths.add(
              new ImportSourcePath.Builder()
              .path(connectionString)
              .lastModifiedDate(file.getTimestamp().getTime())
              .fileSize(file.getSize())
              .build());
    }

    return importPaths;
  }

Note that we're using an object called ImportPath to describe each file we'll be importing. ImportPath objects can have information such as file size and modification date which allow end users to filter out files older or newer than a certain date or over or under a certain size.

The next phase of the import will be done via a MapReduce job and will fetch each file we've listed in parallel. The method for importing each file is called **streamForItem()** and it returns an InputStream for each file we've just enumerated. In our case this is fairly simple::

  @Override
  public InputStream streamForItem(String item) throws IOException {
    URL url = new URL(item);
    URLConnection urlc = url.openConnection();
    return urlc.getInputStream();
  }

The Koverse platform will take care of the rest - parsing each file and converting the data within each to Koverse Record objects. That logic is defined by individual classes using the File Format API.

That's mostly all it takes to implement a new custom Source for Koverse. The only things left to do are to give our Source a name, version, and description information::

  @Override
  public String getName() {
    return "My Custom FTP";
  }

  @Override
  public String getSourceTypeId() {
    return "my-custom-ftp";
  }

  @Override
  public String getVersion() {
    return "0.1.0";
  }

  @Override
  public String getDescription() {
    return "Example of a Source that connects to an FTP server";
  }

There are a few other methods we can define::

  // used for streaming sources
  @Override
  public Boolean isContinuous() {
    return false;
  }

  // used for sources that support input stream reset
  @Override
  public boolean supportsInputStreamReset() {
    return true;
  }

  // deprecated
  @Override
  public List<Parameter> getFileBasedFlowParameters() {
    return Collections.EMPTY_LIST;
  }

Now we're ready to package up our Source into an AddOn file, which just just a Java JAR file that contains a descriptor file.
If you're using the koverse-sdk-project example code, simply build the project using **mvn install**.
This will produce a JAR file in the target/ directory that you can drop into the Koverse UI.
See the section on :ref:`AddOns` for more details.

..
  To upload your new AddOn, navigate to your Koverse instance in a web browser and click on the Admin section at the bottom of the left hand menu. Note that you must be logged into Koverse as a user that has permission to 'upload add-on extensions'.

  Click on the Add-Ons tab. There you'll see a list of currently installed AddOns and an area for dragging and dropping AddOn JAR files. There is also a button for browsing your file system to find an Addon JAR file.

  Drag and Drop or browse and select to your newly created JAR file. If you're using the maven shading plugin be sure to select the JAR that doesn't begin with the word 'original'.

  Koverse will confirm the upload and you should now see a new entry below containing your AddOn. The entry should display the name of your new custom Source as well. If you don't see your AddOn or if your source is not included double check the classesToInspect file under src/main/resources in your Java project and make sure your class is listed in that file.

  End users can now configure our new Source and direct Koverse to use it to import data into a Data Set. We'll go through that process.

  Click on 'Add' on the Koverse menu on the left. You should see your new Source. Select it and you will see the list of Parameters we have defined. For the purposes of testing out our source we can use some public data from NOAA. Use the following values for Parameters.

  Hostname
    ftp.ncdc.noaa.gov

  Port
    21

  Username
    anonymous

  Password
    test@koverse.com

  File path
    /pub/data/swdi/stormevents/csvfiles/


.. _database sources:

Database Sources
----------------

For this example, we will write a custom Source designed to read records from a PostGreSQL database. We will handle connecting to a database server and importing all the records found in a given database using a specified SQL query.

To implement a Database Source, create a Java class that extends JdbcSourceBase. We'll walk through how to write each of the methods that our subclass must implement::

  package com.koverse.examples.dataflow;

  import com.koverse.sdk.ingest.format.StatementModifier;
  import com.koverse.sdk.source.JdbcSourceBase;

  import java.sql.SQLException;
  import java.sql.Statement;

  public class CustomDatabaseSource extends JdbcSourceBase {
    // methods to be implemented shortly
  }

The JdbcSourceBase super class does a lot of the work for developers.  In this case, it defines what Parameters our source needs in order to connect to a database server.  This includes the hostname and port of the server, a username and password, the name of the database, and an SQL query.

Since our Source knows everything it needs to connect to a database server, we can construct the JDBC URL needed to connect to our PostGreSQL database::

  @Override
  protected String createJdbcUrl(final String host, final int port, final String database) {

    final StringBuilder jdbcUrl = new StringBuilder();

    jdbcUrl.append("jdbc:postgresql://");
    jdbcUrl.append(host.trim());
    jdbcUrl.append(":");
    jdbcUrl.append(Integer.toString(port));
    jdbcUrl.append("/");
    jdbcUrl.append(database);

    return jdbcUrl.toString();
  }

We need to define the default port for PostGres and the JDBC driver class name::

  @Override
  protected int getDefaultPort() {
    return 5432;
  }

  @Override
  protected String getJdbcDriverClassname() {
   return "org.postgresql.Driver";
  }

In the getStatementModifier method we provide the opportunity to modify a statement before it is used.  In this case we disable the connections auto-commit state and set the fetch size::

  @Override
  protected StatementModifier getStatementModifier() {
    return new StatementModifier() {

      @Override
      public void modify(final Statement stmt) throws SQLException {
        stmt.getConnection().setAutoCommit(false);
        stmt.setFetchSize(100);
      }
    };
  }

That's mostly all it takes to implement a new custom Database Source for Koverse. The only things left to do are to give our Source a name, version, and description information::

  @Override
  public String getName() {
    return "CustomDatabaseSource";
  }

  @Override
  public String getVersion() {
    return "0.1.0";
  }

  @Override
  public String getSourceTypeId() {
    return "my-custom-database-source";
  }

  @Override
  public String getDescription() {
    return "Import data from a PostgreSQL database. All records returned from the specified query are imported.";
  }

There is one other method we can define::

  @Override
  public Boolean isContinuous() {
    return false;
  }

Now we are ready to package up our Source into an AddOn file, which is just a Java JAR file that contains a descriptor file.
If you're using the koverse-sdk-project example code, simply build the project using **mvn install**.
This will produce a JAR file in the target/ directory that you can drop into the Koverse UI.
See the section on :ref:`AddOns` for more details.

..
  .. _custom sources:

  TODO: document the SyntheticMessagesSource

  Other Custom Sources
  ^^^^^^^^^^^^^^^^^^^^

.. _saving source state:

Saving State
------------

Some sources can benefit from saving the state of the last completed import job.
For example a source might want to record the date of the last time it ran so it can request data that is newer than the last time it retrieved data from the external data source.

For another example, some web based APIs support paging, and a source could record the last page read so that the next time data is imported the source begins reading at the page where it left off.

The source API allows developers to retrieve saved state and specify state to be saved when each import job is completed.
Developers can store one or more String values associated with a particular String key. Because a source can be used in multiple import jobs and because import jobs may consist of multiple simultaneous workers importing data in parallel, the API allows developers the ability to specify how multiple values for a given key should be combined.

To read saved state, sources should use the method of the provided 'context' object::

	Iterable<String> getState(String key)

which returns an Iterable of String values associated with the given key.

For example, file based sources have the option to read the list of file names already imported, so that they can determine which files if any have not already been processed and import them::

	if (importOnlyNewFiles) {
	  importedFiles = newHashSet(context.getState(IMPORTED_FILENAMES_KEY));
	}


As an example of saving state, when file based sources are done importing some set of files, they can save the filenames by implementing the stateToSave() method of the ListMapReduceSource interface::

	@Override
	public Iterable<SourceState> stateToSave() {
	  ArrayList<SourceState> state = new ArrayList();

	  if (importOnlyNewFiles) {
	    state.add(new SourceState(NovelFilenameFilter.IMPORTED_FILENAMES_KEY, importedFilenames, StateStringOperator.UNIQUE));
	  }


	  return state;
	}


In this case, we return a list of SourceState objects, of which we have only one.
That SourceState object consists of a key under which we are requesting to store one or more filenames of files we just imported.
The last component of the SourceState object is a StateStringOperator, in this case, the UNIQUE operator which requests that Koverse store only the unique set of filenames, and avoid storing duplicates.

Other StateStringOperators can be used, with the following behaviors:

ALL
  store all string values associated with a given key, including duplicates if any
UNIQUE
  store only the unique set of values associated with a key, removing any duplicates
MAX
  store only the one value that sorts last among all values associated with a key
MIN
  store only the one value that sorts first among all values associated with a key

Only String values are supported, but sources may be able to do what they need with dates by converting to a String format such as 'YYYYMMDD HH:mm:SS' so that the String representation of dates can be sorted in time order.
This technique could be used for other non-String types as well.

Note: when overriding the stateToSave() method, subclasses may consider to calling super.stateToSave() and combining the state from the super class with its own state to preserve the behavior of the super class.

..
  Handling Errors
  ^^^^^^^^^^^^^^^
