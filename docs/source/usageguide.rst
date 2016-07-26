:tocdepth: 2

.. _usage-guide:

===========
Usage Guide
===========

Obtaining Koverse
^^^^^^^^^^^^^^^^^

Downloading
-----------

A free evaluation version of Koverse can be downloaded from the Koverse website.
Visit http://www.koverse.com

Choose whether to download the RPM, for installation using the Red Hat Package Manager, or a Cloudera parcel for installation on CDH, the Cloudera Distribution for Hadoop.

Installation and Configuration
------------------------------


To install Koverse, see detailed installation instructions for the RPM at :ref:`RpmInstallation`.
For the Cloudera parcel, see :ref:`ClouderaParcelInstallation`.


Using Koverse
^^^^^^^^^^^^^

Koverse is a server process and a web application that provides users with an interface for managing diverse, complex, and large data sets effectively.

Key Terms and Concepts
----------------------

Data Set
  A set of records managed by Koverse.
  These records may have been imported into Koverse from an external data source such as a relational database, a set of structured files such as CSV files or JSON or more unstructured files such as Microsoft Office documents in a remote file system such as an FTP server, or even a messages from a streaming source such network socket or a message queue.

Record
  A set of one or more attributes.

Attribute
  Sometimes called a 'field' or a 'column'.
  A single attribute consists of a name and a value.
  For example, from a relational database we may import several rows from a table, each of which is stored as a record in Koverse.
  The individual columns of each row from the database table are the attributes of the record.
  But Koverse records in the same data set do not necessarily all have the same set of attributes.
  And a value associated with an attribute may be a simple value, such as a number or a date, but may also be a large body of text, or a complex value such as a list or a set of name-value pairs.

Transform
  Data sets can be processed to produce new data sets via 'Transforms', which are distributed data processing jobs.

Accessing the User Interface
----------------------------

In this user guide we will walk through using the Koverse user interface.

To access the Koverse user interface you will need to know the URL of your Koverse instance.
The URL consists of the hostname of the server on which the Koverse web application is running into a browser, followed by :8080 to indicate that port 8080 should be used.
For example, if the Koverse web application is running on a server called 'koverse-server.net', the user interface can be accessed by visiting http://koverse-server.net:8080 in a web browser.

Supported browsers include:

- Chrome (recommended)
- Firefox
- Safari
- Microsoft Edge
- Internet Explorer 10+


.. include:: /snippets/loggingin.rst

Once logged in successfully, you will now see elements of the Koverse user interface, which are described below.

.. image:: /_static/UsageGuide/ui.png

Navigation
-----------

The buttons on the left allow you to navigate between major sections of Koverse.
Some of these may not be viewable if your user account does not have permission to perform certain actions.
The major sections are :

.. image:: /_static/UsageGuide/dataButton.png
  :width: 80px

Data
~~~~
Explore data sets that are currently managed by Koverse, via search and viewing summary information. Settings for data sets and audit events can also be seen and changed here.

.. image:: /_static/UsageGuide/addButton.png
  :width: 80px

Add
~~~
Add a new data set to Koverse from an existing data source.
If you do not have permission to add a new data set to Koverse you will not see this button.

.. image:: /_static/UsageGuide/transformsButton.png
  :width: 80px

Transforms
~~~~~~~~~~
Transform are distributed processing jobs that can be used to clean up records in a data set, summarize or aggregate information in a data set, or combine two or more data sets to create a new data set.
If you don't have permissions to create or run transforms you will not see this tab.

.. image:: /_static/UsageGuide/accountButton.png
  :width: 80px

Account
~~~~~~~
Access your user information, and make changes such as setting a new password.

.. image:: /_static/UsageGuide/adminButton.png
  :width: 80px

Admin
~~~~~
Add new users and groups to the built-in Koverse user management database, upload extensions to Koverse called 'Add-ons', and view system wide audit logs.
If you don't have permissions to manage users and groups, upload add-ons, or view audit logs you will not see this tab.

Next we'll look at the elements of each of the sections we just described.

Viewing Available Data Sets
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The 'data view' the first view seen after logging into Koverse.
On the left you will see a list of data sets in alphabetical order.
These are the data sets your user is allowed to see.
There may be other data sets managed by the system that your user account does not have access to that do not appear in this list.

.. image:: /_static/UsageGuide/datasets.png

To filter the view of the data sets in the list, click on the search bar labeled 'Search Everything' just to the right of the list of data sets.
You will see a drop-down menu with a list of labels that may have been applied to these data sets, as indicated by the icon that looks like a little label or tag.

.. image:: /_static/UsageGuide/searchLabels.png

Clicking on a label will limit the list of data sets to the data sets that have that label.
You can click 'show all' to return to the full list of data sets.

.. image:: /_static/UsageGuide/viewLabel.png

You can also filter the list of data sets to those that have a name matching a particular word by typing in a word in the search bar.
The drop-down menu will automatically change to show a list of the data sets whose name matches the word typed.
Clicking on a suggested data set will show that data set's details.

.. image:: /_static/UsageGuide/dataSetSuggest.png

The search bar will also suggest values as search terms that match records in any data set.
We'll discuss searching the records of data sets in the `Search`_ section.

Clicking on a data set in the list on the left will show the detail view for that data set.

When viewing details for a data set the name of the data set appears on the right, and below the name is a list of optional labels that have been applied to this data set.
To the right, there is a circular button that allows the entire data set to be downloaded, either as a CSV file or a JSON file.

Finally we have some 'metadata' about this data set, including the total number of records, the date the data set was created, and the last time data was imported into this data set.


Data Tabs
---------

There are four tabs on the data set detail page:

Overview
  A summary of all the data set 'attributes' (also sometimes called 'fields' or 'columns') found in this data set.

Data
  Search results from this data set will appear here.

Data Flow
  View data flowing into or out of a data set, import more data, setup transforms and exports.

Settings
  Change data set settings such as the name, view processing events, and other actions.

Audit
  View the audit log of events that have taken place involving this data set, such as searches, imports, etc.

We discuss each of these tab pages next.

Example
~~~~~~~

If you are using a new installation of Koverse, there will be no data sets listed in the list on the left.

To load some example data sets, see the `Adding a New Data Set`_ section and return here.

Once example data sets are loaded you will see five data sets in the list on the left:

- Bank Departments
- Bank Employee Timesheets
- Bank Employees
- Bank Security Incidents
- Bank Trade Transactions

Exploring a Data Set
^^^^^^^^^^^^^^^^^^^^

To explore summary information about a data set, click on the 'Data' button on the primary navigation menu on the left and select a data set from the list to the right of the navigation menu.
The information in the 'Overview' tab is shown first, which displays a summary of all the attributes in this data set. If the Data Set has a job that is currently running, that information will be displayed here as well.

.. image:: /_static/UsageGuide/datasets.png

When any data is imported, Koverse automatically profiles the incoming records and keeps track of information about individual attributes.
Information about each of these attributes is displayed here including:

- the attribute name
- the number of records in which it is present
- an estimate of the number of unique values found for this attribute
- the predominant value type
- a visualization of the distribution of values

To see the associated visualization for an attribute, click the down arrow at the right of the attribute information.

.. image:: /_static/UsageGuide/attributeVisualization.png

This information can help you get a sense for what kind of information a particular data set contains, and can help identify potential opportunities for answering questions using this information either in searches or in analytics, as well as any data quality issues that might exist.
For example, as a data scientist I might be interested to find out which attributes in a data set contain text that I can process to extract a sentiment score.
Or I may be interested in finding out what fields contain customer IDs so I can join this data set with another data set.

If I see that a field isn't present in all the records, or of not 100% of the values are of the same time, it may be because there are data quality or consistency issues, or it may be another feature of the data that may need to be considered.
For example, not all Twitter messages contain hashtags, and I can get a sense for what proportion do from the information in this overview.

Example
-------

After loading the first example data set as described in the `Adding a New Data Set`_ section, you should be able to select the 'Bank Security Incidents' data set to see a list of attributes.

We may not know much about the information contained in a data set and this view helps us figure out what the likely meaning of each attribute is.

For example, the first attribute is called 'causeType'.
In the context of 'Bank Security Incidents' we may infer that this contains some information about the cause of each incident.

The presence count for this attribute should be 49,894 out of 49,894 records, so this attribute is present in every record.

The estimated number of unique values for this attribute is 7, so out of almost 50 thousand records we've only ever seen 7 unique values.

The data type is 100% Text, which means in every record the type of the value for the 'causeType' attribute is that of 'Text'.
Sometimes an attribute will not always have the same data type in every record.

Clicking on the down arrow by the 'Visual' column will show us a visualization of the top most frequent values for this attribute.
In this case Koverse automatically selected a bar chart to display a histogram of the most frequent values.
For example, the 'Infrastructure' value showed up in this attribute 3,857 times.
Placing your mouse over a column will display the exact number of records for each value.

Clicking on the up arrow at the top of the visualization will collapse this view again.
Scrolling down allows us to see other attributes.

Viewing Records
^^^^^^^^^^^^^^^

To view records of a data set, click on the 'Data' tab.
Initially, you will see a representative sample of the records in this data set.
This sample is maintained as new data is added so that it represents a subset of records sampled uniformly at random.

You can also perform a search to see records matching specific criteria.

.. include:: /snippets/search.rst

For a description of valid search syntax, see the section `Search Syntax`_ for details.

To get all of the results we can click the 'Download Search Results' button as described in the `Downloading Search Results`_ section.

Search Syntax
-------------
Koverse supports simple searches as well as some syntax to allow for more precise searches.

Users can simply type in terms and retrieve results that match all the terms.
This means the terms are 'ANDed' together, so that records containing term1 AND term2 and so on are returned.
There is no need to type the word AND into the search box.

Searching for records that contain a term in any field::

	mary

To search for terms that contain spaces, use quotes around the terms::

	"mary had a"

Searching for records that contain a term in a particular field, for example, to find records with the term 'mary' in the 'name' field::

	name: mary

Combining Terms
~~~~~~~~~~~~~~~

Searching for records that contain a term in one field and another term in another field.
This is like requesting records that match the first clause, AND the second::

	name: mary occupation: shepherd

Two or more terms may be combined this way.
Some terms can be field specific and others not.
For example::

	name: mary shepherd

Would return any records where the value "mary" appeared in the name field, and where the value "shepherd" appeared in any other field, including the name field.

Note that the difference between querying for a two-word phrase with containing a space and searching for one word within a field and one word in any field requires quotes.
To search for a two-word phrase within a single field, use quotes around the two-word phrase::

	name: "jane doe" shepherd

The preceding query would search for the entire string "jane doe" in the name field and the word "shepherd" in any field.

Searching Ranges
~~~~~~~~~~~~~~~~

To search for records that contain a value within a range, use square brackets and word 'TO'::

	height: [60 TO 70]

For an open-ended search, use an asterisk, * , to indicate positive or negative infinity.
The following means return records with a value for the height field that is greater than or equal to 60::

	height: [60 TO *]

The following returns all records with a value in the height field less than or equal to 60::

	height: [* TO 60]

Searches can also be done across ranges of text values using wildcard syntax.
Only trailing wildcards are supported.
The following returns records with a value beginning with the letters 'ma' in any field::

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

Searching for records that contain a geographical point value::

	coordinate: [-60,-40 TO 30,35]

Searching a single range does not require that a composite index be built.
To query multiple ranges at once or a range and other terms, a composite index must be built.
These types of queries are described in the following section.

For additional information on Composite Indexes, please refer to: :ref:`CompositeIndexes`

Combining Ranges
~~~~~~~~~~~~~~~~

Koverse supports querying for multiple ranges or ranges and single terms simultaneously but requires that composite indexes be built first before such queries can be executed.
This is because composite indexes reduce the work done at query time to just a few short scans without having to do any set operations so queries with multiple ranges can return quickly, without impacting other users of the system.

An example of a query that combines a range with a single term.
To perform this query, a composite index of the height and name field is required.
See :ref:`CompositeIndexes` for how to build this type of index::

	height: [* TO 10] name: mary

An example of a query that combines multiple ranges.
To perform this query, a composite index of the height and weight field is required::

	height: [* TO 10] weight: [70 TO 80]

To query across a range of geos and time simultaneously, do the following.
To perform this query, a composite index on the geo field and time field is required::

	geo: [-60,-40 TO 30,35] time: ["20140211 11:28:08" TO "20140211 13:30:08"]



Downloading Search Results
^^^^^^^^^^^^^^^^^^^^^^^^^^

When viewing search results for a single data set, the full set of results can be downloaded using the 'Download Results' button, as either a CSV file or a JSON file.

CSV files can be loaded into many other tools such as Microsoft Excel and Tableau, and is a good choice when records consist of simple values and don't have nested lists or other structures.
JSON is a good choice for records that have complex values such as lists and lists of field-value pairs.

.. image:: /_static/UsageGuide/downloadSearchResults.png

Example
-------

By clicking the 'Download Results' button on our search of Velma's trade transactions we can choose to download all the results as either a CSV file or a JSON file.
Choose CSV and click 'Download'.

Your browser will start downloading a file that starts with the phrase 'bank_trade_transactions' and ends in ''.csv'.

Once this is downloaded you can open it in a 3rd party application such as Microsoft Excel.

For more examples in working with this bank data, see the section titled `Analyzing and Transforming a Data Set`_.

Controlling Data Flow
^^^^^^^^^^^^^^^^^^^^^

To configure which source or transforms flow into a data set and which transforms and exports are fed from a data set, click on the 'Data Flow' tab.
This tab shows a diagram illustrating the sources of incoming data as well as any destination data sets storing transform results or external systems to which data has been exported.

.. image:: /_static/UsageGuide/dataFlowDiagram.png

Data sets that hold data imported from an external source will display the external source on the left.
In the case of the 'Bank Incidents' data set shown, the source is a URL source.

.. image:: /_static/UsageGuide/dataFlowSource.png

To edit the details of the import click on the pen icon.
Make any necessary changes and click 'Update' to save.

.. image:: /_static/UsageGuide/editSource.png

To re-run the import process click on the circular arrow icon.
This will start the import process and fetch additional data into this data set from the source according to the import settings.

Data sets that have been created via a transform will show the upstream data set from which the transform read data on the left.
In the case of the 'Wikipedia Entities' data set shown, the upstream data set is 'Wikipedia Articles' and transform being applied is 'Document Entities'.
The 'Document Entities' transform reads from the 'Wikipedia Articles' data set and extracts Named Entities such as persons, places, and organizations from unstructured text and writes out the list of entities found in each article to the 'Wikipedia Entities' data set.
Upstream transforms can be re-run by clicking on the circular arrow icon and can be edited by clicking on the pen icon.

.. image:: /_static/UsageGuide/dataFlowDiagram.png

Downstream data sets are shown on the left along with the name of the transform reading from this data set to create a new data set.
In the case of the 'Wikipedia Entities' data set shown, the downstream data set is 'Wikipedia Entity Graph'.
To re-run the downstream transform, click on the circular arrow and to edit the transform settings click on the pen icon.

Any external systems to which a data set has been exported will also appear on the left and can be re-run and edited the same way as sources and transforms.

New downstream transforms and exports can be added to a data set by clicking 'Create Transform' and 'Create Export' buttons respectively.
For details on creating a transform see `Analyzing and Transforming a Data Set`_.
For details on exporting data sets see `Exporting a Data Set`_.

Any import, transform, or export jobs can be seen in the History table under the Settings tab for this data set.

Changing Data Set Settings
^^^^^^^^^^^^^^^^^^^^^^^^^^

To change settings for a data set, click on 'Data' in the primary navigation menu on the left and then click on the 'Settings' tab.
The settings tab allows the data set details to be viewed and changed.

The first section allows the name and description of the data set to be changed.
To edit the data set name or description, simply enter new information into the form inputs and click the 'Update' button.

.. image:: /_static/UsageGuide/dataSetSettings.png

On this tab, you can also repair a data set by clicking the 'Repair Data Set' button, which will re-index records, recalculate statistics about attributes, and resample the data set.

To clear a data set, removing all records from it but leaving the settings, sources, transforms, and exports configured intact, click the 'Clear Data Set' button.

To delete a data set, removing it completely from the system, click the 'Delete Data Set' button.


Data Set History
----------------

A history of the processing jobs that have been applied to this data set can be seen by clicking on the History tab on the Settings page.

.. image:: /_static/UsageGuide/historyTable.png

If jobs are currently running they can be stopped if necessary by clicking the red X icon next to the job.

Any errors encountered during the job will also be shown in this table.

Data Set Permissions
--------------------

This section shows a list of groups and the specific permissions those groups have for this data set.
See `Data Set Security and Access Control`_ for details on controlling access to a data set.

Indexing Settings
-----------------

The indexing settings tab makes it easy to configure which attributes of a data set are searchable.
By default, Koverse indexes all attributes found.
Any new attributes showing up in newly imported data will also be automatically indexed.

.. image:: /_static/UsageGuide/indexAll.png

To prevent a particular attribute from being indexed, and therefore being searchable, click the radio button labeled 'Index Specific Fields'.
This will allow you to select whether to index attributes by checking or unchecking the box next to each attribute.
Once the set attributes to be indexed is selected, click the 'Save' button at the bottom of the page.

.. image:: /_static/UsageGuide/indexSpecific.png

Changing the set of attributes indexed will cause a background re-indexing job to be started.
When this job is complete the index will have been updated to reflect these settings and any newly imported data will be indexed according to these settings.

Masking Settings
----------------

This section shows a list of attributes within this data set, whether each attribute is masked, and any groups that are allowed to see the original values of a masked attribute.
See `Data Set Security and Access Control`_ for details on controlling masking settings.

Viewing audit information
^^^^^^^^^^^^^^^^^^^^^^^^^

All actions performed that involve a particular data set can be viewed on the Audit tab of the data set detail page.
These audit log entries are shown in reverse chronological order so the most recent events appear first in the table.

.. image:: /_static/UsageGuide/dataSetAudit.png

The details of each particular audit log entry can be seen by clicking the 'Show Details' button next to an audit log entry in the table.

Downloading an Entire Data Set
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To download all the records in a data set, click on the circular download button in the upper right corner of the data set detail page.

Records can be downloaded to your browser as a CSV file or a JSON file.

Note that if a data set may contain more records than can be stored on a single disk drive.
For data sets with more than about a hundred million records or so it may not be possible to download the entire set to a desktop or laptop machine.

.. image:: /_static/UsageGuide/download.png

.. include:: /snippets/addingdata1.rst

Step 1 (alternative method). Uploading files from desktop
---------------------------------------------------------

Instead of connecting to an external data source, you can upload files directly from your browser into a data set in Koverse.
To do this, click on 'Upload Files' on the Add Data Set page.

You can drag and drop files from your desktop into the grey rectangular section on this page or click the 'Browse Files' button to select files to upload.
These files will be staged and listed on the right.
If you wish to remove some staged files before importing, click the minus icon next to the file you wish to remove.
To clear all the files currently staged, click on the minus icon at the top of the list of staged files.

.. image:: /_static/UsageGuide/fileUpload.png

Note that typically files loaded into a single data set will have the same 'schema' or structure.
For example, you may have several CSV files you wish to load.
Each CSV file may have a header that identifies the names of fields contained in the CSV records.
If the fields in each file are not the same it may make working with the data set more inconvenient later on.

However, Koverse makes no restrictions on the fields that records in a data set can have, and it is often the case that not all records have exactly the same fields.
Koverse also does not require that all the values in a particular field be of the same size or type.

If the set of files you want to load are of the same schema (have the same set of fields) but for some reason are of differing formats, e.g. some fields are CSV and others are XML, you should load the files of each format into separate data sets and combine them into one data set later using a transform.
This is because Koverse will use one parser per import job, so you can use a CSV parser to import the CSV files in one import, and an XML parser to import XML files in another import job.

When you are satisfied with the list of files staged, click 'Next'.
You will be taken to a preview of records to be imported on the next page.

.. include:: /snippets/addingdata2.rst

One common situation is importing XML data.
Koverse requires that an XSLT script be provided to let Koverse know how the XML file should be broken into individual records, since there isn't enough information in XML files to do this reliably automatically.
See the section on `Providing an XML Transform (XSLT) to import XML data`_ for details.

Go to `Viewing Import Progress`_ for more details.

Configuring a Schedule
~~~~~~~~~~~~~~~~~~~~~~

To add a schedule, choose 'On a schedule' and specify the date that the schedule starts, how often to repeat, and an optional end date.
Click 'Add Schedule' to add the schedule.

You can add additional schedules if necessary.

When the settings for when to import are complete, click 'Finish'.
If running this import only one time, or continuously the import will begin immediately, otherwise it will start according to the schedules specified.

.. include:: /snippets/addingdata3.rst

You can now explore and search the data set as described in the sections `Exploring a Data Set`_ and `Search`_.

To grant access to other groups of users, see the section `Data Set Security and Access Control`_.

Example
~~~~~~~

When our import of bank security incidents is done, you will see an overview of each attribute, including 'causeType', 'impact', etc.

Once this is done we can load the other four files into four additional data sets, giving each data set the name listed in the `Step 1. Selecting a source type`_ section.

Go to `Exploring a Data Set`_ for details on exploring these attributes.

Analyzing and Transforming a Data Set
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Beyond storing and securing data sets, and making the information within them available via search, Koverse also supports performing bulk processing and analysis on data sets via a feature called 'Transforms'.
Transforms allow users to clean up a data set, summarize or aggregate the information in a data set, or combine two or more data sets to produce a new data set.
Data sets created this way are also managed by Koverse and can be searched and explored like other data sets.

To use a transform to process a data set, click on the 'Transforms' button on the primary navigation menu on the left.
Note that your user account must be a member of at least one group with the permission to 'manage transforms' in order to use the transforms feature.

.. image:: /_static/UsageGuide/transforms.png

Once on the Add Transform page, you will see a drop-down menu for selecting one or more data sets that will provide input records to this transform, an input for specifying a new data set or selecting an existing data set that will store the output records from this transform, and a list of available transform types.

Selecting Data Sets
-------------------

Select one or more data sets to provide input records to this transform.
Note that not all transforms are designed to operate on more than one input data set.
If two or more data sets have the same schema (i.e. set of attributes) then a transform designed for one input data set can process their records as if they were one data set.
This makes it easy to combine data sets with information of the same general type together.

Some transforms, like the Spark SQL Transform, are capable of joining two data sets that have differing schemas.

Configure Transform Parameters
------------------------------
Selecting a transform type will show a description of what this transform does as well as a list of parameters used to configure this transform.
Read the transform description to determine how a transforms is designed to work and what if any expectations it may have for the data sets used as input.

.. image:: /_static/UsageGuide/configureTransform.png

Fill out the transform parameters.
In some cases, transform parameters expect the names of attributes from input data sets.
In this case you will see a drop-down that allows you to select the attributes you want from a list.

After the transform is configured, choose whether this transform will run 'Automatically' or 'Periodically on a schedule'.
Choosing 'Automatically' means that the transform will execute whenever one of the input data sets is updated with new data.
Choosing 'Periodically on a schedule' will allow you to add one or more specific schedules that define when a transform will run.

After choosing when a transform should run, select how much input data this transform should process each time it is run.
Choosing 'All data' means that a transform will read all of the data available in all input data sets every time it runs.
This is appropriate if the transform computes some properties of an entire data set that cannot be updated incrementally.
In this case you may want to leave the checkbox labeled 'Replace Output Data' checked, but this is not always the case.

Choosing 'Only new data' will allow a transform to process only the data that is newly written to input data sets since the last time the transform ran.
This is appropriate if a transform is able to produce useful information from a subset of the input data.
In this case you may want to uncheck the box labeled 'Replace Output Data' so that a transform appends newly transformed data to the output of previous runs, but this is not always the case.

Choosing 'Data within a sliding window' allows a transform to process data within a window of time.

Once the transform is configured, click Save.
You will be navigated to the data set detail page, on the settings tab, of the output data set of the transform.
The new transform will be listed in the list of inputs to this data set.
You can run or edit a transform from this table.

Example
~~~~~~~

We'll combine some of our synthetic bank data to create a weak 'Key Risk Indicator' or KRI for short.

Let's suppose that our traders are supposed to do trades while under the supervision of a manager.
We may decide that it might be interesting to see if any traders are at risk for having done trades while a manager is not around, say after hours after the manager has left.

Working after hours alone might not be a good indicator of any wrong doing, and it's likely that most traders will have worked after hours at one time or another, but what we want to find out is if anyone is doing it regularly.
If we can create a ranked list of the traders who work after hours most frequently we can use that list to prioritize which traders we may want to take a close look at.

To create our list of traders who most frequently work after hours we will create a simple Spark SQL-based transform.

Click on the Transforms button on the left navigation menu.

Select 'Bank Employee Timesheets' in the drop down menu labeled 'Input data sets'.

For the output data set, type in 'Bank After Hours Working'.

Select the 'Spark SQL Transform' from the list labeled 'Select a Transform'.

In the input parameter labeled 'SQL select Statement', enter the following SQL statement::

  SELECT ?1.name, COUNT(?1.name) as daysWorkedLate FROM ?1 WHERE ?1.date > "2016-01-20" AND ?1.stopTimeHours >= 18.5 GROUP BY ?1.name

This statement will count how many days each trader left work after 6:30 pm.

Click the 'Save' button.

You will now be taken to the detail view for the output data set, 'Bank After Hours Working', on the settings tab.
We'll walk through running this transform in the next section.

Running a Transform
-------------------

If a transform is set to run on a schedule, it will be automatically started according to the schedule.
If a transform is set to run automatically, and there is already data in the input data sets, you can run it once manually to process existing data.

To run a transform manually, click on the 'Data' button on the primary navigation menu on the left, and then the 'Data Flow' tab.
Select the output data set of the transform (if you just created the transform you will be navigated to this page).

.. image:: /_static/UsageGuide/runTransform.png

Next to the transform type desired, click the circular arrow icon for that transform.
This will start a new transform job.
The job will appear in the History table under the Settings tab.

You can view the status of this running transform job and optionally stop a running job by clicking the X next to the progress bar of a running job.

If there are any errors encountered in the process of running the transform they will appear in the History table next to the transform job.

Example
~~~~~~~

To run our example transform, scroll to the 'Inputs' table on the data set details page, on the Settings tab.
You should see a single transform of type 'sparkSqlTransform'.

Click on the circular arrow to run this transform.
Click on the Settings tab, and then the History tab see the job appear with a progress bar indicating how much of the processing has completed.
After the job is complete you should see the status as 'Complete'.

You can then navigate to the attributes for this data set by clicking on the 'Overview' tab.
Initially some follow-on processing will take place to index and summarize this new data set.
You will see a progress bar indicating the status of these jobs on the overview page until they are complete.

When this is complete the overview will be displayed and will show two attributes, 'daysWorkedLate', and 'name'.
Clicking on 'daysWorkedLate' will show us a visualization of the distribution of values for this attribute.
It appears that most people. 88 of them, worked only one day late.

Four people worked late twice.
The next values we see are 29, 30, 31, 34, 35, 37 and 40.
So there is a bit of a divide between folks who work late once or twice and the people who have done it 30 times or more.

We can decide to take a closer look at who those people are using a search.
Check the box at the top of the page labeled 'Limit search to Bank After Hours Working' then type in the search::

  daysWorkedLate: [29 TO *]

This is the syntax for searching for records where the 'daysWorkedLate' field contains a number from 20 to positive infinity.
Hit enter to execute this search.

You should get 11 results, listing the names of people who worked late 29 days or more, with the exact number of days they worked late.
In previous search examples, we looked at the information for one of these people, 'Velma Huber', as an example of how we might get additional information on these individuals.

This concludes the synthetic bank data examples.
In the `Interactive Analytics`_ section we have a few more examples of working with data using some data science tools.

Troubleshooting a Transform
---------------------------
Sometimes a transform is simply misconfigured.
In this case you may see an error message associated with a job for a transform to the effect that there is a misconfiguration or in some cases a syntax error.
To fix a misconfiguration, click on the Data Flow tab for a data set and click the pen icon next to the transform you wish to edit.

You will be taken to the configuration page for the transform where you can make changes to the parameters.
Once the changes are complete, click Save.

You can run the transform again by clicking the circular arrow icon next to the transform in the Data Flow tab.

Other times a transform may fail because of a hardware failure from which the underlying execution engine, such as Hadoop MapReduce or Apache Spark, may not have automatically recovered.
In these cases a transform may simply need to be re-run.
This can be done by clicking the circular arrow icon next to a transform in the Data Flow tab.

Viewing Transform Output
------------------------
Once a transform job has completed successfully, as indicated by the success status of a transform job in the History table on the Settings tab of the output data set details page, a few background jobs will run to index and profile the new data in this data set.

You can then search the data in this data set and explore attribute information as described in the `Exploring a Data Set`_ and `Search`_ sections.

By default only the creator of a output data set of a transform can view the information in that data set.
To grant more permissions so other users can view this data, see the section, `Data Set Security and Access Control`_.


Interactive Analytics
^^^^^^^^^^^^^^^^^^^^^

In addition to running transforms to process data sets at scale, Koverse also enables users to perform interactive analysis of data sets at scale via popular tools such as Apache Spark and Jupyter Notebook.

Using Python with Koverse
-------------------------
Python is a popular interpreted programming language.

Koverse ships with a Python client to allow Python scripts to access the Koverse API.
The Koverse Python client uses Apache Thrift to communicate with the Koverse server. It is possible to generate clients for other languages as well.

To use the Koverse Python client, do the following::

 sudo pip install koverse
 Downloading/unpacking koverse
  Downloading koverse-X.X.X-py2.py3-none-any.whl (144kB): 144kB downloaded
 Requirement already satisfied (use --upgrade to upgrade): thrift in /Library/Python/2.7/site-packages (from koverse)
 Requirement already satisfied (use --upgrade to upgrade): kafka-python in /Library/Python/2.7/site-packages (from koverse)
 Requirement already satisfied (use --upgrade to upgrade): six in /Library/Python/2.7/site-packages (from kafka-python->koverse)
 Installing collected packages: koverse
 Successfully installed koverse
 Cleaning up...

The Koverse Python client can then be used in Python scripts by importing the koverse module::

 $ python
 Python 2.7.6 (default, Sep  9 2014, 15:04:36)
 [GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.39)] on darwin
 Type "help", "copyright", "credits" or "license" for more information.
 >>> from koverse import client

Connecting to the Koverse Server
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Python client can connect to the hostname of the Koverse Server (note: this is not the address of the Koverse Web App)::

 >>> client.connect('localhost')

If for some reason the client loses the connection to the Koverse Server, such as when the Koverse Server is restarted, the client can reconnect simply by calling client.connect() again.

Users can authenticate themselves to the Koverse server using their username and base-64 encoded passwords::

 >>> import base64
 >>> client.authenticateUser('myusername', base64.b64encode('mypassword'))
 >>>

If the authentication is unsuccessful an exception is raised::

 Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/Library/Python/2.7/site-packages/koverse/client.py", line 93, in authenticateUser
    tUser = ugClient.authenticateUser(auth, None, parameters)
  File "/Library/Python/2.7/site-packages/koverse/thriftgen/usergroup/UserGroupService.py", line 782, in authenticateUser
    return self.recv_authenticateUser()
  File "/Library/Python/2.7/site-packages/koverse/thriftgen/usergroup/UserGroupService.py", line 807, in recv_authenticateUser
    raise result.ke
 koverse.thriftgen.ttypes.TKoverseException: TKoverseException(_message='No authenticated user found')

Querying Koverse Data Sets
~~~~~~~~~~~~~~~~~~~~~~~~~~

The Koverse Python client can be used to interactively query data sets, fetch samples, create data sets and run transforms.

To query one or more data sets, use the client's query() method. In this example, we'll query Koverse for any data set that has a value above 100 in a field named 'Close'.::

 >>> results = client.query({'Close': {'$gt': 100.0}})
 >>> len(results)
 736

Results are returned as a list of Python dicts, each representing a record from a Koverse data set::

 >>> import pprint
 >>> pprint.pprint(results[0])
 {'AdjClose': 34.9,
  'Close': 256.88,
  'Date': time.struct_time(tm_year=42304, tm_mon=11, tm_mday=6, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=6, tm_yday=311, tm_isdst=0),
  'High': 267.88,
  'Low': 199.25,
  'Open': 263.84,
  'Volume': 236228300}

Koverse records contain fields and values. Values may be of a simple type such as int and date, but may also contain lists or dicts.

To query a specific set of data sets, specify an optional parameter with a list of data set names to query::

 >>> client.query({'Close': {'$gt': 100.0}}, ['stocks'])

or, by using the name parameter 'datasets'::

 >>> client.query({'Close': {'$gt': 100.0}}, datasets=['stocks'])

Clients can also request that the results be limited to a set number, and can request that the Koverse server deliver results beginning at a specified offset. For example::

 >>> client.query({'Close': {'$gt': 100.0}}, datasets=['stocks'], limit=10, offset=100)

Clients can also request that the Koverse Server return only a subset of the fields in each record by specifying a list of field names to include::

 >>> pprint.pprint(client.query({'Close': {'$gt': 100.0}}, data sets=['stocks'], limit=10, offset=100, fields=['Close']))
 [{'Close': 110.88},
  {'Close': 111.56},
  {'Close': 111.25},
  {'Close': 110.75},
  {'Close': 111.63},
  {'Close': 111.25},
  {'Close': 111.5},
  {'Close': 111.25},
  {'Close': 111.5},
  {'Close': 111.5}]

Fetching Data Set Samples
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because Python runs on a single machine, and because Koverse data sets may contain a large volume of records, it can be useful to
work with a sample of a data set's records, especially when building statistical models designed to be trained on a representative sample.

Koverse maintains representative samples for all data sets by default. These samples can be retrieved by the client using the getSamples() method::

 >>> samples = client.getSamples('stocks')
 >>> len(samples)
 1000



Uploading resource files
~~~~~~~~~~~~~~~~~~~~~~~~

One advantage of Python is that is has a number of well supported libraries for doing
sophisticated data analysis , such as numpy (http://www.numpy.org), scipy (http://www.scipy.org),
nltk for natural language processing (http://nltk.org),
pandas for data manipulation and analysis http://pandas.pydata.org,
scikit-learn for machine learning (http://scikit-learn.org/stable/), etc.

For this simple example, we'll model the distribution of day to day changes in stock prices so we can identify anomalous jumps or dips in price.
We can pull a sample of the stock prices from Koverse using the getSamples() method::

 >>> samples = client.getSamples('stocks')

We'll model the day-to-day changes in price as a gaussian random walk (https://en.wikipedia.org/wiki/Random_walk#Gaussian_random_walk).::

 >>> differences = [r['Close'] - r['Open'] for r in samples]
 >>> import numpy
 >>> mean = numpy.mean(differences)
 >>> mean
 -0.085472972972972849
 >>> stddev = numpy.std(differences)
 >>> stddev
 8.6134268092274517

Now we'll store our model, which just consists of these two numbers, the mean and standard deviation, in a file that we can upload and use in a transform.
Typically we wouldn't do this for such a simple model, we could pass those numbers as parameters to a transform.
But for more complicated models using a file is much more convenient.
The storeResourceFile() method will upload the model data to a file in HDFS so that it can be accessed by workers in parallel::

 >>> import cPickle
 >>> modelData = base64.b64encode(cPickle.dumps((mean, stddev)))
 >>> modelFilename = client.storeResourceFile('model1',modelData)
 >>> modelFilename
 '1438664105966model1'

Note: we used the numpy package to obtain these parameters, which means numpy must also be installed on our MapReduce worker nodes.

The storeResourceFile() method returns a unique filename that Transform scripts can reference.
Now we can use it to score all the daily changes in price to look for anomalous changes, for example: changes that are greater than two standard deviations from the mean.
We'll do that in the next section.

Running a Python Script as a Transform
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Koverse supports running Python scripts in Transforms. These transforms are simple map-only transforms.


We'll write our Python script for scoring daily stock changes based on our model.
The list of any resource files included will be passed in as an argument to our script.
In our case, we have one model filename. If there are multiple resource files, they will be separated by commas::

 >>> script = '''
 #/usr/bin/python

 import numpy
 import cPickle
 import base64
 import sys
 import json

 # load our model
 modelFile = sys.argv[1]
 f = open('/tmp/' + modelFile)
 mean, stddev = cPickle.loads(base64.b64decode(f.read()))
 f.close()

 # records from input data sets are delivered as JSON objects via stdin
 for line in sys.stdin:

	record = json.loads(line.strip())

	# calculate price change
	change = record['Close'] - record['Open']

	# if change is more than two standard deviations from the mean
	# consider it anomalous and output the record
	if abs(change - mean) / stddev > 2.0:
		print json.dumps(record)
		sys.stdout.flush()

 '''

Be sure to call sys.stdout.flush() after outputting a new record.

Any libraries our script needs to use should be installed on all the MapReduce worker nodes before hand.
Care should be taken to ensure the proper versions of libraries are installed.
See instructions on this site https://www.digitalocean.com/community/tutorials/how-to-set-up-python-2-7-6-and-3-3-3-on-centos-6-4 for tips on installing python 2.7 packages on CentOS.

In our example, workers will need the popular numpy package, which can be installed via::

 sudo /usr/local/bin/pip install numpy

once Python 2.7 and pip are installed.

To get a description of a Transform use the getTransformDescription() method. This will tell us the parameters we need to fill out to create a transform.
We're using the Python script Transform that ships with Koverse, identified by the name 'python-transform'::

 >>> desc = client.getTransformDescription('python-transform')
 >>> for param in desc.parameters:
 ...     print param.parameterName + ': ' + param.displayName
 ...
 inputDataSet: Input Data Set(s)
 outputDataSet: Output Data Set
 pythonPathParam: Path to Python Executable
 scriptParam: Python script
 resourceFiles: Comma separated resource file paths

The pythonPathParam should reference the path to the Python executable on MapReduce workers. This allows us
to use a particular version of the Python interpreter if necessary.

Define the options we'll pass to our Transform, which includes the Python script and the model filename we stored in the previous section.
We don't need to specify the input and output data sets here, we'll do that later in the call to create the transform.::

 >>> options = {
	'pythonPathParam': '/usr/local/bin/python2.7',
	'scriptParam': script,
	'resourceFiles': modelFilename
 }

Create a data set to store the output::

 >>> client.createDataSet('anomalous changes')

To setup a transform, use the createTransform() method.::

 >>> transform = client.createTransform(
		'python-transform',
		'score daily changes',
		['stocks'],
		'anomalous changes',
		options)

This returns a Transform object.
To obtain a list of Transforms that have already been created, use the listTransforms() method.

To run the transform we'll use its run() method::

 >>> job = transform.run()

This will instantiate a MapReduce job that executes our Python script on all of the MapReduce worker nodes in parallel.
This way we can process a large amount of data efficiently.

The output will be stored in the output data set we specified.
We can examine a sample of the output to verify our results::

 >>> sampleOutput = client.getSamples('anomalous changes')
 >>> first = sampleOutput[0]
 >>> print first['Close'] - first['Open']
 -22.44

This shows an example of a day when a stock dropped by 22.44 points, which is more than two standard deviations from the typical daily change.

The Python client can also be used in the context of Python tools such as iPython Notebook (http://ipython.org/notebook.html).
Simply use the same methods described above in iPython Notebooks.


Analyzing Data Sets with the PySpark Shell
------------------------------------------

PySpark is the name of Apache Spark's Python API and it includes an interactive shell for analyzing large amounts of data with Python and Spark.

Koverse supports processing data from Koverse data sets using PySpark and storing Resilient Distributed Datasets (RDDs) into Koverse data sets.

To use Koverse with PySpark, follow these steps.

Set the following environment variables::

 export SPARK_HOME=[your Spark installation directory]
 export ACCUMULO_HOME=[your Accumulo installation directory]
 export KOVERSE_HOME=[your Koverse installation directory]
 export PYSPARK_PYTHON=/usr/local/bin/python2.7

Copy the following JAR files into a the Spark installation directory::

 cd $SPARK_HOME

 cp $ACCUMULO_HOME/lib/accumulo-core.jar .
 cp $ACCUMULO_HOME/lib/accumulo-fate.jar .
 cp $ACCUMULO_HOME/lib/accumulo-tracer.jar .
 cp $ACCUMULO_HOME/lib/accumulo-trace.jar .
 cp $ACCUMULO_HOME/lib/guava.jar .

 cp $KOVERSE_HOME/lib/koverse-sdk-xml*.jar koverse-sdk-xml.jar
 cp $KOVERSE_HOME/lib/koverse-sdk*.jar koverse-sdk.jar
 cp $KOVERSE_HOME/lib/koverse-server-base*.jar koverse-server-base.jar
 cp $KOVERSE_HOME/lib/koverse-shaded-deps*.jar koverse-shaded-deps.jar
 cp $KOVERSE_HOME/lib/koverse-thrift*.jar koverse-thrift.jar


Install Koverse python files.
As described above, the Koverse Python client can be installed using::

 pip install koverse

Start PySpark::

 bin/pyspark --deploy-mode client \
 --jars koverse-sdk.jar,koverse-sdk-xml.jar,koverse-thrift.jar, \
 accumulo-core.jar,guava.jar,accumulo-fate.jar,accumulo-trace.jar, \
 koverse-server-base.jar,koverse-shaded-deps.jar

 Python 2.7.6 (default, Sep  9 2014, 15:04:36)
 [GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.39)] on darwin
 Type "help", "copyright", "credits" or "license" for more information.
 Spark assembly has been built with Hive, including Datanucleus jars on classpath
 Using Spark's default log4j profile: org/apache/spark/log4j-defaults.properties
 Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /__ / .__/\_,_/_/ /_/\_\   version 1.3.0
      /_/

 Using Python version 2.7.6 (default, Sep  9 2014 15:04:36)
 SparkContext available as sc, HiveContext available as sqlCtx.

To access Koverse's Spark functionality import the following::

 >>> from koverse.spark import *

A KoverseSparkContext object is used to obtain Spark RDDs for specified Koverse data sets.
Simply pass in the pre-created SparkContext object, the hostname of the Koverse Server, and your username and password::

 >>> import base64
 >>> ksc = KoverseSparkContext(sc, 'localhost', 'username', base64.b64encode('password'))

To get an RDD for a Koverse data set, call the koverseDataSet() method::

 >>> rdd = ksc.koverseDataSet('stocks')

This rdd can be used like other RDDs.

 >>> rdd.take(1)
 [{u'Volume': 26765000, u'High': 25.42, u'AdjClose': 25.17, u'Low': 24.46, u'Date': datetime.datetime(2014, 9, 1, 20, 0), u'Close': 25.17, u'Open': 24.94}]

If, for example, we wanted to repeat our previous analysis of this example data set, we could build a model using a few simple functions::

 >>> differences = rdd.map(lambda r: {'Date': r['Date'], 'Change': r['Close'] - r['Open']})

 >>> sum  = differences.map(lambda r: r['Change']).reduce(lambda a, b: a + b)
 >>> mean = sum / differences.count()
 >>> mean
 -0.08547297297297289

 >>> ssq = differences.map(lambda r: (r['Change'] - mean) ** 2).reduce(lambda a, b: a + b)
 >>> var = ssq / differences.count()
 >>> import math
 >>> stddev = math.sqrt(var)
 >>> stddev
 8.613426809227452

Now we can apply our model directly to our differences RDD.

 >>> anomalies = differences.flatMap(lambda r: [r] if (abs(r['Change']) - mean) / stddev > 2.0 else [])
 >>> anomalies.count()
 12
 >>> anomalies.first()
 {'Date': datetime.datetime(1998, 8, 31, 20, 0), 'Change': -22.439999999999998}

Note that, unlike the previous example, here we are not setting up a Koverse Transform which means this analysis workflow will only exist during this PySpark session.
We can persist the output, but if we want to repeat this process we'll need to run these commands again.

If we wish to persist these anomalies in a Koverse data set to that applications and users can access and search these results we can use the saveAsKoverseDataSet() method.

 >>> ksc.saveAsKoverseDataSet(anomalies, 'anomalies')

This will create a data set called 'anomalies' and store the information from our RDD into it.

If the data set already exists and we wish to simply add new data to it, we can specify append=True

 >>> ksc.saveAsKoverseDataSet(anomalies, 'anomalies', append=True)



Analyzing Data Sets with Jupyter Notebook
-----------------------------------------

Jupyter is a development tool that allows users to create notebooks containing comments and code, like iPython Notebook.
Jupyter supports other languages via the use of 'kernels'.

To use Jupyter with Koverse and PySpark, first create a kernel.json file in a folder called 'koverse'

Configure the kernel.json file as follows by setting the right value for SPARK_HOME::

 {
  "display_name": "Koverse PySpark",
  "language": "python",
  "argv": [
   "/usr/bin/python",
   "-m",
   "ipykernel",
   "-f",
   "{connection_file}"
  ],
  "env": {
   "SPARK_HOME": "",
   "PYTHONPATH": “$SPARK_HOME/python/:$SPARK_HOME/python/lib/py4j-0.8.2.1-src.zip",
   "PYTHONSTARTUP": “$SPARK_HOME/bin/pyspark",
   "PYSPARK_SUBMIT_ARGS": "--deploy-mode client --jars koverse-sdk.jar,koverse-sdk-xml.jar,koverse-thrift.jar,koverse-server-base.jar,koverse-shaded-deps.jar,accumulo-core.jar,accumulo-fate.jar,accumulo-trace.jar,accumulo-tracer.jar,guava.jar,commons-validator-1.4.0.jar pyspark-shell"
  }
 }


Install the kernel file via the command::

 ipython kernelspec install koverse/

Place the following jars into the $SPARK_HOME folder::

 accumulo-core.jar
 accumulo-trace.jar
 commons-validator-1.4.0.jar
 koverse-sdk-xml.jar
 koverse-server-base.jar
 koverse-thrift.jar
 accumulo-fate.jar
 accumulo-tracer.jar
 guava.jar
 koverse-sdk.jar
 koverse-shaded-deps.jar


Install the Koverse python module via::

 pip install koverse

Then you can fire up Jupyter and create a new notebook using the newly installed Koverse kernel.

In that notebook, you can connect to a Koverse instance via::

 import pyspark
 from koverse.spark import *
 import base64
 sc = SparkContext()
 ksc = KoverseSparkContext(sc, 'localhost', ‘your-username', base64.b64encode(‘your-password’))

You can create an RDD from a Koverse instance as follows, for example::

 rentals = ksc.koverseDataSet('Customer Rentals')
 rentals.take(1)

 [{u'email': u'DIANNE.SHELTON@sakilacustomer.org',
   u'first_name': u'DIANNE',
   u'title': u'ACADEMY DINOSAUR'}]

You can process the RDD the same as other Spark RDDs::

 pairs = rentals.map(lambda r: (r['first_name'].lower(), 1))
 nameCount = pairs.reduceByKey(lambda a, b: a + b)
 nameCount.count()
 591
 nameCount.take(1)
 [(u'sheila', 18)]

When you want to write an RDD to Koverse, convert it to be a set of Python dicts and save::

 ncRecords = nameCount.map(lambda nc: {'name': nc[0], 'count': nc[1]})
 ksc.saveAsKoverseDataSet(ncRecords, 'name count', append=True)



Analyzing Data Sets with iPython Notebook
-----------------------------------------

iPython Notebook is a popular tool for creating Python scripts that can display results and be shared with others.

PySpark can be used in the context of iPython Notebook to create repeatable workflows.

First, follow the steps to configure PySpark to work with Koverse as described in the previous section.

To use Koverse with PySpark and iPython Notebook, create a new iPython profile::

  ipython profile create pyspark

This will create a profile in ~/.ipython/profile_pyspark. In that directory, create a file called ipython_config.py with the following contents::

 c = get_config()

 c.NotebookApp.ip = '*'
 c.NotebookApp.open_browser = False
 c.NotebookApp.port = 8880

Next, in ~/.ipython/profile_pyspark/startup create a file called 00-pyspark-setup.py with the following contents::

 import os
 import sys

 spark_home = os.environ.get('SPARK_HOME', None)
 if not spark_home:
    raise ValueError('SPARK_HOME environment variable is not set')
 sys.path.insert(0, os.path.join(spark_home, 'python'))
 sys.path.insert(0, os.path.join(spark_home, 'python/lib/py4j-0.8.2.1-src.zip'))

 execfile(os.path.join(spark_home, 'python/pyspark/shell.py'))

 from koverse.spark import *


Export the following env vars::

 export SPARK_HOME=[path to your spark installation]
 export PYSPARK_PYTHON=/usr/local/bin/python2.7
 export PYSPARK_SUBMIT_ARGS="--deploy-mode client --jars koverse-sdk.jar,koverse-sdk-xml.jar, \
    koverse-thrift.jar,accumulo-core.jar,guava.jar,accumulo-fate.jar,accumulo-trace.jar, \
    koverse-server-base.jar,koverse-shaded-deps.jar"
 export KOVERSE_HOME=[path to your Koverse installation]


Now iPython Notebook can be started from the Spark installation directory::

 ipython notebook --profile=pyspark

Visit http://localhost:8880 in a web browser to access iPython Notebook and create a new notebook.
In this new notebook, everything should be imported and initialized for us to start using PySpark with Koverse.

Use the same methods described in the previous section on PySpark in iPython notebooks to obtain RDDs from Koverse data sets, process them, and persist RDDs to Koverse data sets.

.. image:: /_static/PySpark_Notebook.png
	:height: 550 px
	:width: 800 px



Exporting a Data Set
^^^^^^^^^^^^^^^^^^^^

Koverse can export data sets to external data storage systems.

To export a data set, click the 'Data' button in the primary navigation menu on the left.
Select the data set you wish to export from the list.
Click on the Data Flow tab and click the 'Create Export' button.

Select the type of storage system to which data will be exported from the list.

.. image:: /_static/UsageGuide/export.png

You will see a set of parameters to configure that identify the storage system as well as parameters to control the maximum records to output per file, a prefix for naming files, and an output directory in the case of file-based storage systems.
If outputting to a file-based system you can choose the file format to use as well as whether and what type of compression to apply.

.. image:: /_static/UsageGuide/configureExport.png

Choose whether to run this export 'Automatically', meaning whenever there is new data written to this data set, or 'Periodically on a schedule'.
If choosing to export on a schedule, you will have the option to add a specific schedule by specifying the start date and time, how often to repeat, and when the schedule ends if ever.

Choose whether to export all data every time or only new data that has not yet been exported since the last export job ran.

Once the settings are all configured, click Save.
Once you click save you will see the newly configured export on the right in the data flow diagram.

Running an Export
-----------------

If the export is configured to run on a schedule it will automatically start according to the schedule.
To run an export manually, you can click on the circular arrow icon next to an export.
This will kick off an export job.

.. image:: /_static/UsageGuide/runExport.png

Export jobs will appear in the History table for a data set in the Settings tab.
You can view progress information and view any errors associated with the export job.

To edit an export, click on the pen icon next to the export in the Data Flow tab.
This will show you the original form used to setup the export.
Make any changes required and click Save.

Data Set Security and Access Control
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse provides fine-grained access control to data sets and even individual records and attributes within data sets.

Organizations can define groups, associate users to groups, and grant permissions to groups for system actions or data set-specific actions.

In some cases the mapping of users to groups is defined by an external system such as Active Directory, LDAP, or another single-sign on system.
If not, Koverse provides a built-in method of defining users and groups.

Regardless of how users and groups are managed, Koverse will manage the permissions granted to groups for Koverse-specific system actions and for access to data sets.

In this section we outline how to carry out common data set access tasks.
For details on how to control access to system actions, see the Administrator's Guide.

All data set specific permissions are controlled via the Permissions tab for a specific data set's details.
To work with the permissions for a data set click on the 'Data' button in the primary navigation menu on the left.
Select the data set of interest from the list, click on the Settings tab and then click the Permissions tab.

Making a Data Set Private
-------------------------

A newly created data set is controlled by the user who created it, known as the 'responsible user'.
By default this user is the only user that can see that this data set exists, and this user can perform all actions on the data set.

To ensure that a data set is private and accessible only by the responsible user, remove all groups from the list on the data sets Permissions tab.
Do this by clicking the red minus icon under the 'Remove' column in the permissions list for all groups.

.. image:: /_static/UsageGuide/setPermissions.png

Making a Data Set Available to a Limited Group of Users
-------------------------------------------------------

To grant specific access to a limited group of users, first add the group that you wish to allow access to by typing in the name of the group in the input box labeled 'Add Group', if the group does not already appear in the permissions list.

.. image:: /_static/UsageGuide/addGroup.png

Even though the group is now added to the permissions list, the users that belong to this will only be able to know of its existence until specific actions are granted.
Select the specific actions to grant to this group from the list, which includes:

Read
  This allows members of the group to query this data set.
Download
  This allows members of the group to download the entire data set.
Write & Delete
  Members of the group can import new data to this data set and can delete existing data.
Manage Permissions
  Members of the group can grant permissions to other groups.
Manage Configuration
  Members of the group can change the name, indexing options, and other settings for this data set.

Making a Data Set Available to Everyone
----------------------------------------

Koverse ships by default with a group called 'Everyone', which all new users are added to when they are created.

To make a data set available to everyone, simply add the 'Everyone' group to the permissions table and grant the actions desired to this group.

Masking Specific Data Set Attributes
------------------------------------

Koverse allows data set owners to mask specific attributes so that their values are not visible in search results or downloads.

To edit a data set's masking settings click on the Data tab on the left navigation menu and select the data set you want.
Click on the Settings tab and then the Masking tab.

.. image:: /_static/UsageGuide/masking.png

This will show a list of all the attributes within this data set.
By default all attributes are visible to users that can query this data set.

To mask specific attributes, click on the check box next to each attribute to mask.
Selected attributes will be masked for all users unless specific groups are excepted.
To allow specific groups to see the values of a masked attribute, click the 'Add Excepted Group' button and select a group.
To remove a group from the list of excepted groups for an attribute, click the minus icon next to the group name.

.. image:: /_static/UsageGuide/exceptGroup.png

When finished making changes to masking settings, click the 'Save' button at the bottom of the page.

Masked attributes will display the value '[masked]' in search results and downloaded files for all users except users in at least one excepted group.

.. image:: /_static/UsageGuide/maskedResults.png

Values of masked attributes are not masked when the data set is processed in transforms or exported to external systems.
If an attribute needs to be completely removed, a new data set should be created via a transform to create a new data set without particular attributes.

Connecting Data to Tableau via the Web Data Connector
-----------------------------------------------------

Koverse can easily send data to the Tableau Desktop Application via the Koverse Web Data Connector.

Follow the steps below to connect Koverse to Tableau

- Open the Tablau Desktop Application
- Under the Connect Pane on the left, select the Web Data Connector option
- Enter http://<hostname>:8080/#/tableau-connector as the url when prompted
- Tableau will launch a web browser showing the Web Data Connector interface
- After logging in you will be able to choose a data set and select a subset of records from that data set via an SQL select statement
- Once you've selected and previewed the records, click "Send to Tableau" to import the data into Tableau

Appendix
^^^^^^^^

Providing an XML Transform (XSLT) to import XML data
----------------------------------------------------

XML can be imported into Koverse as any file can.
To parse XML data into proper Koverse records, an XSLT must be used to convert XML into Koverse Record XML.

For example, let's say you have the following XML file which you wish to import:

.. literalinclude:: /_static/xslt-examples/books-example.xml
	:language: xml

For this example, this XML file would conform to your XML schema (XSD):

.. literalinclude:: /_static/xslt-examples/books-example.xsd
	:language: xml

Now, to transform this XML into XML that represents Koverse records, the following XSLT would be used:

.. literalinclude:: /_static/xslt-examples/books-example.xsl
	:language: xml

Which would produce the following XML file that conforms to the Koverse Record XML Schema:

.. literalinclude:: /_static/xslt-examples/books-example-transformed.xml
	:language: xml

Finally, for your reference, here is the complete Koverse XML Schema:

.. literalinclude:: /_static/xslt-examples/koverse-records.xsd
	:language: xml
