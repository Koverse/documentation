.. _configureDataSets:

Configuring Data Sets
=====================

Controlling Data Flow
---------------------

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
For details on creating a transform see :ref:`transforms`.
For details on exporting data sets see :ref:`exploringData`.

Any import, transform, or export jobs can be seen in the History table under the Settings tab for this data set.

Changing Data Set Settings
--------------------------

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
If available, a complete diagnostic for the cause of the error will be shown as well, in the form of a exception stack trace.

This stack trace can help you diagnose what caused the error so you can resolve any problems that caused it.
It can also be sent to Koverse Support for help diagnosing and fixing the error.

Data Set Permissions
--------------------

This section shows a list of groups and the specific permissions those groups have for this data set.
See :ref:`DataSetSecurityAndAccessControl` for details on controlling access to a data set.

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
See :ref:`DataSetSecurityAndAccessControl` for details on controlling masking settings.

.. _AgeOff:

Auto Age Off Settings
---------------------

The Auto Age Off settings allow data to be automatically removed from a data set when it reaches a certain age.
Records aged-off this way are removed according to the time that has elapsed since the records were ingested, and not by any particular value within the record.

When a record is aged-off its index entries are also removed.
It is possible to remove index entries before a record is removed.
This allows storage space to be saved in the case when an application no longer needs to be able to search records, but a Transform may want to process the older records or in order keep them available for download.

By default Koverse does not age off any data.
To configure records and index entries to be aged off at a certain age, click on the Auto Age Off tab in the Data Set Settings tab and click the check box labeled 'Automatically remove records older than the given age'.

This will then display two slider controls, one for the age at which records will be aged off and one for the age at which index entries will be aged off.
Enter a value for the number of days after which records and index entries will be aged off and click the Update button.

Note that index entries can be aged off earlier than records but not later.

.. image:: /_static/UsageGuide/ageOff.png

The Auto Age Off occurs once per day by default, at midnight.
This can be change to occur less frequently or at a different hour of the day by setting the configuration settings in koverse-server.properties::

 com.koverse.server.dataset.compactfrequencydays=1
 com.koverse.server.dataset.compacthourofday=0


Viewing Audit Information
-------------------------

All actions performed that involve a particular data set can be viewed on the Audit tab of the data set detail page.
These audit log entries are shown in reverse chronological order so the most recent events appear first in the table.

.. image:: /_static/UsageGuide/dataSetAudit.png

The details of each particular audit log entry can be seen by clicking the 'Show Details' button next to an audit log entry in the table.
