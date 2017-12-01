Sources
-------

Koverse Sources are designed to read data from a specific type of data source, such as a relational database or a remote file system.


Koverse uses MapReduce to import from sources when there are multiple items to be read and when processing those items on multiple machines will speed up the overall import. Examples include having many map workers read and process one file each from a directory on a remote file system.


Other sources are read from a single thread running on the same server on which Koverse is installed. These are referred to as inline sources.


Once a connection to a source is established, the next job of the source is to create a RecordStream that produces a set of Java objects, representing raw records or files obtained from the source.


One example is a CSV file. When a source is processing a CSV file, it simply breaks the file into distinct lines by tokenizing on the newline character, and provides those as Java Strings to the next phase.


Finally, Sources employ RecordFactory classes to convert Java Objects into Koverse Records. Often RecordFactories can be shared across sources, such as a factory used to convert lines from a CSV file to a Koverse Record. There are many types of sources that may provide CSV files: NFS, local file systems, remote HDFS instances.

To use the RecordFactory classes as well as others, be sure to inlcude the following dependency in your pom.xml::


		<dependency>
			<groupId>com.koverse.addon</groupId>
			<artifactId>koverse-addon-file-source-deps</artifactId>
			<version>${project.parent.version}</version>
		</dependency>


Sources are configured through defining parameters that are presented to users via the User Interface. This way the source can obtain necessary information such as the hostname and port of the server containing the source data, or a username and password.

See the `Quick Start SDK Project` section for details about a ready made project for creating custom sources.

.. _a link: https://github.com/Koverse/koverse-sdk-project/tree/1.4


Source Types
^^^^^^^^^^^^

**SimpleSource.java**

The SimpleSource class should be extended when users would like the ability to import one or more records or files from a single external server.
The see `Koverse SDK Project <https://github.com/Koverse/koverse-sdk-project/tree/1.4/>`_ contains an example MyCustomSource that extends SimpleSource.


The methods to implement are the following::


	/* Using the end-user supplied parameter values, establish a connection to the outside source */
	public abstract void connect();

	/* Retrieve the next record from the outside source. Return null when no more records exist */
	public abstract Map<String, Object> getNext();


	// Cleanup the connection to the outside source
	public abstract void disconnect();

	/* Return a list of Parameter objects that describe the
	 * end-user supplied parameters necessary for establishing
	 * a connection and producing records from this source. */
	public abstract List<Parameter> listParameters();


Saving State
^^^^^^^^^^^^

Some sources can benefit from saving the state of the last completed import job. For example a source might want to record the date of the last time it ran so it can request data that is newer than the last time it retrieved data from the external data source. In another example, some web based APIs support paging, and a source could record the last page read so that the next time data is imported the source begins reading at the page where it left off.

The source API allows developers to retrieve saved state and specify state to be saved when each import job is completed. Developers can store one or more String values associated with a particular String key. Because a source can be used in multiple import jobs and because import jobs may consist of multiple simultaneous workers importing data in parallel, the API allows developers the ability to specify how multiple values for a given key should be combined.

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


In this case, we return a list of SourceState objects, of which we have only one. That SourceState object consists of a key under which we are requesting to store one or more filenames of files we just imported. The last component of the SourceState object is a StateStringOperator, in this case, the UNIQUE operator which requests that Koverse store only the unique set of filenames, and avoid storing duplicates.

Other StateStringOperators can be used, with the following behaviors::

 ALL - store all string values associated with a given key, including duplicates if any
 UNIQUE - store only the unique set of values associated with a key, removing any duplicates
 MAX - store only the one value that sorts last among all values associated with a key
 MIN - store only the one value that sorts first among all values associated with a key

Currently only String values are supported, but sources may be able to do what they need with dates by converting to a String format such as 'YYYYMMDD HH:mm:SS' so that the String representation of dates can be sorted in time order. This technique could be used for other non-String types as well.

Note: when overriding the stateToSave() method, subclasses may consider to calling super.stateToSave() and combining the state from the super class with its own state to preserve the behavior of the super class.
