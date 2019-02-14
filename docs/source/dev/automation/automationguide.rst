.. _automationguide:

================
Automation Guide
================

This guide will help you write a client that uses Koverse's Automation API to automate the creation, execution, and tear down of entire data flows.
The first section focuses on an example client.
The second section highlights the Thrift calls and provides sample requests and responses.

The complete code for this example can be found at https://github.com/Koverse/koverse-examples in the 'automation' folder.

Many production data flows consist of reading data from an external source and processing it to extract valuable information.
This client will illustrate setting up a data flow from an external data source, in this case Wikipedia, reading that data into a data set to make it secure and searchable, processing the text using the Extract Keywords Transform that ships with Koverse, and storing the keyword results in another data set.

The advantage of being able to setup data flows like this is that our client can handle creating, monitoring, and tearing down fairly complex data flows repeatedly with minimal effort from administrators or users.

Starting a new Automation Client
================================

First we have to registered our new client with Koverse to run these examples.
See section :ref:`managing-automation-clients` for details.
Note the name, and client secret for this application, which we'll put into a configuration file in our example.

Next we'll create a new Maven project with Java code.

Maven Dependencies
------------------

To use the Koverse Thrift API your Maven ``pom.xml`` file must have the following dependency:

.. code-block:: xml

   <dependency>
     <groupId>com.koverse</groupId>
     <artifactId>koverse-thrift-client</artifactId>
     <version>${koverse.version}</version>
   </dependency>

We're also going to use the lombok project to help avoid writing boilerplate:

.. code-block:: xml

  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.4</version>
  </dependency>


Main Method
-----------

Create a new Java class called ExampleDataFlowAutomator.java.
The entry point for this example is a main method that will call a series of other Java methods.
First it removes a previous data flow with the same name, if it exists.
Then it will create data sets, data sources, and transforms.
It will also execute the data flow.

.. code-block:: java

  public static void main(String[] args) throws TException, IOException, InterruptedException {

    String dataFlowName = "Example Data Flow";
    String pages = "Thor Odin Freyja";
    Client client = connect();

    tearDownDataFlow(client, dataFlowName);
    setupDataFlow(client, dataFlowName, pages);
    executeAndMonitorDataFlow(client, dataFlowName);
    previewOutput(client, dataFlowName);
  }


Authentication
--------------

Storing credentials securely can be done in several ways.
This example pulls credentials from a configuration file on the Classpath of the application.
The intent is to be able to lock down read permissions on the configuration file as needed.
In this example, the configuration file, 'client.properties', is in src/main/resources and should consist of:

..
  client.name=example
  client.secret=[your-client-secret-here]
  koverse.host=localhost

Then we'll add a method for parsing this file and connecting to the Automation API:

.. code-block:: java

  private static Client connect() throws IOException, TException {

    String rootPath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
    String appConfigPath = rootPath + "client.properties";

    Properties appProperties = new Properties();
    appProperties.load(new FileInputStream(appConfigPath));

    String host = appProperties.getProperty("koverse.host");
    String name = appProperties.getProperty("client.name");
    String secret = appProperties.getProperty("client.secret");

    if(host.isEmpty() || name.isEmpty() || secret.isEmpty()) {
      throw new IllegalArgumentException("You must update the client.properties file before running this example.");
    }

    ClientConfiguration config =
        ClientConfiguration.builder().host(host).clientName(name).clientSecret(secret).build();

    return new Client(config);
  }

.. _creating-a-source:

Creating a Source
-----------------

Sources in Koverse represent an external data source.
This method creates a Source that allows our client to download pages from Wikipedia.
This Source ships with Koverse so we just need to identify that we want the Wikipedia Pages Source and to configure the source to pull down the list of pages given:

.. code-block:: java

  private static TSource getExampleSource (Client client, String dataFlowName, String pages) throws TException {
     TSource wikipediaSource = new TSource();
     wikipediaSource.setName(dataFlowName + " Wikipedia Source");
     wikipediaSource.setTypeId("wikipedia-pages-source");

     Map<String, String> importOptions = new HashMap<>();
     importOptions.put("pageTitleListParam", pages);
     wikipediaSource.setParameters(importOptions);

     // this will fill out the ID of the source
     wikipediaSource = client.createSource(wikipediaSource);

     return wikipediaSource;
   }

Create Data Flow
----------------

The main method above called setupDataFlow() and passed the Client(connection) object and the dataSetName.
Now let's take a look at what the data set setup code looks like.

.. code-block:: java

  public static void setupDataFlow(Client client, String dataFlowName, String pages) throws TException {

    // First we need a source for our data
    TSource tSource =  getExampleSource(client, dataFlowName, pages);

    // Set up the DataSet (TCollection) object
    TCollection dataSet = client.createDataSet(dataFlowName);

    // Set the indexing policy
    TIndexingPolicy tIndexingPolicy = new TIndexingPolicy();
    tIndexingPolicy.setForeignLanguageIndexing(false);
    dataSet.setIndexingPolicy(tIndexingPolicy);

    // Save the updated dataSet
    dataSet = client.updateDataSet(dataSet);

    // ...
  }

Next we need connect an import flow to pull in data:

.. code-block:: java

  public static void setupDataFlow(Client client, String dataFlowName, String pages) throws TException {

    // ...

    TImportFlow importFlow = new TImportFlow();

    importFlow.setSourceId(tSource.getSourceId());
    importFlow.setDataCollectionId(dataSet.getId());
    importFlow.setType(TImportFlowType.MANUAL);
    importFlow = client.createImportFlow(importFlow);

    // save import flow id back to dataset
    List<Long> importFlowIds = Arrays.asList(importFlow.getImportFlowId());
    dataSet.setImportFlowIds(importFlowIds);
    client.updateDataSet(dataSet);

    // ...
  }

With this import flow created we can initiate an import of data from Wikipedia into our data set.
We'll setup a Transform now to automatically extract keywords from articles after they are imported.
This Transform will write results to another data set, which we'll create now too:

.. code-block:: java

  public static void setupDataFlow(Client client, String dataFlowName, String pages) throws TException {

    // ...

    TCollection wordCountDataSet = client.createDataSet(dataFlowName + " Keywords");

    TTransform transform = new TTransform();
    transform.setType("word-count-transform");
    transform.setDisabled(false);

    // setting the schedule type to AUTOMATIC means the transform will run
    // whenever there is new data to process
    transform.setScheduleType(TTransformScheduleType.AUTOMATIC);
    transform.setInputDataWindowType(TTransformInputDataWindowType.NEW_DATA);
    transform.setReplaceOutputData(false);
    transform.setInputDataSlidingWindowOffsetSeconds(0);
    transform.setInputDataSlidingWindowSizeSeconds(0);

    // configure the transform to process text in the "article" field
    Map<String, TConfigValue> transformOptions = new HashMap<>();

    TConfigValue textFieldValue = new TConfigValue();
    textFieldValue.setType(TConfigValueType.STRING);
    textFieldValue.setStringValue("article");
    transformOptions.put("textFieldName", textFieldValue);

    TConfigValue titleFieldValue = new TConfigValue();
    titleFieldValue.setType(TConfigValueType.STRING);
    titleFieldValue.setStringValue("title");
    transformOptions.put("titleFieldName", titleFieldValue);

    TConfigValue numKeywordsValue = new TConfigValue();
    numKeywordsValue.setType(TConfigValueType.LONG);
    numKeywordsValue.setLongValue(20L);
    transformOptions.put("numKeywords", numKeywordsValue);

    // configure the transform to read from the wikipedia articles data set
    TConfigValue inputCollectionValue = new TConfigValue();
    inputCollectionValue.setType(TConfigValueType.STRING_LIST);
    inputCollectionValue.setStringList(newArrayList(dataSet.getId()));
    transformOptions.put("inputCollection", inputCollectionValue);

    // configure the transform to write results to the word count data set
    TConfigValue outputCollectionValue = new TConfigValue();
    outputCollectionValue.setType(TConfigValueType.STRING);
    outputCollectionValue.setStringValue(wordCountDataSet.getId());
    transformOptions.put("outputCollection", outputCollectionValue);

    transform.setParameters(transformOptions);

    client.createTransform(transform);
  }

Now the data flow is setup.
We set the type of the Source to 'manual', so it will only run when we trigger it.
Other data flows can be set to run on a set schedule.

We'll write a function now to start the import, which will download the Wikipedia pages we specified and store them in a data set, and it will trigger the transform to process the text in those pages, counting the number of times each word occurs in each page.

Execute And Monitor the Import
------------------------------

This code starts one run of our data flow.

.. code-block:: java

  public static void executeAndMonitorDataFlow(Client client, String dataFlowName)
          throws TException, InterruptedException {

    TCollection dataSet = client.getDataSetByName(dataFlowName);
    List<Long> importFlowIds = dataSet.getImportFlowIds();

    // start the import
    importFlowIds.forEach(ifid -> {
      try {
        System.out.println(String.format("executing data flow for %s %d", dataFlowName, ifid));
        client.executeImportFlow(ifid);
      } catch (TException ex) {
        System.out.println(ex.getMessage());
      }
    });

    // wait for import to complete
    waitForDataSetJobsToComplete(client, dataSet);

    TCollection resultsDataSet = client.getDataSetByName(dataFlowName + " Keywords");

    waitForDataSetJobsToComplete(client, resultsDataSet);
  }

This is the method for waiting for the jobs associated with a data set to complete:

.. code-block:: java

  private static void waitForDataSetJobsToComplete(Client client, TCollection dataSet)
      throws TException, InterruptedException {

    System.out.println(String.format("Waiting for jobs to start for data set %s ..", dataSet.getName()));
    Set<Long> jobIds = new HashSet<>();
    List<TJobAbstract> jobs = client.getAllActiveJobs(dataSet.getId());

    // we'll wait until the import job we requested starts
    while (jobs.isEmpty()) {
      Thread.sleep(2000);
      jobs = client.getAllActiveJobs(dataSet.getId());
    }

    System.out.println(String.format("got %d jobs running", jobs.size()));
    System.out.println("waiting for jobs to complete");

    // now we'll wait until the import job, background processing jobs, and transform job are completed
    while (!jobs.isEmpty()) {
      Thread.sleep(5000);
      jobs = client.getAllActiveJobs(dataSet.getId());
      for (TJobAbstract job : jobs) {
        jobIds.add(job.getId());
        System.out.println(String.format("Job %d %s: %s", job.getId(), job.getType(), job.getStatus()));
      }
    }

    System.out.println("jobs completed");

    // check for any jobs that errored out
    for (Long jobId : jobIds) {
      TJobAbstract job = client.getJob(jobId);
      if (job.getStatus().equals("error")) {
        System.out.println(String.format("Job completed with status error: %n%n %s", job.getErrorDetail()));
      }
    }
  }


Tearing Down a Data Flow
------------------------

Deleting a data set will cause its associated import flows and Transforms to be deleted as well.
So tearing down our example data flow consists of simply deleting the two data sets we have:

.. code-block:: java

 public static void tearDownDataFlow(Client client, String dataFlowName) throws TException {

     try {
       TCollection dataSet = client.getDataSetByName(dataFlowName);

       // deleting this data set will delete associated sources and transforms
       System.out.println("Deleting wikipedia pages data set ...");
       client.deleteDataSet(dataSet.getId());
     } catch (TNotFoundException tnfe) {
       // nothing to remove .. so skip
     }

     try {
       TCollection keywordDataSet = client.getDataSetByName(dataFlowName + " Keywords");

       System.out.println("Deleting keyword data set ...");
       client.deleteDataSet(keywordDataSet.getId());
     } catch (TNotFoundException tnfe) {
       // nothing to remove
     }

     System.out.println(String.format("Done tearing down data flow: %s", dataFlowName));
   }

Previewing Results
------------------

To check that our data flow is working we can query for some results.
In our case, we'll ask for the top keywords associated with the Wikipedia page for Odin:

.. code-block:: java

  private static void previewOutput(Client client, String dataFlowName) throws TException {

    List<DataSetResult> results = client.luceneQuery(
        "title: Odin",
        newArrayList(dataFlowName + " Keywords"),
        0,
        0,
        Collections.emptyList(),
        Collections.emptyList());

    for (DataSetResult result : results) {
      System.out.println(String.format("Found %d results in data set: %s", result.getRecordMatchCount(), result.getName()));

      for (SimpleRecord record : result.getRecords()) {
        System.out.println(record.get("word") + " " + record.get("score"));
      }
    }
  }

Running the Example
-------------------

Now we have everything we need to setup a data flow.
Executing the main() function from an IDE or command line will show us the progress of our data flow::

  Deleting wikipedia pages data set ...
  Deleting keyword data set ...
  Done tearing down data flow: Example Data Flow
  setting up source
  setting up data set
  setting up import flow
  setting up derivative data set
  setting up transform
  executing data flow for Example Data Flow 2235
  Waiting for jobs to start for data set Example Data Flow ..
  got 1 jobs running
  waiting for jobs to complete
  Job 2248 IMPORT: created
  Job 2248 IMPORT: preparing
  Job 2248 IMPORT: running
  Job 2248 IMPORT: running
  Job 2254 SAMPLING: created
  ...
  Job 2250 STATISTICS: running
  Job 2256 TRANSFORM: inQueue
  Job 2250 STATISTICS: running
  Job 2256 TRANSFORM: inQueue
  Job 2256 TRANSFORM: inQueue
  Job 2256 TRANSFORM: running
  Job 2256 TRANSFORM: running
  jobs completed
  Waiting for jobs to start for data set Example Data Flow Keywords ..
  got 4 jobs running
  waiting for jobs to complete
  Job 2258 INDEXING: preparing
  Job 2260 SAMPLING: preparing
  Job 2264 SCHEMA: preparing
  Job 2262 STATISTICS: preparing
  ...
  Job 2264 SCHEMA: running
  Job 2264 SCHEMA: running
  Job 2264 SCHEMA: running
  jobs completed

  Found 20 results in data set: Example Data Flow Keywords
  lang 71.92051811294522
  ravens 9.010913347279288
  birds 7.6246189861593985
  spear 6.931471805599453
  university 5.545177444479562
  trans 5.545177444479562
  sfn 5.545177444479562
  godan 4.852030263919617
  citation 4.1588830833596715
  dronke 4.1588830833596715
  took 4.1588830833596715
  thorpe 3.739866941873151
  novel 3.4657359027997265
  huginn 3.4657359027997265
  muninn 3.4657359027997265
  bird 3.4657359027997265
  2003 3.4657359027997265
  herbert 3.4657359027997265
  rune 3.4657359027997265
  museum 3.4657359027997265

  Process finished with exit code 0
