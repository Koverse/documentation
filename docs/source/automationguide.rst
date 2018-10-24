.. _automationguide:

:tocdepth: 2

================
Automation Guide
================
.. contents:: :depth: 3

Overview
========

blah

Create a Data Source
====================

To create a data source, the data source types must be obtained first.
Of the types, one is chosen for the source.
The type contains information used to create the source.

Getting Source Types
--------------------

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
---------------

In this guide, we will create a source for getting a Wikipedia page.
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

 The response to this ``POST`` will include the identifeer, among other information:

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
-----------------------

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
-----------------------------------------

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
------------------------

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

Creating a Transform
====================

blah

Getting Transform Types
-----------------------

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
----------------

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
--------------------

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
---------------------

To execute the transform, use its identifier and perform a ``POST /api/transforms/384/runTransform``.
Like when executing a source, job status information will be returned.
The status of the job can be determined by polling for all job status information with ``GET /api/jobs``.

Deleting
========

blah

Delete a DataSet
----------------

blah

Getting Transforms
------------------

blah

Deleting a Transform
--------------------

blah

Getting Sources
---------------

blah

Deleting a Source
-----------------

blah
