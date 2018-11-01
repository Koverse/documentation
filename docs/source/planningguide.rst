.. _PlanningGuide:

Solution Planning Guide
=======================

Introduction to Intelligent Solutions and Koverse
-------------------------------------------------

An *intelligent solution* is a system that:

#.	Delivers meaningful insights and data to users
#.	Continuously evolves to meet changing requirements
#.	Is informed by all available data
#.	Leverages analytics and artificial intelligence to pre-compute insights whenever possible

The *Koverse Intelligence Solutions Platform (Koverse)* is designed to simplify the process of building, deploying and continuously improving intelligent data solutions.
Koverse is the only technology that provides all the functionality necessary to build an intelligent solution end to end in a fully integrated platform.

While intelligent solutions can provide extraordinary value to a business or organization, engineering efforts to create them frequently fail for a variety of reasons resulting from complexity associated with; security and governance, constantly evolving requirements, integration with existing systems, customer/management support, scalability and lack of specialized expertise.
Frequently efforts to build an intelligent solution are bogged down and eventually fail due to these factors.
**As of 2017, Gartner estimates that up to 85% of big data projects fail due to these issues.**
Koverse is a unified platform that dramatically reduces the complexity and increases the chance of success associated with any intelligent solution effort.
Specifically, Koverse integrates the following functionality, critical for any intelligent solution:

Data Lake Storage
  First, Koverse provides all the functionality of a traditional data lake; the ability to store and process massive amounts of heterogenous data, both structured and unstructured.
  Koverse is unique however in that instead of storing data in blobs or files like other data lakes, Koverse stores data as individual **records**, which are logically grouped into **data sets**.
  Like a data lake, there is no restriction on the schema or structure of individual records, but like a database, individual records can be referenced, retrieved and indexed.
  Data is loaded into the system via reusable **import sources**, which can be used to connect directly to and extract data from almost any existing system.

In-situ, scalable Data Processing with Spark.
  Koverse allows for ad-hoc, automated and scheduled bulk analytics to be executed in-situ and are called **transforms**.
  Transforms can be written in a variety of languages, and like import sources, are modular, reusable and output to data sets.
  Unlike import sources, which draw from external systems, transforms run entirely in-situ and draw data from existing data sets in the system.

Low Latency, high availability and high concurrency query.
  To provide timely and actionable insights, most intelligent solutions require low latency access to some or all of the data and analytic results generated in the system.
  Usually this functionality is achieved with a traditional relational or NoSQL database.  Koverse provides this functionality in-situ, right along side the bulk analytic and data storage capability.
  Koverse is built entirely upon and leverages the functionality and security of the Accumulo NoSQL database.
  **Indexing** can be customized per individual data set so that the right balance between performance and disk usage can be achieved. Koverse manages all the aspects of indexing and query, managing index creation, update, modification and deletion.
  This functionality allows development teams to completely avoid the significant complexity and expertise required to develop an enterprise grade application on top of a NoSQL database.

Unified Security Controls
  All aspects of the platform; individual data set and record level access, analytic execution, column visibility and masking, role based, indexing and query control are controlled on a per data set basis.
  As a result, intelligent solutions build on Koverse can safely support the most complex security requirements; and can do so without developers having to build and accredit a complex custom security framework.
  Koverse also includes full audit of all aspects of any solution built on the system.

Modularity
  Koverse offers development teams a simplified and accelerated path toward big data success by allowing engineering teams to break down their intelligent solutions into individual, modular pieces (import sources, data sets, transforms and indexes) and then secure and connect them together on the platform.
  Then easily adapt over time as requirements change.

What follows in this Planning and the subsequent Quick Start Guide is information to help design your Intelligent solution and gain familiarity with Koverse.

Designing your Koverse Based Intelligent Solution
-------------------------------------------------

This section talks you through the five key sequential steps in your solution planning:

#.	Identifying your business or mission requirements. Before committing to a particular design direction, brainstorm the different ways a Koverse solution can address your specific needs.
#.	Identifying data requirements. Assess the data you can leverage in your solution, including the ones that might have special data sensitivities.
#.	Designing a workflow. Map out how you want the data to flow through your solution, including any import sources or transforms you will apply and special indexes you will need to configure.
#.	Reviewing the Koverse APIs. Look over the list and categories of APIs available for building your solution, and learn what each one can do and plan which ones you will leverage.
#.	Sizing and scaling the solution architecture. Figure out how much disk space you'll need in the Apache Hadoop cluster that houses your solution.

Key principals for designing a Koverse Solution
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#.	Koverse is designed to enable the tradeoff of time, cost, complexity and performance for disk.  So whenever possible, a solution should leverage pre-computation of answers and analytics, capture of data in its rawest form and expressive data models.
#.	Solutions should start small and plan to increase capability over time.  Koverse solutions are agile, so you can adopt the strategy of quickly delivering into production a minimally viable capability to ensure user engagement and buy in, and then scale the capability is size and capability continuously over time.
#.	Ingest as much data as possible in its rawest form as possible. You never know where your solution evolution will take you so capturing data in its raw form allows you to always go back to source data to easily capture a new insight or support an unanticipated use case without having to go back to original data source.

Identifying your business or mission challenges
-----------------------------------------------

How you use Koverse depends in part on the unique characteristics and requirements of your desired intelligent solution.

As a first step in planning an intelligent solution on Koverse, take time to consider all of the opportunities for business improvement that this solution might provide. Ask:

*	**What insights are ACTIONABLE?** This is perhaps the most important question in the ongoing development of any intelligent solution.  Ask what insights can you provide that would cause another human or humans to take a different and more informed action in the real world?  All paths to success eventually lead to finding and delivering actionable insights.

*	**Where are the current EFFICIENCY GAPS in your business operations?** Take a close look at your day-to-day operations, from marketing and sales to fulfillment and customer service. Examine each step along the way, and look for areas for improvement—for example, where one process is idle because it's waiting for the output or resolution of another.

*	**What manual processes can you AUTOMATE?** As you review your operations, identify opportunities to replace manual processes with tasks that can be digitized and automated using your available data.

*	**What DATA do you have this is underutilized?** Keep in mind that the key strength of Koverse is its ability to help you manipulate data at scale without the need for expensive and complex custom architectures. Try reverse-engineering your business requirements by examining your existing data stores and asking in what ways the data can be put to better use.

*	**What value can you add to your CUSTOMER experience?** The easier and more compelling it is for your customers and business partners to use your solution, the better engagement and interaction you can expect. Talk to your customers and find out what kinds of service changes or improvements will help you better meet their expectations.

*	**What is the MVP?** What Minimal Viable Product or actionable insight, if provided to the customer or user, will result in a useful impact to the customer?  This should be the first major goal of the effort, to deliver this capability.

*	**How will the solution scale?** Once the MVP is established, what additional features and capabilities will be in demand?  The design should keep these features in mind during the initial design phase.

Remember—this is an opportunity to brainstorm. As you complete this step, don't feel compelled to ideate new solutions quite yet. It's more about gathering requirements at this point, including the easy ones and the ones that might feel way out of reach.

Identifying data requirements
-----------------------------

Once you have a sense of the business or mission challenges you want to address and the actionable insights you want to provide, start making a list of the data sets that will need to be part of the intelligent solution. Again, don't try to design the actual solution just yet—simply account for the data that will be needed. You'll have a chance to link the data together in the next step.

One helpful way to approach this step might be to think about the final UI for the app you'll ultimately build using Koverse. What operations will need to take place and what insights will be provided in that UI? For each operation, work backwards to determine the data sets that will be required. Make notes as you go about the purpose and sensitivity of each data set within the overall solution, and what types of manipulations (cleanup, normalizations, joins, analytics, etc.) might be required to make the data useful for your purposes.

Keep in mind the key principal that you should try to gather as much data as possible, whenever possible.  Koverse is designed to support the “Collect it all” mindset, allowing for any dataset to be easily ingested into the system, making it ready to be integrated into a solution when needed.  The hardest and most time consuming part in building an intelligent solution is getting access to the necessary data.  With Koverse, once you have the access to the data, you can suck it all in to the system so you can have it ready for whatever use case arises.

Addressing data sensitivities
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As part of this step, also make careful notes about the sensitivities related to each data set you specify. Koverse is a secure platform that integrates data access permissions into all of the operations you design your solution to perform. As such, key to planning your end-to-end solution will be accounting for these sensitivities so you can ensure you properly enforcing security requirements throughout the solution.

Designing a workflow
--------------------

Now, start connecting your data operations together to build the workstream for your solution. As with the previous step, try starting with the end in mind—what kind of actionable insight are you creating and how will it be displayed in the UI?  What kinds of questions will the user be asking and how can you precompute the answers? Then, work backward to each data set and determine the flow of data through your solution, including the ways you want the data to be queried, manipulated, and acted upon at each step along the way.

Import Sources
^^^^^^^^^^^^^^

Identify which specific import sources will be needed: which specific systems will need to have data pulled from.  Which data streams will need to be ingested.  Which systems can be setup using pre-exsiting import sources and which systems will require a custom developed import source.  Which datasets require a normalization and which require special security controls applied.

To expedite your solution development, Koverse includes a variety of pre-built import sources, You can also build custom data connectors using Koverse API. For more information, see the Koverse Developer Guide.

The following table lists our pre-built data connectors, along with the file types Koverse can read without any special configuration.

+-------------------------+--------------------+
|Pre-built data connectors|Supported file types|
+=========================+====================+
|MySQL                    |CSV, TSV            |
+-------------------------+--------------------+
|Oracle                   |JSON                |
+-------------------------+--------------------+
|PostgreSQL               |XML                 |
+-------------------------+--------------------+
|Cassandra                |HTML                |
+-------------------------+--------------------+
|Kafka                    |Microsoft Word      |
+-------------------------+--------------------+
|Twitter                  |Microsoft PowerPoint|
+-------------------------+--------------------+
|Wikipedia                |PDF                 |
+-------------------------+--------------------+
|FTP                      |Text                |
+-------------------------+--------------------+
|Amazon S3                |Avro                |
+-------------------------+--------------------+
|HDFS                     |Parquet             |
+-------------------------+--------------------+
|IMAP                     |X12                 |
+-------------------------+--------------------+
|RSS Newsfeed             |FASTA               |
+-------------------------+--------------------+
|URL                      |Mbox                |
+-------------------------+--------------------+

Applying transforms
^^^^^^^^^^^^^^^^^^^

As you build out your workstream, you'll need to make decisions about the analytics you want to perform in order to achieve your desired results.
Koverse uses *transforms* to achieve in-situ analytic processing—that is, to access one set of data and perform analytics to produce a new set of output with no data actually entering or leaving the system.
Transforms are the key to getting the most value out of your Koverse solution, because they enable you to access, process and store the results of analytics on data right where it resides.
Logically, transforms run on data sets and outputs data sets.  In this manner, transforms can be chained together in a variety of ways to achieve any arbitrary analytic workflow.

Scheduling Import Sources and Transforms
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Key to any workflow is the scheduling of dataflows and analytics.
With Koverse, every import sources and transforms can be independently scheduled to run a specific time or day, or week, or periodically.
Transforms can be configured to run automatically if one of their source data sets changes.
In addition, transforms can be configured to run on all of the source data, just the source data it has not processed yet, or a sliding window of the source data.
When designing a Koverse Intelligent solution once you have a feel for the overall workflow, you should plan out how you want to schedule all of the elements and consider the amount of data processing that the data flow will require.
The amount of data processing required for the workflow will impact how many resources the underlying cluster will require.

Executing Searches and Configuring indexes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once data has been processed and all pre-computations have been done, data needs to be searched and consumed by a user, web application or external system.
The best way to quickly and securely search and serve up data from within Koverse is with the Koverse web application API.
The Koverse web application API provides responsive search access to every dataset in Koverse.  A single Koverse instance can support a large number of concurrent searches per second and usually returns data within a few seconds.
The indexes used to support search functionality are automatically generated and managed by Koverse.
Within the Koverse Developer Guide there is a search and indexing guide that details the search and indexing capabilities within Koverse including the default index configuration, customized tokenization, composite index creation and custom field encryption.

These four capabilities; import, transform, scheduling and search can be easily stitched together to create the basis for any intelligent solution.

Reviewing the Koverse APIs
--------------------------

Koverse includes a set of APIs developers can access to build a customized solution.  There are four APIs availible

*	**Integration API.** Use API to create custom ingest sources, export sinks, integrate with external authentiion systems and customize indexing.
*	**Transform API.** Use the Transform API to prototype transforms with Jupyter Notebooks and productionize them with Java or Python.
*	**Web Application API.** Use this API for application search access to data within Koverse.
*	**Automation API.** Use this to automate your solution with an external application.    The Koverse UI provides an alternative to the Automation API, providing all functionality in the Automation API via an easy to use interface.  Information on how to use the Automation API is in the Koverse User Guide.

Detailed documentation of these APIs is included in the Koverse API Reference, including descriptions of all methods and parameters, and code examples to help with implementation. For now, you can review the APIs while looking at the workflow you've created to determine the development efforts required to build your solution.

Sizing and scaling the solution architecture
--------------------------------------------

Koverse runs on  Apache Hadoop clusters running Accumulo and HDFS. The Koverse Administration Guide provides detailed infrastructure specifications and installation guidance, but for now, just know that in order to run Koverse, you'll be building out a Hadoop cluster—generally in the same way you'd build one out for any other purpose.

That said, the final step in planning your solution is to get a rough idea of how big  your Hadoop cluster should be. As you determine this, keep a few important things in mind:

*	Koverse works on the principal of "flat" storage of your data in disk-based data stores. Because of the relative affordability of disk space, plan your solution to comfortably accommodate the amount of data you'll be using.
*	For best results, maintain your Koverse solution on a dedicated Hadoop cluster, not a cluster that is shared with other applications.
*	We don't recommend using VMware or other virtualized technologies as part of your Koverse solution.

So, how many resources is enough? The answer depends mostly on three variables: how much data you'll need to load, how many jobs you want to run concurrently, and the complexity of the analytics (transforms) your solution will perform.

As the following drawing shows, you can start your solution small as long as your total disk capacity accommodates your data needs and you'll mostly be running a low volume of search queries against the data. For larger data sizes and/or complex data analytics, you'll want to size the solution larger so you can optimize its performance.

.. image

Because Koverse uses disk space to store raw data, your solution can scale up easily by simply adding more disk space when you need it. With this in mind, we recommend assessing the total disk space your raw data will require, and then starting with 1.5 times that amount for your cluster. You can then add disk capacity as needed over time.  With that storage requirement in mind, production deployments should have a minimum of 5 nodes with a minimum of 8 cores per node.  More cores and more nodes will result in better and faster transform and search execution.
