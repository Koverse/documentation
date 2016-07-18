Sources API
------------

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
