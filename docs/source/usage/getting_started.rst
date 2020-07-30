.. _gettingStarted:

Getting Started
===============

In this user guide we will walk through using the Koverse user interface.

Accessing the User Interface
----------------------------


To access the Koverse user interface you will need to know the URL of your Koverse instance.
The URL consists of the hostname of the server on which the Koverse web application is running into a browser, followed by :8080 to indicate that port 8080 should be used.
For example, if the Koverse web application is running on a server called 'koverse-server.net', the user interface can be accessed by visiting http://koverse-server.net:8080 in a web browser.

Supported browsers include:

- Chrome (recommended)
- Firefox
- Safari
- Microsoft Edge
- Internet Explorer 10+


Logging in
^^^^^^^^^^

In some production instances of Koverse, authentication is handled automatically by a public key infrastructure or other integrated single-sign on system.
If so, when you first visit the Koverse URL in a browser you will automatically be logged in.
On a system that is using built-in Koverse user and group management, you will see the following login screen:

.. image:: /_static/UsageGuide/login.png

To login to a newly installed Koverse instance, type in 'admin' for the user name and 'admin' for the password.
Otherwise, login using the username (often your email address) and password that have been provided to you by your administrator.

If your password is incorrect you will see an error.

Note: If your password is incorrect three times in a row, with in a period of an hour, you will be locked out of the system for an hour. Try again after one hour.

Once logged in successfully, you will now see elements of the Koverse user interface, which are described below.

.. image:: /_static/UsageGuide/ui.png

Navigation
----------

The buttons on the left allow you to navigate between major sections of Koverse.
Some of these may not be viewable if your user account does not have permission to perform certain actions.
The major sections are:

.. image:: /_static/UsageGuide/dataButton.png
  :width: 80px

Data
^^^^

Explore data sets that are currently managed by Koverse, via search and viewing summary information. Settings for data sets and audit events can also be seen and changed here.

.. image:: /_static/UsageGuide/addButton.png
  :width: 80px

Add
^^^

Add a new data set to Koverse from an existing data source.
If you do not have permission to add a new data set to Koverse you will not see this button.

.. image:: /_static/UsageGuide/transformsButton.png
  :width: 80px

Transforms
^^^^^^^^^^

Transform are distributed processing jobs that can be used to clean up records in a data set, summarize or aggregate information in a data set, or combine two or more data sets to create a new data set.
If you don't have permissions to create or run transforms you will not see this tab.

.. image:: /_static/UsageGuide/accountButton.png
  :width: 80px

Account
^^^^^^^

Access your user information, and make changes such as setting a new password.

Requirements of a valid password:

A minimum password length of 8 (eight) characters required.

Also the password should satisfy 3 (three) of the following :

-upper-case letters
-lower-case letters
-one number
-one non-alphnumeric symbol

.. image:: /_static/UsageGuide/adminButton.png
  :width: 80px

Admin
^^^^^

Add new users and groups to the built-in Koverse user management database, upload extensions to Koverse called 'Add-ons', and view system wide audit logs.
If you don't have permissions to manage users and groups, upload add-ons, or view audit logs you will not see this tab.

Next we'll look at the elements of each of the sections we just described.

Viewing Available Data Sets
---------------------------


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
We'll discuss searching the records of data sets in the :ref:`exploringData` section.

Clicking on a data set in the list on the left will show the detail view for that data set.

When viewing details for a data set the name of the data set appears on the right, and below the name is a list of optional labels that have been applied to this data set.
To the right, there is a circular button that allows the entire data set to be downloaded, either as a CSV file or a JSON file.

Finally we have some 'metadata' about this data set, including the total number of records, the date the data set was created, the last time data was imported, and the number of groups with whom the data set is shared.


Data Tabs
^^^^^^^^^

There are four tabs on the data set detail page:

Overview
  A summary of all the data set 'attributes' (also sometimes called 'fields' or 'columns') found in this data set.

Data
  Search results from this data set will appear here.

Data Flow
  View data flowing into or out of a data set, import more data, setup transforms and exports.

Settings
  Change data set settings such as the name, view processing events, and other actions.

Audit
  View the audit log of events that have taken place involving this data set, such as searches, imports, etc.

We discuss each of these tab pages next.



.. note:: If you are using a new installation of Koverse, there will be no data sets listed in the list on the left.

To load some example data sets, see the :ref:`import` section and return here.

Once example data sets are loaded you will see five data sets in the list on the left:

- Bank Departments
- Bank Employee Timesheets
- Bank Employees
- Bank Security Incidents
- Bank Trade Transactions
