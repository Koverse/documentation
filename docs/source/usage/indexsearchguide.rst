.. _IndexSearchGuide:

=========================
Indexing and Search Guide
=========================

Koverse features a unique indexing and search capability.
Unlike some open source options like Elastic Search and Solr, Koverse is capable of storing original records and index entries in the same system, eliminating the need for inefficient integration code between an indexing system like Elastic Search and a record storage system like HBase.
Koverse stores original records and index entries and schema information in the same Accumulo instance and therefore can provide unparalleled efficiency, security, and performance.

This guide details search syntax and guidance for how to configure indexing to support specific searches.

Search Languages
----------------

Koverse supports several search languages for fetching subsets of records using Koverse's indexes.
Each language is designed to make it easy to express search criteria in various contexts.

* For searches that are specified on the fly by end users, use the :ref:`LuceneSyntax`.
* For searches that are constructed programmatically by web applications, use the :ref:`ObjectSyntax`.

..
  * For searches that need to be expressed in SQL, use the :ref:`LimitedSQLSyntax`.

Below we describe the various types of search language syntax in detail.

.. _LuceneSyntax:

Lucene Search Syntax
--------------------

Overview
^^^^^^^^

Koverse supports a popular subset of Lucene for searching data sets via the Koverse user interface, or for web applications that allow end users to enter their own search criteria.
The syntax allows for rich searching by using Boolean logic, term grouping, ranges, and wildcard matching.
This section will explain the extent of Lucene syntax support and call out the small amount of unsupported features.


Terms
^^^^^

Terms are what values to search for in the records.
They can be specified as either a string of text or a number.
When searching for a single word, it is not necessary to use quotes.
When searching for a phrase, quotes can be used, such "yellow submarine".

It is not necessary to specify which field(s) to search under.
The default is to search all fields.

To search for a term, simply use it, like: ``cat`` or ``123``.
Phrases just need double quotes, such as: ``"cat food"``.

Terms that in the ISO 8601 format will be interpreted as dates.
This is an international format that takes the form of ``2018-10-30T12:48:29Z``.
A complete description of this format can be found at
https://en.wikipedia.org/wiki/ISO_8601.

Terms that in the form of a number, such as ``123`` or ``123.123`` will be interpreted as numbers.

Terms can also be interpreted as Internet Protocol address, such as ``127.0.0.1``.


Fields
^^^^^^

It is possible to limit what fields to search within.
To do so, simply specify the field name followed by a color, such as:
``animal:cat``, ``size:123``, or ``eats:"cat food"``.


Wildcards
^^^^^^^^^

Wild cards are supported for string terms, but only at the end of the term.
For example: ``animal:cat*``.
Wildcards are not supported in the beginning or middle of a term,
which is different than what Lucene normally supports.


Ranges
^^^^^^

It is possible to search within a range of terms.
Simply surround the two terms with square brackets,
separated by ``TO``.
For example, ``size:[2 TO 10]`` will search for all sizes with a number
from 2 to 10, inclusive.
Exclusive searches can be specified by using curly braces,
such as: ``size:{1 TO 11}``.
Additionally, it is possible to perform an inclusive search on text terms,
such as: ``name:[chad TO sigrid]``.


Boolean Operators
^^^^^^^^^^^^^^^^^

The following operators are supported: ``AND``, ``OR``, and ``NOT``.
The default operator is ``AND``.
For example, the search ``chad sigrid`` is equivalent to ``chad AND sigrid``.
An example ``AND`` search would be: ``animal:cat AND owner:sigrid``.
An example ``NOT`` search is: ``NOT animal:cat`` or ``NOT size:12``.

``AND``, ``OR``, and ``NOT`` can also be specified using
``&&``, ``||``, and ``!``, respectively.


Grouping
^^^^^^^^

A search be be logically grouped by using parenthesis.
For example, the queries
``(animal:cat OR animal:dog) AND owner:chad``
and
``animal:cat OR (animal:dog AND owner:chad)``
are not the same.
The first search finds all cats and dogs owned by chad.
The second search finds all cats, or all dogs owned by chad.


Escaping Special Characters
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Characters that are search keywords such as ``:``, ``(``, and ``)`` can be
escaped with a forward slash.
For example, to search for a term that includes a parenthesis,
the parenthesis can be escaped with ``\``:
``animal:\(four legs\)``.
Here are all of the reserved search keywords:
``+ - && || ! ( ) { } [ ] ^ " ~ * ? : \``.

Unsupported Lucene Features
^^^^^^^^^^^^^^^^^^^^^^^^^^^
Relevance ranking: Matching records that are returned from Koverse are not sorted in any particular order.

However, when paging is used, the results are returned in a consistent order.
For example, when requesting a page multiple times, the same results are returned.
Thus, it is possible to show the user the first page of results and allow them to then navigate to other pages.
When doing so, the user will see the same records for each page every time they request them.
What is not possible is to sort those results globally.
However, a page's worth of records could be sorted by the client program.


Unsupported Lucene Syntax
^^^^^^^^^^^^^^^^^^^^^^^^^

The full Lucene syntax can be read online at
https://lucene.apache.org/core/2_9_4/queryparsersyntax.html .

However, note that the following features are not supported in Koverse:

 * Any wildcard searches other than suffix-based.
 * Single character wildcard searches.
 * Fuzzy searches.
 * Proximity searches.
 * Term boosting.
 * The "required" operator ``+``.
 * Field grouping.

.. _ObjectSyntax:

Object Search Syntax
--------------------

For searches that are not written by end-users on the fly but that are constructed programmatically by a web application, we recommend using Koverse's Object Search Syntax.
The Object Search Syntax allows applications to specify search criteria by building a Javascript object, converting to JSON, and submitting to a REST endpoint.
This way, a search can be more easily manipulated programmatically by Javascript.

The following table shows the JSON syntax for various types of searches:

+-----------------------------------+-----------------------------------------------+
|Search Criteria                    | Query Syntax                                  |
+===================================+===============================================+
| Searching 'any' field for a value | {"$any": "fmv"}                               |
+-----------------------------------+-----------------------------------------------+
| Search specific field for a value | {"field.name": "fmv"}                         |
+-----------------------------------+-----------------------------------------------+
| Search AND                        + {"$and": [{"$any": "fmv"}, {"$any": "blue"}]} |
+-----------------------------------+-----------------------------------------------+
| Search OR                         | {"$or": [{"$any": "fmv"}, {"$any": "blue"}]}  |
+-----------------------------------+-----------------------------------------------+

These searches allow various criteria to be combined using operators like AND and OR.
Note that the terms of these search are all 'point' terms, meaning they specific an exact value.
Searching for a range of values is also supported.

Searching Ranges
^^^^^^^^^^^^^^^^

To search for a range of values, use one of the range operators such as $gte, greater than or equals, etc.
A few types of ranges are listed in the following table:

+----------------------------------------+-----------------------------------------------------------------+
|Search Criteria                         | Query Syntax                                                    |
+========================================+=================================================================+
| Any value greater than or equal to 160 | { "$any": { "$gte": 160 }}                                      |
+----------------------------------------+-----------------------------------------------------------------+
| Date field less than a specific date   | { "date_created": { "$lt": "1980-01-01T00:00:00.000Z }}         |
+----------------------------------------+-----------------------------------------------------------------+
| Geo Range                              | { "fieldName": { "$box": [[sw-lat, sw-long],[ne-lat, ne-long]]}}|
|                                        |                                                                 |
|                                        | { "fieldName": { "$box" :[[39.5, -104.9],[40, -104.5]] }}       |
+----------------------------------------+-----------------------------------------------------------------+
|Any value except for 100                | { "$not": { "amount": 100 } }                                   |
+----------------------------------------+-----------------------------------------------------------------+


The official list of operators includes:

$gt
  greater than
$gte
  greater than or equal to
$lt
  less than
$lte
  less than or equal to
$eq
  equal to
$any
  used in place of a field to search for a value in any field
$not
  used to negate a search criterion. Note that this results in two ranges being searched, those 'above' and 'below' the value specified.

Note that queries that combine a range with any other criteria, and queries that combine multiple ranges require Composite Indexes on the fields involved.
See :ref:`CompositeIndexes` below for information on building these.


..
  TODO: finish this
  .. _LimitedSQLSyntax:

  Limited SQL Search Syntax
  -------------------------

  Many applications are designed to interface with data systems such as Koverse using the popular SQL language.
  Koverse allows searches to be specified using a limited subset of SQL.

  As SQL is such a flexible language, it is important to understand that these limited SQL searches utilize Koverse's indexes and are designed for fast, interactive lookups rather than the complex processing that is also possible with SQL.
  Specifically, Koverse does not allow searches that include JOIN, GROUP BY, or ORDER BY, or subqueries as these operations are expensive to execute on data at scale and are difficult to be made to work in the sub-second timeframes in which these searches are designed to return.

  SQL statements that are designed to JOIN or GROUP BY data sets are best executed as Koverse Transforms, which are designed to pre-compute results which are then indexed and can be retrieved quickly.
  However, as Transforms run asynchronously and are designed to run in the background periodically, they are not suited for complex, *ad hoc* SQL processing.

  For prototyping Transforms that utilize complex SQL or for executing complex ad hoc SQL, users are encouraged to use interactive notebooks to process data using Spark SQL as detailed in :ref:`JupyterNotebook`.

  The SQL syntax that Koverse supports for interactive searches are limited to SELECT statements that reference one data set by name and include one or more criteria in a WHERE clause.
  For example::

    SELECT email, name FROM customers WHERE city = "chicago" AND age > "30"

  Note that values appearing in the WHERE criteria must all be quoted, even if they are numerical.

.. _CompositeIndexes:

Indexing Policy and Composite Indexes
-------------------------------------
By default, all fields in the Records of Koverse Data Sets are indexed.
This allows data to easily be discovered by searching across all fields and values.
There are times when you may want to change this default indexing policy. You may want to add composite indexes when your searches use more than one search term as they can greatly improve search performance. There also
may be times when you want to disable fields from being indexed as they never will be used in searches.
While Koverse is designed to efficiently ingest and index data, indexes still aren't free in terms of disk usage and ingest throughput, and the impact of
these costs can sometimes be seen in high volume ingest environments.

To change the current indexing policy, including adding composite indexes, use the Koverse REST API with the resource

``/api/dataSets/<dataSetId>/indexingPolicy``

An HTTP GET will return the currently configured indexing policy for the Data Set.
An HTTP PUT will update the indexing policy based on the body of the request.
Several example JSON bodies are seen below.
Using a tool like Postman in Google Chrome is an easy way to make REST API calls to Koverse as it will reuse your existing session if you are already logged into the Koverse UI.

**Add two composite indexes**

This example shows adding two composite indexes.
One on the 'eventType' and 'timestamp' fields, and one on the 'location' and 'timestamp' fields:

.. code-block:: json

	{
	  "id":557,
	  "fieldsInclusive": false,
	  "fields": [],
	  "compositeIndexes": [
      [
        { "fieldName": "eventType", "fieldType": "java.lang.String" },
        { "fieldName": "timestamp", "fieldType": "java.lang.Number" }
      ],
      [
        { "fieldName": "location", "fieldType": "com.koverse.sdk.data.KoverseGeoPoint" },
        { "fieldName": "timestamp", "fieldType": "java.lang.Number" }
      ]
    ],
		"createValueOnlyIndices": true,
		"dataSetId": "my_dataset_20170308_234200_037"
	}

When creating composite indexes, a "fieldType" is required.
This specifies the type of values which the index applies to.
Internally Koverse is using Java types for the values in Records and that is why Java class names are seen in the "fieldType" values in the examples.
The following types are supported for composite indexes

- java.lang.String
- java.lang.Number
- java.util.Date
- com.koverse.sdk.data.KoverseGeoPoint
- java.net.Inet4Address

**Disabling indexing on a field**

In this example we turn off indexing on the field 'version':

.. code-block:: json

	{
		"id":557,
		"fieldsInclusive": false,
		"fields": [ "version" ],
		"compositeIndexes": [],
		"createValueOnlyIndices": true,
		"dataSetId": "my_dataset_20170308_234200_037"
	}
