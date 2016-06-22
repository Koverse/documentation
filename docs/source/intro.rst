:tocdepth: 2


Introduction
============

Koverse is the only demand-driven platform for big data that, from day one, enables users to easily run advanced analytics against any data source and develop result driven applications.

Key Benefits
^^^^^^^^^^^^

Ubiquitous access to data
-------------------------

Koverse automatically indexes all data.
The Apache Lucene library is used for text tokenization.
Indexes are stored in Apache Accumulo, a scalable NoSQL database that provides the same security controls over indexes as original records.

Enable data science through bulk analysis with latest tools
-----------------------------------------------------------

Data scientists can develop analytics that run on data in-situ, that can be reused because analytic configuration can be matched to the schema information Koverse maintains.
Developers can use tools such as Spark, Spark SQL, Hadoop MapReduce, Python, Apache Pig, Jupyter Notebook, Tableau, and Excel.

Schema-free ingest
------------------

Users do not have to provide any information about the data schema.
Data doesn’t have to be well understood or consistent.
Store data from external systems once, in a flexible data model in accumulo.
Discover data structure and address data quality issues via automatic data profiling and sampling.

Flexible access control
-----------------------

Koverse labels all data ingested and protects it immediately.
Koverse manages data set access per group and does additional record-level filtering.


Koverse Architecture
^^^^^^^^^^^^^^^^^^^^

.. figure:: /_static/KoverseLogicalArchitecture.*
	:height: 350 px
	:width: 600 px
	:align: center



	Koverse Logical Architecture

	|
	|

The :ref:`Extensibility` section offers more details about extending built-in Koverse capabilities to meet operational needs.


Features
^^^^^^^^

Import data from external sources
---------------------------------

* Amazon S3

* Email Accounts (IMAP)

* File Transfer Protocol (FTP)

* Hadoop File System (HDFS)

* Apache Kafka

* MS SQL Server

* MySQL

* Oracle

* Postgres

* Newsfeeds (RSS)

* Twitter Streaming

* Twitter Timeline

* Wikipedia

* URL

* Custom



Parse File Formats
------------------

* XML

* JSON

* CSV

* Text

* RTF

* HTML

* Microsoft Word

* Microsoft Power Point

* Microsoft Excel

* Email files

* PDF

* ePub


Search
------

* Users can query one data set, or all data sets they are authorized to read.

* Queries can be field-specific or can look for values appearing in any field.

* Users can search for a range of values.

* Users can search multiple ranges simultaneously.

* Users can start typing and see suggested query terms.

* Download search results as CSV or JSON files.


Koverse automatically recognizes the following value types and will make them discoverable:


* Text

* Numbers

* Dates

* Booleans

* URLs

* IP addresses

* Geographical points


Bulk Analysis via Transforms
----------------------------

* Clean up and normalize data

* Combine or join data sets

* Summarize and aggregate

* Build descriptive or predictive statistical and machine learning models

* Analytical output is stored in a new data set which is also searchable



Export Data
-----------

Export data sets to external systems:

* FTP

* HDFS

* Amazon S3

* Kafka

Export to the following file formats:

* CSV

* JSON

* XML

Perform Interactive Analysis
----------------------------

Using Spark shells or Jupyter

Build Custom Applications
-------------------------

Extend Koverse Capabilities
---------------------------

* Custom Import Sources

* Custom Transforms

* Custom Export Destinations

* Custom Export File Formats

* Custom Applications

* Java SDK for Custom Sources, Transforms, and Sinks

* REST API

* Javascript REST API Library

* Java Thrift API Library

* Javascript App API
	|

.. figure:: /_static/KoverseIntegrationArchitecture.*
	:height: 350 px
	:width: 750 px
	:align: center

	Koverse Integration Architecture

	|
	|
