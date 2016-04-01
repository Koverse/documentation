:tocdepth: 2


Introduction to Koverse
=======================


Overview
^^^^^^^^^

Koverse is a scalable and secure platform designed for quickly and efficiently discovering the value of your data and incorporating derived insights into daily operations. Koverse is not designed around the problem set of a traditional database. Instead, Koverse enables new paradigms of ingest, processing, and query speeds at massive scale. Koverse provides the capability for organizations to become data-driven; using data to make better decisions and find new opportunities.


The Koverse Advantage
^^^^^^^^^^^^^^^^^^^^^
Koverse, Inc. separates signal from noise for data-driven organizations, turning information overload into an information advantage. We deliver meaningful insights critical for organizations to increase effectiveness in every aspect of business. The Koverse solution consolidates the elements necessary for deriving actionable insight from data:


**Collect:** Universal Ingest allows fast ingest of any data from any source.


**Analyze:** Adaptive Workflows unify disparate data sets and use embedded analytics for immediate insight across the entire organization.


**Act:** Interactive data exploration and discovery makes it easier for business and technical users to quickly find information and extract meaning.


Koverse frees organizations from the time, expense, and risk of cobbling together multiple products and open source technologies to solve their data problems by providing all essential functionality right out of the box. Koverse provides all of this in a scalable, secure multi-tenant environment built on well-established technologies such as Hadoop.


Koverse Logical Architecture
-----------------------------
The logical architecture of the Koverse platform was conceived to lower the barriers to entry that exist for many organizations who want to become data-driven. Big data solutions such as Hadoop and Accumulo are essential to big data success, but do not offer enough on their own to quickly and easily turn data into insights. Koverse fills this gap by building on well-established technologies and providing the additional capabilities that are necessary to deliver meaningful insights.


Below is a diagram of the Koverse platform's logical architecture.  The foundation is formed by Apache Hadoop and Accumulo.  Koverse builds on this foundation, offering built-in applications and analytics, in addition to tools for customers to create custom applications and analytics that support both legacy systems and revolutionary new use cases.


.. figure:: /_static/KoverseLogicalArchitecture.*
	:height: 350 px
	:width: 600 px
	:align: center



	Koverse Logical Architecture

	|
	|

The :ref:`Extensibility` section offers more details about extending built-in Koverse capabilities to meet operational needs.


Physical Architecture
----------------------
Koverse's software components are designed to run on top of Apache Hadoop - which is a scalable stack of software for data processing. Both Hadoop and Koverse's components are designed to allow for small to very large scale-up. Therefore, when describing the physical architecture one must consider that many of these software components are duplicated across many physical machines.


Koverse is comprised of two software components named Koverse Web App and Koverse Server. The Koverse Web App is a traditional Java WAR file that runs in a JBoss server. This webapp provides assets like HTML, Javascript, images, and CSS for web browser based clients. It also provides the REST API end point for third party integrations. The Koverse Webapp communicates with the Koverse Server to service requests for data. The Koverse Server provides the business logic for executing queries, applying data security, and monitoring systems. Koverse Server is a stand-alone Java process. The Koverse Server support 3rd party clients using an Apache Thrift API. 


Koverse runs on Apache Hadoop, and therefore requires the base Hadoop components - which are Jobtracker and Namenode. The Hadoop Jobtracker maintains state around jobs that are executing across the Hadoop cluster, and communicates with many Tasktrackers. The Namenode maintains a file system index for the Hadoop Data File System (HDFS), and communicates with many Datanodes. See http://hadoop.apache.org/ for more information about Hadoop.


Koverse uses Apache Accumulo, which is a key-value NoSQL data store on Hadoop. Accumulo generally has single a "Master" process and many "Tablet Servers". See http://accumulo.apache.org/ for more information about Accumulo.


Koverse uses Apache Kafka for streaming data processing. Kafka is a distributed queue that provides guaranteed processing of data across many nodes. See http://kafka.apache.org/ for more information.


**Network Requirements**

The nodes in a Koverse installation should be connected via dedicated gigabit ethernet with a full bandwidth switching plane. The nodes should be physically and logically network isolated - as they perform network intensive operations.


**DNS Requirements**

Koverse, Hadoop, Accumulo, and Zookeeper have strict DNS requirements that must be met before an installation can begin. The following is a break down of a DNS entry for one physical machine in the Koverse cluster. Note the four part DNS name - where the first (lowest) part of the DNS name is the physical server "hostname", and the second part of the DNS name is the name of the "cluster".


hostname.cluster.domain.tld


Examples:

* koverse1.production.mycompany.com

* control.production.mycompany.com


In addition to external resolution of these DNS entries, the nodes in the cluster must be able to resolve the "hostname". For example, The koverse1 machine must resolve the dns entry for "control" to "control.cluster.mycompany.com". This is done through "search domains" - see the OS documentation for more details. The example search domain above is "production.mycompany.com".


The sections below define the hostnames that must resolve for each node.

**Minimal Koverse Physical Architecture**

This section describes the minimum necessary physical architecture for a distributed Koverse installation. The sections below name and describe the five physical servers in this configuration.


* 'Control' Node

	* Hadoop Namenode & Jobtracker Services

	* Accumulo Master, Monitor, Garbage Collector Services

	* DNS Hostnames: master, jobtracker, namenode

	* 16GB of RAM, 20GB of Disk Storage, 4 CPUs

* 'Koverse' Node

	* Koverse Server & Koverse Webapp

	* DNS Hostnames: koverse1, www

	* 16GB of RAM, 8GB of Disk Storage, 4 CPUs

* 'Worker' Nodes

	* Minimum of three of these nodes

	* Hadoop Datanode and Tasktracker Services

	* Zookeeper Server

		* Only 3 of these nodes should run zookeeper

	* Accumulo Tablet Server and Tablet Logger Services

	* Kafka Service

	* DNS Hostnames:  worker1, worker2, worker3, zoo1, zoo2, zoo3

	* 16GB of RAM, One 8 GB root drive, Four Large (500GB - 2TB) Raw Disks, 4 CPUs



**Production Koverse Physical Architecture**

This section describes the typical physical architecture for a production Koverse installation. The sections below name and describe the physical servers necessary.


* 'Namenode' Node

	* Hadoop Namenode Services

	* DNS Hostnames:  namenode

	* 64GB of RAM, 100GB of Disk Storage, 8 CPUs


* 'Jobtracker' Nodes

	* Hadoop Jobtracker Service

	* DNS Hostnames: jobtracker

	* 64GB of RAM, 100GB of Disk Storage, 8 CPUs

*  'Accumulo Master',

	* Accumulo Master, Monitor, Garbage Collector Services

	* DNS Hostnames: master,

	* 32GB of RAM, 100GB of Disk Storage, 8 CPUs


* 'Koverse' Node

	* Koverse Server & Koverse Webapp

	* DNS Hostnames: koverse1, www

	* 32GB of RAM, 8GB of Disk Storage, 8 CPUs

* 'Zookeeper' Nodes

	* Three of these running zookeeper servers

	* DNS Hostnames: zoo1, zoo2, zoo3

	* 8GB of RAM, One 8 GB root drive, 4 CPUs

* 'Worker' Nodes

	* Minimum of three of these nodes, but more realistically about 10

	* Hadoop Datanode and Tasktracker Services

	* Accumulo Tablet Server and Tablet Logger Services

	* Kafka Service

	* DNS Hostnames:  worker1, worker2, worker3....

	* 64GB of RAM, One 8 GB root drive, Four Large (500GB - 2TB) Raw Disks, 4 CPUs



Security Model
---------------

Security is a fundamental component of the Koverse architecture because it allows Koverse to operate as a multi-tenant system. Multiple users can use the system, but with controlled access to all system resources.  Koverse uses Authentication, Authorization, and Auditing at multiple levels to ensure that the correct users are given access to the correct resources.


**Authentication** is defined in this context as verifying the identity of a user, and **authorization** is granting an authenticated user access to specific resources.  All actions within Koverse are permitted only by authorized users.


**Auditing** is the record-keeping of the actions that distinct users perform over time.  These records can be reviewed to provide further assurance that only authorized users are accessing, or attempting to access, the appropriate resources.


Authentication
^^^^^^^^^^^^^^
Authentication is the first step required in order to access Koverse resources. Access to Koverse resources can be requested either through built-in Koverse web apps, or through direct calls to the Koverse Thrift API.  In both cases, the user is requesting access via a client of the Koverse server, so authentication will occur in the same manner.


Default Koverse Authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The :ref:`DefaultAuthFigure` figure below illustrates the steps which occur to authenticate a user who is requesting access to Koverse resources using the default method of authentication, which consists of a username and password.

.. _DefaultAuthFigure:

.. figure:: /_static/SecurityDiagrams/Koverse-Default-Authentication.*
	:height: 300 px
	:width: 400 px
	:align: center


	Koverse Default Authentication




1. User submits credentials (username and password) to web app.

2. Web app passes username and password to Koverse server.

3. If the password matches what is stored on the Koverse Server for that username, the user is authenticated.  Note that user passwords are stored securely using a salted SHA-256 hash.





Third-Party Authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The :ref:`3rdPartyAuthFigure` diagram shows the steps which occur to authenticate a user who is requesting access to Koverse resources using third-party authentication.


.. _3rdPartyAuthFigure:

.. figure:: /_static/SecurityDiagrams/Koverse-ThirdParty-Authentication.*
	:height: 540 px
	:width: 400 px
	:align: center

	Third-Party Authentication




1. User submits third-party credentials to web app.

2. Web app authenticates to third-party system (identified within Koverse by it's 'Authenticator Type') and, if successful, retrieves user's third-party userID.

3. Web app passes in Authenticator Type, authenticator password, and third-party UserID to Koverse server.

4. If the third-party Authenticator Type and authenticator password match one that is registered with Koverse as a trusted service, the third-party authentication is automatically accepted by Koverse and no further authentication is required.

5. Koverse server stores the third-party UserID and associates it with a Koverse user ID to be used internally to Koverse.


See the :ref:`Extensibility` and :ref:`DeveloperDocumentation` for more information on how to implement Third-Party Authentication and Authorization.


Authorization
^^^^^^^^^^^^^

Koverse maintains the rules for which users have permission to access to which resources.  Once a user has been authenticated, there are two main types of resources a user can request access to in Koverse: 1) The ability to perform administrative actions and 2) the ability to access data in the datastore.  The process of authorization will determine whether access is granted.



Authorization to Perform Administrative Actions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Within Koverse, each user is assigned to one or more groups and each group is granted permissions to perform specific administrative actions, such as the ability to manage data collections, manage user accounts, view audit logs, etc.  More details on configuring user groups can be found in the :ref:`usage-guide`.


Groups may correspond to external user groups assigned by a third-party authorization system, which allows for easy integration when customers already have their users organized into various groups.  In this case, the third-party authorization service is registered with Koverse as a trusted service and all group memberships the service associates with a particular user will be honored by the Koverse Server.


When a user attempts to perform an administrative action, either via built-in Koverse Apps, or via an API call, the Koverse Server will check to see which groups the user is a member of.  The user's attempt will be successful only if the user is a member of a group that has permission to perform the action.



.. figure:: /_static/SecurityDiagrams/Koverse-Administrative-Action.*
	:height: 450 px
	:width: 400 px
	:align: center

	Administrative Action Authorization



Authorization to Access Data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse provides fine-grained access control that allows multiple datasets to coexist in the same datastore without compromising sensitive information.  The fundamental constructs that make up data stored in Koverse are Collections and Records.  Details on these constructs can be found in the :ref:`Data Model` section, but for the purposes of this section, a Record can be thought of as an individual piece of data and a Collection as being made up of all of the Records that belong together as part of some logical dataset.



Each Record is assigned a security label that determines which permissions a user must possess in order to access that Record.  This allows Koverse to control access to Collections in their entirety, in addition to providing even more precise access control on individual Records.



When a Collection is first created, user groups are mapped to have (or not have) permission to read the Collection.  An important point to note is that permission to read a Collection does not guarantee access to read every Record within that collection.  On top of the Collection-level read access granted to user groups, Koverse also honors additional, more restrictive, access controls that may apply to individual Records.  Access to these restricted Records may be granted if a user has additional security tokens provided by a third-party authorization service. This is best illustrated through example:



Data Access Example
^^^^^^^^^^^^^^^^^^^

Suppose an academic institution wants to import all of its research findings into Koverse.  Most of the findings are considered Public and would be shareable with any user.  Some of the findings may be Private and perhaps should only be accessed by the institution's faculty. Another portion of the findings may relate to sensitive topics, such as chemical and biological agents, in which case they will be considered 'Export Controlled Research' and should only be exposed to researchers who are authorized U.S. citizens.  Note that access to this last category of findings need not be restricted to researchers from the originating institution; students or faculty from other institutions who are authorized to access Export Controlled Research should be able to access them as well.



By default, Koverse automatically places all users in the 'Everyone' group. Suppose that the academic institution also has an authorization service that places its users into a 'Student' or 'Faculty' group if applicable.  Furthermore, suppose that there is some Federal authorization service that will provide a registered user with an 'ECR' security token if they are authorized to access Export Controlled Research.  Finally, suppose that both the institutional and the Federal authentication services are registered as trusted services with Koverse.



Consider the following scenarios:



**Scenario 1:** User1 is from an another institution and does *not* have the authority to view Export Controlled Research.

User1 can access non-ECR rows in Public Findings.

.. figure:: /_static/SecurityDiagrams/Koverse-Data-Access-Scenario1.*
	:height: 320 px
	:width: 400 px
	:align: center







**Scenario 2:** User2 is a faculty member who does *not* have the authority to view Export Controlled Research.

User2 can access non-ECR rows in Public and Private Findings.

.. figure:: /_static/SecurityDiagrams/Koverse-Data-Access-Scenario2.*
	:height: 320 px
	:width: 400 px
	:align: center






**Scenario 3:** User3 is a faculty member who has the authority to view Export Controlled Research.

User3 can access all rows in Public and Private Findings.


.. figure:: /_static/SecurityDiagrams/Koverse-Data-Access-Scenario3.*
	:height: 320 px
	:width: 400 px
	:align: center





**Scenario 4:** User4 is from an outside institution and has the authority to view Export Controlled Research.

User4 Can access all rows in Public Findings.


.. figure:: /_static/SecurityDiagrams/Koverse-Data-Access-Scenario4.*
	:height: 320 px
	:width: 400 px
	:align: center







Koverse's fine-grained access controls create an environment that is not only secure, but also ripe for information sharing and cross-corpus analytics.  In the example above, users in scenarios 1 and 4 are allowed access to data that would otherwise be completely unavailable to them.  Equally as exciting is the fact that users in Scenarios 2 and 3 are able to perform queries and analytics across the Public and Private Collections, which would be impossible if the two datasets were physically segregated.


Auditing
^^^^^^^^

Koverse keeps an audit log of user actions.  Examples of actions that are audited are login attempts, queries, and changes to data flow configuration.  The audit log provides an additional layer of assurance that users are not violating, or attempting to violate, the security rules of the system.  Only administrators have access to the audit logs.


.. _BuiltInCapabilities:

Built-In Capabilities
----------------------
Koverse minimizes the amount of custom code that must be written to build big data applications by providing out-of-the-box capabilities for importing, querying, indexing, transforming, displaying, and exporting data, in addition to managing user access. The details of what is included in these powerful built-in capabilities are described below.


Data Collections
^^^^^^^^^^^^^^^^
Data collections in Koverse are comprised of a set of Records. Records can be flat or hierarchical (e.g. a field can contain a list of values). Different records do not have to conform to the same schema. The following operations are automatically available for all data collections:

* Create, delete, and clear collections.

* Manage user access to individual collections.

* Tag collections.

* Lookup by name or tag.

* View count of total number of records in the collection.

* Browse representative samples of each collection.

* Browse details about the fields that exist in the data collection:

	* Field Name

	* Presence - how many times the field appears in the data collection

	* Average size in bytes

	* Estimate of cardinality - how many unique values exist for this field

	* Value types (e.g., string, integer, etc.) and relative frequency of each type

* Configure indexing to refine searchability of the collection.

* View data imports and transforms that affect the collection.


Imports
^^^^^^^
Koverse supports import of data from external data sources.  User access to manage individual sources is configurable.


.. _CommonDataSources:

Built-In Support for Data Sources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse handles the following import sources without requiring any custom code:


* Amazon S3

* Email Account (IMAP)

* File Transfer Protocol (FTP)

* Hadoop File System (HDFS)

* Kafka Queue 0.8

* MS SQL Server

* MySQL

* Newsfeed Source (RSS)

* Random Data (for testing)

* Twitter Streaming

* Twitter Timeline

* URL



Built-In Support for Data Formats
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse automatically parses the following file formats from file-based sources:


* XML

* JSON (either as an array of objects or a single object; each top-level object becomes a record)

* JSONSTREAM (JSON objects separated by newline characters, one record per line)

* CSV

* Text (.txt)

* RTF

* HTML

* Office (Word,PPT,Excel - OLE2 and OOXML versions)

* mbox email files

* PDF

* ePub


Built-In Import-Time Transforms
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse allows some processing to be done at import time. Import-time transforms apply a particular function to each record as it is ingested. Import-time transforms may be chained together.

* **Avro Deserialization** Allows users to deserialize a byte array in an incoming Record using an Avro schema as described by a JSON document provided by the user, and stores a Record structured according to the resulting Avro object.

* **Projection Transform** Allows a user to select a subset of fields to keep from incoming Records. Other fields not specified will be excluded.

* **Separated String Values** Allows a user to split a field containing a single string of separated values with a configurable value delimiter.

* **Uploaded File Processor** An import transform used to process files uploaded via the File Upload application.


Data Discovery
^^^^^^^^^^^^^^

Users can submit queries and get back a set of Records.  Koverse provides the following to support data discovery:


* Users can query one collection, a set of collections at once, or all collections they are authorized to read.

* Queries can be field-specific or can look for values appearing in any field.

* Indexing is controlled via the UI - no code needs to be written.

* Users can search for a range of values.

* Users can search multiple ranges simultaneously (multi-dimensional search) via composite indexes.

* Users can start typing and see suggested query terms (auto-complete).


Koverse automatically recognizes the following value types and will make them discoverable:


* Strings / free form text

* Numbers (integers and reals)

* URLs

* IP addresses

* Geos (lat/lon points)

* Dates

* Byte arrays with mime type


Transforms
^^^^^^^^^^^
Transforms allow users to glean valuable insights from one or more collections and store them in a new collection. They can be run once or set to run automatically. Transforms can be configured to process only new data or reprocess all the data in its input collections.  There is also the option to transform data at the time of import. The output of a transform can either append to the output collection or replace the output collection every time the transform is run.


Because Koverse transforms are run using the Hadoop MapReduce framework, they benefit from all of the MapReduce features.  For example, in addition to being massively parallel, transforms are fault-tolerant, and can be run using a configurable number of dedicated resources.

Koverse has a number of built-in transforms that can be run on collections without requiring any custom code:


Built-in Transforms
^^^^^^^^^^^^^^^^^^^

* **Close Graph** - The closed graph transform is a basic result which characterizes continuous functions in terms of their graphs.

* **Corpus Entity Stats** - Transform on an object-level which automatically ex-tract and integrate the semantic information about entities and return a list of ranked entities.

* **Corpus Word Stats** - Transform for finding the word frequency in giving recommendation for a spelling.

* **Document Similarity** - Transform over a set of documents or terms, where the idea of distance between them is based on the likeness of their meaning or semantic content as opposed to similarity which can be estimated.

* **Document Entities** - Transform to extract document entities from different datasets.

* **Entity Graph** - Transform to generate a graph of word or document entities.

* **Feature Extraction**  - This transform extracts entities (locations, organizations, people, etc) found in structured fields and in text and counts up every time a pair of entities appears in a collection. This allows for looking up an entity and seeing all related entities and the relative strength of the relationship.

* **Geo Discovery** - Transform used to create a heat-map from geographical data.

* **Geo Location - Airport Codes** Allows users to augment a collection with a field containing airport codes with the latitude and longitude of the airport.

* **Geo Location - Canadian Postal Codes** Allows users to augment a collection with a field containing Canadian postal codes with the latitude and longitude of the center of the postal codes.

* **Geo Location - IPv4** Allows users to augment a collection with a field containing IPv4 address with the approximate latitude and longitude of IP address.

* **Geo Point Extraction** - Transform to extracts geo points from records.

* **Nearest Neighbors** - This analytic first extracts features as is done in the Feature Extraction application, and then proceeds to compare each entity to each other entity and calculates a score of similarity between two entities, based on features they have in common.

* **Pearson Correlation** - Transform to determine the correlation between sets of data and a measure of how well they are related.

* **Pig Transform** - Run a custom Apache Pig script to transform data. This can include User Defined Functions (UDFs) which can be packaged into jars and uploaded via the UI.

* **Python Transform** - Run a custom Python script to transform data.

* **Record Copy** - Copies incrementally all the records in a collection to a new collection.

* **Record Copy (Non-incremental)** - Copies all the records in a collection to a new collection.

* **Sentiment Analysis** - Calculates sentiment per a given field based on some text appearing with that field in a record. E.g. characterize the sentiment of locations, based on text associated with each location.

* **Sequence N-Grams** - Transform to find probability of an n-gram in a contiguous sequence of n items from a given sequence of text or speech.

* **Sequence Similarity** - Transform to sequence similarity of an empirical relationship between sequences.

* **Simple Regression Scoring Transform** - A transform to to fit a statistical regression model on one set of data and then evaluate the model on another set of data.

* **Spark Copy Transform** - Run a custom Spark copy transform to copy from one collection to another.

* **Spark SQL Transform** - Run a custom Spark SQL query script to transform data.

* **Summarize / Enumerate Fields**  Calculates basic field statistics, such as the number of times each distinct value appears in the data, average size, max size, min size, etc.

* **Text Cleanup**   Performs very simply text manipulations on field values, such as trimming, making upper case or lower case, etc.

* **TF-IDF vectors for documents** - Is a numerical statistic that is intended to reflect how important a word is to a document in a collection or corpus. It is often used as a weighting factor in information retrieval and text mining.

* **Time Series** - Transform to extract time-series from different datasets.



.. _AggregationIntro:

Aggregations
^^^^^^^^^^^^

Aggregation provides a means of turning billions of pieces of raw data into condensed, human-consumable information. Aggregations are arguably the first and most common analytic that people want to run on their data. To address this common use case, Koverse provides a framework for building and querying aggregations without writing custom code. Besides the obvious aggregation of "Count", Koverse supports several other powerful functions like cardinality estimation, approximate top-k values, and approximate quantiles. Aggregations are maintained in near real-time on the Records of a Data Collection and are pre-computed so queries are sub-second regardless of how much data you have. These features provide a foundation for rapidly building products like interactive analytic dashboards that serve up-to-the-minute information. More detail on how to use Aggregations is seen in the :ref:`DeveloperDocumentation`.

Apps
^^^^

Koverse Web Applications, or Apps,  provide a user interface to underlying Koverse capabilities.  Koverse provides several built-in Apps so that users can start interacting with the system and gaining insight about their data immediately and without writing a single line of code.

Built-in Apps
^^^^^^^^^^^^^

Here is a list of the existing built-in Apps, and the capabilities they provide:

* **Audit Log** - Display and search details of all user activity, sorted in the order of the most recent events.

* **Configuration Manager** - Upload and download configuration for data Collections, Sinks, Sources, and Transforms.

* **Data Collections** - Manage and explore data Collections.

* **Data Flow** - Visualize, configure, and execute the movement of data within the Koverse system.

* **Search** - Query one or more Koverse Collections to find all Records that match search criteria.

* **File Upload** - Upload one or more files from the browser and import it into a collection.

* **System Administration** - Perform system administration activities, such as managing system configuration, user accounts, user groups, etc.

* **System Monitoring** - View health and status of the distributed cluster on which Koverse is running.


Exports
^^^^^^^
Koverse collections can easily be exported to external systems.


Records can be exported as JSON, as CSV when Records have a flat structure, or to relational database tables.


Built-in Export Sinks
^^^^^^^^^^^^^^^^^^^^^^

* MySQL Database

* FTP

* HDFS

File-based export sinks will allow users to select a file format to use, the number of Records to include in each file, and a prefix to use when naming export files. Supported built-in file formats include:

Built-in Export File Formats
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* CSV

* JSON

* XML


Export-Time Transforms
^^^^^^^^^^^^^^^^^^^^^^

Users can apply one or more transforms to be applied to Records as they are exported. The following export-time transforms are built-in.

* **Record Flattening Transform** Converts Records containing complex fields such as lists or maps of fields to values to simple Records only containing one set of fields each with a simple value, which are suitable for exporting to a CSV file or Relational Database.

* **Sample Transform** Allows users to specify a percentage of Records to export, and a random number of records will be exported proportional to the percentage specified. For example if a Data Collection contains 10,000 Records, and the user specifies 5% of records to sample, the Export job will output approximately 500 randomly selected records.

.. _Extensibility:

Extensibility
-------------

In addition to many built-in capabilities, the Koverse platform can be extended by users who require custom functionality.  In this way, analytic developers can spend more time on refining their analytics, rather than wasting time developing the underlying architecture. Not only does this reduce the time it takes to gain meaningful, tailored insights from raw data, but it ensures that new analytics are beholden to Koverse's robust security architecture.



There are several places Koverse can be extended to accommodate unique input/output data types, business-specific analytical logic, custom user interface requirements, and integration with enterprise identity management systems.  Extension is accomplished by :ref:`Addons`, which can consist of one or more of the following:



* Custom Import Sources

* Custom Transforms (including Import-time and Export-time Transforms)

* Custom Export Sinks

* Customer Export File Formats

* Custom Web Apps Applications

	|

.. figure:: /_static/KoverseIntegrationArchitecture.*
	:height: 350 px
	:width: 750 px
	:align: center

	Koverse Integration Architecture

	|
	|

Additionally, Koverse enables integration with existing enterprise identity management systems via extensible authentication and authorization modules.

Below is a list of the developer resources that are available for extending Koverse.  Please see the :ref:`DeveloperDocumentation` for details.



* Java SDK for Custom Sources,Transforms, and Sinks

* REST API

* Javascript REST API Library

* Java Thrift API Library

* Javascript App API



Additional Resources
^^^^^^^^^^^^^^^^^^^^^

Koverse software ships with documentation and SDKs available for direct download. Change the host name in the following URL to match your Koverse instance hostname.

``https://<hostname>/Koverse/docs``




Contacting Koverse Sales,Training, and Support
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse, Inc. offers 24/7 paid support and comprehensive training for all Koverse products.


Sales

1-855-403-1399

sales@koverse.com



Training

1-855-403-1399 (select sales for new training, or support for existing training)

training@koverse.com



Support

1-855-403-1399

support@koverse.com



** Service Level Agreements (SLAs) support requests can only be initiated via phone contact.
