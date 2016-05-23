
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

We can choose to apply optional normalization rules next, or simply click 'Next' to go to step 3.

Example
~~~~~~~

In our example we're loading a CSV (comma-separated values) file from a URL.

On the preview page you should see a list of the first 100 records from this file in the record grid.
Koverse tries to determine the file format automatically and should select the 'Excel-style CSV' parser.
If so, the records should look correct in the grid, where there are 100 separate records, and each record has 21 fields (even though some values are null).

If some other parser was used, the records should not appear correctly in the grid, and you can choose 'Excel-style CSV' from the list of parsers on the right and click 'Apply' to see a corrected set of records.
When the records look correct, click 'Next' and go to `Step 3. Choose a Destination Data Set`_.

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

Example
~~~~~~~

We'll store our example data in a data set called 'Bank Security Incidents'.
Type that name into the form for the data set name.

Leave the option for 'How often should this collection be updated?' set to 'Only one time'.

Click 'Finish'.
This will start an import of all the records from that file.
