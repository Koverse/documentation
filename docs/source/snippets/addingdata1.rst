
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

Example
~~~~~~~

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
