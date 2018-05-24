.. _exploringData:

Exploring a Data Set
====================

To explore summary information about a data set, click on the 'Data' button on the primary navigation menu on the left and select a data set from the list to the right of the navigation menu.

Viewing Data Set Attributes
---------------------------

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


For example after loading the first example data set as described in the :ref:`import` section, you should be able to select the 'Bank Security Incidents' data set to see a list of attributes.

We may not know much about the information contained in a data set and this view helps us figure out what the likely meaning of each attribute is.

For example, the first attribute is called 'causeType'.
In the context of 'Bank Security Incidents' we may infer that this contains some information about the cause of each incident.

The presence count for this attribute should be 49,894 out of 49,894 records, so this attribute is present in every record.

The estimated number of unique values for this attribute is 7, so out of almost 50 thousand records we've only ever seen 7 unique values.

The data type is 100% Text, which means in every record the type of the value for the 'causeType' attribute is 'Text'.
Sometimes an attribute will not always have the same data type in every record.

Clicking on the down arrow by the 'Visual' column will show us a visualization of the top most frequent values for this attribute.
In this case Koverse automatically selected a bar chart to display a histogram of the most frequent values.
For example, the 'Infrastructure' value showed up in this attribute 3,857 times.
Placing your mouse over a column will display the exact number of records for each value.

Clicking on the up arrow at the top of the visualization will collapse this view again.
Scrolling down allows us to see other attributes.

Viewing Sample Records
----------------------

To view records of a data set, click on the 'Data' tab.
Initially, you will see a representative sample of the records in this data set.
This sample is maintained as new data is added so that it represents a subset of records sampled uniformly at random.

You can also perform a search to see records matching specific criteria.

Search
------

Koverse enables search across all attributes of all data sets that users are authorized to read.
Users can also search within a specific attribute or a specific data set.

To access search, click on the 'Data' button on the primary navigation menu on the left.
A list of available data sets is shown in a list on the left.
To the right of that at the top of the page is a search bar.

By default the search bar is set to search across all data sets.

Auto-complete
^^^^^^^^^^^^^

Typing a word in the search bar will show suggested search terms which will match values in any attribute in any record of any data set you have permission to read.
Search term suggestions matching data set records have a magnifying glass icon next to them.

When the checkbox labeled 'Limit search to ..' followed by the data set name is checked, only auto-complete suggestions that apply to the data set selected will be suggested.

In addition to suggested search terms, the names of labels and data sets that match the word typed will also appear.
Label suggestions have a small label or tag icon next to them.
Data set suggestions have a small page with writing icon next to them.

Clicking on a suggested search term will execute a search for that term.

.. image:: /_static/UsageGuide/autocomplete.png

Example
^^^^^^^^^^^^^

We'll start typing in the search bar to explore some of the example bank data we have loaded.

In this example we want to quickly find everything we have that relates to a particular bank trader.
To search across all data sets, make sure that the check box labeled 'Limit search to ...' is unchecked.

Start typing the word::

  Velm

in the search box.
You should see some suggested search terms, one of which is 'Velma Huber'.
Click on 'Velma Huber' and you will be taken to the page listing all search results for that term.


Viewing Results from All Data Sets
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To search across all data sets, type in one or more search terms in the search bar and hit enter.
Make sure that the check box labeled 'Limit search to [data set name]' is not checked.

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

Example
^^^^^^^^^^^^^

We searched for 'Velma Huber' and we see results from three data sets: 'Bank Employee Timesheets' showing Velma's timesheets, 'Bank Employees' showing HR information about Velma, and 'Bank Security Incidents' which show instances where Velma appears as in the 'manager' attribute or in some cases as the 'submitter'.

Velma's trader ID is listed in the 'Bank Employees' results under the column labeled 'traderId'.
We might decide to expand this search by adding Velma's trader ID to see if there are additional records in which her trader ID appears.
In the search box at the top type in::

  "Velma Huber" OR TRD0050350

and hit enter.

Now we see some additional results from the 'Bank Trade Transactions' data set representing trades that Velma executed.


Viewing Results from one Data Set
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Search results from one data set can be seen by selecting a particular data set from a search of all data sets, or by clicking on a data set on the 'Data' page and checking the box labeled 'Limit search to [data set name]' before performing a search.

Search results for a single data set appear in the 'Data' tab of the data set detail page.

The number of matches on attribute names and on records are shown.

.. image:: /_static/UsageGuide/dataSetResults.png

The set of records resulting from the search appear in a table.
Users can scroll down to view more records, up to the first 50 records.


Example
^^^^^^^^^^^^^

Continuing from our search above of data relating to Velma, we saw that there were 2744 records matching Velma's trader ID in the 'Bank Trade Transactions' data set.
To see more of these results we can click on the title of the data set in the results, or click on the link to the lower right of those results labeled 'Show in Bank Trade Transactions'.

This will take us to the data set detail view for the 'Bank Trade Transactions' data set.
Our previous search has been repeated here and now we can see more of the search results, up to the first 50.


For a description of valid search syntax, see the section `Search Syntax`_ for details.

To get all of the results we can click the 'Download Search Results' button as described in the `Downloading Search Results`_ section.

Continue on to the Usage Guide for further information on using Koverse.


Search Syntax
-------------------------

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
^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^

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

Koverse understands the ordering of several types of values including numbers, text strings, dates, and IP addresses::

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

For additional information on Composite Indexes, please refer to :ref:`CompositeIndexes`

Combining Ranges
^^^^^^^^^^^^^^^^

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
--------------------------

When viewing search results for a single data set, the full set of results can be downloaded using the 'Download Results' button, as either a CSV file or a JSON file.

CSV files can be loaded into many other tools such as Microsoft Excel and Tableau, and is a good choice when records consist of simple values and don't have nested lists or other structures.
JSON is a good choice for records that have complex values such as lists and lists of field-value pairs.

.. image:: /_static/UsageGuide/downloadSearchResults.png


For example by clicking the 'Download Results' button on our search of Velma's trade transactions we can choose to download all the results as either a CSV file or a JSON file.
Choose CSV and click 'Download'.

Your browser will start downloading a file that starts with the phrase 'bank_trade_transactions' and ends in ''.csv'.

Once this is downloaded you can open it in a 3rd party application such as Microsoft Excel.

For more examples in working with this bank data, see the :ref:`transforms` section.


Downloading an Entire Data Set
------------------------------
To download all the records in a data set, click on the circular download button in the upper right corner of the data set detail page.

Records can be downloaded to your browser as a CSV file or a JSON file.

Note that if a data set may contain more records than can be stored on a single disk drive.
For data sets with more than about a hundred million records or so it may not be possible to download the entire set to a desktop or laptop machine.

.. image:: /_static/UsageGuide/download.png
