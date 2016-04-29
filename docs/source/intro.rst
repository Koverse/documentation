:tocdepth: 2


Introduction
============


Overview
^^^^^^^^^



Key Benefits
^^^^^^^^^^^^

Ubiquitous access to data
-------------------------

Koverse automatically indexes all data
Lucene library used for text tokenization
Index is stored in accumulo, same security controls

Enable data science through bulk analysis with latest tools
-----------------------------------------------------------

Data scientists can develop analytics that run on data in situ, that can be reused because analytic configuration can be matched to the schema information koverse keeps
Developers can use spark, spark SQL, hadoop map reduce, python, apache pig, R, iPython notebook, Tableau, Excel

Schema-free ingest
------------------

Users do not have to provide any information about the data schema. Data doesn’t have to be well understood or consistent
Store data from external systems once, in a flexible data model in accumulo
Via data profiling and sampling discover data structure and address data quality issues

Flexible access control
-----------------------

Koverse labels data, protects it immediately
Koverse manages group to data set access

Enabling the Modern Data Work Flow
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse is designed to address some of the most common and challenging barriers organizations must overcome in order to successfully put all of their data to work.
The modern data work flow consists of the following activities, but they may not always appear in this order and not all of the steps is always required:

- Gathering data from operational systems
- Staging data in a scalable system where multiple data sets can be combined
- Detecting and describing data structure or schemas
- Detecting and exposing potential data quality issues
- Bringing a wide variety of data science tools to bear on analytical questions
- Putting analytics into production
- Making the analytical results as well as raw data data searchable
- Exposing an API on analytical results and building interactive applications
- Providing a unified security model across data access, search, and analytics
- Auditing all activity

Let's talk about each of those steps in depth and describe how Koverse addresses each.

Gathering Data
--------------
Much of the data in organizations is currently housed in operational systems which often consist of relational databases and file systems on which applications run that support business activities such as taking orders, making transactions, and recording and updating customer information.
Some of this data may already have been copied into an analytical system such as a data warehouse.
Regardless of where the information is stored, it must be gathered into a flexible analytical system that can handle structured and unstructured data from a wide variety of sources so that analytical processes can benefit from a combined view of an organization.


Staging multiple data sets
--------------------------

Detecting data structure
------------------------

Detecting data quality issues
-----------------------------

Supporting data science development
-----------------------------------

Putting analytics into production
---------------------------------

Making data searchable
----------------------

Building applications
---------------------

Unified security
----------------

Auditing
--------


Concepts
^^^^^^^^

Data Set
--------

Record
------

Attribute
---------

Transform
---------

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

* Email Account (IMAP)

* File Transfer Protocol (FTP)

* Hadoop File System (HDFS)

* Apache Kafka

* MS SQL Server

* MySQL

* Oracle

* Postgres

* Newsfeed Source (RSS)

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

* URLs

* IP addresses

* Geographical points

* Dates

* Byte arrays


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

* Customer Export File Formats

* Custom Applications

	|

.. figure:: /_static/KoverseIntegrationArchitecture.*
	:height: 350 px
	:width: 750 px
	:align: center

	Koverse Integration Architecture

	|
	|


* Java SDK for Custom Sources,Transforms, and Sinks

* REST API

* Javascript REST API Library

* Java Thrift API Library

* Javascript App API



Contacting Koverse
^^^^^^^^^^^^^^^^^^

1-855-403-1399

info@koverse.com


Sales

1-855-403-1399

sales@koverse.com



Support

1-855-403-1399

support@koverse.com
