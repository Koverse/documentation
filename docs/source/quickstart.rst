.. _quickstart:


Quick Start Guide
=================

Read this section to get up and running quickly with Koverse.
The following topics are included:

*	Installing Koverse: Follow step-by-step instructions for installing the most common Koverse scenarios.
*	Using Import Sources: Log in and start loading your data sets into Koverse from various external sources.
*	Querying Datasets: Create searches across some or all attributes of the data sets you've added to Koverse. Searches are the central activity for building your solution using Koverse data operations.

Note: This section is intended as a quick-start guide only.
Detailed documentation is included elsewhere in the Koverse documentation set:

*	For details about all the additional ways you can work with data sets to build solutions using the Koverse UI, read the :ref:`usageGuide`. Part of this guide also discusses managing user access to Koverse data sets.
*	If you need more details about installing Koverse in other scenarios, read the :ref:`adminguide`. This guide also discusses additional Koverse administrative tasks, including managing user access to the Koverse platform itself.
*	If you're a developer and you're ready to start creating  your own intelligent solution refer to the :ref:`DeveloperDocumentation`.

Recommendations
---------------

The recommended Operating System is RHEL 6.x or Centos 6.x.

Recommended Hadoop Release is Cloudera Manager 5.5 with Accumulo 1.7 Parcel and Service installed.
See `Accumulo Installation Guide <http://www.cloudera.com/documentation/other/accumulo/1-6-0/PDF/Apache-Accumulo-Installation-Guide.pdf>`_ for more details.

Recommended Koverse release can be found at http://repo.koverse.com/latest/csd

Infrastructure and Software
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse and the open source software it leverages must be run on a system with no less than 10 GB of memory.
For workloads beyond simple examples and testing we recommend a properly provisioned Hadoop cluster with five or more nodes.

Using the Cloudera QuickStart VM is not recommended.

Installing Koverse
------------------

Using Koverse with AWS Marketplace
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The paid AMI available in the AWS marketplace is an easy way to get a Koverse instance up and running if you do not need to install on existing infrastructure.
The instructions below assume a familiarity with AWS and Amazon EC2 instances.

AMI Installation
^^^^^^^^^^^^^^^^

- Use the AWS Marketplace to select the Koverse AMI and launch an instance using it.
- Determine the instance type appropriate for your use case.  For simple proof of concept cases, r3.xlarge will be sufficient, more demanding uses will require more resources.
- Perform the normal launch process for the instance.  Ensure that port 7080 is available in the security group, as this is the port that Koverse uses.
- Instance launch will take 10-15 minutes while the Hadoop stack is configured.
- Once Koverse is available, you can login at this URL: http://<hostname>:7080/ using username 'admin' and the password is the instance id (for example, 'i-1234ab567')
- You can now skip ahead to the Adding a New Data Set section.

Installing on an on premises cluster using Cloudera Manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To install on a local cluster using Cloudera Manager, follow the instructions in :ref:`csdInstallation`

.. _quickImport:

Adding a Data Set
-----------------

Koverse allows data to be imported from a variety of external data sources.

Logging in
^^^^^^^^^^

In some production instances of Koverse, authentication is handled automatically by a public key infrastructure or other integrated single-sign on system.
If so, when you first visit the Koverse URL in a browser you will automatically be logged in.
On a system that is using built-in Koverse user and group management, you will see the following login screen:

.. image:: /_static/UsageGuide/login.png

To login to a newly installed Koverse instance, type in 'admin' for the user name and 'admin' for the password.
Otherwise, login using the username (often your email address) and password that have been provided to you by your administrator.

If your password is incorrect you will see an error.


To import data into Koverse, click the 'Add' button on the primary navigation menu on the left.

Data can be imported from a number of source types, which are listed on the Add Data Set page.
Alternatively, data can be uploaded from your browser.

Loading data into Koverse is a three-step process.

1. Select and define an external source or upload files from your browser into a staging area managed by Koverse.
2. View a preview of the records to be imported and make any corrections to parser settings. You can also apply additional processing rules to your records at this step called 'Normalizations'.
3. Enter a name for the new data set and optionally create a schedule for importing data.

Step 1. Selecting a source type
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To import data from an external data source (versus via uploading files from your browser) ensure that 'Connect Source' is selected at the top of the Add Data Set page.
Choose a source type from the list shown.

.. image:: /_static/UsageGuide/add.png

After a source type is selected you will see a list of parameters used to identify and connect to that data source.
Fill out the access information and click Next.
To change the type of source selected, click Back.
Clicking Cancel will allow you to start over from the beginning.


After clicking next you will see a preview of the records to be imported.
See the section `Step 2. View a Preview of the Data`_ to proceed.

If there was an error generating the preview (e.g. caused by source invalid parameters), a message
describing the nature of the error and diagnostic information will be shown.

**Example**

Koverse hosts some example data files for use in these examples.
This data is synthetic and is designed to illustrate how Koverse can be used to explore data sets with the goal of identifying potentially risky internal behavior.
There are 5 different files that we'll load into 5 new Koverse data sets.
The files are hosted at the following URLs:

Bank Security Incidents
  https://s3.amazonaws.com/koverse-datasets/financial+demo/all-incidents.csv

Bank Transactions
  https://s3.amazonaws.com/koverse-datasets/financial+demo/all-transactions.csv

Bank Employee Timesheets
  https://s3.amazonaws.com/koverse-datasets/financial+demo/employeeHours.csv

Bank Employees
  https://s3.amazonaws.com/koverse-datasets/financial+demo/employees.csv

Bank Departments
  https://s3.amazonaws.com/koverse-datasets/financial+demo/orgs.csv

We'll load these one at a time into individual data sets.
To load the first of these we'll choose 'URL Source' from the list.
In the parameter labeled 'Comma-separated list of URLs' paste in the following URL:

  https://s3.amazonaws.com/koverse-datasets/financial+demo/all-incidents.csv

And click 'Next'.


Step 2. View a Preview of the Data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

Text file formats such as CSV represent all values as text, including numbers and dates.
Koverse parsers for text file formats can automatically interpret these values as their proper type so that they can be passed to analytics properly and searched using ranges, for example.
This behavior can be enabled or disabled by checking the 'Determine Types' option.
Disabling it will result in some values being unsearchable, but can be useful for applying normalizations to the original text values before interpreting their types.
When disabling type conversion by the parser for this purpose, types can be determined again after original values are modified by applying the normalization titled 'Interpret all string values'.

One example of this process is using the normalization titled 'Prepend text to a field value' which can be used to add some text such as 'ID' to the beginning of number values so that they are interpreted and searched as textual identifiers rather than numbers.
In this case the 'Determine Types' option of the parser should be unchecked, then the 'Prepend text to a field value' normalization added, and finally the 'Interpret all string values' normalization added.
See the next section on using normalizations for more detail.

After making a change to a parser or its options, the import preview will automatically update so that the changes can be verified.

We can choose to apply optional normalization rules next, or simply click 'Next' to go to step 3.


Also note the automatic normalization of field names.
Koverse supports nearly all 1,114,112 UTF-8 characters except for 2,097 that are problematic for JSON parsing and/or query syntax.
These problematic UTF-8 characters or codepoints are generally grouped into three categories:

- control,
- punctuation, and
- emoticon codepoints.

These UTF-8 codepoints are regularly referred to as **illegal characters**. The UTF-8 illegal characters that are control codepoints are in decimal range [0, 31]. The UTF-8 illegal characters that are punctuation control codepoints are not in a contiguous decimal range, but include (and is not limited to) characters such as left/right parenthesis, exclamation mark, colon, left/right square bracket, and reverse solidus (backslash). The UTF-8 illegal characters that are emoticon codepoints are in the decimal range [55296, 57343]. All UTF-8 illegal characters are simply removed from the original field names before being stored. As field names are normalized by disallowing illegal characters, this normalization impacts downstream querying as user may expect querying against the orignal field names but some (or all) field names may have changed.

**Example**

In our example, we're loading a CSV (comma-separated values) file from a URL.

On the preview page you should see a list of the first 100 records from this file in the record grid.
Koverse tries to determine the file format automatically and should select the 'Excel-style CSV' parser.
If so, the records should look correct in the grid, where there are 100 separate records, and each record has 21 fields (even though some values are null).

If some other parser was used, the records should not appear correctly in the grid, and you can choose 'Excel-style CSV' from the list of parsers on the right and click 'Apply' to see a corrected set of records.
When the records look correct, click 'Next' and go to `Step 3. Choose a Destination Data Set`_.

**Applying Normalization Rules**

In addition to correctly configuring a parser for an import, users can apply one or more optional normalization rules to modify records being imported.
On the right below the parser settings on the records preview page there is a list of available normalization rules to apply.

.. image:: /_static/UsageGuide/normalization.png

For example, you may choose to only import a subset of fields available in records.
Choose the 'Select Fields' normalization from the list by clicking on it.
This will display a section at the top of the right hand section where you can enter in a comma-separated list of fields that you wish to import.
Any other fields will not be imported.

Click 'Save' and the records preview will change to reflect our new settings.

Once you are satisfied with the view of the records, click Next to go to step 3.


Step 3. Choose a Destination Data Set
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After a source has been selected or files uploaded, and after verifying that our parser settings are correct and applying any optional normalization rules, records are ready to be imported into a destination data set.

.. image:: /_static/UsageGuide/importStepThree.png

Enter a name for this new data set.
If records are being imported from uploaded files, this import will be a one-time process.
If records are being imported from an external source, you will see the option to do this import once, continuously, or to run the import periodically, 'On a set schedule'.

Choosing 'continuous' means that the import will start now and will run indefinitely until it is stopped by a user.
This is appropriate for streaming sources such as when importing from the Twitter API or from a message queue that pushes data to Koverse.

Selecting 'On a set schedule' will allow you to specify one or more schedules that define when import jobs will run.

**Example**

We'll store our example data in a data set called 'Bank Security Incidents'.
Type that name into the form for the data set name.

Leave the option for 'How often should this collection be updated?' set to 'Only one time'.

Click 'Finish'.
This will start an import of all the records from that file.


Viewing Import Progress
^^^^^^^^^^^^^^^^^^^^^^^

After adding a new data set, you will be navigated to the overview page for the new data set.
If the import is one-time or continuous, within a short time you begin to see progress information for the initial import job.
There are a few follow-on jobs that run after the import completes or after a continuous job has been running for a while, including indexing the data, gathering statistics, and sampling the data.
Progress for these jobs will display until they complete.
The data set will not be searchable until these jobs are done.

.. image:: /_static/UsageGuide/importProgress.png

Once complete, the view will update to show an overview of the attributes contained within the data set.

Any newly created data set is viewable only by the user that created it.
In this case an icon of an eye with a line through it and the label "Not shared" will be shown along with other information about a data set.
When a data set is shared with one or more groups, the number of groups with whom the data set is shared will be shown instead.

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

**Example**

We'll start typing in the search bar to explore some of the example bank data we have loaded.

In this example we want to quickly find everything we have that relates to a particular bank trader.
To search across all data sets, make sure that the check box labeled 'Limit search to ...' is unchecked.

Start typing the word::

  Velm

in the search box.
You should see some suggested search terms, one of which is 'Velma Huber'.
Click on 'Velma Huber' and you will be taken to the page listing all search results for that term.


Viewing Results from All Data Sets
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

**Example**

We searched for 'Velma Huber' and we see results from three data sets: 'Bank Employee Timesheets' showing Velma's timesheets, 'Bank Employees' showing HR information about Velma, and 'Bank Security Incidents' which show instances where Velma appears as in the 'manager' attribute or in some cases as the 'submitter'.

Velma's trader ID is listed in the 'Bank Employees' results under the column labeled 'traderId'.
We might decide to expand this search by adding Velma's trader ID to see if there are additional records in which her trader ID appears.
In the search box at the top type in::

  "Velma Huber" OR TRD0050350

and hit enter.

Now we see some additional results from the 'Bank Trade Transactions' data set representing trades that Velma executed.


Viewing Results from one Data Set
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Search results from one data set can be seen by selecting a particular data set from a search of all data sets, or by clicking on a data set on the 'Data' page and checking the box labeled 'Limit search to [data set name]' before performing a search.

Search results for a single data set appear in the 'Data' tab of the data set detail page.

The number of matches on attribute names and on records are shown.

.. image:: /_static/UsageGuide/dataSetResults.png

The set of records resulting from the search appear in a table.
Users can scroll down to view more records, up to the first 50 records.


**Example**

Continuing from our search above of data relating to Velma, we saw that there were 2744 records matching Velma's trader ID in the 'Bank Trade Transactions' data set.
To see more of these results we can click on the title of the data set in the results, or click on the link to the lower right of those results labeled 'Show in Bank Trade Transactions'.

This will take us to the data set detail view for the 'Bank Trade Transactions' data set.
Our previous search has been repeated here and now we can see more of the search results, up to the first 50.


For a description of valid search syntax, see the section :ref:`LuceneSyntax` for details.

To get all of the results we can click the 'Download Search Results' button as described in the :ref:`exploringData` section.

Continue on to the :ref:`usageGuide` for further information on using Koverse.
