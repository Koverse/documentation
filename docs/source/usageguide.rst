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

- Internet Explorer 10+
- Microsoft Edge
- Chrome
- Firefox
- Safari

Logging in
^^^^^^^^^^

In some production instances of Koverse, authentication is handled automatically by a public key infrastructure or other integrated single-sign on system.
If so, when you first visit the Koverse URL in a browser you will automatically be logged in.
On a system that is using built-in Koverse user and group management, you will see the following login screen:

.. image:: /_static/UsageGuide/login.png

To login to a newly installed Koverse instance, type in 'admin' for the user name and 'admin' for the password.
Otherwise, login using the username (often your email address) and password that have been provided to you by your administrator.

If your password is incorrect you will see an error.


Once logged in successfully, you will now see elements of the Koverse user interface, which are described below.

.. image:: /_static/UsageGuide/ui.png

Navigation
-----------

The buttons on the left allow you to navigate between major sections of Koverse.
Some of these may not be viewable if your user account does not have permission to perform certain actions.
The major sections are :

Data
~~~~
Explore data sets that are currently managed by Koverse, via search and viewing summary information. Settings for data sets and audit events can also be seen and changed here.

Add
~~~
Add a new data set to Koverse from an existing data source.
If you do not have permission to add a new data set to Koverse you will not see this button.

Transforms
~~~~~~~~~~
Transform are distributed processing jobs that can be used to clean up records in a data set, summarize or aggregate information in a data set, or combine two or more data sets to create a new data set.
If you don't have permissions to create or run transforms you will not see this tab.

Account
~~~~~~~
Access your user information, and make changes such as setting a new password.

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

Settings
  Change data set settings such as the name, import more data, view processing events, and other actions.

Audit
  View the audit log of events that have taken place involving this data set, such as searches, imports, etc.

We discuss each of these tab pages next.


Exploring a Data Set
^^^^^^^^^^^^^^^^^^^^

To explore summary information about a data set, click on the 'Data' button on the primary navigation menu on the left and select a data set from the list to the right of the navigation menu.
The information in the 'Overview' tab is shown first, which displays a summary of all the attributes in this data set.

.. image:: /_static/UsageGuide/datasets.png

When any data is imported, Koverse automatically profiles the incoming records and keeps track of information about individual attributes.
Information about each of these attributes is displayed here including:

- the attribute name
- the number of records in which it is present
- an estimate of the number of unique values found for this attribute
- the predominant value type
- a visualization of the distribution of values

To see the associated visualization for an attribute, click the down arrow at the right of the attribute information.

.. image:: /_static/UsageGuide/attributes.png

This information can help you get a sense for what kind of information a particular data set contains, and can help identify potential opportunities for answering questions using this information either in searches or in analytics, as well as any data quality issues that might exist.
For example, as a data scientist I might be interested to find out which attributes in a data set contain text that I can process to extract a sentiment score.
Or I may be interested in finding out what fields contain customer IDs so I can join this data set with another data set.

If I see that a field isn't present in all the records, or of not 100% of the values are of the same time, it may be because there are data quality or consistency issues, or it may be another feature of the data that may need to be considered.
For example, not all Twitter messages contain hashtags, and I can get a sense for what proportion do from the information in this overview.

Search
^^^^^^

Koverse enables search across all attributes of all data sets that users are authorized to read.
Users can also search within a specific attribute or a specific data set.

To access search, click on the 'Data' button on the primary navigation menu on the left.
A list of available data sets is shown in a list on the left.
To the right of that at the top of the page is a search bar.

By default the search bar is set to search across all data sets.

Auto-complete
-------------

Typing a word in the search bar will show suggested search terms which will match values in any attribute in any record of any data set you have permission to read.
Search term suggestions matching data set records have a magnifying glass icon next to them.

In addition to suggested search terms, the names of labels and data sets that match the word typed will also appear.
Label suggestions have a small label or tag icon next to them.
Data set suggestions have a small page with writing icon next to them.

Clicking on a suggested search term will execute a search for that term.

.. image:: /_static/UsageGuide/autocomplete.png

Viewing Results from All Data Sets
----------------------------------
To search across all data sets, type in one or more search terms in the search bar and hit enter.
Make sure that the check box labeled 'Limit search to [data set name]' is not checked.
For a description of valid search syntax, see the section `Search Syntax`_ for details.

You will now see a list of search results from any available data set.
Each data set is listed in alphabetical order of the data set name.
The number of attributes names matched is listed, followed by the number of records that match.

Additional information about the data set follows, including the number of total records in the data set, the creation date and date the data set was last updated.
The first 10 records are shown in a table for each data set.

.. image:: /_static/UsageGuide/searchResults.png

Records in the table can be sorted by a particular attribute by clicking the down arrow next to the attribute name and selecting 'Sort ascending' or 'Sort descending'.
Clicking on 'Pin Left' will pin the attribute and it's values for each record to the left side of the table.
This can be done with multiple attributes to allow their values to be viewed side by side for each record.

To see more results for a particular data set, click on the name of the data set in search results or click on the link below the table for a data set labeled 'Search in [data set name]'.
This will take you to the data tab on the data set details page.

Viewing Results from one Data Set
---------------------------------

Search results from one data set can be seen by selecting a particular data set from a search of all data sets, or by clicking on a data set on the 'Data' page and checking the box labeled 'Limit search to [data set name]' before performing a search.

Search results for a single data set appear in the 'Data' tab of the data set detail page.

The number of matches on attribute names and on records are shown.

.. image:: /_static/UsageGuide/dataSetResults.png

Below this there is a link labeled 'View and search attributes'.
Clicking on this link expands a section containing a list of attributes in these search results.
Users can filter the list of attributes shown by typing a word into the box labeled 'search attributes'.
Clicking on a particular attribute name will cause the record table below to scroll to that attribute.

.. image:: /_static/UsageGuide/searchAttribute.png

The set of records resulting from the search appear in a table.
Users can scroll down to view more records, up to the first 50 records.
To download the full set of search results, see `Downloading Search Results`_.

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

Changing Data Set Settings
^^^^^^^^^^^^^^^^^^^^^^^^^^

To change settings for a data set, click on 'Data' in the primary navigation menu on the left and then click on the 'Settings' tab.
The settings tab allows the data set details to be viewed and changed.

The first section allows the name of the data set to be changed.
To edit the data set name, click the gear icon to the right of the 'Data Set' title.
Enter a new name in the input labeled 'Name' and click Save to save the new name, or Cancel to discard the change.

.. image:: /_static/UsageGuide/dataSetSettings.png

Data Set Source
---------------

The Source section shows information about the data source that was used to populate this data set.
The details of the source can be changed by clicking the gear icon next to the 'Source' title.
Changes can be saved by clicking Save or discarded by clicking Cancel.

The source can be deleted by clicking the trash can icon.

.. image:: /_static/UsageGuide/editSource.png

To re-run an import process to load data from this source, click the icon of two circular arrows.
This will start a new import job.
The status for the new import job will be shown in the History table lower down on this page.

.. image:: /_static/UsageGuide/historyTable.png

Input Transforms
----------------

The Inputs section shows any transforms that are currently feeding data into this data set.
Usually, if a data set is populated from an external source, then it won't have any transforms feeding data to it, and vice versa.
An input transform takes data from one or more other data sets currently managed by Koverse, processes their records, and stores output records in this data set.
The Inputs table allows a user to run a transform again on-demand by clicking the right arrow icon for a transform under the 'Run' column.

To edit the configuration of an input transform, click the gear icon for a transform under the 'Edit' column.
This will take you to the transform page where the configuration can be viewed and changed.
See the documentation on transforms at `Analyzing and Transforming a Data Set`_ for details.

.. image:: /_static/UsageGuide/inputsOutputs.png

Output Transforms
-----------------

The Outputs section shows a list of transforms that receive data from this data set.
Users can run and edit transforms from this table as described in the previous section.
See the documentation on transforms at `Analyzing and Transforming a Data Set`_ for details on configuring transforms.

Data Set Exports
----------------

Any external data storage systems to which this data set has been exported are listed here.
For details on exporting data sets see `Exporting a Data Set`_.


Data Set Permissions
--------------------

This section shows a list of groups and the specific permissions those groups have for this data set.
See `Data Set Security and Access Control`_ for details on controlling access to a data set.


Viewing audit information
^^^^^^^^^^^^^^^^^^^^^^^^^

All actions performed that involve a particular data set can be viewed on the Audit tab of the data set detail page.
These audit log entries are shown in reverse chronological order so the most recent events appear first in the table.

.. image:: /_static/UsageGuide/dataSetAudit.png

Downloading an Entire Data Set
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To download all the records in a data set, click on the circular download button in the upper right corner of the data set detail page.

Records can be downloaded to your browser as a CSV file or a JSON file.

Note that if a data set may contain more records than can be stored on a single disk drive.
For data sets with more than about a hundred million records or so it may not be possible to download the entire set to a desktop or laptop machine.

.. image:: /_static/UsageGuide/download.png

Adding a New Data Set
^^^^^^^^^^^^^^^^^^^^^

Koverse allows data to be imported from a variety of external data sources.
To import data into Koverse, click the 'Add' button on the primary navigation menu on the left.

Data can be imported from a number of source types, which are listed on the Add Data Set page.
Alternatively, data can be uploaded from your browser.

Loading data into Koverse is a three-step process.

1. Select and define an external source or upload files from your browser into a staging area managed by Koverse.
2. View a preview of the records to be imported and make any corrections to parser settings. You can also apply additional processing rules to your records at this step called 'Normalizations'.
3. Enter a name for the new data set and optionally create a schedule for importing data.

Step 1. Selecting a source type
--------------------------------

To import data from an external data source (versus via uploading files from your browser) ensure that 'Connect Source' is selected at the top of the Add Data Set page.
Choose a source type from the list shown.

.. image:: /_static/UsageGuide/add.png

After a source type is selected you will see a list of parameters used to identify and connect to that data source.
Fill out the access information and click Next.
To change the type of source selected, click Back.
Clicking Cancel will allow you to start over from the beginning.



After clicking next you will see a preview of the records to be imported.
See the section `Step 2. View a Preview of the Data`_ to proceed.

Step 1. Uploading files from desktop
-------------------------------------

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

When you are satisfied with the list of files staged, click Next.
You will be taken to a preview of records to be imported on the next page.

Step 2. View a Preview of the Data
-----------------------------------

After selecting an external source or uploading files you will be able to view a preview of records to be imported.
It may take a few seconds to connect to the external data source or open uploaded files.

.. image:: /_static/UsageGuide/importPreviewGrid.png

Once the preview of records is ready it will be displayed as either a table of records, or as a 'tree' view of records with nested values, depending on the structure of data imported.
You can change the type of view by clicking the buttons on the upper right of the list of records.

.. image:: /_static/UsageGuide/importPreviewNested.png

On the right there are settings for changing the type of parser used for this import, as well as a set of optional normalization rules you can apply to records as they are imported.
If for some reason the records being displayed to not look right, for example, records from a file containing CSV records, but ending in .txt may have been imported all into one field called 'body', you can change the parser used to process raw records by clicking the drop-down menu at the top of the darkened section on the right to select a new parser to try.

Sometimes the correct parser was used but it's options may need to be adjusted.
For example, the records from a CSV file may have all their values concatenated into one value because the CSV parser used the wrong delimiter character.
In this case you may need to change some of the options specific to the parser, such as the delimiter character used to separate individual values within records.

After making a change to a parser or its options, click Apply to re-run the import preview and verify that records look correct.

One common situation is importing XML data.
Koverse requires that an XSLT script be provided to let Koverse know how the XML file should be broken into individual records, since there isn't enough information in XML files to do this reliably automatically.
See the section on `Providing an XML Transform (XSLT) to import XML data`_ for details.

We can choose to apply optional normalization rules next, or simply click next to go to step 3.

Applying Normalization Rules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In addition to correctly configuring a parser for an import, users can apply one or more optional normalization rules to modify records being imported.
On the right below the parser settings on the records preview page there is a list of available normalization rules to apply.

.. image:: /_static/UsageGuide/normalization.png

For example, you may choose to only import a subset of fields available in records.
Choose the 'Select Fields' normalization from the list by clicking on it.
This will display a section at the top of the right hand section where you can enter in a comma-separated list of fields that you wish to import.
Any other fields will not be imported.

Click 'Apply' and the records preview will change to reflect our new settings.

Once you are satisfied with the view of the records, click Next to go to step 3.


Step 3. Choose a Destination Data Set
-------------------------------------

After a source has been selected or files uploaded, and after verifying that our parser settings are correct and applying any optional normalization rules, records are ready to be imported into a destination data set.

.. image:: /_static/UsageGuide/importStepThree.png

Enter a name for this new data set.
If records are being imported from uploaded files, this import will be a one-time process.
If records are being imported from an external source, you will see the option to do this import once, continuously, or to run the import periodically, 'On a set schedule'.

Choosing 'continuous' means that the import will start now and will run indefinitely until it is stopped by a user.
This is appropriate for streaming sources such as when importing from the Twitter API or from a message queue that pushes data to Koverse.

Selecting 'On a set schedule' will allow you to specify one or more schedules that define when import jobs will run.



Configuring a Schedule
~~~~~~~~~~~~~~~~~~~~~~

To add a schedule, choose 'On a schedule' and specify the date that the schedule starts, how often to repeat, and an optional end date.
Click 'Add Schedule' to add the schedule.

You can add additional schedules if necessary.

When the settings for when to import are complete, click 'Finish'.
If running this import only one time, or continuously the import will begin immediately, otherwise it will start according to the schedules specified.

Viewing Import Progress
-----------------------

After adding a new data set, you will be navigated to the overview page for the new data set.
If the import is one-time or continuous, within a short time you begin to see progress information for the initial import job.
There are a few follow-on jobs that run after the import completes or after a continuous job has been running for a while, including indexing the data, gathering statistics, and sampling the data.
Progress for these jobs will display until they complete.

.. image:: /_static/UsageGuide/importProgress.png

Once complete, the view will update to show an overview of the attributes contained within the data set.
You can now explore and search the data set as described in the sections `Exploring a Data Set`_ and `Search`_.

Any newly created data set is viewable only by the user that created it.
To grant access to other groups of users, see the section `Data Set Security and Access Control`_.


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

Running a Transform
-------------------

If a transform is set to run on a schedule, it will be automatically started according to the schedule.
If a transform is set to run automatically, and there is already data in the input data sets, you can run it once manually to process existing data.

To run a transform manually, click on the 'Data' button on the primary navigation menu on the left.
Select the output data set of the transform (if you just created the transform you will be navigated to this page).
Click on the settings tab to see the Inputs list of transforms for this data set.

.. image:: /_static/UsageGuide/runTransform.png

Next to the transform type desired, click the right arrow icon for that transform under the 'Run' column.
This will start a new transform job.
The job will appear in the History table of this settings page.

You can view the status of this running transform job and optionally stop a running job by clicking the X next to the progress bar of a running job.

If there are any errors encountered in the process of running the transform they will appear in the History table next to the transform job.

Troubleshooting a Transform
---------------------------
Sometimes a transform is simply misconfigured.
In this case you may see an error message associated with a job for a transform to the effect that there is a misconfiguration or in some cases a syntax error.
To fix a misconfiguration, click the gear icon under the 'Edit' column for a transform listed in the Inputs or Outputs section of a data set's transforms.

You will be taken to the configuration page for the transform where you can make changes to the parameters.
Once the changes are complete, click Save.

You can run the transform again by clicking the right-arrow icon under the 'Run' column in either the Inputs or Outputs table where your transform appears.

Other times a transform may fail because of a hardware failure from which the underlying execution engine, such as Hadoop MapReduce or Apache Spark, may not have automatically recovered.
In these cases a transform may simply need to be re-run.
This can be done by clicking the right-arrow icon under the 'Run' column in either the Inputs or Outputs table where your transform appears.

Viewing Transform Output
------------------------
Once a transform job has completed successfully, as indicated by the success status of a transform job in the History table on the settings tab of the output data set details page, a few background jobs will run to index and profile the new data in this data set.

You can then search the data in this data set and explore attribute information as described in the `Exploring a Data Set`_ and `Search`_ sections.

By default only the creator of a data set acting as the output of a transform can view the information in that data set.
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
Click on the Settings tab and scroll down to the Exports section.

Click the 'Create Export' button.
Select the type of storage system to which data will be exported from the list.

.. image:: /_static/UsageGuide/export.png

You will see a set of parameters to configure that identify the storage system as well as parameters to control the maximum records to output per file, a prefix for naming files, and an output directory in the case of file-based storage systems.
If outputting to a file-based system you can choose the file format to use as well as whether and what type of compression to apply.

.. image:: /_static/UsageGuide/configureExport.png

Choose whether to run this export 'Automatically', meaning whenever there is new data written to this data set, or 'Periodically on a schedule'.
If choosing to export on a schedule, you will have the option to add a specific schedule by specifying the start date and time, how often to repeat, and when the schedule ends if ever.

Choose whether to export all data every time or only new data that has not yet been exported since the last export job ran.

Once the settings are all configured, click Save.
Once you click save you will see the newly configured export in a table under the Exports section.

Running an Export
-----------------

If the export is configured to run on a schedule it will automatically start according to the schedule.
To run an export manually, you can click on the right-arrow icon for an export under the 'Run' column.
This will kick off an export job.

.. image:: /_static/UsageGuide/runExport.png

Export jobs will appear in the History table for a data set in the Settings tab.
You can view progress information and view any errors associated with the export job.

To edit an export, click on the gear icon under the 'Edit' column for an export.
This will show you the original form used to setup the export.
Make any changes required and click Save.

Data Set Security and Access Control
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse provides fine-grained access control to data sets and even individual records within data sets.

Organizations can define groups, associate users to groups, and grant permissions to groups for system actions or data set-specific actions.

In some cases the mapping of users to groups is defined by an external system such as Active Directory, LDAP, or another single-sign on system.
If not, Koverse provides a built-in method of defining users and groups.

Regardless of how users and groups are managed, Koverse will manage the permissions granted to groups for Koverse-specific system actions and for access to data sets.

In this section we outline how to carry out common data set access tasks.
For details on how to control access to system actions, see the Administrator's Guide.

All data set specific permissions are controlled via the Settings tab for a specific data set's details.
To work with the permissions for a data set click on the 'Data' button in the primary navigation menu on the left.
Select the data set of interest from the list, and click on the Settings tab.

Making a Data Set Private
-------------------------

A newly created data set is controlled by the user who created it, known as the 'responsible user'.
By default this user is the only user that can see that this data set exists, and this user can perform all actions on the data set.

To ensure that a data set is private and accessible only by the responsible user, remove all groups from the permissions list on the data sets Settings tab.
Do this by clicking the X icon under the 'Remove' column in the permissions list for all groups.

.. image:: /_static/UsageGuide/setPermissions.png

Making a Data Set Available to a Limited Group of Users
-------------------------------------------------------

To grant specific access to a limited group of users, first add the group that you wish to allow access to by typing in the name of the group in the input box labeled 'Add Group', if the group does not already appear in the permissions list.

.. image:: /_static/UsageGuide/addGroup.png

Even though the group is now added to the permissions list, the users that belong to this group still won't be able to perform any actions on this data set until specific actions are granted.
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
