.. _CoreConcepts:

Core Concepts
-------------
The following sections provide a basic introduction to the basic abstract concepts which build a foundation of knowledge for a developer before working with Koverse API.

.. _DataModel:

Data Model
^^^^^^^^^^

The Koverse data model has two main conceptual components: **Records**, and **Data Sets**.
Logically, each Data Set contains a set of Records.

For those familiar with relational database management systems such as Oracle or MySQL, the analogy is that a Data Set is similar to a Table, a Record is similar to a Row, and the fields or attributes of a Record are similar to the Columns.
However, unlike traditional relational databases, Records in a single Data Set in Koverse do not have to all have the same fields, and fields can contain complex values, like lists and mappings of fields to values.

Records
^^^^^^^

The Koverse canonical unit of data is a Record. A Record is a map of keys/values, or fields, similar to a JSON document. Like a JSON document, a Record can have embedded lists or nested maps.

A Record belongs to a single Data Set. Different Records within the same Data Set do not have to have the same fields or structure. The values in a Record can be of many different types, including Strings, Doubles, geospatial points, and Dates.
A Record also has an optional security label which can be used to provide Record-level access control.


Some key points to remember about Records are:

* Each record is present in one and only one Data Set.
* Records are maps of key/value pairs, similar to JSON
    * Example: {key1: valueA, key2: valueB}
* Value types may vary across records with matching keys
    * Example Record A: { key1: stringValue}
    * Example Record B: { key1: 234 }


* Records do not have a user designated id field. It is up to the application to designate and populate an identifier field. Applications can submit queries to look up records by any field, including a field to which it has assigned unique identifiers.

* The optional security label on a record is set programmatically through the Java API and effects how the record is stored and retrieved.

* Records can contain nested value objects:
  * Example: { name: parent, children: [ { name: child1} ] }

* Records can contain the following native value types:

+--------------------------------------+--------------------------------------------------+
| Native Value Type                    | Examples and support string formats              |
+======================================+==================================================+
| String                               | "A string of text characters"                    |
+--------------------------------------+--------------------------------------------------+
| Integer                              | 15                                               |
+--------------------------------------+--------------------------------------------------+
| Long                                 | 10000000000L                                     |
+--------------------------------------+--------------------------------------------------+
| Float                                | 44.26                                            |
+--------------------------------------+--------------------------------------------------+
| Double                               | 200.05                                           |
+--------------------------------------+--------------------------------------------------+
| Date                                 | Unix Timestamp:  1371277293 UTC (GMT)            |
|                                      |                                                  |
|                                      | Epoch Timestamp: 1371277293                      |
|                                      |                                                  |
|                                      | DTG:   271545ZFEB13                              |
|                                      |                                                  |
|                                      | Other various date formats supported:            |
|                                      |                                                  |
|                                      | * yyyyMMdd hh:mm:ss                              |
|                                      | * EEE MMM d HH:mm:ss Z yyyy                      |
|                                      | * EEE MMM d HH:mm:ss zzz yyyy                    |
|                                      | * yyyy-MM-dd                                     |
|                                      | * yyyy/MM/dd                                     |
|                                      | * yyyy-MM                                        |
|                                      | * yyyy/MM/dd HH:mm:ss                            |
|                                      | * yyyy-MM-dd HH:mm:ss                            |
|                                      | * yyyy/MM/dd HH:mm:ss.SSS                        |
|                                      | * yyyy-MM-dd HH:mm:ss.SSS                        |
|                                      | * MM/dd/yyyy HH:mm                               |
|                                      | * MM-dd-yyyy HH:mm                               |
|                                      | * ddHHmm'Z' MMM yy                               |
+--------------------------------------+--------------------------------------------------+
| KoverseGeoPoint                      | Well Known Text String Format: Point 1.23 60.423 |
|                                      |                                                  |
|                                      | Comma separated decimal lat,long: 1.23,60.423    |
+--------------------------------------+--------------------------------------------------+
| Inet4Address                         | 192.168.1.1                                      |
+--------------------------------------+--------------------------------------------------+
| Boolean                              | true                                             |
+--------------------------------------+--------------------------------------------------+
| byte[]                               | An array of binary bytes such as the             |
|                                      | original bytes of a file                         |
+--------------------------------------+--------------------------------------------------+

Queries
^^^^^^^

Records in Data Sets can be queried interactively by applications. Koverse provides indexing of values in records automatically.

Applications can query data using the popular Lucene syntax or by specifying queries as JSON documents.

See the Applications API documentation for examples and details of using queries to deliver answers to applications.
