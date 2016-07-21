:tocdepth: 2

.. _DeveloperDocumentation:

=======================
Developer Documentation
=======================


.. _kov-Introduction:

Introduction
^^^^^^^^^^^^

Organizations are likely to require some custom software development to address their own unique set of data analytics requirements.
These custom software features will require their own unique sources and methods that provide strategic insight and competitive advantage.

Each organization could have potentially some combination of unique data sets, mission-specific data processing requirement used to analyze and transform those data sets, and custom interactive user interfaces.

With this in mind, Koverse provides this developer documentation describing how to programmatically extend Koverse with additional functionality, and how to deploy that functionality into an operational Koverse instance.

References
^^^^^^^^^^
:ref:`kov-Glossary`

Customizations Types
^^^^^^^^^^^^^^^^^^^^

Developers can customize and extend Koverse in several ways, such as:

* Koverse Apps - Web Applications that are hosted by Koverse leverage the Javascript SDK to support interaction with Koverse for a large number of users. Apps may also include custom Transforms to help get Data Collections into a structure that the App expects.

* AddOns - these are packages that extend Koverse with custom Sources, Transforms, and Sinks.

* Koverse Clients - these are processes that interact with Koverse via an API and that can be embedded in other services etc.

Koverse Core Concepts
---------------------
The following sections provide a basic introduction to the basic abstract concepts which build a foundation of knowledge for a developer before working with Koverse API.

.. _Data Model:

Data Model
^^^^^^^^^^

The Koverse data model has two main conceptual components: **Records**, and **Data Collections**.
Logically, each Data Collection contains a set of Records.

In this version of Koverse, we may refer to Data Collections as 'Data Sets'.
They are equivalent.

For those familiar with relational database management systems such as Oracle or MySQL, the analogy is that a Data Collection is similar to a Table, a Record is similar to a Row, and the fields of a Record are similar to the Columns.
However, unlike traditional relational databases, Records in a single Collection in Koverse do not have to all have the same fields, and fields can contain complex values, like lists and mappings of fields to values.

Records
^^^^^^^

The Koverse canonical unit of data is a Record. A Record is a map of keys/values, or fields, similar to a JSON document. Like a JSON document, a Record can have embedded lists or nested maps.

A Record belongs to a single Data Collection. Different Records within the same Data Collection do not have to have the same fields or structure. The values in a Record can be of many different types, including Strings, Doubles, geospatial points, and Dates.
A Record also has an optional security label which can be used to provide Record-level access control.


Some key points to remember about Records are:

* Each record is present in one and only one Data Collection.
* Records are maps of key/value pairs, similar to JSON
    * Example: {key1: valueA, key2: valueB}
* Value types may vary across records with matching keys
    * Example Record A: { key1: stringValue}
    * Example Record B: { key1: 234 }


* Records do not have a user designated id field. It is up to the application to designate and populate an identifier field. The application can submit queries to look up records by any field, including a field to which it has assigned unique identifiers.

* The optional security label on a record is set programmatically through the Java API and effects how the record is stored and retrieved.


* Records can contain nested value objects:
  * Example: { name: parent, children: [ { name: child1} ] }

* Records can contain the following native value types:

+-------------------+--------------------------------------------------+
| Native Value Type | Examples and support string formats              |
+===================+==================================================+
| String            | "A string of text characters"                    |
+-------------------+--------------------------------------------------+
| Integer           | 15                                               |
+-------------------+--------------------------------------------------+
| Long              | 10000000000L                                     |
+-------------------+--------------------------------------------------+
| Float             | 44.26                                            |
+-------------------+--------------------------------------------------+
| Double            | 200.05                                           |
+-------------------+--------------------------------------------------+
| Date              | Unix Timestamp:  1371277293 UTC (GMT)            |
|                   |                                                  |
|                   | Epoch Timestamp: 1371277293                      |
|                   |                                                  |
|                   | DTG:   271545ZFEB13                              |
|                   |                                                  |
|                   | Other various date formats supported:            |
|                   |                                                  |
|                   | * yyyyMMdd hh:mm:ss                              |
|                   | * EEE MMM d HH:mm:ss Z yyyy                      |
|                   | * EEE MMM d HH:mm:ss zzz yyyy                    |
|                   | * yyyy-MM-dd                                     |
|                   | * yyyy/MM/dd                                     |
|                   | * yyyy-MM                                        |
|                   | * yyyy/MM/dd HH:mm:ss                            |
|                   | * yyyy-MM-dd HH:mm:ss                            |
|                   | * yyyy/MM/dd HH:mm:ss.SSS                        |
|                   | * yyyy-MM-dd HH:mm:ss.SSS                        |
|                   | * MM/dd/yyyy HH:mm                               |
|                   | * MM-dd-yyyy HH:mm                               |
|                   | * ddHHmm'Z' MMM yy                               |
+-------------------+--------------------------------------------------+
| KoverseGeoPoint   | Well Known Text String Format: Point 1.23 60.423 |
|                   |                                                  |
|                   | Comma separated decimal lat,long: 1.23,60.423    |
+-------------------+--------------------------------------------------+
| Inet4Address      | 192.168.1.1                                      |
+-------------------+--------------------------------------------------+
| URL               | http://www.koverse.com                           |
+-------------------+--------------------------------------------------+
| Boolean           | true                                             |
+-------------------+--------------------------------------------------+
| byte[]            | An array of binary bytes such as the             |
|                   | original bytes of a file                         |
+-------------------+--------------------------------------------------+

Data Collection
---------------

Data Collections are the basic container for data in Koverse.
You can think of them like tables - but every record in a data collection can be completely unique in structure.

A Koverse Data Collection is a named set of Records. A Data Collection has:

* Configurable indexes to enable queries to quickly and efficiently find Records.

* Permissions to control access to Records in the Data Collection.

* Automatically discovered statistics and samples to provide insight into the Records contained in the Data Collection.


Data Sources
^^^^^^^^^^^^
A data source is simply the source of the data. It can be a file, a particular database on a DBMS, or even a live data feed. The data might be located on the same computer as the Koverse application, or on another computer somewhere on a network.

Koverse establishes the connection to these data sources and provides the ability to import data in Koverse, breaking the data into records according to the external format of the data (i.e. JSON, XML, CSV, relational records, etc).

Custom sources are only necessary when talking to a new type of server, often using a new protocol. For example, Koverse ships with an FTP source, and and IMAP source. New sources are not necessary simply for new file types and certainly not for specific uses of known physical formats such as a particular type of XML file.

Transforms
^^^^^^^^^^

In Koverse, transforms are a process by which one or more data collections leverage re-usable, configurable, multi-stage MapReduce jobs for data manipulation. These are highly scalable and customizable analytics that are reusable across all of your data.

Built-In Example Transforms
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following list is an example of built-in Koverse transforms:

* Close Graph

* Extract Time Series

* Faceting

* Entity Extraction (using Apache OpenNLP)

* Geo Discovery

* Geo Location (IP Addresses, Airports, Postal Codes (Canada))

* Summarize Relationships

* Sentiment Analysis

* Copy Records

* Nearest Neighbors

* Text Cleanup

* Summarize Field Values

Import-time Transforms
^^^^^^^^^^^^^^^^^^^^^^

Import-time Transforms are one-stage transforms that operate like a single map() phase and are applied to Records as they are imported from a Source. Import-time Transforms can be chained together during a particular Import job.

Export-time Transforms
^^^^^^^^^^^^^^^^^^^^^^

Export-time Transforms are one-stage transforms that operate like a single map() phase and are applied to Records as they are exported to a Sink. Export-time Transforms can be chained together during a particular Export job.

Export File Formats
^^^^^^^^^^^^^^^^^^^
Export File Formats define how Records are written to file-based Sinks such as FTP and HDFS Sinks.

Sinks
^^^^^

Sinks represent external destinations to which Records from Data Collections may be sent. For example, one can write out Records as JSON objects to a remote file system.

Queries
^^^^^^^

Whether developing a Koverse App or building a custom source, Koverse queries conform to a specific format. There are two types of syntax supported: a Lucene-like syntax and a more Object-based structure.

Lucene-like Query Syntax
^^^^^^^^^^^^^^^^^^^^^^^^

These queries are represented as strings and passed as such into query methods. The Lucene query syntax is described in the Usage Guide at :ref:`LuceneQuerySyntax`.


Object-based Queries
^^^^^^^^^^^^^^^^^^^^

+-------------------------------------------------------------------------+------------------------------------+
| Search Criteria                                                         | Query Syntax                       |
+=========================================================================+====================================+
| Searching 'any' field for a value                                       | {$any: fmv}                        |
+-------------------------------------------------------------------------+------------------------------------+
| Search specific field for a value                                       | {field.name: fmv}                  |
+-------------------------------------------------------------------------+------------------------------------+
| Search AND                        + {$and: [{$any: fmv}, {$any: blue}]} |                                    |
+-------------------------------------------------------------------------+------------------------------------+
| Search OR                                                               | {$or: [{$any: fmv}, {$any: blue}]} |
+-------------------------------------------------------------------------+------------------------------------+


Range Queries
^^^^^^^^^^^^^

+-----------------------------------------------------------------------------------------------------+----------------------------------------------------+
| Search Criteria                                                                                     | Query Syntax                                       |
+=====================================================================================================+====================================================+
| Any value greater than or equal to 160                                                              | {$any: {$gte:160}}                                 |
+-----------------------------------------------------------------------------------------------------+----------------------------------------------------+
| Date field less than a specific date                                                                | {date_created: {$lt: "1980-01-01T00:00:00.000Z}}   |
+-----------------------------------------------------------------------------------------------------+----------------------------------------------------+
| Geo Range                              + {fieldName: {$box: [[sw-lat, sw-long],[ne-lat, ne-long]]}} |                                                    |
|                                                                                                     |                                                    |
|                                                                                                     | {fieldName: {$box :[[39.5, -104.9],[40, -104.5]]}} |
+-----------------------------------------------------------------------------------------------------+----------------------------------------------------+

Note that queries that combine a range with any other criteria, and queries that combine multiple ranges require Composite Indexes on the fields involved. See _CompositeIndexes for information on building these.

Aggregations
^^^^^^^^^^^^
Aggregations allow you to easily maintain near real-time statistics on the Records in a Data Collection. Aggregations run incrementally on new Records to maintain pre-computed, up-to-date results so that they can always be queried with sub-second latency.


.. _quick-start-java-project:

Quick Start Java Project
------------------------

Koverse ships with a koverse-sdk-project-<version>.zip file that contains an example `Maven <http://maven.apache.org>`_ based Java project. This project defines some simple custom sources, sinks, transforms, and apps. The maven pom.xml file in this project builds
an `Addon` that can be uploaded. Simply alter the Java and HTML/JS code in this project, then build and deploy the addon to Koverse.

GitHub Koverse SDK Project
^^^^^^^^^^^^^^^^^^^^^^^^^^
Visit `Koverse SDK Project <https://github.com/Koverse/koverse-sdk-project/tree/1.4/>`_ to fork or download the latest koverse-sdk-project for your version of Koverse.


Koverse SDK Project Maven Archetype
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A `Maven Archetype <https://maven.apache.org/guides/introduction/introduction-to-archetypes.html>`_ project is available for easy deployment. Modify the version number (KOVERSE-VERSION-HERE) in the command below to configure and create a new instance of a Koverse project::

	mvn archetype:generate  \
	  -DarchetypeRepository=http://nexus.koverse.com/nexus/content/groups/public/  \
	  -DarchetypeGroupId=com.koverse.sdk.project \
	  -DarchetypeArtifactId=koverse-sdk-project-archetype \
	  -DarchetypeVersion=KOVERSE-VERSION-HERE \
	  -DkoverseVersion=KOVERSE-VERSION-HERE

Building the Koverse SDK Project
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The koverse-sdk-project is a standard `Apache Maven <https://maven.apache.org>` file that produces a shaded JAR - which means that it collapses all of its runtime dependencies into a single JAR file. This is necessary for running jobs in Koverse.

Use the following command from the root directory of the unzipped koverse-sdk-project::

	mvn clean package

After a successful build, the resulting Addon JAR file is in the koverse-sdk-project/target/ directory. By default it is named koverse-sdk-project-<version>.jar

Modifying the Koverse SDK Project
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You should modify the koverse-sdk-project to fit your needs. Here are some good starting points.

    #. Change the <artifactGroup> and <artifactId> values in the pom.xml file to match your organization and project.

    #. Change the Java package name from com.koverse.foo to your organization and project names.

    #. Change the <artifactGroup> and <artifactId> values in the pom.xml file to match your organization and project.

    #. Change the Java package name from com.koverse.foo to your organization and project names.

    #. Modify the Java classes to create your own custom sources, transforms, sinks, and application definitions.

    #. Delete any unused Java classes.

    #. Modify the /src/main/resources/classesToInspect.example file to match your Java classes and rename the file to classesToInspect.

    #. Modify the /src/main/resources/apps/ contents for your custom application.

    #. Modify the LICENSE and README file

Deploying the Addon to a Koverse Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Addons can be deployed via a Maven command, or via the Koverse web interface.

Maven Addon Deployment
^^^^^^^^^^^^^^^^^^^^^^

	#. Login to your Koverse server

	#. Navigate to the "System Administration" application

	#. Click the "API" tab

	#. Click "Add API Token" button

	#. Add a name such as "developer"

	#. Click "Administrators" button

	#. Click "Create Token" button

	#. Note the API Token that was created.

	#. Add the following settings to your ~/.m2/settings.xml profile::

		<properties>
			<koverse.apitoken>API-TOKEN-HERE</koverse.apitoken>
			<koverse.serverurl>KOVERSE-URL-HERE (ex: http://koversevm/Koverse)</koverse.serverurl>
		</properties>

	#. Use this single command to build and deploy the plugin for testing::

		mvn clean package org.apache.maven.plugins:koverse-maven-plugin:deploy


Web interface Addon Deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	#. Navigate to the "System Administration App"

	#. Click the "Addons" tab

	#. Click "Browse" or "Choose File", and select the addon file from the <basedir>/target for your maven project.

	#. Click upload

.. _Addons:

Addons
------

Any custom code, whether it be one or more applications, transforms, or custom sources or sinks, can be packaged up into a simple JAR -  referred to in Koverse as an Addon. Addons are uploaded to Koverse, via the System Administration app, for deployment.

Koverse reads the contents of the JAR file and extracts necessary metadata from any classes extending Koverse known types, such as Application, Transform, Source, and Sink.


Creating an Addon
^^^^^^^^^^^^^^^^^

Addons are simply JAR files with some specific files and a well formed directory structure. The koverse-sdk-project provides a complete example maven project that builds an appropriately constructed Addon JAR. You may use any assembly framework you like to produce a JAR file with the following attributes


	 * Java binary .class files in the normal Java package directory structure.


	 * Koverse Application HTML and JavaScript should be placed in the /apps/<applicationId> folder - where applicationId matches the string your CustomApplication.getApplicationId() method returns.


	 * A file named classesToInspect can optionally be placed at the root level of the JAR. This file is a line separated list of all Applications, Transforms, Sources, and Sink Classes. Including this file causes Koverse to inspect only the classes listed in this file. This is useful when your Addon includes classes whose dependencies are not present in the JAR.


Example Addon JAR directory structure::

	MyCustomAddon.jar
	|
	| -- classesToInspect
	| -- com
	           | -- mycompany
	                 | -- myproject
	                        | -- MyCustomTransform.class
	                        | -- MyCustomApplication.cass
	|-- some
	        | -- other
	                | -- dependency
	                        | -- OtherDependency.class


	| -- apps
	        | -- myApplicationId
	                | -- index.html
	                | -- css
	                        |-- index.css
	                | -- javascript
	                        |-- index.js
	        | -- mySecondApplicationId
	                | -- index.html
	                | -- someFolder
	                        | -- some.file


Uploading an Addon to Koverse
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

See the :ref:`Installing Addons` section.

Applications may be auto deployed, and immediately ready for use - if so defined by the developer of the application. Sources, Transforms, and Sinks are also now ready for immediate use as well.


Managing Versions for Custom Components
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The applicationId, sourceTypeId, transformTypeId, and sinkTypeId property of the Applications, Sources, Transforms, and Sinks, are used by Koverse to identify these custom components across their versions. This means that, except in extreme cases, all versions of a custom component should share a single typeId string. This allows Koverse to identify when a newly installed custom component should override an exisisting custom component.


Here is an example life cycle of a single Addon containing a single custom source.


	 #. An administrator or developer user uploads a MyCustomAddon-1.0.0.jar Addon into a Koverse installation. This JAR contains a MyCustomSource with a sourceTypeId of myCustomSource.

	 #. The source  is used by many other end users over time to import data from various systems.

	 #. A developer releases a new updated version of the Source. This source is now named My New Custom Source, has a sourceTypeId of myCustomSource, and is in an Addon named MyNewCustomAddon-2.0.0.jar.

	 #. An administrator or developer uploads this new Addon JAR file.

	 #. Koverse inspects the MyNewCustomAddon at install time, and discovers that the MyNewCustomSource has the same sourceTypeId as the existing MyCustomSource.

	 #. Koverse automatically disables the old MyCustomSource. All instances of this source now execute the MyNewCustomSource code. This means end users may need to consider the changes in parameters or behavior.

	 #. When all of the components of an Addon have been disabled, either manually or via uploading of new overlapping components, the old addon itself is disabled - and is therefore removed from the administration interface. In this case, MyCustomAddon-1.0.0.jar is disabled.

	 #. Koverse does not discard the logging or reference to the old Addon. These items remain for auditing and provenance purposes.


The Version Property
^^^^^^^^^^^^^^^^^^^^

The version properties of these custom components are simply used to identify the active installed version for troubleshooting and verification purposes. Koverse uses a last installed methodology when selecting the implementation version for custom Application, Source, Transforms, and Sinks. This means that the end user can simply upload any version of an Addon, and be assured they are using the last installed. The version string itself has no affect on which version is executed.


Change Control Across Versions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Developers should consider that customers upgrading from one version to the next, or down grading, may have already established Source, Transform, or Sink instances that have existing parameter values. This means the developer may need to handle outdated parameter configurations. The most appropriate method to handle changing parameter sets across versions is to inform the user that new configuration is needed, when simple error checking of parameters fails.




HTML/JS Apps
^^^^^^^^^^^^

The ability to quickly build new applications to address specific mission and business needs is a primary objective of Koverse. Applications built on Koverse can take advantage of the powerful data management, indexing, and query capabilities Koverse provides. In conjunction with custom Transforms, Koverse applications can achieve a large breadth of functionality.

Apps are built using HTML and Javascript and interact with Koverse via the Javascript SDK found in the koverse.js file.


Koverse Javascript SDK
^^^^^^^^^^^^^^^^^^^^^^

Koverse ships with a few .js files that should be included in your custom apps. Open and inspect them each for a list of their properties. The list below describes these files in detail.

`/Koverse/js/koverse.js <javascript/symbols/Koverse.html>`_

The koverse.js file contains all of the AJAX functions for calling Koverse REST API methods. Use these methods to manipulate services, perform CRUD operations on components, and query for data in koverse. This file requires that JQuery is also included in your project.

**/Koverse/js/apps/apps-common.js**

The apps-common.js file contains all of the logic for the Koverse common look-and-feel - including the top navigation bar and menu. Use this file in your native app so that it is well integrated with the koverse JS UI framework. This file requires the /Koverse/css/apps-common.css style sheet.

**/Koverse/js/koverse-util.js**

The koverse-util.js file contains many helper functions for common uses cases in Koverse apps - like number formatting, date parsing, and URL hash/anchor value manipulation, etc. Including this file in your app is optional, but you will likely find it very helpful.

Defining Custom Apps in Addons
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Addons enable developers to deliver custom "Apps" that are managed and deployed in Koverse installations. When a system administrator uploads an Addon JAR file, it is inspected for custom Application definitions. The custom application contents are included included in the JAR, so that it's contents can then be delivered to the end user.

**Application Definition**

See the koverse-sdk-project/src/main/com/koverse/foo/MyCustomApplication.java file for an example of defining a custom application. That file defines the presence of a custom application type.

**HTML/JS code in Addons**

See the `Creating an Addon` section for the structure of an HTML/JS app in side an addon. The top directory name of the app's html/js code should match the output of getApplication() method.


Sources API
-----------

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



Transforms API
--------------

Koverse Transforms can operate over one or more data collections to perform advanced algorithmic processing or create analytic summaries.  Koverse tracks all transform relationships between input and output Data Collections so the provenance of any given Data Collection is traceable to its derivative Data Collections or Import Sources.

Koverse uses Apache Hadoop MapReduce to execute Transforms over data collections and handles all the details of scheduling, running, stopping, and monitoring the individual Hadoop jobs. To transform a data set, users implement a simplified MapReduce API that allows for reading records from one or more input Data Collections, potentially filtered according to user authorizations and writes output to a new Data Collection, applying security labels appropriately.

Using the Koverse Transform API his has several advantages over using Hadoop directly:

* Developers can focus on the details of their algorithm, rather than worrying about the details of handling many different input and output data formats and managing multiple jobs.

* Transforms are parameterized so that, once a Transform is written, it can be configured and run by non-developers on the Data Collections they are authorized to read.

* The details of how a transformed result data set is stored and labeled are handled by the Transform framework.  This ensures that result sets will be automatically queryable and  that access control policies are maintained.

Koverse transforms build on the MapReduce processing functions map(), combine(), and reduce().

See the `Koverse SDK Project <https://github.com/Koverse/koverse-sdk-project/tree/1.4/>`_ section for details about a ready made project for creating custom transforms.


Transform Stages
^^^^^^^^^^^^^^^^

Many algorithms involve more than just one map() and one reduce() function. Koverse Transforms are organized into stages which are run one after the other, the output of the previous stage becoming the input to the following stage.


Transforms are specified by the developer defining the individual stages, and then specifying the order in which the stages should be run. The Transform framework handles the details of scheduling map, combine, and reduce stages into jobs to submit to Hadoop.


For example, if the first stage of a Transform is a reduce stage, the framework knows to set up an identity mapper in the first Hadoop job created to pass records directly to the reducer.


The only restriction on the order in which stages are run is that Combine stages must be followed by a Reduce stage.


Another item to note is that the first Map stage of a transform receives Record objects from the input Koverse Data Collections. Subsequent stages receive whatever objects are emitted by previous stages.


If a stage fails, the errors are reported to the User Interface and subsequent stages are cancelled.


Stages are defined by subclassing one of the Stage types described below.


RecordMapStage
^^^^^^^^^^^^^^

This type of stage operates on Records from the input Data Collections specified when the Transform was configured.


 ``public void map(Record record)``


KVMapStage
^^^^^^^^^^

This type of stage is used when mapping over the output of a previous stage.


 ``public void map(Object key, Object value)``


CombineStage
^^^^^^^^^^^^

A CombineStage is used to locally combine the output of a previous map stage before the keys and values are sent to a ReduceStage. A CombineStage must be followed by a ReduceStage


 ``public void combine(Object key, Iterable<Object> values)``


ReduceStage
^^^^^^^^^^^

A ReduceStage takes a key and a set of values and emits one or more new key value pairs for consumption by a subsequent Stage, or writes Koverse Records to the output Collection in the data store.


 ``public void reduce(Object key, Iterable<Object> values)``


Emitter
^^^^^^^

The emitter is used to either send key value pairs to the next Stage or to write Records to the output collection. Usually all but the last Stage emit key value pairs and the last Stage writes Records.


Key value pairs emitted by emit() are sent to HDFS where they are read by a subsequent Stage and then deleted whereas Records emitted from writeRecord are written to the output Collection of the Transform and are indexed and made searchable according to the configuration of the output Collection.::


        emit(Object key, Object value)


        writeRecord(Record record)


Transform Runner
^^^^^^^^^^^^^^^^

The transform runner is reponsible for assembling MapReduce jobs out of stages and incrementing a given transform job's current stage. The runner will peek at proceeding stages in an attempt to execute map, combine and reduce stages as parts of a single job. After configuring a job, it will submit the job to the cluster.


Transform class
^^^^^^^^^^^^^^^

Stages are packaged up into a single Transform by defining a subclass of the Transform class.


Security
^^^^^^^^

Koverse ensures that a Transform only reads records from collections from which the submitting user is authorized to read. In addition, any restrictions on the imported with additional security labels is applied so that individual records that the user is not authorized to see are not delivered to the Transform for processing.


The output Records of each Transform are labeled by the framework so that access to them is controlled.

Tips and Tricks
^^^^^^^^^^^^^^^

* When writing transform logic, keep in mind that Koverse Records may vary in structure.  As such, one cannot assume that certain fields will be present, or that the content of fields will conform to any particular format.  Code must be defensive against variation in fields and their values.


Import Transforms API
---------------------

Koverse ImportTransforms allow Records to be transformed during an Import job.

ImportTransforms can be parameterized to allow users to configure the ImportTransform at runtime. Parameters can be accessed via the setup method thus:

    ``public void setup(Map<String, Object> params) throws IOException``

Developers can grab the values of Parameters and store them for use in the transform method.

The core of an ImportTransform is the transform method:

  ``public Iterable<SimpleRecord> transform(SimpleRecord inputRecord)``

The transform method takes one input SimpleRecord and returns zero or more SimpleRecords.


Export Transforms API
---------------------

Koverse ExportTransforms can be used to transform Records as they are being written to a Koverse Sink.

ExportTransforms can be parameterized to allow users to configure the ExportTransform at runtime. Parameters can be accessed via the setup method thus:

    ``public void setup(Map<String, Object> params) throws IOException``

Developers can grab the values of Parameters and store them for use in the transform method.

The core of an ExportTransform is the transform method:

  ``public Iterable<SimpleRecord> transform(SimpleRecord inputRecord)``

The transform method takes one input SimpleRecord and returns zero or more SimpleRecords.


Sinks API
---------

Koverse Sinks are designed to write Koverse Records to external data stores. For example, customers often want transformed data exported into HDFS for follow-on processing by down stream systems. Java developers can create
custom Sinks to support specific destination data stores.

Sinks are executed as MapReduce jobs with only a map phase. The sinks API provides an interface that allows the developer to open a connection to an outside system, deliver records, and then close that connection.

See the `Koverse SDK Project <https://github.com/Koverse/koverse-sdk-project/tree/1.4/>`_ section for details about a ready made project for creating custom sinks.


Export File Formats API
-----------------------

Developers can extend ExportFileFormat to easily create new ways to export Koverse Records to file-based Sinks. ExportFileFormats are parameterized like other classes.

There are three primary methods to define when creating an ExportFileFormat:

	``public void startFile()``

startFile is used to do initialization. The method getOutputStream() can be used to get a reference to the OutputStream to which SimpleRecords are written. Some ExportFileFormats wrap the OutputStream object with other objects to make it easier to output records.

This method can also be used to write out header information to the output file.

	``public void writeRecordToFormat(SimpleRecord record) throws IOException``

This writeRecordToFormat method is used to output individual records to the output file. SimpleRecord objects can be converted into the bytes that the file format requires.

	``public void endFile()``

The endFile function is used to write out any footer information required by the file format. It is not necessary to close the OutputStream as this is done automatically by the super class.


Parameters
^^^^^^^^^^

Koverse Transforms, Sources, and Sinks are all configured via Parameters. Parameters are defined by the developer and allow specific instances of Transforms, Sources, and Sinks to be configured and deployed into varying environments by authorized non-developer users.


When creating a specific implementation of a Transform, Source, or Sink, developers provide a list of Parameters to present to the end-user via the User Interface.

Parameters are created with the following fields:


* **String parameterName** (required) - uniquely identifies the parameter within the class.


* **String displayName** (required) - the name of the parameter that is shown to the user.


* **String type** (required) - one of the possible types defined in Parameter (see below).


* **String defaultValue** (optional) - a value set as the default.


* **String referencedParameterNames** (optional) - any parameterName that should be referenced. For example, for Parameters of the type TYPE_COLLECTION_FIELD, the possible values presented to the user in the UI are taken from the parameter defined in the referencedParameterName.


* **Boolean required** (optional) - whether the parameter must be set by the user. The default is false


* **Boolean hideInput** (optional) - whether the value of the parameter should be hidden in the UI. Used for sensitive parameters such as passwords.


* **String hint** (optional) - a string of text to be shown to the user as an additional hint for applying a value to the parameter.


For example, a Source may define a parameter in its constructor as follows::


	private static final String URL_PARAMETER = url;


	public NewsFeedSource() {
	inputParameters.add(
	new Parameter(
	URL_PARAMETER,
	"RSS Feed URL",
	Parameter.TYPE_STRING,
	"http://rssfeedurl.xml"));
	}


Parameters can be of the following types:


* TYPE_STRING - for passing in single line short strings such as a hostname or URL.

* TYPE_TEXT - for passing in longer multi-line strings, such as an entire script.

* TYPE_BOOLEAN - presents a checkbox to the user and is set to true or false.

* TYPE_INTEGER - allows the user to specify an integer value.

* TYPE_FILE - Allows the to user choose a file from the local file system. The file is uploaded, and its contents are made available as a stream at execution time to the custom component.

* TYPE_COLLECTION_FIELD - allows the user to select a single field from a collection. The referencedParameterName must be equal to the parameterName of an TYPE_INPUT_COLLECTION or TYPE_OUTPUT_COLLECTION parameterName. This is useful for informing classes of a specific field to use.

* TYPE_COLLECTION_MULTIPLE_FIELD - allows the user to choose a set of fields from a collection selected as an input or output collection parameter. This is useful for informing classes of a specific set of fields to use.


There are additional Parameter types used primarily by the system:


* TYPE_INPUT_COLLECTION - an input collection parameter presents the user with a list of collections from which the user is authorized to read. The UI then fills in this parameter with the internal unique ID of the collection the user chose. This component generally allows the end-user to select multiple input collections. The contents of all input collections are read into transform and export jobs for example.


* TYPE_OUTPUT_COLLECTION - an output collection parameter presents the user with a list of collections to which the user is authorized to write. The UI then fills in this parameter the internal ID of the collection the user chose. This parameter generally only allows the user to select a single collection.


* TYPE_SECURITY_LABEL_PARSER - presents the user with a list of Security Label parser options. Security label parsers are responsible for translating from a source security label to a Koverse record security label.


Transforms are pre-configured with parameters for input and output Data Collections. Sources and Sinks are pre-configured with output or input collections, respectively.


REST API
--------

**Note**: Clients written in Javascript can use the Javascript SDK rather than interacting directly with the REST API.

Koverse provides an HTTP REST API for providing access to third party tools and integrations. This documentation explains how to access the REST API, and provide third party integrations such as widgets and data management. All responses, and HTTP payload requests are encoded in JSON.

Response Messages
^^^^^^^^^^^^^^^^^

All response messages from the REST API are encoded in JSON, and include common attributes on the base response object. The most important attribute is the success boolean flag, that indicates whether the requested operation was successful. If the success value is false, then there will be a failureMessage attribute that provides a plain english statement as to the reason.

Example:

{"success": false, "failureMessage": "Something went wrong."}

Commonly used methods
^^^^^^^^^^^^^^^^^^^^^

Almost all applications will require the following functionality

* User Authentication and Authorization
* Fetching Data Collections
* Performing Queries

Additional Methods

* User management
* Collection management
* Index management
* Kicking off imports, transforms, exports
* Many others

API Tokens
^^^^^^^^^^

Koverse Administrators can create API Tokens, which are used by outside systems to authenticate. These are generally unused outside of the context of a direct users request. For example, a server that periodically updates it's own cache using a Koverse query.

All REST API methods can be called using an API token to authenticate. The API Token takes precedence over any other method of authentication. Here is an example of using an API token to authenticate:

	``http://<host:port>/Koverse/api/system/status?apiToken=API-TOKEN-HERE``

Example REST API Methods
^^^^^^^^^^^^^^^^^^^^^^^^

**Ping**

 ``http://<host:port>/api/ping``

A ping request shows that the Koverse HTTP REST API is available, and responsive. Use the ping response method to monitor basic system availability.


Example Ping Request

The following URL shows a ping request, for a Koverse server running on localhost.

 ``http://localhost:8080/api/ping``

Example Ping Response

 ``{"recordCountEstimate":0,"responseTime":0,"success":true,"recordsWritten":0,"bytesWritten":0,"importSampleReady":false}``

**Session Authentication (Login)**

 ``http://<host:port>/api/login``
 
 POST data:
 
 ``{"email":"username@example.com","password":"password"}``

Example login failure response::

   {"success":false,"failureMessage":"Login denied. Check username and password"}


Example login success response::

   {"success":true,"user":{"id":1,"emailAddress":"admin","groups":
   [{"id":1,"name":"Administrators","staticPermissions":["manageUsersAndGroups","manageDataCollections"
   ,"manageSystemSettings","audit","manageSources","manageLockDown","manageMapReduceJobs"]}]}}


Before using other REST API methods, an HTTP session must be established. Below is the URL and an example for login. The HTTP response to the login will include a JSESSIONID cookie that must be included in all future REST API calls.

**Example Login URL**

The following cURL command would retrieve an HTTP response with a JSESSIONID token for the default administrative user and password.

 ``curl 'http://localhost:8080/api/login' -i -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*'  --data-binary '{"email":"admin","password":"admin"}'``

Example login response::

   HTTP/1.1 200 OK
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
   Set-Cookie: JSESSIONID=1e0absgbti8151fn0ip59b3kj4;Path=/
   Expires: Thu, 01 Jan 1970 00:00:00 GMT
   Content-Type: application/json
   Transfer-Encoding: chunked
   Server: Jetty(8.1.18.v20150929)
  
   {"id":4,"firstName":"admiral","lastName":"admin","email":"admin","groups":[],"externalGroups":[],
   "groupIds":[],"tokens":[],"disabled":false,"creationDate":null,"passwordResetHash":null,
   "authenticatorUserId":"koverseDefault_admin","authenticatorTypeId":"koverseDefault",
   "newPassword":null,"newPasswordConfirm":null}

**Querying for data**

The most basic feature of the Koverse REST API is to provide query/search access to data collections. Below is an example of querying all data collections for a logged-in user.

 ``http://<host:port>/api/search/results?query=<queryHere>``

**Example Query**

The following would query a Koverse instance running on localhost, port 8080, for the term test.

 ``http://localhost:8080/api/search/results?query=test``

 **Additional Methods**

 See the `Koverse REST API Generated Docs <rest/>`_ for details about the many other methods available.

Pig Scripts
-----------

Koverse supports using `Pig <http://pig.apache.org>` as a transform. Pig transforms are simple pig scripts - where Koverse defines the load and store functions. To use Pig, follow these steps.

#. Open the Data Flow app.
#. Click Add Transform
#. Choose 'Pig' from the transform type drop down.
#. Choose Input and Output collections.
#. Write the Pig script in provided text area.

Koverse automatically provides the "load" and "store" functions. You'll simply need to write a Pig script that references the input collections by name, and assigns a value to the output collection by name. Pig variables are case sensitive, and have some restrictions. Therefore Koverse transforms Data Collection names to use only case sensitive alphanumeric and underscore characters. Also, Pig table names cannot start with a non Alpha character (A-Z or a-z) - therefore Koverse prepends the character A when a data collection name starts with a non alpha character. Here are some example data collection name conversions.

* "My 1st Data Collection" = My_1st_Data_Collection
* "P*22" = P_22
* "cAsE sEnSiTiVe" = cAsE_sEnSiTiVe
* "9Items" = "A9Items"
* "_Items" = "A_Items"

Koverse records are converted into tuples. The field names are applied as the Pig field names with the same conversion as above.

While Koverse allows unstructured data, Pig requires highly structured data. The schema defined for Pig fields is derived using the data type(s) seen in the Collection Details Field's page in Koverse. If a field has only a single type detected, the conversions in the table below are used directly. If a field has more than one type detected, and one of those types is a String, all values for that field will take a chararray type in Pig. Otherwise, if more than one type is detected but none are Strings, for example, if a field is 90% Number and 10% Date, it will be defined as a double value type in Pig. Here are the conversions of Koverse data types to Pig data types.

==================   ============
Koverse                 Pig
==================   ============
String               chararray
Number		     double
Date		     DateTime
KoverseGeoPoint	     [double,double]
Byte[]		     bytearray
Object		     map
==================   ============

**Example Pig Scripts**

The following is a simple pig script that would copy the contents of DataCollection1 to DataCollection2::

	DataCollection2 = DataCollection1

This more complex Pig script would perform a Group By operation on fieldA with a sum on fieldb::

	A = GROUP DataCollection1 BY fieldA;
	DataCollection2 = FOREACH A GENERATE FLATTEN(group) as fieldA, SUM(fieldB) as fieldBSum;


Pig Transforms Special Considerations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Pig transforms are executed as multiple stage map reduce jobs. They're considered "non-incremental" transforms in Koverse. Never restart the koverse-server process while a Pig transform is executing - as the job's state will be lost and the job will never finish.


3rd Party Authentication and Authorization
------------------------------------------

Koverse can be extended to integrate with existing enterprise authentication and authorization systems that may be required for a given production environment. While an extensible component that is built against the Koverse SDK, these authentication and authorization modules are not like other extensible components like Sources and Transform and packaged into a Koverse AddOn. Instead, these modules need to be built into a JAR and placed in the classpath of the Koverse Webapp. Additionally, the koverse-webapp.properties needs to be modified to identify the module(s) that Koverse should use for authentication and authorization.

**Implementing an Authentication and Authorization Module**
To implement an authentication and authorization module, a developer will extend the ``AbstractWebAppAuthModule`` class. This is a `Guice <https://github.com/google/guice>`_ module that enables the injection of new authentication and authorization implementations. There are two ways to implement authentication, either with the ``HttpServletRequestAuthenticator`` or the ``WebAppParameterAuthenticator``. The ``HttpServletRequestAuthenticator`` enables authentication based on information in the HttpServletRequest, such as an X.509 certificate. The ``WebAppParameterAuthenticator`` enables authentication based on custom, named parameters. To pass external groups or security tokens to Koverse, implement a ``WebAppAuthorizer``.

Full examples of these classes can be found in the `Koverse SDK Project <https://github.com/Koverse/koverse-sdk-project/tree/1.4/>`_ .

**Application Server Configuration**
The module and implementations described above need to be built into a JAR file which is placed in the classpath of the Koverse Webapp. This can be done by simply putting the JAR into the *lib* directory of the Koverse Web App.

**Koverse Webapp Configuration**
To update the active authentication and authorization modules used by the Koverse Webapp, set the ``com.koverse.webapp.auth.modules`` property in koverse-webapp.properties to a comma separated list of Guice modules.


Java Client
-----------

Introduction
^^^^^^^^^^^^

The Java Client allows JVM based software to connect to and interact directly with Koverse through the REST API.
It is capable of interacting with the REST API using plain HTTP connections, SSL, and SSL with client PKI certificates.

The general concept is to instantiate an implementation of the ``com.koverse.client.java.KoverseClient`` interface and invoke its methods.
There are two such implementations, one for interacting with the Koverse web application via REST and another directly to the Koverse server using Thrift.

These instructions will focus on the REST based implementation because the Thrift based implementation is still a work-in-progress.


Basics
^^^^^^

To use the Java client in your software, modify your project's Maven pom.xml to include the koverse java client dependency.
First, include a repositories section in your ``pom.xml`` file and add the koverse repository, for example::

	<repositories>
   		<repository>
      		<id>koverse</id>
      		<name>Koverse Public Repo</name>
      		<url>http://nexus.koverse.com/nexus/content/groups/public/</url>
      		<layout>default</layout>
   		</repository>
	</repositories>


This will allow maven to download the Koverse java client dependency.  This dependency has the groupId ``com.koverse`` and the artifactId ``koverse-client-java``.
Set the version of that dependency to match the version of Koverse your software will be communicating with.  Your ``pom.xml`` file should now have a section similar to::


	<dependencies>
   		<dependency>
      		<groupId>com.koverse</groupId>
      		<artifactId>koverse-client-java</artifact>
      		<version>1.2.0</version>
   		</dependency>
	</dependencies>


Note that if your IDE integrates with Maven, it should be able to download JavaDocs for the koverse client software and display them for you.
If you'd like to download the JavaDocs yourself, visit http://nexus.koverse.com/nexus/content/groups/public/com/koverse/koverse-client-java/ in your browser, select the folder for your version of Koverse, and download the Javadoc archive.

Lastly:

In your Java code, you will be instantiating an instance of ``com.koverse.client.java.KoverseConnection``.  Note that the constructor takes an argument of a ``com.koverse.client.java.KoverseConnection``.
You choose which implementation of KoverseConnection to use in order to specify whether to use plain un-encrypted HTTP or encrypted HTTP (e.g. HTTP over SSL, TLS).

Unencrypted HTTP Connections
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Begin by creating an instance of ``com.koverse.client.java.PlainKoverseConnector``.  Note that its constructor requires you to provide a valid Koverse API Token and the base URL of Koverse (e.g. http://www.myserver/Koverse).
The, create an instance of KoverseConnection, supplying the PlainKoverseConnector you just created as the sole constructor argument.

Now, you may use the create KoverseConnection object to perform operations such as:

* Retrieve collection, including names and collection identifiers.
* Insert, update, and delete records.
* Get user and system information.
* Retrieve collection statistics and download records in bulk.
* Perform queries.
* Perform auto-complete queries.

Please view the JavaDocs for the interface ``com.koverse.client.java.KoverseClient`` for further details on these operations.

Encrypted HTTP Connections
^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuring the KoverseClient to use SSL is somewhat more involved.  IT can be further complicated by using client side certificate authentication.
As such, let's being with just setting up a SSL connection for now.  Client side certificate authentication will be explained in the next section.

Before I begin, please note that this information is also documented in the JavaDocs for the ``com.koverse.client.java.SecureKoverseConnector`` class.  Please feel free to reference that as well.

The important thing to realize is that the use of SSL is configured through the standard JVM mechanism of using special system properties and a Java Key Store.

Since it is most likely the case that the server is not assigned a certificate issued by a trusted CA (Certificate Authority), we must configure your Java software to use a self-signed certificate used by the Koverse server.

As such, the first thing you must do is create a Java keystore that will contain the certificate for the Koverse server.
That is done by using the Java ``keytool`` command, such as so::

	keytool -import -alias koverseserver -file koverseserver.crt -storepass $PASS -keystore koverseserver.keystore

In the above example, we are creating an entry named ``koverseserver`` in the keystore located in the file ``koverseserver.keystore`` from the contents of the certificate file ``koverseserver.crt``.
Additionally, we are protecting the contents of the keystore by encrypting it with the password stored in the environment variable ``$PASS``.

Getting this certificate stored into the keystore is the first step.

The next step is to define special Java system properties when your program is executed so that Java will use the information in the keystore.  Those system properties are:

``-Djavax.net.ssl.trustStoreType=jks``

``-Djavax.net.ssl.trustStore=koverseserver.keystore``

``-Djavax.net.ssl.trustStorePassword=$PASS``

Your program must either be run with the above command line properties or you must programmatically add them to the JVM's System Properties at runtime.

With this done, your software should be capable of interacting with a SSL enabled Koverse Server.  However, in the case that things don't seem to be working for you, there are some tips that can help.

1) Be sure to contact us for support
2) Apply the system property ``-Djavax.net.debug=all`` to get lots of good SSL debugging output.



Encrypted HTTP Connections with Client Side Certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To use client side certificates, do the same as in the previous section, but also make sure the following system properties are set in your software as well:

``-Djavax.net.ssl.keyStoreType=pkcs12``

``-Djavax.net.ssl.keyStore=clientcertificate.p12``

``-Djavax.net.ssl.keyStorePassword=$PASS``

Where you are specifying your client certificate that is located in the file ``clientcertificate.p12``.  This file is a ``pkcs12`` formatted file, protected by the password stored in the system environment variable ``$PASS``

Spark SQL Introduction
----------------------

Koverse 1.4 supports Transforms written using the Apache Spark API, including Spark SQL. Spark SQL allows Koverse records to be processed using the popular SQL language, which is useful for many common operations such as reshaping data, filtering, combining, and aggregation.

Spark SQL can be used in two ways in Koverse Transforms: first, using the generic Spark SQL transform, developers can simply paste a SQL script into a new instance of a Spark SQL Transform in the Koverse UI.

Second, transform developers can create Koverse AddOns which include Spark SQL statements as part of a Java or Scala class. These can be packaged, uploaded to the Koverse platform, and reused to transform multiple input collections.

**Using the generic Spark SQL Transform**

Koverse ships with a generic Spark SQL Transform that allows users to simply paste a Spark SQL statement into a text parameter and applies that script to the input collection specified.

To create a transform like this, start in the Data Flow application from the main menu. Click ‘Add Transform’ and select ‘Spark SQL Transform’ from the drop down list.

Configure the input collections desired.

In the text input marked ‘SQL select statement’, paste in a SQL statement. When specifying a table, use position parameters to identify which input collection should be used. For example, if you’ve selected an input collection ‘stocks’ in the input collections control it will be referenced in the SQL statement as $1. The second input collection is referenced as $2 and so on.

.. image:: /_static/CollectionManagerScreenshots/DataFlow.*
	:height: 400 px
	:width: 600 px


For a description of the SQL statements that are supported see https://spark.apache.org/docs/latest/sql-programming-guide.html

**Building a new AddOn that includes Spark SQL statements**

Developers can also build Koverse AddOns that can leverage the Spark SQL API in transforms. To create a Spark SQL transform, create a Java class that extends JavaSparkSQLTransform and implement the required methods.

An abbreviated example is as follows. Create a new class extending JavaSparkSQLTransform::

    …
    import com.koverse.sdk.transform.spark.sql.JavaSparkSqlTransform;
    import com.koverse.sdk.transform.spark.sql.JavaSparkSqlTransformContext;
    import org.apache.spark.sql.DataFrame;
    import org.apache.spark.sql.SQLContext;
    …

    public class MySparkSqlTransform extends JavaSparkSqlTransform {

Provide any parameters you wish to expose to users to configure this transform, and the basic information about the transform that will help users identify it in the UI::

    public Iterable<Parameter> getParameters()
    public String getName()
    public String getTypeId()
    public Version getVersion()
    .....

Now in the execute() method, access is provided to a SqlContext. Input collections are already loaded as data frames into the Sql Context and only need to be referenced in SQL statements. The input collection IDs can be accessed via the JavaSparkSqlTransformContext::

    protected DataFrame execute(JavaSparkSqlTransformContext context) {{

    final SQLContext sql = context.getSqlContext();

    final List<String> inputCollections =

    context.getJavaSparkTransformContext()

    .getInputCollectionIds();

    …

Collection Schemas are also available, but they do not need to be used to execute SQL statements. They are there in case additional DataFrames need to be created.

    ``Map<String, CollectionSchema> schemas =``

        ``context.getJavaSparkTransformContext().getInputCollectionSchemas();``

SQL statements should be edited to reference the input collection IDs, and can be executed simply by passing the SQL string to the SqlContext. The resulting data frame should be returned and Koverse will persist the output as a new collection.

    ``return sql.sql(sqlStatement)``



Spark Transform API
-------------------

Introduction
^^^^^^^^^^^^

Koverse now supports the Apache Spark cluster computing framework through a set of native Koverse APIs that leverage much of the Spark primitives. The Koverse Spark APIs allow a developer of Koverse a set of routines, protocols, and tools for building software applications based upon the Koverse technology.

See the :ref:`Installing Addons` section for information about building an addon that contains a class that uses the Koverse Spark API.

The following is a high-level outline of the Koverse Spark API framework:

Interface SparkTransform
^^^^^^^^^^^^^^^^^^^^^^^^
    **com.koverse.sdk.transform.spark**

    `@ThreadSafe`

    `@Immutable`

    **public interface SparkTransfor**

    **Description:**
    The following methods, when executed in order, obtain information on how to execute the transform: *getName(), getVersion() and getParameters()*.
    These methods are used to configure the transform before performing execution using ``execute(com.koverse.sdk.transform.spark.SparkTransformContext)`` which is passed a **SparkTransformContext** to give it the information needed to run the spark transform.

+--------------------------+---------------------------------+------------------------------------------------------+
| Modifier and Type        | Method                          | Description                                          |
|                          |                                 |                                                      |
+==========================+=================================+======================================================+
| org.apache.spark.rdd.RDD | getName()                       | Koverse calls this method to execute your transform. |
| <SimpleRecord>           |                                 |                                                      |
+--------------------------+---------------------------------+------------------------------------------------------+
| String                   | getName()                       | Get the name of this transform.                      |
+--------------------------+---------------------------------+------------------------------------------------------+
| Iterable<Parameter>      | getParameters()                 | Get the parameters of this transform.                |
+--------------------------+---------------------------------+------------------------------------------------------+
| String                   | getTypeId()                     | Get a programmatic identifier for this transform.    |
+--------------------------+---------------------------------+------------------------------------------------------+
| Version                  | getVersion()                    | Get the version of this transform.                   |
+--------------------------+---------------------------------+------------------------------------------------------+
| boolean                  | supportsIncrementalProcessing() | Whether the transform supports incremental output.   |
+--------------------------+---------------------------------+------------------------------------------------------+

**Example**
    ``final RDD<SimpleRecord> actual; actual = se.execute(sparkTransformContext);``


Interface SparkTransformContext
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    **com.koverse.sdk.transform.spark**

    `@NotThreadSafe`

    `@Immutable`

    **public interface SparkTransformContext**

    **Description:**
    Given to a SparkTransform when it is executed. Provides context information to assist in the execution.

+-------------------------------------+-----------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Modifier and Type                   | Method                      | Description                                                                                                                                                                       |
|                                     |                             |                                                                                                                                                                                   |
+=====================================+=============================+===================================================================================================================================================================================+
| Map<String,org.apache.spark.rdd.RDD | getInputCollectionRDDs()    | Get all Koverse input collection RDDs from the parameters that were input by the user.                                                                                            |
| <SimpleRecord>>                     |                             |                                                                                                                                                                                   |
+-------------------------------------+-----------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Map<String,Collection               | getInputCollectionSchemas() | Get the schemas for all input collections.                                                                                                                                        |
| Schema>                             |                             |                                                                                                                                                                                   |
+-------------------------------------+-----------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Map<String,String>                  | getInputCollectionSchemas() | Get all parameters that is input by the user, with the exception of collection parameters (which are given as RDDs). None of the keys or values in the returned map will be null. |
+-------------------------------------+-----------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| org.apache.spark.SparkContext       | getSparkContext()           | Get the spark context to use during execution                                                                                                                                     |
+-------------------------------------+-----------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Class JavaSparkTransform
^^^^^^^^^^^^^^^^^^^^^^^^
    **com.koverse.sdk.transform.spark**

    `@ThreadSafe`

    `@Immutable`

    **public abstract class JavaSparkTransform extends Object implements SparkTransform, Serializable**

    **Description:**
    A version of of spark transforms that are easier to work with when the spark code is written in Java.

+-----------------------------------+----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| Modifier and Type                 | Method                                                   | Description                                                                                                                                     |
|                                   |                                                          |                                                                                                                                                 |
+===================================+==========================================================+=================================================================================================================================================+
| protected abstract org.apache.spa | execute(JavaSparkTransformContext sparkTransformContext) | Koverse calls this method to execute your transform                                                                                             |
| rk.api.java.JavaRDD<SimpleRecord> |                                                          |                                                                                                                                                 |
+-----------------------------------+----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| org.apache.spark.rdd.RDD          | execute(SparkTransformContext sparkTransformContext)     | Invokes execute(com.koverse.sdk.transform.spark.JavaSparkTransformContext) after wrapping up the Scala specific types into Java friendly types. |
| <SimpleRecord>                    |                                                          |                                                                                                                                                 |
+-----------------------------------+----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| boolean                           | supportsIncrementalProcessing()                          | Override this method if transform supports incremental processing - i.e.                                                                        |
+-----------------------------------+----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+

Class JavaSparkTransformContext
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    **com.koverse.sdk.transform.spark**

    `@Immutable`

    `@NotThreadSafe`

    **public final class JavaSparkTransformContext extends Object**

    **Description:**
    A version of the Spark Transform Context more tailored for use with pure Java Spark code.

+---------------------------------+-----------------------------+---------------------------------------------------------------------------------------------------------------------+
| Modifier and Type               | Method                      | Description                                                                                                         |
|                                 |                             |                                                                                                                     |
+=================================+=============================+=====================================================================================================================+
| Map<String,org.apache.spark.    | getInputCollectionRDDs()    | Get all Koverse input collection RDDs from the parameters that were input by the user.                              |
| api.java.JavaRDD<SimpleRecord>> |                             |                                                                                                                     |
+---------------------------------+-----------------------------+---------------------------------------------------------------------------------------------------------------------+
| Map<String,CollectionSchema>    | getInputCollectionSchemas() | Get the schemas for all input collections.                                                                          |
+---------------------------------+-----------------------------+---------------------------------------------------------------------------------------------------------------------+
| Map<String,String>              | getParameters()             | Get all parameters that is input by the user, with the exception of collection parameters (which are given as RDDs) |
|                                 |                             | None of the keys or values in the returned map will be null.                                                        |
+---------------------------------+-----------------------------+---------------------------------------------------------------------------------------------------------------------+
| org.apache.spark.api.java.      | getSparkContext()           | Get the spark context to use during execution.                                                                      |
| JavaSparkContext                |                             |                                                                                                                     |
+---------------------------------+-----------------------------+---------------------------------------------------------------------------------------------------------------------+


Class SparkTransformLoader
^^^^^^^^^^^^^^^^^^^^^^^^^^
    **com.koverse.sdk.transform.spark**

    **public class SparkTransformLoader extends Object**

    **Description:**

+-------------------+----------------+--------------------------------------+
| Modifier and Type | Method         | Description                          |
|                   |                |                                      |
+===================+================+======================================+
| String            | getName()      | Get name                             |
+-------------------+----------------+--------------------------------------+
| List<Parameter>   | getParmeters() | Get all the parameters input by user |
+-------------------+----------------+--------------------------------------+
| String            | getTypeId()    | Get Type Id                          |
+-------------------+----------------+--------------------------------------+
| Version           | getVersion()   | Get the spark version                |
+-------------------+----------------+--------------------------------------+

Spark SQL Transform API
-----------------------

Koverse now supports the Apache Spark SQL via a set of native Koverse Spark SQL APIs that let the user query structured data as a distributed dataset (RDD). This makes it easy to run SQL queries.

See the :ref:`Installing Addons` section for information about building an addon that contains a class that uses the Koverse Spark SQL API.

The following is a high-level outline of the Koverse Spark SQL API framework:

Class JavaSparkSqlTransform
^^^^^^^^^^^^^^^^^^^^^^^^^^^

    **com.koverse.sdk.transform.spark.JavaSparkTransform**

    `@Immutable`

    `@ThreadSafe`

    **public abstract class JavaSparkSqlTransform extends JavaSparkTransform**

    **Description:**
    A transform for executing Spark SQL query transforms

+-----------------------------------------------------------+----------------------------------------------------------+-----------------------------------------------------+
| Modifier and Type                                         | Method                                                   | Description                                         |
|                                                           |                                                          |                                                     |
+===========================================================+==========================================================+=====================================================+
| protected abstract org.apache.spark.sql.DataFrame         | execute(JavaSparkSqlTransformContext context)            | Execute the Spark SQL query.                        |
+-----------------------------------------------------------+----------------------------------------------------------+-----------------------------------------------------+
| protected org.apache.spark.api.java.JavaRDD<SimpleRecord> | execute(JavaSparkTransformContext sparkTransformContext) | Koverse calls this method to execute your transform |
+-----------------------------------------------------------+----------------------------------------------------------+-----------------------------------------------------+

Class JavaSparkSqlTransformContext
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    **com.koverse.sdk.transform.spark.JavaSparkTransform**

    `@NotThreadSafe`

    **public final class JavaSparkSqlTransformContext extends Object**

    **Description:**
    The context for a JavaSparkSqlTransform

+---------------------------------+----------------------------+--------------------------------------------------------------------------------------------------+
| Modifier and Type               | Method                     | Description                                                                                      |
|                                 |                            |                                                                                                  |
+=================================+============================+==================================================================================================+
| JavaSparkTransformContext       | getSparkTransformContext() | Get the JAva spark tranform context, if needed.                                                  |
+---------------------------------+----------------------------+--------------------------------------------------------------------------------------------------+
| org.apache.spark.sql.SQLContext | getSqlContext()            | Get the SQL context, which is ready to go and loaded with the schemas for the input collections. |
+---------------------------------+----------------------------+--------------------------------------------------------------------------------------------------+


Class KoverseSparkSql
^^^^^^^^^^^^^^^^^^^^^
    **com.koverse.sdk.transform.spark.sql**

    **public class KoverseSparkSql extends Object**

    **Description:**

+--------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
| Modifier and Type                                                  | Method                                                                                                                                                                         | Description                                                                                                                                                                              |                                                                                                                                                       |
|                                                                    |                                                                                                                                                                                |                                                                                                                                                                                          |                                                                                                                                                       |
+====================================================================+================================================================================================================================================================================+==========================================================================================================================================================================================+=======================================================================================================================================================+
| static org.apache.spark.sql.DataFrame                              | createDataFrame(org.apache.spark.api.java.JavaRDD<org.apache.spark.sql.Row> rowdRdd, org.apache.spark.sql.SQLContext sqlContext, org.apache.spark.sql.types.StructType schema) | Create a new Data Frame from an RDD of rows, a SQL Context, and a struct type (the Spark SQL schema)                                                                                     |                                                                                                                                                       |
+--------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
| static org.apache.spark.sql.DataFrame                              | getSqlContext()                                                                                                                                                                | createDataFrame(org.apache.spark.api.java.JavaRDD<SimpleRecord> recorddRdd, org.apache.spark.sql.SQLContext sqlContext, FlatCollectionSchema collectionSchema)                           | Create a new Data Frame from an RDD of records, a SQL Context, and a flat collection schema                                                           |
+--------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
| static org.apache.spark.api.java.JavaRDD<org.apache.spark.sql.Row> | createRowRdd(org.apache.spark.api.java.JavaRDD<SimpleRecord> recordRdd, FlatCollectionSchema collectionSchema)                                                                 | Converts a RDD of records and a flat collection schema into a RDD of rows.                                                                                                               |                                                                                                                                                       |
+--------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
| static org.apache.spark.sql.SQLContext                             | getSqlContext()                                                                                                                                                                | createSqlContext(org.apache.spark.SparkContext sparkContext, Map<String,org.apache.spark.api.java.JavaRDD<SimpleRecord>> recordRdds, Map<String,FlatCollectionSchema> collectionSchemas) | Converts two maps keyed by collection name, one containing record RDDs and the other containing collection schema, into a SQLContext ready for query. |
+--------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
| static org.apache.spark.sql.types.StructType                       | createSqlSchema(FlatCollectionSchema collectionSchema)                                                                                                                         | cGiven a flat collection schema, create s Spark SQL Struct type, which the SQL schema.                                                                                                   |                                                                                                                                                       |
+--------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+


**For a reference of the supported query syntax in the Spark Java SQL see:**

http://savage.net.au/SQL/sql-99.bnf.html

http://docs.datastax.com/en/datastax_enterprise/4.6/datastax_enterprise/spark/sparkSqlSupportedSyntax.html



Spark Scala Transform API with Examples
---------------------------------------
These examples give a quick overview of the Koverse Spark Scala Transform API. Koverse 1.4 currently provides a single transform API in Scala.

The Koverse transform class called:  **SimpleSparkTransform()**

To use the Scala Transform, simply run the **SimpleSparkTransform.execute()** method with the proper arguments; JavaSparkContext and org.apache.spark.api.java.JavaRDD.

Please refer to JavaDoc's for full detailed usage description.

The transform consists of the following high level steps:

#. Get the 'projectField' field property from the JavaSparkContext
#. Map the input collection RDDs to Scala map
#. Get the collection from the Scala map
#. Scan and pull out java records/objects from RDD
#. Output the total record count for Java records
#. Output the total record count for Scala records

Here is an example of a Spark Scala execute() method::

    protected def execute(context: JavaSparkTransformContext): JavaRDD[SimpleRecord] = {
        val field = context.getParameters.get(C.FIELD_PARAM)
        println(s"looking for field $field in the records")

        val map = mapAsScalaMap(context.getInputCollectionRDDs)
        println("mapped input collection RDDs to scala map")

        val collectionKV = map.iterator.next
        println(s"got collection ${collectionKV._1} from map")

        val rdd = JavaRDD.toRDD(collectionKV._2)
        println("pulled out RDD from tuple")

        val transformRDD = rdd
            .filter(r => r.containsKey(field))
            .map(r => {
            val outputRecord: SimpleRecord = new SimpleRecord

            if(r.containsKey(field)) {
            outputRecord.put(field, r.get(field))
            } else {
            outputRecord.put(field, "NOTHING")
            }

            println(s"${field} => ${r.get(field)}")
            outputRecord
      })
    println(s"total java records ${transformRDD.count()}")

    val output = JavaRDD.fromRDD(transformRDD)
    println(s"total scala records ${output.count}")

    output
  }


You can run Java and Scala examples by passing the class name to Spark’s bin/run-example script; for instance:

``./bin/run-example <scala class>``

For a description of the Spark Scala statements that are supported see the Scala Docs at:

https://spark.apache.org/docs/latest/api/scala/index.html#org.apache.spark.package


Spark Java API with Examples
----------------------------

Koverse 1.4 supports Transforms written using the Apache Spark API. Koverse APIs leverages much of the Spark primitive abilities that can be applied by writing a custom Transform or use an existing Transform provided by the Koverse API.

``public class MySparkSqlTransform extends JavaSparkSqlTransform {``

Provide any parameters you wish to expose to users to configure this transform, and the basic information about the transform that will help users identify it in the UI:

**public Iterable<Parameter> getParameters()**

Example::

    @Override
	public Iterable<Parameter> getParameters() {
		ArrayList<Parameter> params = new ArrayList<Parameter>();
		params.add(new Parameter(FIELD_PARAM, "Field to project", Parameter.TYPE_COLLECTION_FIELD));
		return params;
	}

**public String getName()**

Example::

    @Override
	public String getName() {
		return "Spark Java";
	}

**public String getTypeId()**

Example::

    @Override
	public String getTypeId() {
		return "Spark Java Transform";
	}

**public Version getVersion()**

Example::

    @Override
	public Version getVersion() {
		return new Version(0, 1, 0);
	}


Here is an example of usage (**Create a new class extending JavaSparkTransform()**)::

    final JavaSparkTransform javaSparkTransform;
    final SparkTransformContext sparkTransformContext
    final RDD<SimpleRecord> actual;

    javaSparkTransform = new JavaSparkTransform() {
            @Override
            public Iterable<Parameter> getParameters() {
                throw new UnsupportedOperationException("Not supported yet.");
            }

            @Override
            public String getName() {
                throw new UnsupportedOperationException("Not supported yet.");
            }

            @Override
            public String getTypeId() {
                throw new UnsupportedOperationException("Not supported yet.");
            }

            @Override
            public Version getVersion() {
                throw new UnsupportedOperationException("Not supported yet.");
            }

            @Override
            protected JavaRDD<SimpleRecord> execute(JavaSparkTransformContext sparkTransformContext) {
                return sparkTransformContext.getInputCollectionRDDs().get("input");
            }
       };

       actual = javaSparkTransform.execute(sparkTransformContext);
    }

For a complete description of the Spark Java APIs that are supported see the Spark Java Docs at:  https://spark.apache.org/docs/latest/api/java/index.html


Custom Transforms Code Examples
-------------------------------

This code example is provided as a bootstrap to developing your own 'custom transform'. The 'companyTransform' class presented here can be used as a template.

Custom Transform Example::

    package com.company.transform;

    import com.koverse.sdk.data.Parameter;
    import com.koverse.sdk.data.Record;
    import com.koverse.sdk.data.TermTypeDetector;
    import com.koverse.sdk.transform.AbstractRecordMapStage;
    import com.koverse.sdk.transform.AbstractReduceStage;
    import com.koverse.sdk.transform.AbstractTransform;
    import com.koverse.sdk.transform.TransformStage;

    import java.io.DataInput;
    import java.io.DataOutput;
    import java.io.IOException;
    import java.net.InetAddress;
    import java.util.ArrayList;
    import java.util.HashMap;
    import java.util.Iterator;
    import java.util.List;
    import java.util.Map;

    import org.apache.hadoop.io.Text;
    import org.apache.hadoop.io.Writable;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;

    import java.util.Map.Entry;

    public class CompanyTransform extends AbstractTransform {

    private static Logger logger = LoggerFactory
   		 .getLogger(CompanyTransform.class);

    public static class CompanyCustomValue implements Writable {

   	 public String companyCustomValue;

   	 public CompanyCustomValue() {
   	 }

   	 public CompanyCustomValue(String myCustomValue) {
   		 this.companyCustomValue = myCustomValue;
   	 }

        @Override
   	 public void write(DataOutput out) throws IOException {
   		 out.writeUTF(companyCustomValue);
   	 }

   	 @Override
   	 public void readFields(DataInput in) throws IOException {
   		 companyCustomValue = in.readUTF();
   	 }
    }

    private static final String PARAM_MY_CUSTOM = "myCustomParam";

    public CompanyTransform() {
    } // Necessary for Hadoop

    public static class CompanyCustomMapStage extends AbstractRecordMapStage {

   	 private String companyCustomParam = null;

   	 /**
   	  * Perform Mapper setup here. Read parameters, setup data structures,
   	  * etc
   	  */
   	 @Override
   	 public void setup() {
   		 companyCustomParam = getStageContext().getParameterValue(
   				 PARAM_MY_CUSTOM);
   	 }

   	 /*
   	  * This mapper will takes in a list of IP address for each record and
   	  * create all unique combinations in any direction i.e.
   	  * 127.0.0.1,255.255.255.255 is the same as 255.255.255.255, 127.0.0.1
   	  */
   	 public void map(Record inputRecord) throws IOException,
   			 InterruptedException {

   		 HashMap<String, ArrayList<String>> mapOfIps = new HashMap<String, ArrayList<String>>();

   		 ArrayList<String> ipsArrayList = new ArrayList<String>();

   		 // System.out.println("********This is the mapper running!*********");

   		 for (Entry<String, Object> fields : inputRecord.fields.entrySet()) {

   			 Object value = inputRecord.get(fields.getKey());

   			 // Get the record value and nested values
   			 checkIP(value, ipsArrayList);

   		 }

   		 // call to get unique pairs
   		 uniquePairs(ipsArrayList, mapOfIps);

   		 /*
   		  * emit resulting map using key and custom class in the format of
   		  * {"127.0.0.1,255.255.255.255", count} The sort and group function
   		  * will then combine all identical keys and create larger lists,
   		  * which are then sent to reducer to do the final count for each
   		  * grouping
   		  */
   		 CompanyCustomValue myCustomValueClass = null;

   		 for (Entry<String, ArrayList<String>> fields : mapOfIps.entrySet()) {

   			 // System.out.println("this is the new data structure");

   			 String key = fields.getKey();

   			 ArrayList<String> ips = (ArrayList<String>) mapOfIps.get(key);

   			 // System.out.println("for emit new key is:" + key);

   			 myCustomValueClass = new CompanyCustomValue(
   					 Integer.toString(ips.size()));

   			 getStageContext().emit(new Text(key.toString()),
   					 myCustomValueClass);
   		 }
   	 }

        @Override
   	 public Class<Text> getMapOutputKeyClass() {
   		 return Text.class;
   	 }

   	 @Override
   	 public Class<CompanyCustomValue> getMapOutputValueClass() {
   		 return CompanyCustomValue.class;
   	 }

   	 // recursive function takes record and then continues to iterate through
   	 public void checkIP(Object value, ArrayList<String> ipsArrayList) {
   		 if (value instanceof List) {

   			 try {
   				 Iterator<?> iterator = ((List<?>) value).iterator();

   				 while (iterator.hasNext()) {
   					 Object listValue = (Object) iterator.next();
   					 checkIP(listValue, ipsArrayList);

   				 }

   				 // System.out.println("this value is instance of list");

   			 } catch (Exception e) {
   				 e.printStackTrace();
   			 }

   		 } else if (value instanceof Map) {

   			 try {

   				 Map<?, ?> result = (Map<?, ?>) value;

   				 Iterator<?> iterator = result.keySet().iterator();

   				 while (iterator.hasNext()) {
   					 Object resultValue = result.get(iterator.next());

   					 checkIP(resultValue, ipsArrayList);
   				 }

   				 // System.out.println("this value is instance of map");

   			 } catch (Exception e) {
   				 e.printStackTrace();
   			 }

   		 } else if (value instanceof InetAddress) {
   			 ipsArrayList.add(((InetAddress) value).getHostAddress());

   			 // System.out.println("check it is INET:" + ((InetAddress)
   			 // value).getHostAddress());

   		 } else if (value instanceof String) {

   			 String removedSlash = ((String) value).replace("/", "");

   			 if (TermTypeDetector.typify(removedSlash) instanceof InetAddress) {
   				 ipsArrayList.add(removedSlash);
   			 } else {
   				 // System.out.println("This is not INET!:" + removedSlash);
   			 }
   		 }
   	 }

         public void uniquePairs(ArrayList<String> ipsArrayList,
   			 HashMap<String, ArrayList<String>> mapOfIps) {

   		 // go through list and build unique ip address pairs
   		 String ipAddress = "";
   		 String ipAddress2 = "";
   		 String pair = "";

   		 ArrayList<String> pairs = new ArrayList<String>();

   		 for (int i = 0; i < ipsArrayList.size(); i++) {
   			 ipAddress = (String) ipsArrayList.get(i);

   			 for (int j = i; j < ipsArrayList.size(); j++) {
   				 if (j == i)
   					 continue;

   				 ipAddress2 = (String) ipsArrayList.get(j);

   				 pair = ipAddress + "," + ipAddress2;

   				 // System.out.println(pair);

   				 pairs.add(pair);
   			 }

   		 }

   		 // take unique list of pairs that is any directional and build a
   		 // HashMap with ArrayList of ip pairs
   		 for (int i = 0; i < pairs.size(); i++) {
   			 String testPair = (String) pairs.get(i);

   			 String[] indIps = testPair.split(",");
   			 String firstPart = (String) indIps[0];
   			 String secondPart = (String) indIps[1];
   			 String testReversePair = secondPart + "," + firstPart;

   			 if (mapOfIps.get(testPair) != null) {
   				 ArrayList<String> testList = (ArrayList<String>) mapOfIps
   						 .get(testPair);
   				 testList.add(testPair);
   			 } else if (mapOfIps.get(testReversePair) != null) {
   				 ArrayList<String> testList = (ArrayList<String>) mapOfIps
   						 .get(testReversePair);
   				 testList.add(testReversePair);
   			 } else {
   				 ArrayList<String> testList = new ArrayList<String>();
   				 testList.add(testPair);
   				 mapOfIps.put(testPair, testList);
   			 }

   		 }

   	 }

    }

    /*
     * The reduce will count all of the ip pairs and write them through Record.
     * The count for each grouping will occur and then records will be written
     * out independent of other reduce tasks.
     */
    public static class CompanyCustomReduceStage extends AbstractReduceStage {

   	 private String companyCustomParam;

   	 /** Perform setup here */
   	 public void setup() {
   		 companyCustomParam = getStageContext().getParameterValue(
   				 PARAM_MY_CUSTOM);
   	 }

   	 /** Perform main work here */
   	 @Override
   	 public void reduce(Object feature, Iterable<Object> entities)
   			 throws IOException {

   		 // System.out.println("******This is the reduce running!*******");

   		 // System.out.println("feature: " + feature.toString());

   		 Iterator<Object> i = entities.iterator();

   		 int mergedCount = 0;

   		 while (i.hasNext()) {
   			 CompanyCustomValue count = (CompanyCustomValue) i.next();

   			 mergedCount += Integer.parseInt(count.companyCustomValue);

   			 // System.out.println("count: " + count.companyCustomValue);
   			 // System.out.println("merge count: " + mergedCount);

   		 }

   		 String[] splitIPs = feature.toString().split(",");
   		 ArrayList<String> listIPs = new ArrayList<String>();

   		 for (int l = 0; l < splitIPs.length; l++) {
   			 listIPs.add("/" + splitIPs[l]);
   		 }

   		 Record myCustomRecord = new Record();
   		 myCustomRecord.addField("IP_ADDRESS", listIPs);
   		 myCustomRecord.addField("count", mergedCount);

   		 try {
   			 // Write the record to the data store, if this is the last stage
   			 getStageContext().writeRecord(myCustomRecord);

   		 } catch (InterruptedException e) {
   			 logger.error(e.getMessage(), e);
   		 }

   	 }

   	 public Class<Text> getMapOutputKeyClass() {
   		 return Text.class;
   	 }

   	 public Class<CompanyCustomValue> getMapOutputValueClass() {
   		 return CompanyCustomValue.class;
   	 }

    }

    @Override
    protected void fillInParameters(List<Parameter> parameters) {
   	 // Add custom parameters
   	 parameters.add(new Parameter(PARAM_MY_CUSTOM, "Custom Parameter",
   			 Parameter.TYPE_STRING));
    }

    @Override
    public String getName() {
   	 return "Company IP Address Transform";
    }

    @Override
    public String getJobTypeId() {
   	 return "companyTransform";
    }

    @Override
    protected void fillInStages(List<Class<? extends TransformStage>> stages) {
   	 /**
   	  * Add all stages in order here
   	  */
   	 stages.add(CompanyCustomMapStage.class);
   	 stages.add(CompanyCustomReduceStage.class);
    }

    @Override
    public String getVersion() {
   	 return "1.0.0";
    }
  }

Aggregations
------------
Aggregations are configured on a Data Collection so that custom statistics on Records in the Collection can be maintained over time. Aggregations are pre-computed on the Records
in a Data Collection so that they can be queried with sub-second response time, regardless of the number of Records in a collection.
Unlike Transforms which output new immutable Records, Aggregations can update previous values as they run, for instance updating the count of some event in a period of time.
This characteristic makes Aggregations a perfect solution for use cases like analytics dashboards. The sections below will go into more detail of how Aggregations are configured
and then queried, in the context of a web log analytics use case.

Example Aggregations Use Case
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
While certainly not required, Aggregations are often used in conjunction with streaming Imports to maintain near real-time statistics on a constant stream of Records.
In this example, assume web log events are streaming into Koverse via a Kafka Source. These web log event Records look like the following JSON::

  {
    timestamp: 1440785470000
    userId: 4581
    location: "Denver, CO, USA"
    url: "/docs/index.html"
  }

The fields in these Records are:
  * timestamp: UNIX timestamp in milliseconds
  * userId: unique integer id field for the logged in user
  * location: string denoting the city, state, and country of the user
  * url: the page requested

The questions we want to answer are:
  #. How many requests per minute is the web site receiving?
  #. How many unique users are visiting the site each day?
  #. How many unique users are visiting the site each day by country?

Creating Aggregations
^^^^^^^^^^^^^^^^^^^^^
Aggregations can be created in two ways:
 #. Using the Aggregation Workbench App at /Koverse/apps/aggregationworkbench
 #. Creating a JSON configuration file that is automatically loaded from *$KOVERSE_SERVER_HOME/conf/load-every-time*

The image below shows how to create an Aggregation using the Aggregation Workbench App.

.. image:: /_static/AggregationsScreenshots/aggregation-workbench.png
	:height: 408 px
	:width: 800 px

The steps to using the app are:
 #. Select the Data Collection you want to create an Aggregation on
 #. Set a Display Name that describes the Aggregation
 #. Write your Aggregation Script. The Aggregation script is a Scala DSL that defines how Aggregations are built on the Records in the Data Collection. More detail is provided below.
 #. Click the Add Aggregation button. This will save the Aggregation and create an Aggregation job to process any existing Records in the Data Collection.

The alternative way of creating Aggregations is through a JSON configuration file that is loaded by Koverse Server. The Aggregation seen in the screenshot above
would look like the following JSON::

  {
    "aggregates": [
      {
        "dataCollection" : {
          "name": "web logs"
        },
        "configurationOptions": {},
        "displayName": "timeseries",
        "tags":[""],
        "definition":"import com.koverse.aggregation.dsl._\nimport com.koverse.aggregation.dsl.AggregateUtil._\nimport scala.collection.JavaConversions\n\nAggregate()\n  .prepare(FieldPreparer(\"timestamp\", \"1mBin\", BinTimestampByMinuteTimestamp()))\n  .onKeys((\"1mBin\"))\n  .producing(Count())"
      }
    ]
  }

The most important part is the Aggregation Script/definition. It is described in sections below.

These imports should be at the beginning of every script. The Aggregation Script is compiled on the server when it is saved, so add additional imports that would be required for the Scala code to compile as needed.
Currently Aggergations don't support the use of 3rd party libraries, so only imports from standard Java and Scala packages are supported::

  import com.koverse.aggregation.dsl._
  import com.koverse.aggregation.dsl.AggregateUtil._
  import scala.collection.JavaConversions

The creation and configuration of a *com.koverse.aggregation.dsl.Aggregate* object forms the body of the code::

  Aggregate()
  .prepare(FieldPreparer("timestamp", "1mBin", BinTimestampByMinuteTimestamp()))
  .onKeys(("1mBin"))
  .producing(Count())

The *prepare* method allows you to create new fields in your Records for the purpose of using them as dimensions in the following *onKeys* method. This doesn't actually add new fields to your Records stored in Koverse, but creates temporary fields just for the Aggregation.
The *prepare* method takes 0 or more *FieldPreparers* which map an existing field from the Records, in this case "timestamp", to a new field, in this case "1mBin", by applying the Function found in the final argument, in this case *BinTimestampByMinuteTimestamp()*::

  .prepare(FieldPreparer("timestamp", "1mBin", BinTimestampByMinuteTimestamp()))

The *onKeys* method provides the dimensions to build the Aggregation on. This is similar to a GROUP BY in SQL. There can be more than one field name listed as dimensions as seen in additional examples below::

  .onKeys(("1mBin"))

The *producing* method lists the Aggregation function(s) to apply to each Record::

  .producing(Count())

To summarize this example, the UNIX timestamp of each Record is mapped into 1-minute bins, and then the number of Records within each 1-minute bin is counted::

FieldPreparer
^^^^^^^^^^^^^
As seen in the example above, the *prepare* method takes 0 or more *FieldPreparers*. The definition of the *FieldPreparer* class looks like::

  class FieldPreparer[I: ClassTag, O](inputFieldName: String, outputFieldName: String, function: Function1[I, Option[O]]) extends Preparer

The first two parameters are straightforward, the name of the existing field in the Record and the name of the new field that will be created, respectively. The last argument is a function that does the projection
from the value of inputFieldName to the value for outputFieldName. The system uses the type information to only apply the function if the input value is of type **I**. For example, if you pass in the function::

  .prepare(FieldPreparer("text", "textLength", { text: java.lang.String => Some(text.length()) })

then the FieldPreparer will only operate on input values of type *java.lang.String*. This is helpful if your Records have different typed values for the same inputFieldName.

There are several off-the-shelf functions you can drop into FieldPreparers, for example the *BinTimestampByMinuteTimestamp()* is an off-the-shelf function for taking an input UNIX timestamp and rounding it down to the minute and returning that UNIX timestamp. This function, as well as others like *BinTimestampByHourTimestamp()*, are useful for binning events for timeseries analysis.
Below is a table documenting the existing functions that may be dropped into a *FieldPreparer*

==========================================================                   ==================  ==================================   ========================
Object Name                                                                   Input Type          Output Type                         Description
==========================================================                   ==================  ==================================   ========================
BinTimestampByMinuteTimestamp()                                               java.lang.Long      java.lang.Long                      Rounds UNIX timestamp down to the minute
BinTimestampByNMinuteTimestamp(n: Long)                                       java.lang.Long      java.lang.Long                      Rounds UNIX timestamp down to the Nth minute
BinTimestampByHourTimestamp()                                                 java.lang.Long      java.lang.Long                      Rounds UNIX timestamp down to the hour
BinTimestampByDayTimestamp(tz: Option[TimeZone] = None)                       java.lang.Long      java.lang.Long                      Rounds UNIX timestamp down to the day. TimeZone is optional. Default to GMT
BinTimestampByMonthTimestamp(tz: Option[TimeZone] = None)                     java.lang.Long      java.lang.Long                      Rounds UNIX timestamp down to the month. TimeZone is optional. Default to GMT
BinDateByMinute(tz: Option[TimeZone] = None)                                  java.util.Date      java.lang.String                    Formats date into yyyy_MM_dd_HH_mm. TimeZone is optional. Default to GMT
BinDateByHour(tz: Option[TimeZone] = None)                                    java.util.Date      java.lang.String                    Formats date into yyyy_MM_dd_HH. TimeZone is optional. Default to GMT
BinDateByDay(tz: Option[TimeZone] = None)                                     java.util.Date      java.lang.String                    Formats date into yyyy_MM_dd. TimeZone is optional. Default to GMT
BinDateByMonth(tz: Option[TimeZone] = None)                                   java.util.Date      java.lang.String                    Formats date into yyyy_MM. TimeZone is optional. Default to GMT
BinDateByYear(tz: Option[TimeZone] = None)                                    java.util.Date      java.lang.String                    Formats date into yyyy. TimeZone is optional. Default to GMT
Tokenize(regex: String)                                                       java.lang.String    java.util.List[java.lang.String]    Splits input String by the supplied regex
==========================================================                   ==================  ==================================   ========================

You can also write your own and pass it in as an anonymous function as was seen in the String length example above. Remember the return value of the function is an *Option* which can be used in case your function can't or doesn't want to return a value.
The input and output types of these functions must be ones that are supported by Koverse Records.

Aggregation Functions
^^^^^^^^^^^^^^^^^^^^^

In the example above, we saw the aggregation function *Count()*. Counting, while the most popular, is certainly not the only aggregation function. The table below describes each of the available aggregation functions. Currently there is no means for supplying User Defined Aggregation Functions (UDAF).

===================================   =============================
Function                              Description
===================================   =============================
Count()                               Counts the number of Records
CountMap(field: String)               Builds a Map[String, Long] with keys being the Record's value (as a String) for the given field, and the value being the count. For example, we could have CountMap("url") which would maintain a single aggregate value with the counts for each URL instead of maintaining seperate counts for each URL. The benefit is that all the counts are kept together and all of the keys are enumerated. The drawback is that if you have too many distinct keys (>1000s), this Map will grow too large.
TopK(field: String)                   Similar to CountMap, but an approximate Top-K, so it won't store all keys and counts so it is safe to use when the number of keys is very large. It will return the top-25.
SumInteger(field: String)             Sums the integer values for the given field.
SumDecimal(field: String)             Sums the decimal values for the given field.
Min(field: String)                    Maintains the minimum numeric value for the given field
Max(field: String)                    Maintains the maximum numeric value for the given field
Average(field: String)                Calculates the average over the numeric values for the given field
StringSet(field: String)              Maintains a Set of the distinct values for the given field
CardinalityEstimate(field: String)    Estimates the cardinality of the values for the given field. This uses the HyperLogLog+ algorithm internally.
QuantileEstimate(field: String)       Estimates the distribution of the values for the given field. Returns the follow percentiles: .01%, .1%, 1%, 2%, 5%, 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 95%, 98%, 99%, 99.9%, 99.99%
===================================   =============================

Additional Examples
^^^^^^^^^^^^^^^^^^^
The first example answered the question, "How many requests per minute is the web site receiving?" by counting events in 1-minute bins. Below you can find the Aggregations for the second and third questions we wanted to answer in this web log analytic use case.

"How many unique users are visiting the site each day?"::

  import com.koverse.aggregation.dsl._
  import com.koverse.aggregation.dsl.AggregateUtil._
  import scala.collection.JavaConversions

  Aggregate()
    .prepare(FieldPreparer("timestamp", "1dBin", BinTimestampByDayTimestamp(java.util.TimeZone.getTimeZone("EST"))))
    .onKeys(("1dBin"))
    .producing(CardinalityEstimate("userId"))

In the example above, we round the timestamp down to the day, based on the EST timezone. This will group all of the events that happened on the same day, and then use the CardinalityEstimate to get the approximate number of distinct users.

"How many unique users are visiting the site each day by country?"::

  import com.koverse.aggregation.dsl._
  import com.koverse.aggregation.dsl.AggregateUtil._
  import scala.collection.JavaConversions

  Aggregate()
    .prepare(FieldPreparer("timestamp", "1dBin", BinTimestampByDayTimestamp(java.util.TimeZone.getTimeZone("EST")),
             FieldPreparer("location", "country", { location: String => location.split(raw"\s")(2) })))
    .onKeys(("1dBin", "country"))
    .producing(CardinalityEstimate("userId"))

In the example above, we create the same 1-day bins, but also add second dimension which is the Country, parsed from the Record's location field. The parsing here is simplified and has no error handling for brevity.

Aggregation Query API
^^^^^^^^^^^^^^^^^^^^^
The sections above have gone into detail about how to configure Aggregations on the Records in a Data Collection. As originally stated, the primary use case for
Aggregations is to maintain precomputed statistics over time to support interactive (sub-second) queries from applications such as analytic dashboards. This section
will provide detail on the query API. The REST API will be discussed, but a Thrift API is also available and is very similar.

Queries are submitted via HTTP POST requests to /Koverse/api/query/aggregate. The Content-Type header should be set to "application/json". An example query for the first example above might look like::

  {
    "collectionId":"web_logs_20150828_212035_291",
    "dimensionValuesPairs":[
      {
        "dimensionValues":[{"field":"1mBin","value":"1440785460000"}],
        "producer":{"type":"count"}
      }
    ],
    "generateTotal":true,
  }

This will query the web log Data Collection for the event count in the 1-min bin of 1440785460000. This would have been the events that occured between 18:11:00 and 18:12:00 GMT on Fri, 28 Aug 2015.
The dimensionValuesPairs property is an array so a single query may contain many dimensionValues which enables you to batch requests which can be useful when pulling the data for a timeseries graph for example.
There currently is no range query, so instead you would batch together all of the 1mBin values that you need to render your graph. The requests are also batched on the server so this ends up being fast even if your
query has 100s of dimensionValues.

Below we show another query, but this one is for the 3rd Aggregation example from above, the number of unique users per country per day::

  {
    "collectionId":"web_logs_20150828_212035_291",
    "dimensionValuesPairs":[
      {
        "dimensionValues":[{"field":"1dBin","value":"1441166400000"}, {"field":"country", "value":"USA"}],
        "producer":{"type":"cardest", "relation":"userId"}
      }
    ],
    "generateTotal":true,
  }

Here we see how the field (or relation) is specified in conjunction with the aggregation function. We also see how additional dimensions can be added to the query easily.
Below is a table mapping the Scala aggregation function to the type used in the query API.

==========================          ==============
Function                            Type String
==========================          ==============
Count                               count
CountMap                            countmap
TopK                                topk
SumInteger                          sumint
SumDecimal                          sumdec
Min                                 min
Max                                 max
Average                             ave
StringSet                           set
CardinalityEstimate                 cardest
QuantileEstimate                    quantest
==========================          ==============

The generateTotal property above enables the query to request a final reduction on the server for when the query returns more than one value. This can be very useful in certain cases where the client can't perform the reduction itself. For example, you could aggregate and query for the individual event counts for each day of a week and then add these values together on the client to get a total number of events for the week. What if you were trying to get the total number of unique users for the week? You are likely to get a very wrong answer if you simply add up the unique users for each day of the week as the same users may access the web site on several days during the week. By requesting the final reduction on the server, it can properly merge the data structures that hold the cardinality estimates and then return the total.

The query response looks very similar to the query, but with values::

  {
    "recordCountEstimate": 0,
    "responseTime": 0,
    "success": true,
    "recordsWritten": 0,
    "aggregateQueryResult": {
        "collectionId": "web_logs_20150828_212035_291",
        "aggregateValues": [
            {
                "dimensionValuesProducerPair": {
                    "dimensionValues": [
                        {
                            "field": "1mBin",
                            "value": "1440785460000"
                        }
                    ],
                    "producer": {
                        "type": "count"
                    }
                },
                "value": "3"
            }
        ],
        "total": "38",
        "lastAggregationExecuted": 1440797400467
    }
  }

Here we see there were 38 events for the 1-minute bin that was queried. The query response also shows the last time an aggregation job was run and completed, which provides a "freshness" to the results.


Using Python with Koverse
-------------------------
Python is a popular interpreted programming language.

Koverse ships with a Python client to allow Python scripts to access the Koverse API.

The Koverse Python client uses Apache Thrift to communicate with the Koverse server. It is possible to generate clients for other languages as well.

To use the Koverse Python client, do the following::

 sudo pip install koverse
 Downloading/unpacking koverse
  Downloading koverse-1.4.0-py2.py3-none-any.whl (144kB): 144kB downloaded
 Requirement already satisfied (use --upgrade to upgrade): thrift in /Library/Python/2.7/site-packages (from koverse)
 Requirement already satisfied (use --upgrade to upgrade): kafka-python in /Library/Python/2.7/site-packages (from koverse)
 Requirement already satisfied (use --upgrade to upgrade): six in /Library/Python/2.7/site-packages (from kafka-python->koverse)
 Installing collected packages: koverse
 Successfully installed koverse
 Cleaning up...

The Koverse Python client can then be used in Python scripts by importing the koverse module::

 $ python
 Python 2.7.6 (default, Sep  9 2014, 15:04:36)
 [GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.39)] on darwin
 Type "help", "copyright", "credits" or "license" for more information.
 >>> from koverse import client

Connecting to the Koverse Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Python client can connect to the hostname of the Koverse Server (note: this is not the address of the Koverse Web App).::

 >>> client.connect('localhost')

If for some reason the client loses the connection to the Koverse Server, such as when the Koverse Server is restarted, the client can reconnect simply by calling client.connect() again.

Users can authenticate themselves to the Koverse server using their username and base-64 encoded passwords::

 >>> import base64
 >>> client.authenticateUser('myusername', base64.b64encode('mypassword'))
 >>>

If the authentication is unsuccessful an exception is raised::

 Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/Library/Python/2.7/site-packages/koverse/client.py", line 93, in authenticateUser
    tUser = ugClient.authenticateUser(auth, None, parameters)
  File "/Library/Python/2.7/site-packages/koverse/thriftgen/usergroup/UserGroupService.py", line 782, in authenticateUser
    return self.recv_authenticateUser()
  File "/Library/Python/2.7/site-packages/koverse/thriftgen/usergroup/UserGroupService.py", line 807, in recv_authenticateUser
    raise result.ke
 koverse.thriftgen.ttypes.TKoverseException: TKoverseException(_message='No authenticated user found')

Querying Koverse Collections
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Koverse Python client can be used to interactively query collections, fetch samples, create collections and run transforms.

To query one or more collections, use the client's query() method. In this example, we'll query Koverse for any collection that has a value above 100 in a field named 'Close'.::

 >>> results = client.query({'Close': {'$gt': 100.0}})
 >>> len(results)
 736

Results are returned as a list of Python dicts, each representing a record from a Koverse collection::

 >>> import pprint
 >>> pprint.pprint(results[0])
 {'AdjClose': 34.9,
  'Close': 256.88,
  'Date': time.struct_time(tm_year=42304, tm_mon=11, tm_mday=6, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=6, tm_yday=311, tm_isdst=0),
  'High': 267.88,
  'Low': 199.25,
  'Open': 263.84,
  'Volume': 236228300}

Koverse records contain fields and values. Values may be of a simple type such as int and date, but may also contain lists or dicts.

To query a specific set of collections, specify an optional parameter with a list of collection names to query::

 >>> client.query({'Close': {'$gt': 100.0}}, ['stocks'])

or, by using the name parameter 'collections'::

 >>> client.query({'Close': {'$gt': 100.0}}, collections=['stocks'])

Clients can also request that the results be limited to a set number, and can request that the Koverse server deliver results beginning at a specified offset. For example::

 >>> client.query({'Close': {'$gt': 100.0}}, collections=['stocks'], limit=10, offset=100)

Clients can also request that the Koverse Server return only a subset of the fields in each record by specifying a list of field names to include::

 >>> pprint.pprint(client.query({'Close': {'$gt': 100.0}}, collections=['stocks'], limit=10, offset=100, fields=['Close']))
 [{'Close': 110.88},
  {'Close': 111.56},
  {'Close': 111.25},
  {'Close': 110.75},
  {'Close': 111.63},
  {'Close': 111.25},
  {'Close': 111.5},
  {'Close': 111.25},
  {'Close': 111.5},
  {'Close': 111.5}]

Fetching Collection Samples
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Because Python runs on a single machine, and because Koverse collections may contain a large volume of records, it can be useful to
work with a sample of a collection's records, especially when building statistical models designed to be trained on a representative sample.

Koverse maintains representative samples for all collections by default. These samples can be retrieved by the client using the getSamples() method::

 >>> samples = client.getSamples('stocks')
 >>> len(samples)
 1000



Uploading resource files
^^^^^^^^^^^^^^^^^^^^^^^^

One advantage of Python is that is has a number of well supported libraries for doing
sophisticated data analysis , such as numpy (http://www.numpy.org), scipy (http://www.scipy.org),
nltk for natural language processing (http://nltk.org),
pandas for data manipulation and analysis http://pandas.pydata.org,
scikit-learn for machine learning (http://scikit-learn.org/stable/), etc.

For this simple example, we'll model the distribution of day to day changes in stock prices so we can identify anomalous jumps or dips in price.
We can pull a sample of the stock prices from Koverse using the getSamples() method::

 >>> samples = client.getSamples('stocks')

We'll model the day-to-day changes in price as a gaussian random walk (https://en.wikipedia.org/wiki/Random_walk#Gaussian_random_walk).::

 >>> differences = [r['Close'] - r['Open'] for r in samples]
 >>> import numpy
 >>> mean = numpy.mean(differences)
 >>> mean
 -0.085472972972972849
 >>> stddev = numpy.std(differences)
 >>> stddev
 8.6134268092274517

Now we'll store our 'model', which just consists of these two numbers, the mean and standard deviation, in a file that we can upload and use in a transform.
Typically we wouldn't do this for such a simple model, we could pass those numbers as parameters to a transform. But for more complicated models using a file is much more convenient.
The storeResourceFile() method will upload the model data to a file in HDFS so that it can be accessed by workers in parallel::

 >>> import cPickle
 >>> modelData = base64.b64encode(cPickle.dumps((mean, stddev)))
 >>> modelFilename = client.storeResourceFile('model1',modelData)
 >>> modelFilename
 '1438664105966model1'

Note: we used the numpy package to obtain these parameters, which means numpy must also be installed on our MapReduce worker nodes.

The storeResourceFile() method returns a unique filename that Transform scripts can reference.
Now we can use it to score all the daily changes in price to look for anomalous changes, for example: changes that are greater than two standard deviations from the mean.
We'll do that in the next section.

Developing an XML Transform (XSLT) to import your XML data as Koverse Records
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

XML can be imported into Koverse as any file can.  However, the format of the imported records in the collection may not be what you are expecting, as it is more of a
raw import of generic XML data.  To enable the import of your XML data into proper Koverse records, an XSLT must be used to convert
your XML into proper Koverse Record XML.

For example, let's say you have the following XML file which you wish to import:

.. literalinclude:: /_static/xslt-examples/books-example.xml
	:language: xml

For this example, this XML file would conform to your XML schema (XSD):

.. literalinclude:: /_static/xslt-examples/books-example.xsd
	:language: xml

Now, to transform this XML into XML that represents Koverse records, the following XSLT would be used:

.. literalinclude:: /_static/xslt-examples/books-example.xsl
	:language: xml

Which would produce the following XML file that conforms to the Koverse Record XML Schema:

.. literalinclude:: /_static/xslt-examples/books-example-transformed.xml
	:language: xml

Finally, for your reference, here is the complete Koverse XML Schema:

.. literalinclude:: /_static/xslt-examples/koverse-records.xsd
	:language: xml


Running a Python Script as a Transform
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse supports running Python scripts in Transforms. These transforms are simple map-only transforms.


We'll write our Python script for scoring daily stock changes based on our model.
The list of any resource files included will be passed in as an argument to our script.
In our case, we have one model filename. If there are multiple resource files, they will be separated by commas::

 >>> script = '''
 #/usr/bin/python

 import numpy
 import cPickle
 import base64
 import sys
 import json

 # load our model
 modelFile = sys.argv[1]
 f = open('/tmp/' + modelFile)
 mean, stddev = cPickle.loads(base64.b64decode(f.read()))
 f.close()

 # records from input collections are delivered as JSON objects via stdin
 for line in sys.stdin:

	record = json.loads(line.strip())

	# calculate price change
	change = record['Close'] - record['Open']

	# if change is more than two standard deviations from the mean
	# consider it anomalous and output the record
	if abs(change - mean) / stddev > 2.0:
		print json.dumps(record)
		sys.stdout.flush()

 '''

Be sure to call sys.stdout.flush() after outputting a new record.

Any libraries our script needs to use should be installed on all the MapReduce worker nodes before hand.
Care should be taken to ensure the proper versions of libraries are installed.
See instructions on this site https://www.digitalocean.com/community/tutorials/how-to-set-up-python-2-7-6-and-3-3-3-on-centos-6-4 for tips on installing python 2.7 packages on CentOS.

In our example, workers will need the popular numpy package, which can be installed via::

 sudo /usr/local/bin/pip install numpy

once Python 2.7 and pip are installed.

To get a description of a Transform use the getTransformDescription() method. This will tell us the parameters we need to fill out to create a transform.
We're using the Python script Transform that ships with Koverse, identified by the name 'python-transform'::

 >>> desc = client.getTransformDescription('python-transform')
 >>> for param in desc.parameters:
 ...     print param.parameterName + ': ' + param.displayName
 ...
 inputCollection: Input Collection(s)
 outputCollection: Output Collection
 pythonPathParam: Path to Python Executable
 scriptParam: Python script
 resourceFiles: Comma separated resource file paths

The pythonPathParam should reference the path to the Python executable on MapReduce workers. This allows us
to use a particular version of the Python interpreter if necessary.

Define the options we'll pass to our Transform, which includes the Python script and the model filename we stored in the previous section.
We don't need to specify the input and output collections here, we'll do that later in the call to create the transform.::

 >>> options = {
	'pythonPathParam': '/usr/local/bin/python2.7',
	'scriptParam': script,
	'resourceFiles': modelFilename
 }

Create a collection to store the output::

 >>> client.createCollection('anomalous changes')

To setup a transform, use the createTransform() method.::

 >>> transform = client.createTransform(
		'python-transform',
		'score daily changes',
		['stocks'],
		'anomalous changes',
		options)

This returns a Transform object.
To obtain a list of Transforms that have already been created, use the listTransforms() method.

To run the transform we'll use its run() method::

 >>> job = transform.run()

This will instantiate a MapReduce job that executes our Python script on all of the MapReduce worker nodes in parallel.
This way we can process a large amount of data efficiently.

Note that Transforms are configured by default to not run sooner than once per hour. Any jobs submitted earlier than that will be blocked until an hour has passed.

The output will be stored in the output collection we specified.
We can examine a sample of the output to verify our results::

 >>> sampleOutput = client.getSamples('anomalous changes')
 >>> first = sampleOutput[0]
 >>> print first['Close'] - first['Open']
 -22.44

This shows an example of a day when a stock dropped by 22.44 points, which is more than two standard deviations from the typical daily change.

The Python client can also be used in the context of Python tools such as iPython Notebook (http://ipython.org/notebook.html).
Simply use the same methods described above in iPython Notebooks.

Using Koverse with PySpark
--------------------------

PySpark is the name of Apache Spark's Python API and it includes an interactive shell for analyzing large amounts of data with Python and Spark.

Koverse supports processing data from Koverse Collections using PySpark and storing Resilient Distributed Datasets (RDDs) into Koverse Collections.

To use Koverse with PySpark, follow these steps.

Set the following environment variables::

 export SPARK_HOME=[your Spark installation directory]
 export ACCUMULO_HOME=[your Accumulo installation directory]
 export KOVERSE_HOME=[your Koverse installation directory]
 export PYSPARK_PYTHON=/usr/local/bin/python2.7

Copy the following JAR files into a the Spark installation directory::

 cd $SPARK_HOME

 cp $ACCUMULO_HOME/lib/accumulo-core.jar .
 cp $ACCUMULO_HOME/lib/accumulo-fate.jar .
 cp $ACCUMULO_HOME/lib/accumulo-tracer.jar .
 cp $ACCUMULO_HOME/lib/accumulo-trace.jar .
 cp $ACCUMULO_HOME/lib/guava.jar .

 cp $KOVERSE_HOME/lib/koverse-sdk-xml*.jar koverse-sdk-xml.jar
 cp $KOVERSE_HOME/lib/koverse-sdk-1*.jar koverse-sdk.jar
 cp $KOVERSE_HOME/lib/koverse-server-base*.jar koverse-server-base.jar
 cp $KOVERSE_HOME/lib/koverse-shaded-deps*.jar koverse-shaded-deps.jar
 cp $KOVERSE_HOME/lib/koverse-thrift*.jar koverse-thrift.jar


Install Koverse python files.
As described above, the Koverse Python client can be installed using::

 pip install koverse

Start PySpark::

 bin/pyspark --deploy-mode client \
 --jars koverse-sdk.jar,koverse-sdk-xml.jar,koverse-thrift.jar, \
 accumulo-core.jar,guava.jar,accumulo-fate.jar,accumulo-trace.jar, \
 koverse-server-base.jar,koverse-shaded-deps.jar

 Python 2.7.6 (default, Sep  9 2014, 15:04:36)
 [GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.39)] on darwin
 Type "help", "copyright", "credits" or "license" for more information.
 Spark assembly has been built with Hive, including Datanucleus jars on classpath
 Using Spark's default log4j profile: org/apache/spark/log4j-defaults.properties
 Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /__ / .__/\_,_/_/ /_/\_\   version 1.3.0
      /_/

 Using Python version 2.7.6 (default, Sep  9 2014 15:04:36)
 SparkContext available as sc, HiveContext available as sqlCtx.

To access Koverse's Spark functionality import the following::

 >>> from koverse.spark import *

A KoverseSparkContext object is used to obtain Spark RDDs for specified Koverse collections.
Simply pass in the pre-created SparkContext object, the hostname of the Koverse Server, and your username and password::

 >>> import base64
 >>> ksc = KoverseSparkContext(sc, 'localhost', 'username', base64.b64encode('password'))

To get an RDD for a Koverse Collection, call the koverseCollection() method::

 >>> rdd = ksc.koverseCollection('stocks')

This rdd can be used like other RDDs.

 >>> rdd.take(1)
 [{u'Volume': 26765000, u'High': 25.42, u'AdjClose': 25.17, u'Low': 24.46, u'Date': datetime.datetime(2014, 9, 1, 20, 0), u'Close': 25.17, u'Open': 24.94}]

If, for example, we wanted to repeat our previous analysis of this example data set, we could build a model using a few simple functions::

 >>> differences = rdd.map(lambda r: {'Date': r['Date'], 'Change': r['Close'] - r['Open']})

 >>> sum  = differences.map(lambda r: r['Change']).reduce(lambda a, b: a + b)
 >>> mean = sum / differences.count()
 >>> mean
 -0.08547297297297289

 >>> ssq = differences.map(lambda r: (r['Change'] - mean) ** 2).reduce(lambda a, b: a + b)
 >>> var = ssq / differences.count()
 >>> import math
 >>> stddev = math.sqrt(var)
 >>> stddev
 8.613426809227452

Now we can apply our model directly to our differences RDD.

 >>> anomalies = differences.flatMap(lambda r: [r] if (abs(r['Change']) - mean) / stddev > 2.0 else [])
 >>> anomalies.count()
 12
 >>> anomalies.first()
 {'Date': datetime.datetime(1998, 8, 31, 20, 0), 'Change': -22.439999999999998}

Note that, unlike the previous example, here we are not setting up a Koverse Transform which means this analysis workflow will only exist during this PySpark session.
We can persist the output, but if we want to repeat this process we'll need to run these commands again.

If we wish to persist these anomalies in a Koverse collection to that applications and users can access and search these results we can use the saveAsKoverseCollection() method.

 >>> ksc.saveAsKoverseCollection(anomalies, 'anomalies')

This will create a collection called 'anomalies' and store the information from our RDD into it.

If the collection already exists and we wish to simply add new data to it, we can specify append=True

 >>> ksc.saveAsKoverseCollection(anomalies, 'anomalies', append=True)



Using PySpark and iPython Notebook with Koverse
-----------------------------------------------

iPython Notebook is a popular tool for creating Python scripts that can display results and be shared with others.

PySpark can be used in the context of iPython Notebook to create repeatable workflows.

First, follow the steps to configure PySpark to work with Koverse as described in the previous section.

To use Koverse with PySpark and iPython Notebook, create a new iPython profile::

  ipython profile create pyspark

This will create a profile in ~/.ipython/profile_pyspark. In that directory, create a file called ipython_config.py with the following contents::

 c = get_config()

 c.NotebookApp.ip = '*'
 c.NotebookApp.open_browser = False
 c.NotebookApp.port = 8880

Next, in ~/.ipython/profile_pyspark/startup create a file called 00-pyspark-setup.py with the following contents::

 import os
 import sys

 spark_home = os.environ.get('SPARK_HOME', None)
 if not spark_home:
    raise ValueError('SPARK_HOME environment variable is not set')
 sys.path.insert(0, os.path.join(spark_home, 'python'))
 sys.path.insert(0, os.path.join(spark_home, 'python/lib/py4j-0.8.2.1-src.zip'))

 execfile(os.path.join(spark_home, 'python/pyspark/shell.py'))

 from koverse.spark import *


Export the following env vars::

 export SPARK_HOME=[path to your spark installation]

 export PYSPARK_PYTHON=/usr/local/bin/python2.7

 export PYSPARK_SUBMIT_ARGS="--deploy-mode client --jars koverse-sdk.jar,koverse-sdk-xml.jar,koverse-thrift.jar,accumulo-core.jar,guava.jar,accumulo-fate.jar,accumulo-trace.jar,koverse-server-base.jar,koverse-shaded-deps.jar"

 export KOVERSE_HOME=[path to your Koverse installation]


Now iPython Notebook can be started from the Spark installation directory::

 ipython notebook --profile=pyspark

Visit http://localhost:8880 in a web browser to access iPython Notebook and create a new notebook.
In this new notebook, everything should be imported and initialized for us to start using PySpark with Koverse.

Use the same methods described in the previous section on PySpark in iPython notebooks to obtain RDDs from Koverse collections, process them, and persist RDDs to Koverse collections.

.. image:: /_static/PySpark_Notebook.png
	:height: 550 px
	:width: 800 px


Using PySpark and Jupyter with Koverse
--------------------------------------

Jupyter is a development tool that allows users to create notebooks containing comments and code, like iPython Notebook. Jupyter supports other languages via the use of 'kernels'.

To use Jupyter with Koverse and PySpark, first create a kernel.json file in a folder called 'koverse'

Configure the kernel.json file as follows by setting the right value for SPARK_HOME::

 {
  "display_name": "Koverse PySpark",
  "language": "python",
  "argv": [
   "/usr/bin/python",
   "-m",
   "ipykernel",
   "-f",
   "{connection_file}"
  ],
  "env": {
   "SPARK_HOME": "",
   "PYTHONPATH": “$SPARK_HOME/python/:$SPARK_HOME/python/lib/py4j-0.8.2.1-src.zip",
   "PYTHONSTARTUP": “$SPARK_HOME/bin/pyspark",
   "PYSPARK_SUBMIT_ARGS": "--deploy-mode client --jars koverse-sdk.jar,koverse-sdk-xml.jar,koverse-thrift.jar,koverse-server-base.jar,koverse-shaded-deps.jar,accumulo-core.jar,accumulo-fate.jar,accumulo-trace.jar,accumulo-tracer.jar,guava.jar,commons-validator-1.4.0.jar pyspark-shell"
  }
 }


Install the kernel file via the command::

 ipython kernelspec install koverse/

Place the following jars into the $SPARK_HOME folder::

 accumulo-core.jar
 accumulo-trace.jar
 commons-validator-1.4.0.jar
 koverse-sdk-xml.jar
 koverse-server-base.jar
 koverse-thrift.jar
 accumulo-fate.jar
 accumulo-tracer.jar
 guava.jar
 koverse-sdk.jar
 koverse-shaded-deps.jar


Install the Koverse python module via::

 pip install koverse

Then you can fire up Jupyter and create a new notebook using the newly installed Koverse kernel.

In that notebook, you can connect to a Koverse instance via::

 import pyspark
 from koverse.spark import *
 import base64
 sc = SparkContext()
 ksc = KoverseSparkContext(sc, 'localhost', ‘your-username', base64.b64encode(‘your-password’))

You can create an RDD from a Koverse instance as follows, for example::

 rentals = ksc.koverseCollection('Customer Rentals')
 rentals.take(1)

 [{u'email': u'DIANNE.SHELTON@sakilacustomer.org',
   u'first_name': u'DIANNE',
   u'title': u'ACADEMY DINOSAUR'}]

You can process the RDD the same as other Spark RDDs::

 pairs = rentals.map(lambda r: (r['first_name'].lower(), 1))
 nameCount = pairs.reduceByKey(lambda a, b: a + b)
 nameCount.count()
 591
 nameCount.take(1)
 [(u'sheila', 18)]

When you want to write an RDD to Koverse, convert it to be a set of Python dicts and save::

 ncRecords = nameCount.map(lambda nc: {'name': nc[0], 'count': nc[1]})
 ksc.saveAsKoverseCollection(ncRecords, 'name count', append=True)


.. _kov-Glossary:

Glossary of Koverse Terminology
-------------------------------

* Data Collection - Data Collections are the basic container for data in Koverse. You can think of them like tables - but every record in a data collection can be completely unique in structure.
* Configuration Manager App - The Configuration Manager App gives users the ability to upload and download configuration for Data Collections, Sinks, Sources, and Transforms.
* Data Collections App - The Data Collections App gives users the ability to manage and explore Data Collections. A Data Collection is simply a named collection of records. Collections are the primary mechanism by which data is tracked and managed in Koverse.
* Data Flow - Visualize, configure, and execute the movement of data within the Koverse system.
* File Upload - Upload one or more files from the browser and import it into a collection.

:ref:`kov-Introduction`
