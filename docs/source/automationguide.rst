.. _automationguide:

:tocdepth: 2

================
Automation Guide
================
.. contents:: :depth: 4

Overview
========

This guide will help you write a Koverse automation application.
It walks though the process of creating, executing, and deleting sources, data sets, and transforms.
The first section focuses on providing example Java code.
The second section highlight the HTTP REST calls and provides sample JSON requests and responses.

Using Java to Perform REST Calls
================================

While Koverse does not provide a Java SDK to use for automation,
Java code can be written to invoke the REST HTTP methods that Koverse provides.
The easiest way to do so is to use the Apache HTTP client and the JSON Simple library.
This section will walk though creating a Maven project with Java code that can be used for automation.


Maven Dependencies
------------------

This example relies on the Apache HTTP Client and JSON Simple libraries.
Therefore, your Maven ``pom.xml`` file must have the following dependencies:

.. code-block:: xml

 <dependencies>
   <dependency>
     <groupId>org.apache.httpcomponents</groupId>
     <artifactId>httpclient</artifactId>
     <version>4.5.6</version>
   </dependency>
   <dependency>
     <groupId>com.googlecode.json-simple</groupId>
     <artifactId>json-simple</artifactId>
     <version>1.1.1</version>
   </dependency>
   <dependency>
     <groupId>log4j</groupId>
     <artifactId>log4j</artifactId>
     <version>1.2.17</version>
   </dependency>
 </dependencies>


Main Method
-----------

The entry point for this example is a main method that will call a series of other Java methods.
It will create and delete data sets, data sources, and transforms as well as execute sources and transforms.

.. code-block:: java

 private static final String BASE_URL = "http://localhost:8080/api/";
 private static final CloseableHttpClient HTTP_CLIENT = HttpClients.createDefault();
 private static final Header ACCEPT_JSON = new BasicHeader("Accept", "application/json");
 private static final Header CONTENT_TYPE_JSON = new BasicHeader("Content-Type", "application/json");
 private static final JSONParser JSON_PARSER = new JSONParser();

 public static void main(String[] args) throws Exception {
   long sourceId;
   long importFlowId;
   String sourceDataSetId;
   long importFlowJobId;
   String transformDataSetId;
   long transformId;
   long transformJobId;

   login();
   sourceId = addWikipediaSource();
   importFlowId = addImportFlow(sourceId);
   sourceDataSetId = addDataSet("wiki");
   attachDataSetToImportFlow(importFlowId, sourceId, sourceDataSetId);
   importFlowJobId = executeImportFlow(importFlowId);
   waitForJobCompletion(importFlowJobId);
   transformDataSetId = addDataSet("copy");
   transformId = addSqlTransform(sourceDataSetId, transformDataSetId);
   transformJobId = executeTransform(transformId);
   waitForJobCompletion(transformJobId);
   deleteTransform(transformId);
   deleteSource(sourceId);
   deleteDataSet(sourceDataSetId);
   deleteDataSet(transformDataSetId);

 }


This main method:
1. Logs into Koverse.
2. Creates a Wikipedia Sources.
3. Creates an Import Flow.
4. Creates a Data Set for the source.
5. Attaches the Data Set and Source to the Import Flow.
6. Executes the Import Flow.
7. Waits for the Import Flow to finish.
8. Creates a SQL Transform that simply copies records from one data set to another.
9. Creates a Data Set for the Transform to write records to.
10. Executes the Transform and waits for it to finish
11. Delete the Transform, Source, and Data Sets.

Helper Methods
--------------

There are several methods for performing the HTTP operations GET, PUT, POST, and DELETE:

.. code-block:: java

 private static HttpGet get(String path) {
   return addHeaders(new HttpGet(BASE_URL + path));
 }

 private static HttpDelete delete(String path) {
   return addHeaders(new HttpDelete(BASE_URL + path));
 }

 private static HttpPut put(String path, String body) throws Exception {
   HttpPut put = addHeaders(new HttpPut(BASE_URL + path));

   put.setEntity(new StringEntity(body));

   return put;
 }

 private static HttpPost post(String path) {
   return addHeaders(new HttpPost(BASE_URL + path));
 }

 private static HttpPost post(String path, String body) throws Exception {
   HttpPost post = post(path);

   post.setEntity(new StringEntity(body));

   return post;
 }

These methods construct Apache HTTP verb objects and decorate them using the ``addHeaders()`` method,
which adds the required HTTP headers needed for REST calls to Koverse to work without error.

That method is below:

.. code-block:: java

 private static <T extends HttpMessage> T addHeaders(T message) {
   message.addHeader(ACCEPT_JSON);
   message.addHeader(CONTENT_TYPE_JSON);

   return message;
 }

Logging In
----------

Logging in is simple, simply provide the credentials in a JSON HTTP body:

.. code-block:: java

 private static void login() throws Exception {

   JSONObject request = new JSONObject();

   request.put("email", "admin");
   request.put("password", "admin");

   HTTP_CLIENT.execute(post("login", request.toJSONString())).close();
 }

This method creates the JSON object, executes a POST to the /api/login endpoint, and closes the HTTP response.
Note that it is critical that Apache HTTP Response objects are closed.

Creating a Source
-----------------

This method creates a Wikipedia Pages source:

.. code-block:: java

 private static long addWikipediaSource() throws Exception {;
   JSONObject request = new JSONObject();
   JSONObject configurationOptions = new JSONObject();

   request.put("name", "");
   request.put("sourceTypeId", "wikipedia-pages-source");
   configurationOptions.put("pageTitleListParam", "Cat Dog");
   request.put("configurationOptions", configurationOptions);

   try (CloseableHttpResponse httpResponse = HTTP_CLIENT.execute(post("sourceInstances", request.toJSONString()))) {
     JSONObject response = (JSONObject) JSON_PARSER.parse(
             new InputStreamReader(
                     httpResponse.getEntity().getContent()));

     return (Long) response.get("id");
   }
 }


Since the HTTP response object is needed in this case, the response is enclosed in a Java try with resources block.
The Simple JSON Parser is used to extract and return the identifier of the created source.

Creating an Import Flow
-----------------------

This method creates an Import Flow for a Source and returns the identifier:

.. code-block:: java

 private static long addImportFlow(long sourceId) throws Exception {
    JSONObject request = new JSONObject();

    request.put("sourceInstanceId", sourceId);
    request.put("type", "manual");

    try (CloseableHttpResponse httpResponse = HTTP_CLIENT.execute(post("importFlows", request.toJSONString()))) {
      JSONObject response = (JSONObject) JSON_PARSER.parse(
              new InputStreamReader(
                      httpResponse.getEntity().getContent()));

      return (Long) response.get("id");
    }
  }

Creating a Data Set
-------------------

This method creates a Data Set and returns its identifier:

.. code-block:: java

 private static String addDataSet(String name) throws Exception {
   JSONObject request = new JSONObject();
   JSONObject indexingPolicy = new JSONObject();

   request.put("name", name);
   indexingPolicy.put("foreignLanguageIndexing", false);
   indexingPolicy.put("fieldsInclusive", false);
   request.put("indexingPolicy", indexingPolicy);

   try (CloseableHttpResponse httpResponse = HTTP_CLIENT.execute(post("dataSets", request.toJSONString()))) {
     JSONObject response = (JSONObject) JSON_PARSER.parse(
             new InputStreamReader(
                     httpResponse.getEntity().getContent()));

     return (String) response.get("id");
   }
 }

Attach Import Flow
------------------

Before an Import Flow can be executed, it must be attached to a Source and Data Set.
To do this, the Import Flow JSON is retrieved with a HTTP GET, updated, and then updated with a PUT:

.. code-block:: java

 private static void attachDataSetToImportFlow(
        long importFlowId,
        long sourceId,
        String dataSetId) throws Exception {

  JSONObject importFlowJson;

  try (CloseableHttpResponse httpResponse = HTTP_CLIENT.execute(get("importFlows/" + importFlowId))) {
    importFlowJson = (JSONObject) JSON_PARSER.parse(
            new InputStreamReader(
                    httpResponse.getEntity().getContent()));
  }

  importFlowJson.put("sourceInstanceId", sourceId);
  importFlowJson.put("outputDataSetId", dataSetId);

  HTTP_CLIENT.execute(put("importFlows/" + importFlowId, importFlowJson.toJSONString())).close();
}

Execute Import Flow
-------------------

.. code-block:: java

 private static long executeImportFlow(long importFlowId) throws Exception {
  try (CloseableHttpResponse httpResponse = HTTP_CLIENT.execute(post("importFlows/" + importFlowId + "/execute"))) {
    JSONObject response = (JSONObject) JSON_PARSER.parse(
            new InputStreamReader(
                    httpResponse.getEntity().getContent()));

    return (long) response.get("id");
  }
}

Waiting for a Job to Complete
-----------------------------

By performing a REST GET call to ``/api/jobs``, the complete list of running jobs can be retried.
Once a job finishes, it will no longer be present in the response.
Therefore, this method waits for a job to complete by returning when the job is no longer in the result.

.. code-block:: java

 private static void waitForJobCompletion(long jobId) throws Exception {

  while (true) {
    try (CloseableHttpResponse httpResponse = HTTP_CLIENT.execute(get("jobs"))) {
      JSONArray jobs = (JSONArray) JSON_PARSER.parse(
              new InputStreamReader(
                      httpResponse.getEntity().getContent()));

      if (jobs.stream().anyMatch(t -> jobId == (long) JSONObject.class.cast(t).get("id"))) {
        System.out.printf("Job %d is still running%n", jobId);
        Thread.sleep(1000);
      } else {
        break;
      };
    }
  }
 }

Create a SQL Transform
----------------------

To create a Transform, the type and parameters for it must be specified.
Additionally, the input and output data sets must be specified.


.. code-block:: java

 private static long addSqlTransform(String inputDataSet, String outputDataSet) throws Exception {
   JSONObject request = new JSONObject();
   JSONObject configurationOptions = new JSONObject();
   JSONArray inputDataSetIds = new JSONArray();

   request.put("disabled", false);
   request.put("scheduleType", "automatic");
   request.put("inputDataWindowType", "allData");
   request.put("replaceOutputData", true);
   request.put("inputDataSlidingWindowOffsetSeconds", 0);
   request.put("inputDataSlidingWindowSizeSeconds", 0);
   request.put("transformTypeId", "sparkSqlTransform");
   request.put("outputDataSetId", outputDataSet);
   request.put("configurationOptions", configurationOptions);
   request.put("inputDataSetIds", inputDataSetIds);

   configurationOptions.put("sqlStatement", "SELECT * FROM ?1");
   configurationOptions.put("termTypeDetectOutputStrings", true);

   inputDataSetIds.add(inputDataSet);

   try (CloseableHttpResponse httpResponse = HTTP_CLIENT.execute(post("transforms", request.toJSONString()))) {
     JSONObject response = (JSONObject) JSON_PARSER.parse(
             new InputStreamReader(
                     httpResponse.getEntity().getContent()));

     return (Long) response.get("id");
   }
 }

Execute the Transform
---------------------

Note that executing a transform uses a HTTP GET:

.. code-block:: java

 private static long executeTransform(long transformId) throws Exception {
    try (CloseableHttpResponse httpResponse = HTTP_CLIENT.execute(get("transforms/" + transformId + "/runTransform"))) {
      JSONObject response = (JSONObject) JSON_PARSER.parse(
              new InputStreamReader(
                      httpResponse.getEntity().getContent()));

      return (long) response.get("id");
    }
 }

Deleting
--------

Deleting is performed by using the HTTP DELETE verb on the proper REST resource endpoints.
Here is the example for deleting sources, transforms, and data sets:

.. code-block:: java

 private static void deleteSource(long sourceId) throws Exception {
   HTTP_CLIENT.execute(delete("sourceInstances/" + sourceId)).close();
 }

 private static void deleteTransform(long transformId) throws Exception {
   HTTP_CLIENT.execute(delete("transforms/" + transformId));
 }

 private static void deleteDataSet(String dataSetId) throws Exception {
   HTTP_CLIENT.execute(delete("dataSets/" + dataSetId));
 }

REST with JSON Examples
=======================

Importing Data
--------------

To create a data source, the data source types must be obtained first.
Of the types, one is chosen for the source.
The type contains information used to create the source.

Getting Source Types
^^^^^^^^^^^^^^^^^^^^

Perform a ``GET /api/sourceTypeDescriptions``,
a response like the following will be returned:

.. code-block:: json

 [
   {
     "id":216,
     "name":"Wikipedia Pages",
     "version":"0.1.1",
     "implementationClassName":"com.koverse.addon.web.source.WikipediaPagesSource",
     "sourceTypeId":"wikipedia-pages-source",
     "customParameterFormJavascriptPath":null,
     "parameters":[

     ],
     "flowParameters":[
        {
           "id":217,
           "displayName":"Article Title List",
           "parameterName":"pageTitleListParam",
           "type":"string",
           "enumerations":[

           ],
           "defaultValue":null,
           "required":true,
           "hint":"",
           "javascriptClassName":null,
           "addOnId":null,
           "parameterGroup":"Target",
           "position":1,
           "placeholder":"Article_One Article_Two",
           "referenceParameterNames":null,
           "hideInput":false
        }
     ],
     "disabled":false,
     "executionMethod":"MapReduce",
     "addonId":204
   },
   {
      "id":46,
      "name":"Email Account (IMAP)",
      "version":"0.1.1",
      "implementationClassName":"com.koverse.addon.email.source.ImapSource",
      "sourceTypeId":"imap-source",
      "customParameterFormJavascriptPath":null,
      "parameters":[
         {
            "id":47,
            "displayName":"IMAP Server",
            "parameterName":"hostName",
            "type":"string",
            "enumerations":[

            ],
            "defaultValue":null,
            "required":true,
            "hint":"",
            "javascriptClassName":null,
            "addOnId":null,
            "parameterGroup":"Access",
            "position":1,
            "placeholder":"imap.example.com",
            "referenceParameterNames":null,
            "hideInput":false
         },
         {
            "id":48,
            "displayName":"Username",
            "parameterName":"username",
            "type":"string",
            "enumerations":[

            ],
            "defaultValue":null,
            "required":true,
            "hint":"",
            "javascriptClassName":null,
            "addOnId":null,
            "parameterGroup":"Access",
            "position":2,
            "placeholder":null,
            "referenceParameterNames":null,
            "hideInput":false
         },
         {
            "id":49,
            "displayName":"Password",
            "parameterName":"password",
            "type":"string",
            "enumerations":[

            ],
            "defaultValue":null,
            "required":true,
            "hint":"",
            "javascriptClassName":null,
            "addOnId":null,
            "parameterGroup":"Access",
            "position":3,
            "placeholder":null,
            "referenceParameterNames":null,
            "hideInput":true
         }
      ],
      "flowParameters":[

      ],
      "disabled":false,
      "executionMethod":"MapReduce",
      "addonId":45
   },
   {
      "id":205,
      "name":"Newsfeed Source",
      "version":"1.1",
      "implementationClassName":"com.koverse.addon.web.source.NewsfeedSource",
      "sourceTypeId":"newsfeedSource",
      "customParameterFormJavascriptPath":null,
      "parameters":[
         {
            "id":206,
            "displayName":"RSS Feed URL",
            "parameterName":"urlParameter",
            "type":"url",
            "enumerations":[

            ],
            "defaultValue":null,
            "required":true,
            "hint":"",
            "javascriptClassName":null,
            "addOnId":null,
            "parameterGroup":"Target",
            "position":1,
            "placeholder":"http://rssfeedurl.xml",
            "referenceParameterNames":null,
            "hideInput":false
         }
      ],
      "flowParameters":[

      ],
      "disabled":false,
      "executionMethod":"MapReduce",
      "addonId":204
  }
 ]

Create a Source
^^^^^^^^^^^^^^^

In this section, we will create a source for getting a Wikipedia page.
By examining the source type description of the Wikipedia Pages source below,
we can see that the source has a unique identifier and requires a single parameter.
We need to set this information to construct the JSON for creating a source.
This source has a single parameter for the name of the Wikipedia pages to import.
The parameter is required and has a unique name.
The parameter also includes information which is useful when presenting the user a user interface form for providing the value.

.. code-block:: json

 {
  "id":216,
  "name":"Wikipedia Pages",
  "version":"0.1.1",
  "implementationClassName":"com.koverse.addon.web.source.WikipediaPagesSource",
  "sourceTypeId":"wikipedia-pages-source",
  "customParameterFormJavascriptPath":null,
  "parameters":[

  ],
  "flowParameters":[
     {
        "id":217,
        "displayName":"Article Title List",
        "parameterName":"pageTitleListParam",
        "type":"string",
        "enumerations":[

        ],
        "defaultValue":null,
        "required":true,
        "hint":"",
        "javascriptClassName":null,
        "addOnId":null,
        "parameterGroup":"Target",
        "position":1,
        "placeholder":"Article_One Article_Two",
        "referenceParameterNames":null,
        "hideInput":false
     }
  ],
  "disabled":false,
  "executionMethod":"MapReduce",
  "addonId":204
 }

To create the source, perform a ``POST /api/sourceInstances``,
with the following JSON to get articles for "Cat" and "Dog":

.. code-block:: json

 {
   "name":"",
   "configurationOptions":{
     "pageTitleListParam":"Cat Dog"
   },
   "sourceTypeId":"wikipedia-pages-source"
 }

Note the ``configurationOptions`` includes the name of the articles to get,
with the name of the parameter coming the source type description.

 The response to this ``POST`` will include the identifier, among other information:

.. code-block:: json

 {
   "id":322,
   "name":"",
   "configurationOptions":{
      "pageTitleListParam":"Cat Dog"
   },
   "disabled":false,
   "sourceTypeId":"wikipedia-pages-source",
   "userId":4,
   "clearOutputDataSet":false,
   "emailAlertConfiguration":null
 }


Creating an Import Flow
^^^^^^^^^^^^^^^^^^^^^^^

After creating the source, create an import flow by performing a ``POST /api/importFlows``:

.. code-block:: json

  {
    "sourceInstanceId":322,
    "type":"manual"
  }

The following JSON will be returned:

.. code-block:: json

 {
  "id":325,
  "responsibleUserId":4,
  "disabled":false,
  "type":"manual",
  "creationDate":0,
  "lastUpdatedDate":1540395107232,
  "lastExecutionDate":0,
  "disabledDate":null,
  "executionCount":0,
  "normalizations":[

  ],
  "schedules":[

  ],
  "configurationOptions":{

  },
  "ingestState":{

  },
  "sourceInstanceId":322,
  "outputDataSetId":null
 }

Note that the identifier of the import flow in this example is ``325``.

Creating a DataSet for the Imported Data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Import Source must have a DataSet to put records into.
The DataSet must be created with an API call and then the Import Flow must be altered to refer to it.

To create a DataSet, perform a ``POST /api/dataSets``, with the following JSON:

.. code-block:: json

 {
   "name":"wiki",
   "importFlowId":325,
   "indexingPolicy":{
     "foreignLanguageIndexing":false,
     "fieldsInclusive":false
   }
  }

This DataSet will be configured to index all fields and is tied to the Import Flow that just created.
The JSON response will look like this:

.. code-block:: json

 {
   "id":"wiki_20181024_122800_381",
   "name":"wiki",
   "description":null,
   "deleted":false,
   "groupPermissionIds":null,
   "indexingPolicyId":363,
   "indexingPolicy":null,
   "tags":null,
   "userId":4,
   "createdTimestamp":1540398480384,
   "updatedTimestamp":1540398480384,
   "recordCountLastUpdated":1540398480424,
   "recordCount":0,
   "sizeBytes":0,
   "disableFieldStats":false,
   "disableSampling":false,
   "status":"Ready",
   "hadoopDeleteJobIds":[

   ],
   "dataStoreAuthRemoved":false,
   "version":0,
   "importFlowId":null,
   "importFlowIds":[

   ],
   "ageOffEnabled":false,
   "ageOffDays":0,
   "ageOffIndexDays":0,
   "fieldStatsMinimumExecutionPeriod":0,
   "samplingMinimumExecutionPeriod":0,
   "aggregationMinimumExecutionPeriod":0,
   "schemaMinimumExecutionPeriod":0,
   "indexMinimumExecutionPeriod":0
 }

Next, the Import Flow must be configured to use this new DataSet.
This is done by performing a ``PUT api/importFlows/325`` with the following JSON:

.. code-block:: json

 {
   "id":352,
   "responsibleUserId":4,
   "disabled":false,
   "type":"manual",
   "creationDate":0,
   "lastUpdatedDate":1540398451710,
   "lastExecutionDate":0,
   "disabledDate":null,
   "executionCount":0,
   "configurationOptions":{

   },
   "ingestState":{

   },
   "sourceInstanceId":349,
   "outputDataSetId":"wiki_20181024_122800_381"
 }

Executing an Import Flow
^^^^^^^^^^^^^^^^^^^^^^^^

Now that the source is tied to an Import Flow, it can be executed.
To execute an import flow, simply perform a ``POST /api/importFlows/325/execute``
with no request body.
A response like the following will be returned, which is the job information of the newly executed import flow:

.. code-block:: json

 {
  "id":341,
  "userId":4,
  "creationDate":1540397695329,
  "startedDate":0,
  "endedDate":0,
  "status":"created",
  "errorDetail":null,
  "statusMessage":null,
  "userAcknowledged":false,
  "origin":"USER_REQUEST",
  "overrideBlockedStatus":null,
  "progress":0.0,
  "type":null,
  "dataSetId":null,
  "errors":[

  ],
  "outputDataSetId":null,
  "inputDataSetIds":null,
  "backendUserInterfaceUrl":null,
  "recordCount":0,
  "name":null,
  "hadoopName":null,
  "source":{
     "id":322,
     "name":"",
     "configurationOptions":{
        "pageTitleListParam":"Cat"
     },
     "disabled":false,
     "sourceTypeId":"wikipedia-pages-source",
     "userId":4,
     "clearOutputDataSet":false,
     "emailAlertConfiguration":null
  },
  "outputCollection":{
     "id":"wiki_20181024_121454_795",
     "name":"wiki",
     "description":null,
     "deleted":false,
     "groupPermissionIds":[

     ],
     "indexingPolicyId":338,
     "indexingPolicy":null,
     "tags":null,
     "userId":4,
     "createdTimestamp":1540397694796,
     "updatedTimestamp":1540397695137,
     "recordCountLastUpdated":1540397695557,
     "recordCount":0,
     "sizeBytes":0,
     "disableFieldStats":false,
     "disableSampling":false,
     "status":"Ready",
     "hadoopDeleteJobIds":[

     ],
     "dataStoreAuthRemoved":false,
     "version":0,
     "importFlowId":null,
     "importFlowIds":[
        325
     ],
     "ageOffEnabled":false,
     "ageOffDays":0,
     "ageOffIndexDays":0,
     "fieldStatsMinimumExecutionPeriod":0,
     "samplingMinimumExecutionPeriod":0,
     "aggregationMinimumExecutionPeriod":0,
     "schemaMinimumExecutionPeriod":0,
     "indexMinimumExecutionPeriod":0
  },
  "className":null,
  "jobType":"MapReduce",
  "transforms":[
  ]
 }


To retrieve further information of the job, perform a ``GET /api/jobs``,
which will return that status of all jobs.

The status of the job will migrate from ``created`` to ``running`` and finally to ``successful``.
If the job fails, the status will be ``error``.
After the job has completed successfully, the records, field statistics, and samples will be available.
In the next section, a transform will be created and executed.
However, the transform job should not be executed until the import job has completed.

Transforming Data
-----------------

Getting Transform Types
^^^^^^^^^^^^^^^^^^^^^^^

Transform types are similar to Source Type Descriptions in that they describe how to create a transform.
To get the available transform type, perform a ``GET /api/transformTypes``, which will return JSON like the following:

.. code-block:: json

 [
   {
      "id":23,
      "typeId":"sparkSqlTransform",
      "name":"Spark SQL Transform",
      "description":"",
      "parameters":[
         {
            "id":24,
            "displayName":"Input Collection(s)",
            "parameterName":"inputCollection",
            "type":"inputCollection",
            "enumerations":[

            ],
            "defaultValue":null,
            "required":true,
            "hint":"The input collections(s).",
            "javascriptClassName":null,
            "addOnId":null,
            "parameterGroup":null,
            "position":0,
            "placeholder":null,
            "referenceParameterNames":null,
            "hideInput":false
         },
         {
            "id":25,
            "displayName":"Output Collection",
            "parameterName":"outputCollection",
            "type":"outputCollection",
            "enumerations":[

            ],
            "defaultValue":null,
            "required":true,
            "hint":"The output collection.",
            "javascriptClassName":null,
            "addOnId":null,
            "parameterGroup":null,
            "position":0,
            "placeholder":null,
            "referenceParameterNames":null,
            "hideInput":false
         },
         {
            "id":26,
            "displayName":"SQL select Statement",
            "parameterName":"sqlStatement",
            "type":"text",
            "enumerations":[

            ],
            "defaultValue":"SELECT * FROM ?1",
            "required":true,
            "hint":"You can refer to each data set name as if it is a table name.  If the data set name has spaces in it, surround the name in back ticks.  For example: SELECT * FROM `A Data Set of Stuff`.  You can also use ?1, ?2 to refer to input collections, where the numbers are in accordance to the alphanumeric ordering of the input collection names.  Note that letter case is not taken into consideration for the ordering of collection names.",
            "javascriptClassName":null,
            "addOnId":null,
            "parameterGroup":null,
            "position":0,
            "placeholder":null,
            "referenceParameterNames":null,
            "hideInput":false
         },
         {
            "id":27,
            "displayName":"Spark Job Configurations",
            "parameterName":"tuningParameters",
            "type":"textarea",
            "enumerations":[

            ],
            "defaultValue":"",
            "required":false,
            "hint":"one on each line <parameter>=<value>",
            "javascriptClassName":null,
            "addOnId":null,
            "parameterGroup":null,
            "position":0,
            "placeholder":null,
            "referenceParameterNames":null,
            "hideInput":false
         },
         {
            "id":28,
            "displayName":"Interpret string field values in output records as types",
            "parameterName":"termTypeDetectOutputStrings",
            "type":"boolean",
            "enumerations":[

            ],
            "defaultValue":"true",
            "required":true,
            "hint":"",
            "javascriptClassName":null,
            "addOnId":null,
            "parameterGroup":null,
            "position":0,
            "placeholder":null,
            "referenceParameterNames":null,
            "hideInput":false
         }
      ],
      "disabled":false,
      "transformClassName":"com.koverse.addon.sparksql.SparkSqlTransform",
      "version":"1.4.0",
      "supportsIncrementalProcessing":true
   },
   {
      "id":29,
      "typeId":"spark-copy-transform",
      "name":"Spark Copy Transform",
      "description":"",
      "parameters":[
         {
            "id":30,
            "displayName":"Input Collection(s)",
            "parameterName":"inputCollection",
            "type":"inputCollection",
            "enumerations":[

            ],
            "defaultValue":null,
            "required":true,
            "hint":"The input collections(s).",
            "javascriptClassName":null,
            "addOnId":null,
            "parameterGroup":null,
            "position":0,
            "placeholder":null,
            "referenceParameterNames":null,
            "hideInput":false
         },
         {
            "id":31,
            "displayName":"Output Collection",
            "parameterName":"outputCollection",
            "type":"outputCollection",
            "enumerations":[

            ],
            "defaultValue":null,
            "required":true,
            "hint":"The output collection.",
            "javascriptClassName":null,
            "addOnId":null,
            "parameterGroup":null,
            "position":0,
            "placeholder":null,
            "referenceParameterNames":null,
            "hideInput":false
         }
      ],
      "disabled":false,
      "transformClassName":"com.koverse.addon.sparksql.SparkCopyTransform",
      "version":"0.1.0",
      "supportsIncrementalProcessing":true
   }
 ]

 The above example only shows two of the available transform types.
 The first is the Spark SQL transform, which proved the ability to run arbitrary SQL expressions as a transform.
 The second is the Spark Copy transform, which simply copies the records of one data set to another.
 The guide will use the SQL transform.


Getting DataSets
^^^^^^^^^^^^^^^^

Before a transform is created, the identifiers of the input and output Data Sets must be known.
All Data Sets can be retrieved by performing a ``GET /api/dataSets``, which will return JSON like below:

.. code-block:: json

 [
  {
     "id":"wiki_20181024_121454_795",
     "name":"wiki",
     "description":null,
     "deleted":false,
     "groupPermissionIds":[

     ],
     "indexingPolicyId":338,
     "indexingPolicy":null,
     "tags":null,
     "userId":4,
     "createdTimestamp":1540397694796,
     "updatedTimestamp":1540397727494,
     "recordCountLastUpdated":1540409336559,
     "recordCount":1,
     "sizeBytes":0,
     "disableFieldStats":false,
     "disableSampling":false,
     "status":"Ready",
     "hadoopDeleteJobIds":[

     ],
     "dataStoreAuthRemoved":false,
     "version":0,
     "importFlowId":null,
     "importFlowIds":[
        325
     ],
     "ageOffEnabled":false,
     "ageOffDays":0,
     "ageOffIndexDays":0,
     "fieldStatsMinimumExecutionPeriod":0,
     "samplingMinimumExecutionPeriod":0,
     "aggregationMinimumExecutionPeriod":0,
     "schemaMinimumExecutionPeriod":0,
     "indexMinimumExecutionPeriod":0
  }
 ]

Here, the system only has one Data Set, take note of the identifier of it:
``wiki_20181024_121454_795``.

Since a transform has an input Data Set and at least one output Data Set,
an output Data Set will have to be created.
Consult the previous section on how to create a new Data Set.
For the purposes of this guide, it is assumed that a Data Set with the identifier of
``copy_20181024_153510_235`` has already been created.

Creating a Transform
^^^^^^^^^^^^^^^^^^^^

To create a Transform, perform a ``POST /api/transforms`` with the definition of the transform as the reqwuest body:

.. code-block:: json

 {
   "configurationOptions":{
      "sqlStatement":"SELECT * FROM ?1",
      "termTypeDetectOutputStrings":true
   },
   "disabled":false,
   "scheduleType":"automatic",
   "inputDataWindowType":"allData",
   "replaceOutputData":true,
   "inputDataSlidingWindowOffsetSeconds":0,
   "inputDataSlidingWindowSizeSeconds":0,
   "inputDataSetIds":[
      "wiki_20181024_121454_795"
   ],
   "transformTypeId":"sparkSqlTransform",
   "outputDataSetId":"copy_20181024_153510_235"
 }

Note that, like the source from the previous section, the ``configurationOptions`` are passed in as the Transform parameters.
However, an important difference is that the Transform also specifies the input and output Data Sets.
In the above example, the identifers of the Data Sets we have created have been inserted into the request.
The response will have the full definition of the transform:

.. code-block:: json

 {
  "id":384,
  "transformTypeId":"sparkSqlTransform",
  "configurationOptions":{
     "sqlStatement":"SELECT * FROM ?1",
     "termTypeDetectOutputStrings":true,
     "outputCollection":"copy_20181024_153510_235",
     "inputCollection":[
        "wiki_20181024_121454_795"
     ]
  },
  "disabled":false,
  "creationDate":1540409710463,
  "lastUpdatedDate":1540409710463,
  "disabledDate":null,
  "minimumExecutionPeriod":30,
  "currentJobProgress":0.0,
  "user":{
     "id":4,
     "firstName":null,
     "lastName":null,
     "email":"admin",
     "groups":[

     ],
     "externalGroups":[

     ],
     "groupIds":[
        1,
        3
     ],
     "tokens":[

     ],
     "disabled":false,
     "creationDate":1540393414021,
     "passwordResetHash":null,
     "authenticatorUserId":"koverseDefault_admin",
     "authenticatorTypeId":"koverseDefault",
     "newPassword":null,
     "newPasswordConfirm":null
  },
  "displayName":null,
  "backend":"SPARK",
  "replaceOutputData":true,
  "scheduleType":"automatic",
  "inputDataWindowType":"allData",
  "inputDataSetId":null,
  "outputDataSetId":"copy_20181024_153510_235",
  "inputDataSetIds":[
     "wiki_20181024_121454_795"
  ],
  "inputDataSlidingWindowSizeSeconds":0,
  "inputDataSlidingWindowOffsetSeconds":0,
  "emailAlertConfiguration":null
 }

 Note that the identifier of the newly create is ``384``.
 That identifier will be used to execute the transform.

Executing a Transform
^^^^^^^^^^^^^^^^^^^^^

To execute the transform, use its identifier and perform a ``GET /api/transforms/384/runTransform``.
Like when executing a source, job status information will be returned.
The status of the job can be determined by polling for all job status information with ``GET /api/jobs``.
