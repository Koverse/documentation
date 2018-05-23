.. _import:

Importing Data
==============

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

If there was an error generating the preview (e.g. caused by source invalid parameters), a message
describing the nature of the error and diagnostic information will be shown.

Example
^^^^^^^

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

Then go to `Step 2. View a Preview of the Data`_.



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

.. note:: Microsoft Word Files

Very large Word files above 1,000 pages in size may cause a failure during import.

When you are satisfied with the list of files staged, click 'Next'.
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

Also note the automatic normalization of field names. Koverse supports nearly all 1,114,112 UTF-8 characters except for 2,097 that are problematic for JSON parsing and/or query syntax. These problematic UTF-8 characters or codepoints are generally grouped into three categories:

- control,
- punctuation, and
- emoticon codepoints.

These UTF-8 codepoints are regularly referred to as **illegal characters**. The UTF-8 illegal characters that are control codepoints are in decimal range [0, 31]. The UTF-8 illegal characters that are punctuation control codepoints are not in a contiguous decimal range, but include (and is not limited to) characters such as left/right parenthesis, exclamation mark, colon, left/right square bracket, and reverse solidus (backslash). The UTF-8 illegal characters that are emoticon codepoints are in the decimal range [55296, 57343]. All UTF-8 illegal characters are simply removed from the original field names before being stored. As field names are normalized by disallowing illegal characters, this normalization impacts downstream querying as user may expect querying against the orignal field names but some (or all) field names may have changed.

Example
^^^^^^^

In our example we're loading a CSV (comma-separated values) file from a URL.

On the preview page you should see a list of the first 100 records from this file in the record grid.
Koverse tries to determine the file format automatically and should select the 'Excel-style CSV' parser.
If so, the records should look correct in the grid, where there are 100 separate records, and each record has 21 fields (even though some values are null).

If some other parser was used, the records should not appear correctly in the grid, and you can choose 'Excel-style CSV' from the list of parsers on the right and click 'Apply' to see a corrected set of records.
When the records look correct, click 'Next' and go to `Step 3. Choose a Destination Data Set`_.

Applying Normalization Rules
----------------------------

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
-------------------------------------

After a source has been selected or files uploaded, and after verifying that our parser settings are correct and applying any optional normalization rules, records are ready to be imported into a destination data set.

.. image:: /_static/UsageGuide/importStepThree.png

Enter a name for this new data set.
If records are being imported from uploaded files, this import will be a one-time process.
If records are being imported from an external source, you will see the option to do this import once, continuously, or to run the import periodically, 'On a set schedule'.

Choosing 'continuous' means that the import will start now and will run indefinitely until it is stopped by a user.
This is appropriate for streaming sources such as when importing from the Twitter API or from a message queue that pushes data to Koverse.

Selecting 'On a set schedule' will allow you to specify one or more schedules that define when import jobs will run.

Example
^^^^^^^^

We'll store our example data in a data set called 'Bank Security Incidents'.
Type that name into the form for the data set name.

Leave the option for 'How often should this collection be updated?' set to 'Only one time'.

Click 'Finish'.
This will start an import of all the records from that file.


One common situation is importing XML data.
Koverse requires that an XSLT script be provided to let Koverse know how the XML file should be broken into individual records, since there isn't enough information in XML files to do this reliably automatically.
See the section on :ref:`xsltImport` for details.

Go to `Viewing Import Progress`_ for more details.

Configuring a Schedule
----------------------

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
The data set will not be searchable until these jobs are done.

.. image:: /_static/UsageGuide/importProgress.png

Once complete, the view will update to show an overview of the attributes contained within the data set.

Any newly created data set is viewable only by the user that created it.
In this case an icon of an eye with a line through it and the label "Not shared" will be shown along with other information about a data set.
When a data set is shared with one or more groups, the number of groups with whom the data set is shared will be shown instead.


You can now explore and search the data set as described in the section :ref:`exploringData`.

To grant access to other groups of users, see the section :ref:`DataSetSecurityAndAccessControl`.


For example when our import of bank security incidents is done, you will see an overview of each attribute, including 'causeType', 'impact', etc.

Once this is done we can load the other four files into four additional data sets, giving each data set the name listed in the `Step 1. Selecting a source type`_ section.

Go to :ref:`exploringData` for details on exploring these attributes.
