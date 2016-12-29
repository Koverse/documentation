
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

When the checkbox labeled 'Limit search to ..' followed by the data set name is checked, only auto-complete suggestions that apply to the data set selected will be suggested.

In addition to suggested search terms, the names of labels and data sets that match the word typed will also appear.
Label suggestions have a small label or tag icon next to them.
Data set suggestions have a small page with writing icon next to them.

Clicking on a suggested search term will execute a search for that term.

.. image:: /_static/UsageGuide/autocomplete.png

Example
~~~~~~~

We'll start typing in the search bar to explore some of the example bank data we have loaded.

In this example we want to quickly find everything we have that relates to a particular bank trader.
To search across all data sets, make sure that the check box labeled 'Limit search to ...' is unchecked.

Start typing the word::

  Velm

in the search box.
You should see some suggested search terms, one of which is 'Velma Huber'.
Click on 'Velma Huber' and you will be taken to the page listing all search results for that term.


Viewing Results from All Data Sets
----------------------------------
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
~~~~~~~

We searched for 'Velma Huber' and we see results from three data sets: 'Bank Employee Timesheets' showing Velma's timesheets, 'Bank Employees' showing HR information about Velma, and 'Bank Security Incidents' which show instances where Velma appears as in the 'manager' attribute or in some cases as the 'submitter'.

Velma's trader ID is listed in the 'Bank Employees' results under the column labeled 'traderId'.
We might decide to expand this search by adding Velma's trader ID to see if there are additional records in which her trader ID appears.
In the search box at the top type in::

  "Velma Huber" OR TRD0050350

and hit enter.

Now we see some additional results from the 'Bank Trade Transactions' data set representing trades that Velma executed.


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


Example
~~~~~~~

Continuing from our search above of data relating to Velma, we saw that there were 2744 records matching Velma's trader ID in the 'Bank Trade Transactions' data set.
To see more of these results we can click on the title of the data set in the results, or click on the link to the lower right of those results labeled 'Show in Bank Trade Transactions'.

This will take us to the data set detail view for the 'Bank Trade Transactions' data set.
Our previous search has been repeated here and now we can see more of the search results, up to the first 50.
