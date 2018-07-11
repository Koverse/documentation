.. _CoreConcepts:

Core Concepts
=============

The following sections provide a basic introduction to the basic abstract concepts which build a foundation of knowledge for a developer before working with Koverse API.

.. _DataModel:

Data Model
----------

The Koverse data model has two main conceptual components: **Records**, and **Data Sets**.
Data Sets are the basic container for data in Koverse. Each Data Set contains a set of Records.

Data Sets
---------

For those familiar with relational database management systems such as Oracle or MySQL, the analogy is that a Data Set is similar to a Table, a Record is similar to a Row, and the fields or attributes of a Record are similar to the Columns.
However, unlike traditional relational databases, Records in a single Data Set in Koverse do not have to all have the same fields, and fields can contain complex values, like lists and mappings of fields to values.


A Koverse Data Set is a named set of Records. A Data Set has:

* Configurable indexes to enable queries to quickly and efficiently find Records.

* Permissions to control access to Records in the Data Set.

* Automatically discovered statistics and samples to provide insight into the Records contained in the Data Set.


Records
-------

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

Note that NULL values are not allowed in Records.
An attempt to put a NULL value into a field in a Record will result in an Exception.
It is possible to have the Koverse API automatically search for and remove NULL values when calling put() or putAll() on the SimpleRecord class by passing in 'true' as the last parameter::

  SimpleRecord simpleRecord = new SimpleRecord();

  simpleRecord.put("field", null, true);

This check will also remove NULLs at any any level within complex values such as Lists and Maps, and since this check must be done recursively it is relatively expensive.

..
  TODO: make a separate 'working with records' document
  Creating Records Programmatically
  ---------------------------------

Queries
-------

Records in Data Sets can be queried interactively by applications. Koverse provides indexing of values in records automatically.

Applications can query data using the popular Lucene syntax or by specifying queries as JSON documents.

See the Applications API documentation for examples and details of using queries to deliver answers to applications.

..
  Transforms
  ----------
  Sources and Sinks
  -----------------

.. _Parameters:

Parameters
----------

Koverse Transforms, Sources, and Sinks are all configured via Parameters.
Parameters are defined by the developer and allow specific instances of Transforms, Sources, and Sinks to be configured and deployed into varying environments by authorized non-developer users.


When creating a specific implementation of a Transform, Source, or Sink, developers provide a list of Parameters to present to the end-user via the User Interface.

Parameters are created with the following fields:

Required fields
^^^^^^^^^^^^^^^

String parameterName (required)
  uniquely identifies the parameter within the class.

String displayName (required)
  the name of the parameter that is shown to the user.

String type (required)
  one of the possible types defined in Parameter (see below).

Optional fields
^^^^^^^^^^^^^^^

String defaultValue
  a value set as the default.

String parameterGroup
  the name of a group of Parameters. Grouped parameters will appear together under the name of the group within in the UI.

String referencedParameterNames
  any parameterName that should be referenced. For example, for Parameters of the type TYPE_COLLECTION_FIELD, the possible values presented to the user in the UI are taken from the parameter defined in the referencedParameterName.

Boolean required
  whether the parameter must be set by the user. The default is false.

Boolean hideInput
  whether the value of the parameter should be hidden in the UI. Used for sensitive parameters such as passwords.

String hint
  a string of text to be shown to the user as an additional hint for applying a value to the parameter.


For example, a Source may define a parameter in its constructor as follows::

  private static final String FTP_HOSTNAME = "ftpHostnameParam";
  private static final String FTP_PORT = "ftpPortParam";

  @Override
  public List<Parameter> getParameters() {
    List<Parameter> params = new ArrayList();

    params.add(Parameter.newBuilder()
            .parameterName(FTP_HOSTNAME)
            .displayName("Host Name")
            .type(Parameter.TYPE_STRING)
            .parameterGroup("Access")
            .required(Boolean.TRUE)
            .build());
    params.add(
            Parameter.newBuilder()
            .parameterName(FTP_PORT)
            .displayName("Port")
            .type(Parameter.TYPE_INTEGER)
            .parameterGroup("Access")
            .defaultValue("21")
            .required(Boolean.TRUE)
            .build());

    return params;
  }


Parameters can be of the following types:

TYPE_STRING
  for passing in single line short strings such as a hostname or URL.

TYPE_TEXT
  for passing in longer multi-line strings, such as an entire script.

TYPE_BOOLEAN
  presents a checkbox to the user and is set to true or false.

TYPE_INTEGER
  allows the user to specify an integer value.

TYPE_COLLECTION_FIELD
  allows the user to select a single field from a collection. The referencedParameterName must be equal to the parameterName of an TYPE_INPUT_COLLECTION or TYPE_OUTPUT_COLLECTION parameterName. This is useful for informing classes of a specific field to use.

TYPE_COLLECTION_MULTIPLE_FIELD
  allows the user to choose a set of fields from a collection selected as an input or output collection parameter. This is useful for informing classes of a specific set of fields to use.

..
  TODO: verify this
  TYPE_FILE
  Allows the to user choose a file from the local file system. The file is uploaded, and its contents are made available as a stream at execution time to the custom component.

There are additional Parameter types used primarily by the system:

TYPE_INPUT_COLLECTION
  an input collection parameter presents the user with a list of collections from which the user is authorized to read. The UI then fills in this parameter with the internal unique ID of the collection the user chose. This component generally allows the end-user to select multiple input collections. The contents of all input collections are read into transform and export jobs for example.

TYPE_OUTPUT_COLLECTION
  an output collection parameter presents the user with a list of collections to which the user is authorized to write. The UI then fills in this parameter the internal ID of the collection the user chose. This parameter generally only allows the user to select a single collection.

TYPE_SECURITY_LABEL_PARSER
  presents the user with a list of Security Label parser options. Security label parsers are responsible for translating from a source security label to a Koverse record security label.


Transforms are pre-configured with parameters for input and output Data Sets.
Sources and Sinks are pre-configured with output or input collections, respectively.

Reading Parameter Values
^^^^^^^^^^^^^^^^^^^^^^^^

Once users have configured a Transform, Source, or Sink via the UI, Koverse will execute the business logic to transform, import, or export data.
Your code can grab the values set by the user via a context object.

These may vary slightly, but for example, to read the parameters set by a user in the FTP Source example above, we might do the following::

  private String hostname;
  private int port;

  @Override
  public void configureFileBasedSource() throws IOException {

    hostname = (String) getContext().getParameterValues().get(FTP_HOSTNAME);
    port = Integer.parseInt((String) getContext().getParameterValues().get(FTP_PORT));
  }

Note that the parameter values are all delivered as String objects which may need to be converted to other types for your purposes.
The UI will restrict the values to appropriate types in some cases but your code should check for valid values.

See the examples for Transforms, Source, and Sinks for details.
