Data Set
---------------

Data Sets are the basic container for data in Koverse.
You can think of them like tables - but every record in a Data Set can be completely unique in structure.

A Koverse Data Set is a named set of Records. A Data Set has:

* Configurable indexes to enable queries to quickly and efficiently find Records.

* Permissions to control access to Records in the Data Set.

* Automatically discovered statistics and samples to provide insight into the Records contained in the Data Set.


Data Sources
^^^^^^^^^^^^
A data source is simply the source of the data. It can be a file, a particular database on a DBMS, or even a live data feed. The data might be located on the same computer as the Koverse application, or on another computer somewhere on a network.

Koverse establishes the connection to these data sources and provides the ability to import data in Koverse, breaking the data into records according to the external format of the data (i.e. JSON, XML, CSV, relational records, etc).

Custom sources are only necessary when talking to a new type of server, often using a new protocol. For example, Koverse ships with an FTP source, and and IMAP source. New sources are not necessary simply for new file types and certainly not for specific uses of known physical formats such as a particular type of XML file.

Transforms
^^^^^^^^^^

In Koverse, transforms are a process by which one or more Data Sets leverage re-usable, configurable, multi-stage MapReduce jobs for data manipulation. These are highly scalable and customizable analytics that are reusable across all of your data.

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

Sinks represent external destinations to which Records from Data Sets may be sent. For example, one can write out Records as JSON objects to a remote file system.

Queries
^^^^^^^

Whether developing a Koverse App or building a custom source, Koverse queries conform to a specific format. There are two types of syntax supported: a Lucene-like syntax and a more Object-based structure.

Lucene-like Query Syntax
^^^^^^^^^^^^^^^^^^^^^^^^

These queries are represented as strings and passed as such into query methods. The Lucene query syntax is described on `Apache Lucene <https://lucene.apache.org/core/3_6_2/queryparsersyntax.html>`_


Object-based Queries
^^^^^^^^^^^^^^^^^^^^

+-----------------------------------+-------------------------------------+
|Search Criteria                    | Query Syntax                        |
+===================================+=====================================+
| Searching 'any' field for a value | {$any: fmv}                         |
+-----------------------------------+-------------------------------------+
| Search specific field for a value | {field.name: fmv}                   |
+-----------------------------------+-------------------------------------+
| Search AND                        + {$and: [{$any: fmv}, {$any: blue}]} |
+-----------------------------------+-------------------------------------+
| Search OR                         | {$or: [{$any: fmv}, {$any: blue}]}  |
+-----------------------------------+-------------------------------------+


Range Queries
^^^^^^^^^^^^^

+----------------------------------------+------------------------------------------------------------+
|Search Criteria                         | Query Syntax                                               |
+========================================+============================================================+
| Any value greater than or equal to 160 | {$any: {$gte:160}}                                         |
+----------------------------------------+------------------------------------------------------------+
| Date field less than a specific date   | {date_created: {$lt: "1980-01-01T00:00:00.000Z}}           |
+----------------------------------------+------------------------------------------------------------+
| Geo Range                              + {fieldName: {$box: [[sw-lat, sw-long],[ne-lat, ne-long]]}} |
|                                        |                                                            |
|                                        | {fieldName: {$box :[[39.5, -104.9],[40, -104.5]]}}         |
+----------------------------------------+------------------------------------------------------------+

Note that queries that combine a range with any other criteria, and queries that combine multiple ranges require Composite Indexes on the fields involved. See _CompositeIndexes for information on building these.

Aggregations
^^^^^^^^^^^^^
Aggregations allow you to easily maintain near real-time statistics on the Records in a Data Set. Aggregations run incrementally on new Records to maintain pre-computed, up-to-date results so that they can always be queried with sub-second latency.


.. _quick-start-java-project:

Quick Start Java Project
------------------------

Koverse ships with a koverse-sdk-project-<version>.zip file that contains an example `Maven <http://maven.apache.org>`_ based Java project. This project defines some simple custom sources, sinks, transforms, and apps. The maven pom.xml file in this project builds
an `Addon` that can be uploaded. Simply alter the Java and HTML/JS code in this project, then build and deploy the addon to Koverse.

GitHub Koverse SDK Project
^^^^^^^^^^^^^^^^^^^^^^^^^^^
Visit `Koverse SDK Project <https://github.com/Koverse/koverse-sdk-project/tree/1.4/>`_ to fork or download the latest koverse-sdk-project for your version of Koverse.

.. _koverse-archetype-project:

Koverse SDK Project Maven Archetype
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
