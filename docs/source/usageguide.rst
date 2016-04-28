:tocdepth: 2

.. _usage-guide:

===========
Usage Guide
===========

Obtaining Koverse
^^^^^^^^^^^^^^^^^

Downloading
-----------

A free evaluation version of Koverse can be downloaded from the Koverse website.
Visit http://www.koverse.com/_____________.

Choose whether to download the RPM, for installation using the Red Hat Package Manager, or a Cloudera parcel for installation on CDH, the Cloudera Distribution for Hadoop.

Installation and Configuration
------------------------------

To install Koverse, see detailed installation instructions for the RPM at X.
For the Cloudera parcel, see X.

Using Koverse
^^^^^^^^^^^^^

Koverse is a server process and a web application that provides users with an interface for managing diverse, complex, and large data sets effectively.

Some key terms and concepts we will be using include the following:

- A 'data set' is a collection of 'records' managed by Koverse. These records may have been imported into Koverse from an external data 'Source' such as a relational database, a set of structured files such as CSV files or JSON or 'unstructured' files such as Microsoft Office documents in a remote file system such as an FTP server, or even a messages from a streaming source such network socket or a message queue.
- A record consists of one or more attributes.
- An attribute has a name and a value. For example, from a relational database we may import several rows from a table, each of which is stored as a record in Koverse. The individual columns of each row from the database table are the attributes of the record. But Koverse records in the same data set do not necessarily all have the same set of attributes. And a value associated with an attribute may be a simple value, such as a number or a date, but may also be a large body of text, or a complex value such as a list or a set of name-value pairs.
- Data sets can be processed to produce new data sets via 'Transforms', which are distributed data processing jobs.
- Data sets can also be exported to other data storage systems

In this user guide we will walk through using the Koverse user interface.

To access the Koverse user interface you will need to know the URL of your Koverse instance.
The URL consists of the hostname of the server on which the Koverse web application is running into a browser, followed by :8080 to indicate that port 8080 should be used.
For example, if the Koverse web application is running on a server called 'koverse-server.net', the user interface can be accessed by visiting http://koverse-server.net:8080 in a web browser.

Supported browsers include:

- Internet Explorer 10+
- Microsoft Edge
- Chrome
- Firefox
- Safari

Logging in
^^^^^^^^^^

In some production instances of Koverse, authentication is handled automatically by a public key infrastructure or other integrated single-sign on system.
If so, when you first visit the Koverse URL in a browser you will automatically be logged in.
On a system that is using built-in Koverse user and group management, you will see the following login screen:

- screenshot

To login to a newly installed Koverse instance, type in 'admin' for the user name and 'admin' for the password.
Otherwise, login using the username (often your email address) and password that have been provided to you by your administrator.

If your password is incorrect you will see an error.


Once logged in successfully, you will now see elements of the Koverse user interface, which are described below.

Main Navigation

The buttons on the left allow you to navigate between major sections of Koverse.
Some of these may not be viewable if your user account does not have permission to perform certain actions.
The major sections are :

- Data - Explore data sets that are currently managed by Koverse, via search and viewing summary information. Settings for data sets and audit events can also be seen and changed here.

- Add - Add a new data set to Koverse from an existing data source.

- Transforms - Clean up records in a data set, summarize or aggregate information in a data set, or combine two or more data sets to create a new data set via 'Transforms'.

- Account - Access your user information, and make changes such as setting a new password.

- Admin - Add new users and groups to the built-in Koverse user management database, upload extensions to Koverse called 'Add-ons', and view system wide audit logs.


Data View

This is the first view seen after logging into Koverse.
On the left you will see a list of data sets in alphabetical order.
These are the data sets your user is allowed to see.
There may be other data sets managed by the system that your user account does not have access to that do not appear in this list.

Clicking on a data set will show the detail view for that data set.

At the top of the page is the search bar, which we will discuss in the next section.
Below that is the name of the data set, and a list of optional labels that have been applied to this data set.
Finally we have some 'metadata' about this data set, including the total number of records, the date the data set was created, and the last time data was imported into this data set.

There are four tabs on the data set detail page:

- Overview - a summary of all the data set 'attributes' (also sometimes called fields or columns) found in this data set
- Data - search results from this data set will appear here
- Settings - change data set settings such as the name, import more data, view processing events, and other actions.
- Audit - view the audit log of events that have taken place involving this data set, such as searches, imports, etc.

We discuss each of these tab pages next.

Data Set Overview Tab

When any data is imported, Koverse automatically profiles the incoming records and keeps track of information about individual attributes.
Information about each of these attributes is displayed here including:

- the attribute name
- the number of records in which it is present
- an estimate of the number of unique values found for this attribute
- the predominant value type
- a visualization of the distribution of values

To see the associated visualization for an attribute, click the down arrow at the right of the attribute information.

This information can help you get a sense for what kind of information a particular data set contains, and can help identify potential opportunities for answering questions using this information either in searches or in analytics, as well as any data quality issues that might exist.
For example, as a data scientist I might be interested to find out which attributes in a data set contain text that I can process to extract a sentiment score.
Or I may be interested in finding out what fields contain customer IDs so I can join this data set with another data set.

If I see that a field isn't present in all the records, or of not 100% of the values are of the same time, it may be because there are data quality or consistency issues, or it may be another feature of the data that may need to be considered.
For example, not all Twitter messages contain hashtags, and I can get a sense for what proportion do from the information in this overview.

Data Tab

Settings Tab

Audit Tab

Search Bar

Data Set Detail View

Search
^^^^^^

Koverse enables search across all attributes of all data sets that users are authorized to read and searching within a specific attribute or a specific data set.
To search across all data sets, click on the Search button in the main navigation bar on the left.
This will take you to the main search page.

Main Search Page
----------------

The main search page shows a list of the ten most recent queries performed by the currently logged in user and a search bar.

Recent queries
--------------



Auto-complete
-------------

- Example

Find relevant information in any data set
-----------------------------------------

Search syntax
-------------
        - single term
            - Example
        - multiple terms (and, or)
            - Example
        - searching within a field
            - Example
        - range queries
            - Example
        - wildcards
            - Example
Click to a single data set’s results
------------------------------------
        - Example

Download results
----------------
        - Example

Exploring Data Sets
^^^^^^^^^^^^^^^^^^^

Viewing Attributes
------------------

Searching data
--------------
  - downloading search results
  - Example

Changing Settings
-----------------

Importing more data
-------------------

Changing Permissions
--------------------

Viewing audit information
-------------------------

Downloading an entire data set
------------------------------

Adding a New Data Set
^^^^^^^^^^^^^^^^^^^^^

select a source type
--------------------
    - Example
    - fill out access information
        - Example

uploading files from desktop
----------------------------

view a preview of the data
--------------------------
        - adjusting parser settings
            - Example
        - adding normalization rules
            - Example

choose a destination data set
-----------------------------
        - Example

configuring a schedule
----------------------

running import
--------------

viewing progress
----------------
        - records per second

view output
-----------
    - see set permissions

Analyzing and Transforming a Data Set
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    - choose a transform type
        - Example
        - Description of built in transforms
    - select input data sets
        - Example
    - set output data set
        - Example
    - configuring parameters
        - Example
    - setting a schedule
    - running a transform
        - Example
    - viewing transform jobs
        - Example
    - troubleshooting
        - Example
    - View output
    - Interactive analytics
        - pyspark shell
        - scala spark shell
        - iPython  / Jupyter notebook

Exporting a Data Set
^^^^^^^^^^^^^^^^^^^^

Security and Access Control
^^^^^^^^^^^^^^^^^^^^^^^^^^^
    - making a data set private
        - read/query access
        - Transform
        - write access
    - making a data set available to a limited group of users
    - making a data set available to everyone
    - Access control for analytics and applications
