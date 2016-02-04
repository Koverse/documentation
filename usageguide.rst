:tocdepth: 2

.. _usage-guide:

===================
Koverse User Guide
===================

The Koverse User Guide provides instructions for using the applications that are accessible via the Koverse Applications Dashboard.  
The User Guide Dashboard includes a number of icons which provide a link to all applications that have been deployed to the Koverse software platform.

.. note:: All images displayed in this online document are 'clickable'. When clicked, the image open in a new windows in full size.

Utility Navigation Bar
^^^^^^^^^^^^^^^^^^^^^^^

For easy navigation, account maintenance and general help, the Koverse Dashboard provides a **Utilitiy Navigation Bar** and is always available when navigating through all the various Koverse applications.
Please Note that clicking the Koverse logo at the left of the bar will take you home to the Dashboard from any child application page.

.. image:: /_static/Navigation-Bar.png
		:height: 50 px
		:width: 800 px

Navigation Bar Features:
^^^^^^^^^^^^^^^^^^^^^^^^
* Application Navigation
* Edit and view account details
    * email address 
    * first last name 
    * authorization tokens 
    * edit password
* Help
    * Koverse User Guide
    * Koverse Administration Guide
    * Koverse Operations Guide
    * Koverse Developers Documentation
    * Use Cases
    * Tutorials
* Logout of Koverse

The Koverse Application Dashboard
---------------------------------

.. image:: /_static/Dashboard.png
		:height: 300 px
		:width: 400 px

The Koverse dashboard categorizes the suite of features into the follow application groups:

* :ref:`kov-Analytics`
    * Correlation Application
    * Graph Viewer
    * Sequence Similarity
* :ref:`kov-Data_Discovery`
    * Dashboard Builder
    * Document Analysis
    * Geo Discovery
    * Search
* :ref:`kov-Data_Management`
    * Data Collections
    * Data Flow
    * File Upload
* :ref:`kov-System-Admin`
    * Audit Log
    * Configuration Manager
    * System Administration
    * System Monitoring

Each application's features, functionality and usage are discussed and presented throughout this user guide.

.. _kov-Analytics:

Analytics Application Group
---------------------------

The **Analytics Application Group** provides a package of applications which provide abilities to examine big data to uncover hidden patterns, unknown correlations and other useful information that can be used to make better decisions. 
By using the Koverse analytic tools in this application group, data scientists and others can analyze huge volumes of data that conventional analytics and business intelligence solutions can't touch. 

.. image:: /_static/Analytics-Group/Correlation-App-Icon.png
		:height: 75 px
		:width: 75 px
                :align: left

Correlation Application
^^^^^^^^^^^^^^^^^^^^^^^

Koverse's Correlation application was specifically designed to be used with the `Pearson Correlation <https://en.wikipedia.org/wiki/Pearson_product-moment_correlation_coefficient>`_ analytic.

How to analyze data using the Correlation Application
.....................................................

#. Click the Koverse Logo on the black **Navigation Bar** at the top of the screen.
 
#. Click the **Correlation Application** Icon. 

#. Click the Setup tab. This shows a list of collections that are appropriate for analysis using the Pearson Correlation transform.

#. Click the Analyze button. The Pearson Correlation transform is now running.

#. You can view the transform progress in the Data Flow Application by clicking on the black Navigation Bar and selecting Data Flow Icon.

#. Wait for the transform to complete - based on the current load of the system. 

#. After the transform is complete Koverse will profile and index the analytical results. The progress and output of these jobs can be seen in the Data Collections app.

.. _kov-Data_Discovery:

Data Discovery Application Group
--------------------------------

The **Data Discovery Application Group** bundles all the visualization elements together to deliver indexing, search and query abilities, and advanced capability of exploring data.

|

.. image:: /_static/Data-Discovery-Group/Dashboard-Builder-Icon.png
		:height: 75 px
		:width: 75 px
                :align: left

Dashboard Builder
^^^^^^^^^^^^^^^^^

The **Dashboard Builder** application is a tool to visualize fields within a collection and view visual summaries of the entire collection or of search results.

|

.. image:: /_static/Data-Discovery-Group/Document-Analysis-Icon.png
		:height: 75 px
		:width: 75 px
                :align: left

Document Analysis
^^^^^^^^^^^^^^^^^

The **Document Analysis** application enables you to collect and audit correlated data using the HP Fortify Runtime Hybrid Analysis technology. The Koverse platform comes with several build-in advanced analytics and machine learning algorithms.

These include, for example, the Pearson correlation, nearest neighbor calculation, simple regression scoring, and comprehensive in-0database near real-time aggregations such as TopK, sum, geobin, min, max, average, cardinality estimation, sets, quantile estimation, etc.

.. image:: /_static/Data-Discovery-Group/Geo-Discovery-Icon.png
		:height: 75 px
		:width: 75 px
                :align: left

Geo Discovery
^^^^^^^^^^^^^

The **Geo Discovery** application is used to create a heat-map from geographical data that can be explored by zooming and panning.

|

.. image:: /_static/Data-Discovery-Group/Search-Icon.png
		:height: 75 px
		:width: 75 px
                :align: left

Search Application
^^^^^^^^^^^^^^^^^^

The Search Application provides the user the ability to interactively query one or more Koverse Collections.

* To learn more about **Search** functionality, click :ref:`usr-kov-Search`
* To learn more about **Search Query Syntax**, click :ref:`LuceneQuerySyntax`

.. _kov-Data_Management:

Data Management Application Group
---------------------------------

The **Data Management Application Group** delivers all the abilities to load and manage the data collections where all your information resides.

|

.. image:: /_static/Data-Management-Group/Data-Collections-Icon.png
		:height: 75 px
		:width: 75 px
                :align: left

Data Collections
^^^^^^^^^^^^^^^^

The Data Collections Application provides the users the ability to manage and explore Data Collections. 
A Data Collection is simply a named collection of records. 
Collections are the primary mechanism by which data is tracked and managed in Koverse.

* To learn more about **Data Collection** functionality, click :ref:`usr-kov-Data-Collection`


* A data collection is made up of data from one or more data sources
* Import jobs transfer data from outside sources, into a data collection
* All data in all data collections have the same meta-information:

    * Data Access rules and permissions
    * Field statistics
    * Record Samples

* Access to query or update a collection can be granted to one or more groups of users
* Data Collection capacity is limited only by the available disk space, which is shared amongst all data collections.
* Click the Collections tab
* Click Add Data Collection and follow the prompts
* Name: give the collection a name.
* Description: provide a textual description of the collection.
* Data Permissions: enter the data permission information by group.(see configuring collection permissions for more info)
* Data Model: in the data model section you can specify any information you want to record about the data  model which applies to the data in the data collection. (see Configuring Collection Data Model for more info) 

To learn more about the **Data Collections** application features and functionality, please refer to: :ref:`usr-kov-Data-Collection`

|

.. image:: /_static/Data-Management-Group/Data-Flow-Icon.png
		:height: 75 px
		:width: 75 px
                :align: left

Data Flow Application
^^^^^^^^^^^^^^^^^^^^^

Koverse **Data Flow** application provides a graphical rendering of the association between data sources and data sinks.

To learn more about the **Data Flow** application features and functionality, please refer to: :ref:`usr-kov-Data-Flow`

The Data Flow application consists of five logical operational tabs:

.. list-table::
    :widths: 50 50
    :header-rows: 1

    * - Tab
      - Link
    * - Flow
      - :ref:`usr-Flow-tab`
    * - Imports
      - :ref:`usr-Imports-tab`
    * - Transforms
      - :ref:`TransformsTab`
    * - Exports
      - :ref:`ExportsTab`
    * - Jobs
      - :ref:`kov-Jobs-Tab`

Each Data Flow Tab provides functionality for managing data flows.

|

.. image:: /_static/Data-Management-Group/File-Upload-Icon.png
		:height: 75 px
		:width: 75 px
                :align: left

File Upload
^^^^^^^^^^^

File Upload Application provides the ability to ingest local files from the file system into Koverse, and load them into existing or new Data Collections. The user interface allows either the 'dragging' of a file, or the ability to ingest a file from a 'file system browser'.

.. figure:: /_static/Data-Management-Group/File-Upload.png
		:height: 200 px
		:width: 400 px

                Screen Snapshot: File Upload Drag and Drop Area

After selecting the file to load into the 'File Upload' staging cache, a series of parameters and configuration options are displayed to properly configure your file upload operation. 

.. figure:: /_static/Data-Management-Group/File-Upload-Parameters.png
		:height: 200 px
		:width: 400 px

                Screen Snapshot: File Upload Parameters

.. _kov-System-Admin:

System Administration Application Group
---------------------------------------

.. image:: /_static/Analytics-Group/Audit-Log-Icon.png
		:height: 75 px
		:width: 75 px
		:align: left

Audit Log
^^^^^^^^^

The Audit Log application displays details of all user activity, sorted in the order of the most recent events.  

For each event, the following information is displayed:

.. list-table::
    :widths: 50 50
    :header-rows: 1

    * - Column Name
      - Description
    * - Time
      - Date and Time of the event
    * - User
      - The name of the user who performed the activity
    * - Action
      - The type of the event
    * - Details
      - Event details

|

.. figure:: /_static/Analytics-Group/Audit.png
		:height: 500 px
		:width: 1000 px

                Screen snapshot: Audit Log Details

There are two features that allow the user to perform audit event analysis beyond scrolling forward and backward through the messages.

The first feature is the **Download** feature which allows the user to download a JSON formatted file that contains audit events for a date range.

The second feature provides key-word **Search** features for events of interest, such as a specific user's activity or a specific type of event. 

.. figure:: /_static/Analytics-Group/Audit-Log-Search.png
		:height: 200 px
		:width: 1000 px

                Screen snapshot: Audit Log Search and Download Feature

|

.. image:: /_static/Admin-Monitor-Group/Config-Manager-Icon.png
		:height: 75 px
		:width: 75 px
		:align: left

Configuration Manager
^^^^^^^^^^^^^^^^^^^^^

The Configuration Manager application gives users the ability to upload and download configuration for Data Collections, Sinks, Sources, and Transforms.  
In this manner, new Koverse instances can be stood up or reinitialized without the laborious task of reconfiguring all of these items.  Note that no actual data will be uploaded or downloaded from within this app, only *configuration*.

The Configuration Manager consists of two tabs applications **(Download and Upload)**.

.. figure:: /_static/Admin-Monitor-Group/Config-Manager-Download-Tab.png
		:height: 150 px
		:width: 300 px

                Screen snapshot: Configuration Manager Download Tab

.. figure:: /_static/Admin-Monitor-Group/Config-Manager-Upload-Tab.png
		:height: 150 px
		:width: 300 px

                Screen snapshot: Configuration Manager Upload Tab

.. image:: /_static/Admin-Monitor-Group/System-Admin-Icon.png
		:height: 75 px
		:width: 75 px
                :align: left

System Administration
^^^^^^^^^^^^^^^^^^^^^

Koverse System Administration application provides access to common administrative tasks for the product. 
The administrative abilities are grouped into category tabs of 'Users', 'Groups', 'System', 'Add-Ons', 'Applications' and 'API'.

* To learn more about **System Administration** application, click :ref:`usr-kov-System-Admin`

|

.. image:: /_static/Admin-Monitor-Group/System-Admin-Icon.png
		:height: 75 px
		:width: 75 px
		:align: left


System Monitoring
^^^^^^^^^^^^^^^^^

The System Monitoring App gives a view into the health and status of the distributed cluster on which Koverse is running.

* To learn more about **System Monitoring** application, click :ref:`SystemMonitoringApp`

|

|

|

.. image:: /_static/Data-Management-Group/Data-Collections-Icon.png
		:height: 75 px
		:width: 75 px
                :align: left

.. _usr-kov-Data-Collection:

Data Collection Application
---------------------------

Overview
^^^^^^^^

Users can view the status of the overall system on the first page of the Data Collections application. A list of all the Collections that the user is authorized to read are displayed. Metrics on the Collections are displayed including and the number of records in each collection.

.. figure:: /_static/Data-Management-Group/collection-overview.png
	:height: 300 px
	:width: 400 px

        Screen snapshot: Data Collection overview


Create a New Collection
^^^^^^^^^^^^^^^^^^^^^^^

A new data collection can be created from the **Data Collections** application simply by typing in the new collection name and clicking the 'Create New Collection' button.

To add data to a collection.
* First ensure that the data collection exists.  All data collections can be seen by clicking on the collections tab and are listed on the main page.   
* Select the desired data source from the Import tab. and click load data source and select the desired collection as the destination of the import.

.. figure:: /_static/Data-Management-Group/collection-create.png
	:height: 300 px
	:width: 600 px

        Screen snapshot: Data Collection Home Screen where a new collection can be created.

This new collection will be empty until some data is imported into it. This can be done in the Data Flow app, but also simply from the Import Jobs table of the Collection Details page, which is described next.

Viewing a Collection's Details
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To view the details of a particular collection, click on the collection name in the list of collections on the overview page. This will show a new page with tabs for the various aspects of a collection:

* Explore - shows a breakdown of the data types found in a collection along with a list of fields and top values found for each field.

.. figure:: /_static/CollectionManagerScreenshots/collection-explore.*
	:height: 300 px
	:width: 600 px

        Screen snapshot: Viewing Collection details via the Explore option.

A new collection will be missing much of this information, as it is gathered from the data within the collection. To import data into a new collection, follow the instructions under 'Adding Data to a Collection' in the next section.

In the collections tab click on configure and then click on configure access. This will take you to the access control view of the collection.  In this area a user can: 

* Can control access to every column of every dataset(in later versions you can control access to each individual cell of every dataset).  
* Define a default access control rule for un-identified elements in the data. 
* View, and optionally mark, the observed data elements from within already loaded datasets.

Adding Data to a Collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Data can be added to a collection from any Data Source that the user has access to. Creating new sources must be done in the Data Flow application :ref:`usr-kov-Data-Flow`.

To import data from a Data Source into a collection:

* Click the **Imports** tab in the Data Flow application screen
* Click the **Run Import Job** button on the right.
* Select a Data Source from which to import
* Select the name of the Collection into which to import the data
* Optionally select any import-time transforms to apply to this import job
* Click the blue *Run Import Job* button

.. figure:: /_static/Data-Management-Group/Import-Sources.png
	:height: 200 px
	:width: 400 px

        Screen snapshot: Imports Tab Screen

Editing Collection Details, Deleting, and Clearing a Collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. figure:: /_static/CollectionManagerScreenshots/Collection-Configuration.png
	:height: 300 px
	:width: 600 px

        Screen snapshot: Collection Details screen.

Deleting a data collection removes all data contained within that data collection, and all meta data. Scheduled jobs that use the data collection will fail. 

Clearing a collection removes all records within a collection but leaves the configuration information intact including indexing policy, user and group access.

	
Configuring Collection Permissions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse supports Role-based Access Control for access to Collections. The 'Permissions' tab allows users to configure which groups of users can perform various actions on a collection including:

* Read (perform queries and use this collection as the input in transforms)
* Download
* Write & Delete
* Manage Permissions (change which groups can access)
* Manage Configuration (change details like indexing for this collection)

To affect changes, simply check the boxes that represent the type of access to grant for the desired group and click 'Save Group Permissions'.

.. figure:: /_static/CollectionManagerScreenshots/collection-permissions.png
	:height: 300 px
	:width: 600 px	

        Screen snapshot: Collection permissions screen.

Configuring Indexing
^^^^^^^^^^^^^^^^^^^^

In the Collection Details view click on the "Fields" tab to see the list of fields and indexing options. This information is gathered from the actual data that has be ingested into the collection and is updated when new data is imported. This field information for a collection is passed along with raw data to both internal Koverse processes and to processes accessing the data via the SDK.  Within the Fields view user can: 

* Choose fields to index
* Configure indexing options for a particular field
* Set the policy for how to index new fields

.. image:: /_static/CollectionManagerScreenshots/fields.*
	:height: 300 px
	:width: 600 px

For collections with no data, Koverse can automatically index all fields in records that may be imported into this collection in the future by clicking the 'Edit Field Defaults' button and checking 'Index All New Fields' and clicking the 'Save Defaults' button.
	
.. image:: /_static/CollectionManagerScreenshots/index-defaults.*
	:height: 300 px
	:width: 600 px
	
To save time and disk space, users may wish to choose to not index any fields until after the first import of data is complete. Koverse will then show a list of every field found in at least one record, including information about the type of the field, how often it is present in records, and estimates for things like cardinality (ie the number of unique values in this field), average size, etc.
	
This information is used to help users decide what fields to index, and to understand what kind of information is found in each field. Users can then choose to index particular fields by checking the box on the right of the table. After a number of fields are checked for indexing, users can put the new indexing policy into effect by clicking the 'Save' button at the bottom of the page.
	
.. image:: /_static/CollectionManagerScreenshots/save-indexes.*
	:height: 300 px
	:width: 600 px
	
Additional options for some types of fields are available by clicking the options button to the right of the check-box. For example, for String types, users can choose to index the whole field as it appears, or to tokenize the text found and index it in additional ways such as lowercase in addition to whatever case already exists, to remove stop words (common words like 'the'), and whether to index pairs or triples of tokens and so on (also known as n-grams). Clicking 'Save' after choosing these options will also put them into effect. 

.. image:: /_static/CollectionManagerScreenshots/index-options.*
	:height: 300 px
	:width: 600 px

Whenever an indexing policy for a collection has changed, Koverse will automatically update the on-disk indexes using a MapReduce job. The status of this job can be viewed in the Health and Monitoring application.

Koverse automatically updates any indexes present for a collection as new data is imported.

.. _CompositeIndexes:

Composite Indexes
^^^^^^^^^^^^^^^^^
	
Composite indexes are indexes built on two or more fields to enable querying combining ranges across those fields in queries. For example, in order query on a range of values in a field called 'height' and also a range of values in a field called 'age', a composite index must be created that will enable this query to run quickly, without doing expensive set operations on the server side.
	
Creating composite indexes is simple. In the Collection Details view, users can click on the 'Composite Indexes' tab to see a list of the composite indexes that already exist. New composite indexes can be created by clicking 'Add Composite Index' and selecting two or more fields from the drop down menu that appears.

.. image:: /_static/CollectionManagerScreenshots/composite-indexes.*
	:height: 300 px
	:width: 600 px

Each entry in the drop down menu consists of a field name and a type. For example we might see 'height (string)' and 'height (float)'. This means that both string (text) and floating point number values have been observed in this field. It might be likely that the string values are erroneous. In any case, we wish to query for ranges across numerical values for the height field in our example so we choose 'height (float)'.
	
Users can choose up to four fields in one index, but beyond four users may start to see performance issues with queries.
	
Clicking the black 'Add Composite Index' button will cause Koverse to begin building this index on any data already available, and Koverse will update this index if any new data is imported into this collection.

* Click the Collections tab in the main menu.
* If you do not have a Collections tab in the main menu, your user account is not a member of a group with the Manage Data Collections permission.
* Find the data collection to modify or delete.
* Click the Edit or Delete button for the appropriate data collection.
* Confirm the edit or delete.

.. image:: /_static/Data-Management-Group/Data-Flow-Icon.png
		:height: 75 px
		:width: 75 px
                :align: left
    
.. _usr-kov-Data-Flow:

Data Flow Application
---------------------

The Data Flow application gives users the ability to visualize, configure, and execute the movement of data within the Koverse system. It is important to note that users will only be able to view and interact with data and jobs for which they have the permission to do so.

.. _usr-Flow-Tab:

Flow Tab
^^^^^^^^

The flow tab shows a visualization of the Transforms that are configured.  Users will be able to view Transforms on Collections they have permission to read.  The flow starts on the right and moves left, showing how initial Collections are transformed into new Collections. Clicking on an individual section of the flow will take the user to the configuration details for that Transform.

If the user has appropriate permissions, the Flow tab also provides the ability to configure new Sources, Transforms, and Sinks: 

.. _NewSource:


Adding an Import Source
^^^^^^^^^^^^^^^^^^^^^^^

#. Click the "Add Import Source" button.  If this button is not visible, you do not have permission to configure Sources.

#. Select the type of Source you wish to add from the dropdown.  (Note that the list of available Sources will include all built-in Sources, in addition to any custom Sources that have been uploaded to Koverse as part of an Addon.  See the :ref:`Installing Addons` section for instructions on uploading Addons.)

#. Fill out the Source configuration fields. (See the tips below on configuring some of the more advanced Sources.)

#. To Optionally add Import Time Transforms - select a desired import time transfrom from the list, and then click "Add Import Transform". You may add more than one. 

#. Select a output data collection for storing records from this source. 

#. Select the type of flow - either manual, periodic, or continuous. Manual means that a user must kick off of jobs. Periodic means the job will be run on a defined schedule. Continuous means the job will be run continuously until this setting is changed. 

#. Click the "Add Source" button.  Note that data will not actually be imported until this source is run from the :ref:`usr-Flow-Tab`.

**Tips for configuring particular Sources:**

**Configuring a Twitter Source**

#. *Create Twitter Dev Application:*

	#. Log onto https://dev.twitter.com/
	
	#. Under your avatar, select My Applications
	
	#. Click Create a new application button
	
		* ex name: twitter koverse test
		
		* ex description: twitter koverse test
		
		* ex website: ``http://localhost.com/Koverse``
		
		* callback: none
		
	#. Select Yes, I agree to the Developer Rules Of The Road
	
	#. Enter CAPTCHA displayed
	
	#. Click Create your Twitter application
	
	#. Your Twitter application properties should now be shown on the next page
	
	#. Click Create my access token
	
	#. Refresh page to have access tokens appear
	
	#. Leaving the details page open move onto Creating the Koverse Twitter Streaming Source

#. *Configuration Options for the Twitter Source in Koverse:*

	New Source Type: - Select Twitter Streaming"
	
    * Source Name: example 'twitter koverse test'
	
    * Security Field Label: (optional)
	
    * Security Label Parser: Identity Parser
	
    * Twitter App Consumer Key: Copy & Paste details from Twitter Dev App
	
    * Twitter App Consumer Secret: Copy & Paste details from Twitter Dev App
	
    * Twitter App Access Token: Copy & Paste details from Twitter Dev App
	
    * Twitter App Access Token Secret: Copy & Paste details from Twitter Dev App
	
    * Keywords(optional) 
	
    * Locations (optional)

Note: Twitter Streaming Sources will continue to update every 10 minutes unless you stop the job.

**Configuring an Email Account (IMAP) Source**

* Input the following required fields:

	* Source Name - example: Personal Gmail
	
	* Server - example: imap.gmail.com
	
	* Username - example: youremail@gmail.com
	
	* Password - example: password123
	
	* Security Label Field (optional)
	
	* Security Label Parser (Default = Identity Parser)


	
**Configuring an Newsfeed Source**

* Input the following required fields:

	* Source Name - example: NY Times Business
	
	* Security Label Field (optional)
	
	* Security Label Parser (default: Identity Parser)
	
	* RSS Feed URL - example: http://www.nytimes.com/services/xml/rss/nyt/Business.xml
	
	* Polling Frequency (in minutes) - example: 5
	
**Configuring an Amazon S3**

* Source Parameters:

	* Source Name (Required)

	* Security Label Field (Optional)

	* Security Label Parser (Dropdown)

	* Access Key ID (Required) - 	This is actually a username. It is alphanumeric text string that uniquely identifies the user who owns the account. 

	* Secret Key (Required) - This key plays the role of a password.

	* Mime Types (Optional) - This is optional however we recommend to always select a Mime Type.

	* Include files in subdirectories ( Checkbox ) - This is optional and if checked includes files in the subdirectories of the S3 Bucket you specify. 

	* Import files with names matching regular expression - Specifying the name of the file(s) you want to import. 

	* Date 
	

Import Sources
^^^^^^^^^^^^^^

	
**All of Wikipedia Source**

Wikipedia offers free copies of all available content to interested users. Enabling this source will stream the Wikipedia Records into your target collection.

**Newsfeed Source**

The Newsfeed source allows users to import information directly from RSS feeds. 

**Amazon S3**

The Amazon S3 import source allows users to import files directly from Amazon's S3 service. 


**Apache Commons VFS**

Commons VFS provides a single API for accessing various different file systems. It presents a uniform view of the files from various different sources, such as the files on local disk, on an HTTP server, or inside a Zip archive.

**Email Account (IMAP)**

IMAP is an Internet standard protocol used by email e-mail clients to retrieve e-mail messages from a mail server over TCP/IP connection. 


**File Transfer Protocol (FTP)**

The File Transfer Protocol is a standard network protocol used to transfer computer files from one host to another host over a TCP-based network, such as the internet. 


**Hadoop Distributed File System (HDFS)**

The Hadoop distributed file system (HDFS) is a distributed, scalable, and portable file-system written in Java for the Hadoop framework. A Hadoop cluster has nominally a single namenode plus a cluster of datanodes, although redundancy options are available for the namenode due to its criticality. Each datanode serves up blocks of data over the network using a block protocol specific to HDFS. 

**Kafka 0.8 Source**

Apache Kafka is an open-source message broker project developed by the Apache Software Foundation written in Scala. The project aims to provide a unified, high-throughput, low-latency platform for handling real-time data feeds.

**MS SQL Server (Microsoft SQL Server)**

Microsoft SQL Server is a relational database management system developed by Microsoft. As a database server, it is a software product with the primary function of storing and retrieving data as requested by other software applications which may run either on the same computer or on another computer across a network (including the Internet).

**MySQL**

MySQL is a relational database management system (RDBMS), it was the world's second most widely used RDBMS, and the most widely used open-source RDBMS.


**Oracle 11gR2**

Oracle 11gR2 is the second and terminal release of the Oracle 11g database. 


**Oracle RAC 11gR2**

In database computing, Oracle Real Application Clusters (RAC) - provides software for clustering and high availability in Oracle database environments. 


**PostgreSQL**

PostgreSQL, often simply Postgres, is an object-relational database management system with an emphasis on extensibility and on standards-compliance. As a database server, its primary function is to store data securely, supporting best practices, and to allow for retrieval at the request of other software applications.

**URL Source**

URL source is our own custom source type that allows our users to select multiple comma separated list of URL's, the specifying file names, the date, and import them into your target collection.

**Web Crawler**

Web Crawler uses our Kafka streaming to allow you to specify the number of workers, the starting URL, the maximum levels to crawl, the broker list, and the zookeeper services to utilize. 

**Wikipedia Page Sources**

Wikipedia offers free copies of all available content to interested users. Enabling this source will stream a single page source from the Wikipedia Records into your target collection.
	
.. _NewTransform:
 
Adding a Transform
^^^^^^^^^^^^^^^^^^^

#. Click the "Add Transform" button.  If this button is not visible, you do not have permission to configure Transforms.

#. Select the type of Transform you wish to add from the dropdown. (Note that the list of available Transforms will include all built-in Transforms, in addition to any custom Transforms that have been uploaded to Koverse as part of an Addon.  See the :ref:`Installing Addons` section for instructions on uploading Addons.)

#. Assign a name to the Transform in the "Name" field.

#. Fill out the Transform configuration fields.

#. Click the "Add Transform" button.  Note that the Transform will not actually execute until it is run from the :ref:`TransformsTab`.

Adding a Sink
^^^^^^^^^^^^^^

#. Click the "Add Export Sink" button.  If this button is not visible, you do not have permission to configure Sinks.

#. Select the type of Sink you wish to add from the dropdown. (Note that the list of available Sinks will include all built-in Sinks, in addition to any custom Sinks that have been uploaded to Koverse as part of an Addon.  See the :ref:`Installing Addons` section for instructions on uploading Addons.)

#. Fill out the Sink configuration fields.

#. Click the "Add Sink" button.  Note that the Sink will not actually export any data until it is run from the :ref:`ExportsTab`.


.. _usr-Imports-Tab:

Imports Tab
^^^^^^^^^^^

Users will need permission to manage Sources in order to access all of the features in this tab.

Configuring an Existing Data Source
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Locate the existing data source you wish to modify in the list on the main page and click on the link to be taken to the configuration page for that Source. The configuration page has several tabs:

* **Configuration Tab:** Shows the existing configuration for this import Source.

	* If the configuration looks good, you can choose to import data at this point by hitting the "Run Import Job" button.  See :ref:`ImportJobs` for details.
	
	* If the configuration needs to be modified, hit the "Edit Configuration" button and follow the instructions in the :ref:`NewSource` section.
	
	* If you wish to delete this Source, hit the "Delete Source" button.  Note that this will not delete any data that has already been imported, it will only delete the Source's definition.
	
* **Import Flows Tab:** Shows any imports flows for this Source. A source may have more than one flow. Flows connect sources to data collections, with specific import time transforms and schedules.

	* If you wish to create an additional import flow for this source
	
		#. Click the "Add Import Flow" button. 
		
		#. Optionally add Import Time Transforms. 
		
		#. Select the output Data Collection. 
		
		#. Select the flow type - manual, periodic, or continuous. 
		
		#. Click "Add Import Flow"

	* If you wish to edit an Import flow, click the "Edit" button on the desired import flow row. 
		 
	* Existing Import Flows can be removed by checking the flows to be deleted, and then clicking the "Delete Selected Import Flows" button. 
	
* **Permissions Tab:** Use the check boxes to assign import, edit and delete permissions to various user groups for a given Source.  Note that *import* permission will allow users to actually import data from the Source, *edit* permission will allow users to edit the configuration of the Source, and *delete* permission will allow users to delete the Source's definition.  These permissions do not relate to permissions to access, edit or delete any particular data Collection and only relate to configuring and executing the Source itself.

* **Jobs Tab:** This tab displays a list of the historical import jobs that have run to import data from this Source.  In order to run a new import job, click the "Run Import Job" button and follow the instructions in the :ref:`ImportJobs` section

	
.. _ImportJobs:	

Running an Import Job
^^^^^^^^^^^^^^^^^^^^^^

#. Click the "Run Import Job" button. If more than one Import Flow is present on a source, you will be presented with the option of which to run. If only one Import Flow is configured for the source, that Import Flow will be run - and you will be taken immediately to the import job progress page. 


Deleting a Source
^^^^^^^^^^^^^^^^^

Check the box next to the Source(s) you wish to delete and hit the "Delete Selected Sources" button. Note that this will not delete any data from the Koverse data store, and will merely delete the Source definition(s).


.. _TransformsTab:

Transforms Tab
^^^^^^^^^^^^^^

Users will need permission to manage Transforms in order to access all of the features in this tab.

Configuring/Running an Existing Transform
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Locate the existing Transform you wish to modify in the list on the main page and click on the link to be taken to the configuration page for that Transform. The configuration page has two tabs:

* **Configuration Tab:** Shows the existing configuration for this Transform.

	* If the configuration looks good, you can choose to transform data at this point by hitting the "Run Transform Job" button.  
	
	* If the configuration needs to be modified, hit the "Edit Configuration" button and follow the instructions in the :ref:`NewTransform` section.
	
	* If you wish to delete this Transform, hit the "Delete Transform" button.  Note that this will not delete any data that has already been processed, it will only delete the Transform's definition.
	

* **Jobs Tab:** This tab displays a list of the historical jobs that have run to execute this Transform.  In order to run a new Transform job, click the "Run Transform Job" button and observe the progress of the Transform as it runs to completion.

Deleting a Transform
^^^^^^^^^^^^^^^^^^^^^

Check the box next to the Transform(s) you wish to delete and hit the "Delete Selected Transforms" button. Note that this will not delete any data from the Koverse data store, and will merely delete the Transform definition(s).

.. _ExportsTab:

Exports Tab
^^^^^^^^^^^
Users will need permission to manage Sinks in order to access all of the features in this tab.

Configuring an Existing Export
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Locate the existing export you wish to modify in the list on the main page and click on the link to be taken to the configuration page for that export. The configuration page has two tabs:

* **Configuration Tab:** Shows the existing configuration for this Sink.

* **Import Jobs Tab:** This tab displays a list of the historical export jobs that have run to import data from this Source.  In order to run a new export job, click the "Run Export Job" button and follow the instructions in the :ref:`ExportJobs` section

.. _ExportJobs:

Running an Export Job
^^^^^^^^^^^^^^^^^^^^^

#. click the "Run Export Job" button.

#. Select the Collection you wish to export data from.

#. Select the Sink you wish to export data to.

#. Optionally select any Export Transforms to apply to this particular Export job and fill out any parameters they might have.

#. Click Run Export Job


Deleting a Sink
^^^^^^^^^^^^^^^

Check the box next to the Sink(s) you wish to delete and hit the "Delete Selected Sinks" button. Note that this will not delete any data, and will merely delete the Sink definition(s).

.. _kov-Jobs-Tab:

Jobs Tab
^^^^^^^^

This tab displays a list of all the jobs that have run and are running on the system.  You may choose to stop a job that is currently running by selecting the box next to the job and then clicking the "Cancel Selected Jobs" button.  Choosing this option for a job that has already completed will do nothing.

|

.. image:: /_static/Data-Discovery-Group/Search-Icon.png
		:height: 75 px
		:width: 75 px
                :align: left

.. _usr-kov-Search:

Search Application
------------------

The Search application provides users the ability to interactively query one or more Koverse Collections to find all Records that match their search criteria. While many end-user analytics will be custom in nature and rely heavily on data model semantics, the data discovery application allows users to search in a schema-free manner, or to use the schema as necessary. Within the data data discovery tab a user can:
	
	 * Search across all collections or specific collections
	 * Search across any field or within specific fields
	 * Combine search terms
	 * Search for a range of values

Initially, the Search application starts with nothing selected, and the application will return records containing search terms in any field of records from any collection. Users can start by typing search terms into the search bar. Koverse will auto-suggest terms to search based on the selected collections. The search bar will show terms from any field of any collection that match the prefix typed thus far, as well as any field names that can be searched.

.. image:: /_static/SearchScreenshots/auto-complete.*
	:height: 300 px
	:width: 600 px

The Search application returns results grouped by collection. 

.. image:: /_static/SearchScreenshots/multi-coll-results.*
	:height: 300 px
	:width: 600 px
	
Users can then choose to show specific fields within those search results by expanding the set of field names for a collection and selecting fields to show on the left of the screen.

.. image:: /_static/SearchScreenshots/show-fields.*
	:height: 300 px
	:width: 600 px

Koverse Search also auto-suggests fields that appear in all or selected collections, and users can choose a field in which to search. Auto-suggest will then only suggest terms that appear within the selected field. 

.. image:: /_static/SearchScreenshots/auto-complete-field.*
	:height: 300 px
	:width: 600 px

Koverse handles search across structured (flat records), semi-structured, and unstructured (text) data. Fields containing large amounts of text are truncated to snippets. The full text can be viewed by clicking the 'more' link at the end of the snippet, and hidden again by clicking the 'close' link after expanding.

.. image:: /_static/SearchScreenshots/unstructured.*
	:height: 300 px
	:width: 600 px

Users can choose to only search within a certain collections by checking the collection boxes on the left side of the screen. Auto-suggest will then only suggest terms and fields from those selected collections and results will only come from those collections.

.. image:: /_static/SearchScreenshots/collection-search.*
	:height: 300 px
	:width: 600 px

A particular search can be bookmarked and shared with others by simply saving or sharing the URL from the address bar. However, if other users are not authorized to see any of the collections selected, they will simply not see those search results and will only see results from selected collections that they are authorized to see.

.. _LuceneQuerySyntax:

Query Syntax
^^^^^^^^^^^^

The Search App is designed to be somewhat like Google in design. Users can simply type in terms and retrieve results that match all the terms. This means the terms are 'ANDed' together, so that records containing term1 AND term2 .. and so on are returned. There is no need to type the word AND into the search box.

Searching for records that contain a term in any field::

	mary
	
To search for terms that contain spaces, use quotes around the terms::

	"mary had a"

Searching for records that contain a term in a particular field::

	name: mary

Combining Terms
^^^^^^^^^^^^^^^

Searching for records that contain a term in one field and another term in another field. This is like requesting records that match the first clause, AND the second::
	
	name: mary occupation: shepherd

Two or more terms may be combined this way. Some terms can be field specific and others not. For example::

	name: mary shepherd
	
Would return any records where the value "mary" appeared in the name field, and where the value "shepherd" appeared in any other field, including the name field.

Note that the difference between querying for a two-word phrase with containing a space and searching for one word within a field and one word in any field requires quotes. To search for a two-word phrase within a single field, use quotes around the two-word phrase::

	name: "jane doe" shepherd

The preceding query would search for the entire string "jane doe" in the name field and the word "shepherd" in any field.

Range queries
^^^^^^^^^^^^^

To search for records that contain a value within a range, use square brackets and word 'TO'::
	
	height: [60 TO 70]

For an open-ended search, use an asterisk, * , to indicate positive or negative infinity. The following means return records with a value for the height field that is greater than or equal to 60::
	
	height: [60 TO *]

The following returns all records with a value in the height field less than or equal to 60::
	
	height: [* TO 60]

Searches can also be done across ranges of text values using wildcard syntax. Only trailing wildcards are supported. The following returns records with a value beginning with the letters 'ma' in any field::
	
	ma*

Koverse understands the ordering of several types of values including numbers, text strings, URLs, dates, and IP addresses::
	
	[192.168.1.0 TO 192.168.34.0]

To query a range of dates, the following formats are recognized::

	"yyyyMMdd hh:mm:ss"
	"EEE MMM d HH:mm:ss Z yyyy"
	"EEE MMM d HH:mm:ss zzz yyyy"
	"yyyy-MM-dd"
	"yyyy-MM"
	"yyyy/MM/dd HH:mm:ss"
	"yyyy/MM/dd HH:mm:ss.SSS"
	"MM/dd/yyyy HH:mm"
	"ddHHmm'Z' MMM yy"
	
	yyyy - four digit year
	yy - two digit year
	MM - two digit month
	MMM - three letter month
	dd - two digit day
	d - one or two digit day
	HH - two digit hour
	mm - two digit minute
	ss - two digit second
	Z - time zone. such as -0800
	zzz - time zone. such as Pacific Standard Time; PST; GMT-08:00

An example of a query for a date range is::

	creation_date: ["20140211 11:28:08" TO "20140211 13:30:08"]

Another example date range is::

	["2014-02-11" TO "2014-02-12"]

Note that a date format such as "20140211" is indistinguishable from a simple number, so dashes should be used if a date is meant.

Searching for records that contain a geographical point value.::

	coordinate: [-60,-40 TO 30,35]

Searching a single range does not require that a composite index be built. To query multiple ranges at once or a range and other terms, a composite index must be built. These types of queries are described in the following section.

For additional information on Composite Indexes, please refer to: :ref:`CompositeIndexes`

Combining Ranges
^^^^^^^^^^^^^^^^

Koverse supports querying for multiple ranges or ranges and single terms simultaneously but requires that composite indexes be built first before such queries can be executed. This is because composite indexes reduce the work done at query time to just a few short scans without having to do any set operations so queries with multiple ranges can return quickly, without impacting other users of the system.

An example of a query that combines a range with a single term. To perform this query, a composite index of the height and name field is required. See :ref:`CompositeIndexes` for how to build this type of index.::
	
	height: [* TO 10] name: mary

An example of a query that combines multiple ranges. To perform this query, a composite index of the height and weight field is required.::
	
	height: [* TO 10] weight: [70 TO 80]

To query across a range of geos and time simultaneously, do the following. To perform this query, a composite index on the geo field and time field is required.::

	geo: [-60,-40 TO 30,35] time: ["20140211 11:28:08" TO "20140211 13:30:08"]


.. image:: /_static/Admin-Monitor-Group/System-Admin-Icon.png
		:height: 75 px
		:width: 75 px
		:align: left

.. _usr-kov-System-Admin:

System Administration Application
---------------------------------
	
The System Administration application provides a graphical user interface for system administration activities, such as system configuration, user accounts, user groups, etc.  Only users with administration privileges will be able to access this App.  The default administrator username and password are admin and admin, respectively. Be sure to change the default admin password. 

.. need to update screenshot

	.. image:: /_static/SystemAdminScreenshots/MainPage.*
		:height: 300 px
		:width: 600 px

Note that only a subset of the links shown above will be present if the current user does not have permission to perform all administrative actions.

Users
^^^^^

The links described below will only be present if the current user is a member of a group that has 'Manage Users & Groups' permissions.

**Add User:** Create a new user account.

Koverse uses email addresses as primary user IDs.  To create a new user,

#. Click the Add User link.
#. Enter the new users email address. 
#. Click the Add User button.

**Edit User:** Change a user's ID and/or manage the groups a user is in.

#. Click the Edit User link.
#. Select the target user from the drop down.
#. Enter the user's new email address, if applicable.
#. Check and uncheck the boxes next to the group names to add and remove the user from the groups.
#. Click Save when finished.

**Set User Password:** Initially set a new user's password, or reset the password of an existing user.

#. Click the Set User Password link.
#. Select the target user from the drop down.
#. Enter the user's new password once, and then again for confirmation.
#. Click Save when finished.

**Delete User:** Remove a specific user account and re-assigns responsibilities to another user who will assume all data collections, sources, jobs, and permissions management of the deleted user.

#. Click the Delete User link.
#. Select the user to be deleted from the drop down.
#. Select the user that will assume the responsibilities of the user to be deleted.
#. Click Delete User
#. Click Yes to confirm the deletion of the user.

Group/Roles
^^^^^^^^^^^

Koverse provides groups as a way to manage privileges for multiple users. Users are members of one or more group.

**Add Group:** Create a new group.
 
#. Click the Add Group link.
#. Enter the new groups name.
#. Click the Add Group button.


**Edit Group Permissions:** Provision system-wide permissions for the selected group.  Note that if the "Add to All New Users" box is checked for a group, all new users to the system will automatically be assigned to the group and hence inherit all of the group's permissions.  Also note that permissions for specific data collections are granted on the data collections themselves, and not in the System Administration App.

#. Click the Edit Group link.
* Select a Group to edit from the drop down.
* Check and uncheck the boxes next to the desired permissions group.
* Click the Save button when finished.

**Delete Group:** Remove a group.  It does not remove any users or data collections.

#. Click the Delete Group link.
#. Select the Group to be deleted from the drop down.
#. Click Delete Group.

System
^^^^^^

**System Configuration:** Configure the system properties for Koverse, Hadoop, Accumulo, and SMTP.  These properties will need to be configured correctly for Koverse to be fully functional.  

In most cases, the fields are self-explanatory and the pre-populated defaults can be used.  The main exception to this are the **Data Store** properties:

.. figure:: /_static/Admin-Monitor-Group/System-Tab.png
	:height: 300 px
	:width: 600 px

        Figure: System Configuration Tab

* Data Store Type should be "Accumulo".
* Instance Name should be the name of the Accumulo instance that is configured in Accumulo.
* ZooKeeper Servers should be a comma separated list of ZooKeeper servers in the form <hostname>:<port>.   *Example: zoo1:2181,zoo2:2181,zoo3:2181*
* Username is the Accumulo username that will be used to connect to Accumulo.
* Password is the corresponding password for the Accumulo user listed under Username.

When finished entering all System settings, hit the "Save" button.  If there are any problems with the given settings, an error will pop up.

**Lock Down:** Lock down mode is used to disable all data interactions in this system. While lock down mode is enabled, only accounts with permissions to manage users, groups, view the audit log, and manage lock down mode will be able to interact with this system. If you choose to enter lock down mode, click in the "Lock Down" link and hit the "Enable Lock Down Mode" button. The same link is used to disable lock down mode.

**Resources:** Manage Auto-Running Transforms.  Normally, transforms will run periodically on scheduled intervals.  If you wish to disable this feature and only run transforms manually, 

#. Select the "Resources" link.
#. Check the "Disable Auto-Running Transform" box.
#. Hit "Save".

Auto-Running Transforms can be re-enabled by un-checking the "Disable Auto-Running Transform" box.

.. _Installing Addons:

Addons
^^^^^^

**Manage Addons:** Install external jar files to extend Koverse.

#. Click the "Manage Addons" link.
#. Hit the "Choose File" button to browse files in your local file system.
#. Select a file with the .jar extension and hit "Upload".

Applications
^^^^^^^^^^^^

**Manage Applications:** is used to configure permissions and parameters for Koverse Applications.

#. Click the "Manage Applications" link.
#. Click the Name of the Application you wish to configure.
#. Under the "Permissions" tab, check the boxes that correspond to the group permissions you wish to assign to this Application.
#. Hit "Save Permissions".
#. Under the  "Parameters" tab, configure any parameter values you wish to set/change. 

**Deploy Application from Template:** Deploy instances of Applications whose templates have been uploaded to Koverse as part of an Addon.

#. Click the "Deploy Application from Template" link.
#. Select an Application template to use from the dropdown.
#. Enter the Name of the Application.  This will be the string displayed to the user under the application's icon on the Applications Dashboard.
#. Enter the Category Name for the Application.  This is the string displayed for the category.  Multiple Applications probably share the same string.
#. Enter the URL ID.  This is the portion of the url path used to access the Application directly, as in /Koverse/apps/<url_id>/.
#. Hit "Deploy Application Template".


API
^^^

The Koverse REST API and SDK allow:

* Transform: data into specialized indexes, analytic summaries, and algorithmic processing of data within the system, from external systems and 3rd party plugins
* Data Discovery: indexing and query calls to quickly search and explore data.
* Data Collection Management: administer access permissions, data models, view provenance, and purge data. 
* Import: import data into Koverse from a range of sources
* Data Export: download to external systems
* Direct access: to the data within the system, from external systems
* Auditing: access query activity of all users of the system.
* Advanced Data Discovery: apply high level analytic query logic to the data; entity chaining and disambiguation, classification etc.
* Authentication: an internal user registration and authentication service.
* Authorization: an internal authorization service.

These links are used to manage API tokens.

**Add API Token:** Create a new API token.

Enter a name for the new API token and click "Create API Token"

**Edit API Token:** Edit properties of an already existing API token.

#. Click the "Edit API Token" link.
#. Choose the token you wish to edit from the dropdown.
#. Optionally change the Token Name.
#. Optionally change the Responsible User by selecting a new user from the dropdown.
#. Optionally edit the group permissions you wish to assign to the token under "API Toke Group Membership".
#. Click "Update Token" when finished.

**Delete API Token**

Select the API token you wish to delete from the dropdown and click "Delete API Token".

.. _SystemMonitoringApp:

System Monitoring App
---------------------

The System Monitoring App gives a view into the health and status of the distributed cluster on which Koverse is running.  There are several different sections of the monitoring view:

**Control Nodes**

.. image:: /_static/SystemMonitorScreenshots/ControlNodes.*
	:height: 338 px
	:width: 1018 px

This displays a status of whether or not key processes are reachable.

* A **green** icon indicates that the process is up and reachable.

* A **red** icon indicates the the process is not reachable.  In this case,
	
	#. Make sure the server that hosts the process is reachable over the network.
	
	#. Check to see that the process in question is still running on the control node.
	
	#. If it is verified that there are no hardware or network problems affecting the host, please see the :ref:`Troubleshooting` section, which has process-specific tips.
	

**Worker Nodes**

.. image:: /_static/SystemMonitorScreenshots/WorkerNode.*
	:height: 654 px
	:width: 1014 px

This displays the current workload of the worker nodes in the cluster.  The shade of blue reflects the operating system load, with a lighter shade representing a higher load.  Mousing over the individual nodes will display further details.

**Ingest and Query Timelines**

<insert screenshot of timelines>
These timelines show the current ingest and query activity that the Koverse data store is handling.  Large peaks are collapsed onto themselves and render as a darker shade of green in order to display high dynamic range in a small space.

**Data Processing**

.. image:: /_static/SystemMonitorScreenshots/DataProcessing.*
	:height: 170 px
	:width: 1010 px
	
This section shows the progress of any jobs that are currently running, organized by job type.  All Koverse jobs run in the Hadoop MapReduce framework, so if you desire more detailed information about specific jobs, please see the :ref:`CheckingMapreduce` instructions.

**Distributed Storage**

.. image:: /_static/SystemMonitorScreenshots/DistributedStorage.*
	:height: 494 px
	:width: 322 px
	
This section gives information about the state of the distributed storage system.  

* This same information can be seen by :ref:`CheckingNamenode`.  

* In general, safemode should be set to "false". If it is not, see the :ref:`Safemode` section of the troubleshooting guide.

**MapReduce**

.. image:: /_static/SystemMonitorScreenshots/MapReduce.*
	:height: 506 px
	:width: 324 px
	
This section of the monitoring page shows the current state and configuration of the Hadoop MapReduce cluster.

* For more detailed information, see the :ref:`CheckingJobtracker` and :ref:`CheckingTasktracker` sections of the troubleshooting guide.

**Data Store**

.. image:: /_static/SystemMonitorScreenshots/DataStore.*
	:height: 762 px
	:width: 322 px
	
This portion of the monitoring page displays information about the configuration and state of the Apache Accumulo instance that hosts Koverse's data store.

* More information can be found in the :ref:`CheckingAccumulo` and :ref:`CheckingZookeeper` sections of the troubleshooting guide.


Uploading Addons
----------------

See the :ref:`Installing Addons` section for instructions on managing Addons.


File Import Controls
--------------------

Koverse now supports a new feature to import files with names matching a regular expression, filter files by date, mime-type to parser mapping, and a new recursive feature to include or exclude files in sub directories.

.. image:: /_static/FileImportControls/ImportMimeType.*
	:height: 300 px
	:width: 500 px

This screen snapshot displays the options in the `dataflow` portion of the Koverse user interface that filters import file names (please click on image to enlarge).

Details on the Mime-Type Parser Features
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse automatically detect the file format of each file in a file-based import, which is identified as a mime type.

Each of these files are then parsed by a specific mime-type parser. New mime-type parsers can be easily added by developers by writing a Java class that extends the ``FileBasedRecordsProvider Class`` (Please Note: Additional details on how to implement this feature will be documented in the Developers Guide)

It is not uncommon that there are multiple mime-type parsers that can handle a particular mime type. For example, **Plain Text** files (identified as the mime type 'text/plain') that often end in can the .txt extension may in fact contain comma-separated structured records. So rather than use the default Apache Tika parser to import the file as one record containing all the text contents of the file, users can choose to use the Separated Values Parser instead to break out the CSV lines into separate Koverse records.

Users may choose to use a specific parser for a mime-type when setting up import flow options.

Please Note: Koverse's automatic file format detection chooses the 'most reliable solution' during mime-type detection, but it is not perfect so the user must analyze the results after parsing to validate the correct mime-type was used during parsing.

For Example, sometimes a file such as CSV file is misidentified as text/plain during data ingest.

The users can use the mime-type parser User Interface Control to tell Koverse to override the default parser in these cases so the file is parsed correctly


**Example Usage:**

Date Filtering
--------------

* If you enter a date before, or after, or equal to the Date Field; this value is used during a date comparison on the file's `Modified-Date`.

.. image:: /_static/FileImportControls/DatePicker.*
	:height: 100 px
	:width: 300 px


Regular Expression Matching on File Name
----------------------------------------

* If you enter any regular expression to match file names.

.. image:: /_static/FileImportControls/ImportFileName.*
	:height: 80 px
	:width: 300 px

Recursive File Selection
------------------------

* The user can select `**Include files in subdirectories**` which allows recursive navigation through the directory structure of the file system to retrieve files for ingest.
* Filtering matches are on an **OR** basis, so either date, or regular expression is used during the file matching process. 
* Then that file is included in Map-Reduce import job....

.. image:: /_static/FileImportControls/FileFilterRecursion.*
	:height: 80 px
	:width: 300 px

Mime Type Override
------------------

* The user can select various ``mime-type override`` options to supersede the default parser used for a particular type of file. 

.. image:: /_static/FileImportControls/MimeTypeOverride.*
	:height: 80 px
	:width: 300 px

Technical Workarounds
^^^^^^^^^^^^^^^^^^^^^

Converting Outlook .pst email messages to mbox-compatible format
----------------------------------------------------------------

Koverse currently does not support the direct import of Outlook .pst email messages but by following these instructions, a user with an Outlook .pst file can convert the email messages to .mbox format which Koverse 'does' support.
Here is the process for converting the .pst email messages:

* The first step is to to take the .pst email messages file and convert it to mbox-compatible format. 
* The conversion can be done by using the libpst.0.6.44 package utility. (note link below)
* The Libpst utilities includes a **readpst** command which can be used to convert .pst email messages to mailbox .mbox format.
* Run the following command to perform the conversion:  **'readpst -r <outlook.pst file>'**
* The -r option changes the output format to Recursive. This will create folders as named in the PST file, and will put all emails in a file called "mbox" inside each folder. These files are then compatible with all mbox-compatible email clients.

Install libpst on Linux: 

* **Download site for libpst**:   http://rpm.pbone.net/index.php3/stat/4/idpl/30517395/dir/scientific_linux_6/com/libpst-0.6.44-3.el6.x86_64.rpm.html
* **Install rpm file**:  rpm -i libpst-0.6.44-3.el6.x86_64.rpm
* **Run command**: readpst -r <outlook.pst file>

Install libpst on Mac OSX:

* **Run command**: ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null

* **Run command**: brew install libpst

* **Run command**: readpst -r <outlook.pst file>

**Man Page for readpst usage**:    http://linux.die.net/man/1/readpst

After the .pst messages have been converted to mbox-compatible format, the user can import the .mbox file into a Koverse collection. It appears that the 'File Import App' does not successfully process 'text/m-mailbox' properly. You must use the 'Data Flow App' and create a source with the mime type of 'text/m-mailbox'.

Glossary of Koverse Terminology
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. glossary::

   Data Collection
      Data Collections are the basic container for data in Koverse. 
      You can think of them like tables - but every record in a data collection can be completely unique in structure.

   Configuration Manager
      The Configuration Manager application gives users the ability to upload and download configuration for Data Collections, Sinks, Sources, and Transforms.

   Data Collection
      The Data Collections App gives users the ability to manage and explore Data Collections. A Data Collection is simply a named collection of records. 
      Collections are the primary mechanism by which data is tracked and managed in Koverse.

   Data Flow
      Visualize, configure, and execute the movement of data within the Koverse system.

   File Upload
      Upload one or more files from the browser and import it into a collection.