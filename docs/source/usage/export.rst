.. _export:

Exporting a Data Set
====================

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

If exporting to a file system, you can choose if you want to export to a single file by using the "Export to a single file" checkbox.
By default, "Export to a single file" is checked to fit with the most basic use case of requiring a single output file.
If this checkbox is not checked, the distributed nature of the export process will cause multiple output files to be created, all within a single folder (one file for each Hadoop Mapper task).
If the checkbox is checked, all Hadoop Mapper tasks will feed their output to a single Hadoop Reducer task, which writes the single output file.
Because of this, exports will execute more quickly if "Export to a single file" is not checked.
So, it should be unchecked if performance is of more concern and having many output files fits your requirements.


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
