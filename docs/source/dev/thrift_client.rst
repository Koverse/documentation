.. _ThriftClient:

Thrift Client
=============

Apache Thrift is used for communicating with the Koverse server.
It is specified in Thrift Interface Definition Language, which is used to create data structures and services code.
Koverse currently supports Java and Python based access to the Koverse server using Thrift.
This document is a guide for using Java software to communicate with the Koverse server.
Documentation for using Python will come at a later time.

The Java Thrift client allows JVM based software to connect to and interact directly with Koverse server through its Thrift services.
The client is a simple wrapper around the more complicated raw Thrift API, making development much easier.

To use the client, simply follow the instructions below, which will explain how to get the client library using Apache Maven.
Continuing sections will provide examples of how to use client.
Note that the client is also documented using Javadoc and those are stored alongside the JAR files in the Koverse Nexus repository.
Your Integrated Development Environment (IDE) is likely able to download the Javadocs from Maven and present them to you.
If you'd like to download the JavaDocs yourself, visit http://nexus.koverse.com/nexus/content/groups/public/com/koverse/koverse-thrift/ in your browser, select the folder for your version of Koverse, and download the Javadoc archive.

Maven
-----

To use the Java Thrift client in your software, modify your project's Maven ``pom.xml`` file to include the Koverse Java Thrift client dependency.
First, include a repositories section in your ``pom.xml`` file and add the Koverse repository, for example:

.. code-block:: xml

 <repositories>
   <repository>
     <id>koverse</id>
     <name>Koverse Public Repo</name>
     <url>http://nexus.koverse.com/nexus/content/groups/public/</url>
     <layout>default</layout>
   </repository>
 </repositories>


This will allow Maven to download the Koverse dependency.
This dependency has the groupId ``com.koverse`` and the artifactId ``koverse-thrift``.
Set the version of that dependency to match the version of Koverse your software will be communicating with.
Your ``pom.xml`` file should now have a section similar to:

.. code-block:: xml

 <dependencies>
   <dependency>
     <groupId>com.koverse</groupId>
     <artifactId>koverse-thrift</artifact>
     <version>2.9.0</version>
   </dependency>
 </dependencies>

Configuring the Client
----------------------

The first step in developing software to use the client is to configure the client.
That is done using the class ``com.koverse.client.thrift.ClientConfiguration``.
This class uses the Builder object-oriented pattern.
When the builder is created, all of the configuration properties are set to common defaults.
Thus, it is not necessary to set a configuration parameter unless you need to change it from the default.

.. code-block:: java

 import com.koverse.client.thrift.ClientConfiguration;
 ...
 ClientConfiguration configuration = ClientConfiguration.builder().host("mykoverseServer.com").build();
 ...

You would of course specify a valid host name for your Koverse server instead of "myKoverseServer.com."
Typically, the only configuration that needs to be changed is the host.
There are several other configurations such as specific TCP/IP port numbers, but they are very rarely set to anything but their default values.

Creating the Client
-------------------

The client is created by using one of two available constructors.
Which constructor to use depends on how you need to authenticate with the Koverse server.
There are two ways to authenticate: API Token or user name and password.
For either constructor, the ``ClientConfiguration`` object must be passed in as well.

Below is an example of authenticating with an API Token:

.. code-block:: java

 import com.koverse.client.thrift.Client;
 ...
 String apiToken = ...
 Client client = new Client(configuration, apiToken);
 ...

And here is an example of authenticating with a user name and password:

.. code-block:: java

 import com.koverse.client.thrift.Client;
 ...
 String userName = ...
 String password = ...
 Client client = new Client(configuration, userName, password);
 ...

After constructing the client, you may use it to perform operations such as:

* Perform queries (JSON object and Lucene based).
* Get auto-suggest results for a query term.
* Get a sample of records from a Data Set.
* Retrieve Data Sets.
* Create Data Sets
* Retrieve API Tokens.
* Create API Tokens.

JSON Object Queries
-------------------

JSON object queries are specified as a Java String of JSON and has a similar syntax to that of MongoDB.
The simplest type of object query is below, which simply searches for records that have any field with term "meow":

.. code-block:: json

 {
   "$any" : "meow"
 }

The client can specify this query as a Java String object and a JSON framework can be used to construct the object.
However, if a JSON framework is not being used and you are constructing the JSON string manually, care must be taken to format the JSON correctly.
This is especially true when writing the quote character; it must be escaped.

Here is an example:

.. code-block:: java

 List<TDataSetResult> results = client.query(
   "{ \"$any\" : \"meow\" }",
   Client.DEFAULT_DATASET_NAMES,
   Client.DEFAULT_OFFSET,
   Client.DEFAULT_LIMIT,
   Client.DEFAULT_FIELDS);

Note that all parameters except for the query are using the defaults.
Often, you will find that the defaults work well enough.
However, one default you my want to change is the Data Sets to query.
By default, all Data Sets are queried and this may not be optimal for your use case.
The same applies for record fields; by default, all record fields are returned.
You can specify that only certain fields are returned, this could result in higher performance if you know you do not need the whole record.

Here is an example that limits the Data Sets searched and the record fields that are returned:

.. code-block:: java

 import java.util.Arrays;
 ...
 List<TDataSetResult> results = client.query(
   "{ \"$any\" : \"meow\" }",
   Arrays.asList("ds1", "ds2"),
   Client.DEFAULT_OFFSET,
   Client.DEFAULT_LIMIT,
   Arrays.asList("score"));

The object query language is very expressive as it supprts greater than, less than, and, and or operators.
Here is a more complex example, in JSON, which returns all records that have a field named "age" with a value within a specified range:

.. code-block:: json

  {
    "age" : {
      "$gt" : 30,
      "$lt" : 40
    }
  }

Lucene Queries
--------------

Lucene queries are also speicifed as a string but are simpler and designed to be specified by an end-user.

For example, the preceding object query below is expressed much more simply Lucene as just ``meow``:

.. code-block:: json

 {
   "$any" : "meow"
 }

Searching within a specific field is also very simple.
To do so, just prepend the field name following by a colon and the term, such as ```score: 24```.

To search a range, just add square brackets and ``TO``, as follows: ``score:[20 TO 30]``

The exact specification for the Lucene syntax can be found at `this web site
<http://www.lucenetutorial.com/lucene-query-syntax.html>`_.

Here is an example of using the client to perform a Lucene query:

.. code-block:: java

 ...
 List<TDataSetResult> results = client.luceneQuery(
   "score: 35",
   Arrays.asList("ds1"),
   Client.DEFAULT_OFFSET,
   Client.DEFAULT_LIMIT,
   Client.DEFAULT_FIELDS,
   Client.DEFAULT_AUTHS);

Processing Query Results
------------------------

The query methods return ``TDataSetResult`` objects, once for each Data Set with records that match.
Within this object are a list of ``TSimpleRecord`` objects.
However, the record objects are, for technical reasons of Apache Thrift, not easilly usable.
Therefore, they should be converted to Java Map objects in order to read their fields.

There are convert methods in this class as well as a Java conversion Function available for that purpose.
The TSimpleRecord objects have useful information them such as the record identifier, but their field values are in an encoded form.
The record fields are represented as a Java Map with String keys and Object values.

The values can be of several different types:

* String
* Long
* Double
* Boolean
* Date
* Byte array
* List of such values (to include a list or a map)
* Map of such values, keyed by a String (the data structure can be recursively typed)

Here is an example of creating a client, performing a lucene query on it, and processing the resulting records:

.. code-block:: java

 ClientConfiguration configuration = ClientConfiguration.builder().build();
 Client client = new Client(configuration, "admin", "admin");
 List<TDataSetResult> dataSetResults = client.luceneQuery(
   "searchTerm",
   Client.DEFAULT_DATASET_NAMES,
   Client.DEFAULT_OFFSET,
   Client.DEFAULT_LIMIT,
   Client.DEFAULT_FIELDS,
   Client.DEFAULT_AUTHS);

 for (TDataSetResult dataSetResult : dataSetResults) {
   //do something with the data set result
   for (Map<String, Object> record : Client.convertRecords(dataSetResult.getRecords())) {
     //do something with the record
   }
 }

Auto-Suggest
------------

Get suggestions based on the provided term.

The following types of suggestions are returned:

* Record field values
* Data Set identifiers
* Label identifiers

The TSuggestion object has the following String fields:

* type
* value
* labelId
* dataSetId

The type field specifies which of the other three fields contain data, and will have one of the following values:

* query: The value field will contain data
* label: The labelId field will contain data
* dataSet: The dataSetId field will contain data

Here is an example:

.. code-block:: java

  for (TSuggestion s : client.autoSuggest("score", Client.DEFAULT_DATASET_NAMES)) {
    switch (s.getType()) {
      case "query":
        //do something with query suggestions using s.getValue()
        break;
      case "label":
        //do something with label suggestions using s.getLabelId()
        break;
      case "dataSet":
        //do something with data set suggestions using s.getDataSetId()
        break;
     default:
       //perhaps handle as an error
    }
  }

Here is a more concrete example of getting query search suggestions:

.. code-block:: java

  List<String> values = new ArrayList<>();

  for (TSuggestion s : client.autoSuggest("Seattle", Client.DEFAULT_DATASET_NAMES)) {
    switch (s.getType()) {
    case "query":
      values.add(s.getValue());
      break;
    default:
      //ignore
    }
  }

 //do something with the values...

Record Sample
-------------

To get a small representative sample of a Data Set's records, simply use the ``sample()`` method.
This method returns ``TSimpleRecord`` objects, which should be converted in order to read the field values.

Here is an example:

.. code-block:: java

  List<TSimpleRecord> sample = client.sample(
		"myDataSet",
		Client.DEFAULT_LIMIT,
		Client.DEFAULT_REMOVE_BYTE_ARRAYS,
		Client.DEFAULT_MAX_STRING_LENGTH);

  for (Map<String, Object> record : Client.convertRecords(sample)) {
    //do something with the record
  }

The remove byte arrays parameter, if true, strips all byte arrays from the record field. The deafult is false.
The max string length parameter specifies that maximum string length of field values before they are trimmed down.
A value of 0 means to not trim the strings and is the default.

Miscellaneous
-------------

The client also has the ability to create and get Data Sets as well as API Tokens.
Please consult the JavaDocs for detailed information on all method calls and data structures.
