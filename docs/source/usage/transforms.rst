.. _transforms:

Analyzing and Transforming a Data Set
=====================================

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

.. _ConfigureTransforms:

Configure Transform Parameters
------------------------------

Selecting a transform type will show a description of what this transform does as well as a list of parameters used to configure this transform.
Read the transform description to determine how a transforms is designed to work and what if any expectations it may have for the data sets used as input.

.. image:: /_static/UsageGuide/configureTransform.png

Fill out the transform parameters.
In some cases, transform parameters expect the names of attributes from input data sets.
In this case you will see a drop-down that allows you to select the attributes you want from a list.

Email notifications are also available for when the transform completes. The work in the same way as they do for imports and exports.
See :ref:`EmailNotifications` for more infomation.

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

Choosing 'Data within a sliding window' allows a transform to process data within a window of time. See :ref:`ConfigureTransformWindows` for more detail.

Finally, select whether to write output to a new data set, or an existing data set.
For a new data set, provide a name for this new data set.
For an existing data set choose the existing data set by clicking on the drop down menu and selecting the data set from the list.

Once the transform is configured, click Save.
You will be navigated to the data set detail page, on the settings tab, of the output data set of the transform.
The new transform will be listed in the list of inputs to this data set.
You can run or edit a transform from this table.


For example we'll combine some of our synthetic bank data to create a weak 'Key Risk Indicator' or KRI for short.

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
If the transform was configured to run automatically, it will then be started.

You will now be taken to the detail view for the output data set, 'Bank After Hours Working', on the settings tab.
We'll walk through running this transform in the next section.

.. _ConfigureTransformWindows:

Configure Transform Sliding Time Windows
------------------------------------------

Transform sliding time windows allow the transform to only process data that was created within a specific time window.
For example, transforms can be configured to only operate over the last 24 hours of data.
Because sliding time windows have both a starting and ending time window, it is also possible to operate over an interval of data.
For example, transforms can be configured to only operate over data that is between 2 to 4 hours old.

Both the starting and ending values for the time window can be configured using a variety of time unit specifications.
Those time units are: minutes, hours, days, weeks, and years.
When the transform is run, the data that it is given as input will be limited to that which has been added during the configured interval.

.. image:: /_static/UsageGuide/transformSlidingTimeWindow.png

To use sliding time windows for a transform, select "Sliding Window" in the transform's configuration page.
Next, select a time interval, such as hours.
The "Window start time" slider component specifies how far in the past to start the time window.
The "Window duration" slider specifies the duration of the time window.

For example, to process all data in the past two hours, set both sliders to two hours.
To specify all data that is older than one hour but newer than two hours, make the start time to two hours and the duration to one hour.

Running a Transform
-------------------

If a transform is set to run on a schedule, it will be automatically started according to the schedule.
If a transform is set to run automatically, and there is already data in the input data sets, it will automatically run after saving it.
After saving, the transform can also be run manually at a later time.

To run a transform manually, click on the 'Data' button on the primary navigation menu on the left, and then the 'Data Flow' tab.
Select the output data set of the transform (if you just created the transform you will be navigated to this page).

.. image:: /_static/UsageGuide/runTransform.png

Next to the transform type desired, click the circular arrow icon for that transform.
This will start a new transform job.
The job will appear in the History table under the Settings tab.

You can view the status of this running transform job and optionally stop a running job by clicking the X next to the progress bar of a running job.

If there are any errors encountered in the process of running the transform they will appear in the History table next to the transform job.

If available, a complete diagnostic for the cause of the error will be shown as well, in the form of a exception stack trace.

This stack trace can help you diagnose what caused the error so you can resolve any problems that caused it.
It can also be sent to Koverse Support for help diagnosing and fixing the error.


For example to run our example transform, scroll to the 'Inputs' table on the data set details page, on the Settings tab.
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
In the :ref:`interactiveAnalytics` section we have a few more examples of working with data using some data science tools.

Troubleshooting a Transform
---------------------------

Sometimes a transform is simply misconfigured.
In this case you may see an error message and diagnostic information associated with a job for a transform to the effect that there is a misconfiguration or in some cases a syntax error.
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

You can then search the data in this data set and explore attribute information as described in the :ref:`exploringData` section.

By default only the creator of a output data set of a transform can view the information in that data set.
To grant more permissions so other users can view this data, see the section, :ref:`DataSetSecurityAndAccessControl`.
