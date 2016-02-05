:tocdepth: 2

Tutorials
=============

.. note:: These tutorials are meant to guide first time users through the common activities in Koverse. Each of the End User, System Administrator, and Developer tutorials are a progression of work and rely on the previous sections. Start with the End User tutorials, and continue until you believe the topics are no longer applicable.  

Tutorial Overview
^^^^^^^^^^^^^^^^^^

This tutorial will provide you step-by-step instructions on how to import a data set into Koverse, view the content of the data set, search for records from the data set, perform a transform that data set, and view the output results of the data set after the transform.

The best way to understand Koverse is by diving in and seeing working examples in action. The following sections of documentation provide step-by-step tutorial of examples on how to use Koverse.


Logging Into Koverse
--------------------

Koverse application provides a web browser based login that may be customized to your organization's needs. If your organization uses a Single Sign On (SSO) authentication system you may have the ability to be logged-in automatically.

Login Steps:

    #. Open a web browser and navigate to http://<server>/Koverse

	* Example: http://mycompany.koverse.com/Koverse

    #. Enter the user name and password given to you by your system administrator. The default user name and password is admin. 
    #. After successful login, you will be presented with the Application Dashboard.


Accessing Online Documentation
------------------------------

Koverse provides online documentation for many of the applications displayed on the Dashboard. You may need to refer to this documentation during the course of this tutorial so it's a good idea to become familiar with how to navigate the online help. 

.. image:: /_static/NavBar.png
		:height: 40 px
		:width: 1000 px

#. Click the "Help" link in the Navigation Bar at the top of the Koverse Dashboard.

	* A new browser window or tab will open, and you will be presented with the following sections of the online documentation

            * Help
                * Introduction
                * Koverse User Guide
                * Koverse Administration Guide
                * Koverse Operations Guide
                * Koverse Developers Documentation
                * Use Cases
                * Tutorials

#. Click the "Table of Contents" header on the left. 

	* Here you can see the full contents of the Koverse documentation. 

#. Close the help tab or window in your browser. You should be back to the Applications Dashboard. 

Manage your User Account
------------------------

#. Click the "Account" link in the Navigation Bar at the top of the Koverse Dashboard.
#. Click the "My Account" link. 

	* Here you can change your password, edit your account details, and view your permissions and credentials. 

#. Click the "My Account" page title on the left side of the menu bar.

	* This menu shows the same list of Applications that are available on the Applications Dashboard. 

#. Click "Applications Dashboard" 

Use those two steps to return to the Applications Dashboard at any time. 

Koverse Applications
--------------------

Koverse hosts many applications that help you manage your organizations data. The applications made available to you depend on the permissions granted by your system administrator. 

Example Application Dashboard:

.. image:: /_static/Dashboard.png
		:height: 300 px
		:width: 400 px

Data Collections
----------------

Data Collections are the basic container for data in Koverse. You can think of them like tables - but every record in a data collection can be completely unique in structure.

Create a Data Collection
^^^^^^^^^^^^^^^^^^^^^^^^

The following set of instructions will show you how to create a **New Data Collection**.

#. Click the "Data Collections" application icon under the 'Data Management' application group. 
#. Enter the name "BMW Z4M Cars" into the "data collection name" text box above the table. 
#. Click the "Create Data Collection" button. 

You have just created an empty Data Collection!


Edit a Data Collection
^^^^^^^^^^^^^^^^^^^^^^

#. Click the newly created Data Collection name in the table. 

	* You will be taken to the "Data Collection Details" for that data collection.
	* Note that no data has been imported into this Data Collection yet, so there are no details to view. 
	
#. Click the "Configuration" tab. 

	* Here you see the basic configuration of a data collection, including it's name, tags, and processing options. 

#. Click the **Edit Data Collection** button. 
#. Change the name of the Data Collection to "BMW Z4M Automobiles". 
#. Click the "Save" button.


Share a Data Collection
^^^^^^^^^^^^^^^^^^^^^^^

When a Data Collection is created, it's presence, content, and configuration are visible only to the user that created it. That user must grant the permissions to other groups before other users will be able to use it. Note that this means even system administrators can not see the Data Collection until it is shared. 

#. Click the "Permissions" tab in the Data Collection details page.  

	* Here you will see a list of groups, which are defined by your system administrator - or your organizations user directory. 

#. Click the check-box in the "Read" column for the "Everyone" row. 
#. Click "Save Group Permissions"

Your Data Collection is now visible and readable for all authenticated users. 


Upload Data from a Web Browser into Data Collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse provides users the ability to simply upload data files from their web browser. Koverse automatically parses several formats of files including CSV, XLS, XML, JSON, plus many other formats. Koverse even parses unknown files for basic information - and makes them available for retrieval or further processing. 

#. Click the link below to download an example CSV file. Be sure to note where it is saved on your computer (usually in your Downloads folder). 

	* http://data.koverse.com/bmw/z4mproduction.csv

#. Click the "Collection Details" link - which has a down arrow to the right of it, in the black menu bar at the top of the Data Collection details page. 
#. Click the "File Upload" application link. 

#. Drag the z4mproduction.csv file, which you downloaded above, into the box in the screen. 

	* You can optionally drag more than one file at a time into the box. 

#. Allow the file upload to complete. 

	* You can optionally drag additional files onto the screen. 

#. Select the "BMW Z4M Automobiles" from the Data Collection drop down at the bottom. 
#. Click "Start Import". This will import all of the files you staged into the selected Data Collection. 

The import has started, and will take a few moments to complete - based on the current work load and file sizes. 


View Field Statistics of a Data Collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After your file upload import has completed, Koverse evaluates the newly imported data and makes available to you a list of the fields and value type present in your data. 

#. Click the "File Upload" page title in the menu bar. 
#. Click the "Data Collections" application link from the drop down. 
#. Click the "BMW Z4 Automobiles" link in the table. 

	* You have now returned to the BMW Z4M Automobiles Collection details page. If the field statistics job has completed, you will see a a chart and a list of field names. 

#. Click the the "BodyType" field name - 6th from the top. 

	* On the right, you will see the details of the field, including the values discovered, and in how many records the field is present. 
	* Here we see that there are two body types for the Z4M - ROADST and COUPE. 
	* Remember that each record in a Data Collection may contain a unique set of fields. 


#. Scroll down the field list and click the InteriorColor field. 

	* Here we see that there are 6 unique values, of which one which starts with LEDERAUS... is far more prevalent than the others. 

#. Click the Fields tab

	* Here you see a complete table of fields and their given size, type, presence and some indexing options. 

#. Find the ProductionDate field.

	* Note that it is always a Date value, is present in every record, and has an Estimated Cardinality of 682. This means that there are an estimated 682 unique production date values. 

#. Find the ShortVIN field. 

	* Note the checkboxes in the "Index" column. For a field to be searchable, this checkbox must be checked. 

#. Uncheck the "Index" checkbox for the ShortVIN column. 
#. Scroll to the bottom of the table, and click "Save Field Settings". 

	* The ShortVIN column will no longer be searchable. Doing this reduces the amount of processing necessary at import time, and query time - but is generally only necessary for very large real-time data sets or field values that are extremely large. 


View Sample Records of a Data Collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Click the "Samples" tab at the top.
#. Scroll to the right and find the "PaintColor" field. 
#. Scroll down the page to view the paint colors. 

	* Note that the colors are listed in a mix of German and English. Remember that there are 6 unique values. 

#. Scroll back to the top, and further to the right to find the "VIN" and "ShortVIN" columns. 

	* Note that the ShortVIN values are the last 7 digits of the VIN value. 
	* Note that most of the columns contain simply ones and zeros. These indicate the presence of a feature, such as an alarm system. 

Now you have a very clear understanding of the contents of the data you uploaded - even though you've likely never seen or used this data before. 

Search the contents of a Data Collection 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse allows users to search indexed Data Collections using a simple search syntax. 

#. Click the "Collection Details" page title link in the menu bar. 
#. Click the "Search" link. 

	* Optionally, click the check box next to "BMW Z4M Automobiles" on the left. This will limit your search to that single Data Collection. 

#. Type ROAD into the search text box. 

	* Notice the autosuggest drop down with the value "ROADST" which starts with what you entered.

#. Click the "ROADST" value in the drop down. 
#. Click the "Discover" Button. 

	* The results are disabled in a table, with pagination. Notice that only records containing ROADST in the BodyType are returned. 

	* Notice the record count of 3,041 in the top right. This means there were 3,041 Z4M roadsters in the data. 

#. Click the three result formatting buttons that are group together at the top right below the records count text. 

	* You can view the results in one of three formats, for easier viewing. 

#. Click the number 2 in the page control above the table. 

	* You are now viewing page two of the results. 

#. Enter the lowercase word roadst in the search bar and click Discover. 

	* Notice that the same results are returned. Based on the field index options in the collection details, your searches are case insensitive. 

#. Enter the following in to the search box. 

	* BodyType: coupe AND PaintColor: silbergrau
	* Note that the AND must be in upper case. 
	* The "BodyType:" portion of this search term means 'search only in the BodyType field for this value'. 

#. Click Discover

	* Note that 209 records were returned - meaning 209 cars are both coupes and the color silbergrau (silvery grey). 

#. Change the search term AND to OR. 
#. Click Discover

Note that 2,118 records were returned. This means that there are 2,118 cars of body type "coupe" or paint color silbergrau. 


Import Data from an External Source into Data Collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse "import sources" can load data from external systems into a Data Collection. 

#. Click the "Search" title in the menu bar. 
#. Click the "Data Flow" application link. 
#. Click "Add Import Source" to start defining a new source. 
#. Choose "URL Source" from the drop down. 
#. Enter a name of "DC Website"
#. Skip the Security Label options
#. Enter the following URL
	
	* http://data.koverse.com/dc/Purchase_order_FY13.csv
	
#. Do not check 'Process files in directory'
#. Click "Add New Data Collection"
#. Enter the name "DC 2013 Purchase Orders"
#. Click "Add Source"

	* Your new import source is now configured. 
	
#. Click on the line between "DC Website" and "DC 2013 Purchase Orders" in the Data Flow diagram. 

	* This takes you to the import flow details for the source you just added. 
	
#. Click the "Run" button - which is under the "Import" tab. 

	* Your import job is now running 
	
#. Wait for the job to finish. 

	* Notice the record count, and records per second imported over time. 
	
#. When the job has completed, click the "DC 2013 Purchase Orders" Data Collection link. 

	* This takes you to the Data Collection details page. 
	
#. Review the Explore and Fields tabs.

	* Notice the presence of the ZipCodes field
	

Running a Transform on a Data Collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Transforms read data from one or more input data collections, and writes resulting data to an output data collection. Each Transform is a type of analytic or filter that produces usable results for apps, or user friendly searches. 

Here we will use a "Pearson Correlation" transform to discover the correlation between the available options on the BMW Z4. For example, are heated seats correlated, not correlated, or anti-correlated with the presence of GPS navigation.
We will use the "Correlation" application to view the results of the transform and discover the relative correlation between features. 


#. Click the "Collection Details" link in the menu bar at the top. 

#. Click the "Data Flow" link in the drop down. 

#. Click the "Add Transform" button at the top right. 

#. Choose "Pearson Correlation" from the drop down. 

#. Enter the name "BMW Z4 Feature Correlation".

#. Select the "BMW Z4M Production" collection in the Input Collections. 

#. Click the "Add New Data Collection" on the Output Collection line. 

#. Enter the name "BMW Z4 Feature Correlations"

#. Do not enter any values in the Number Fields.

	* This will cause the transform to operate over all fields. 
	
#. Leave the flow type to automatic, and minimum seconds between jobs to its defaults. 

#. Click the Add Transform button. 

	* At this point, if new data were added to the BMW Z4M Production data collection, the transform would be automatically run.
	* For now we must manually execute the transform one time. 

#. Click the line between the BMW Z4M Production and Correlations nodes in the diagram. 

#. Click the "Run Transform Job". 

#. Allow the job to complete. 


Viewing the output of a Transform
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The output of a transform is a data collection, and you could use the data collection details page to view the results. But here we will use
the "Correlation" application - which is specifically designed to be used with the output of the "Pearson Correlation" that we configured above 
- to view the results. 

#. Click the "Transform Job Details" link in the menu bar. 

#. Click the "Correlation" link in the drop down. 

#. Choose the BMW Z4M Production correlation from the drop down at the top. 

#. Move your mouse over the correlogram on the left to view the correlation value and sample correlations on the right. 

	* Bright blue means highly correlated
	* Bright red means highly anti-correlated
	* Dark means no correlation
	

Downloading Data Collections
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Reasonably sized data collection, such as those with relatively few original records or the output of a transform that summarizes a large data collection into a much smaller data collection, can be downloaded. There is no hard limit to the records that can be downloaded, but the network connection speed and available disk space on your computer are limited. 

#. Click the "Correlation" link in the top menu.

#. Click the "Data Collections" link in the drop down. 

#. Click the "BMW Z4M Feature Correlations" link. 

#. Click "Configuration" tab. 

#. Click the "Download Collection Contents" button. 

You now have the output of the data collection saved as a JSON stream file on your local computer. You can use this in external tools, or upload it to another Koverse instance. 

Exporting Data Collections
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse enables you to export data collections to outside systems. Use this for periodic backups, or integrations for data work flows. 

#. Click the "Collection Details" link at the top. 

#. Click "Data Flow" link in the drop down. 

#. Click the "Exports" tab at the top. 

#. Click the "Add Sink" button at the top right. 

#. Select the "FTP Server" 

#. Enter the name "My FTP Server"

#. Enter a valid host name, port, username and password. 

	* If you do not have an FTP server, enter fictional values. 
	
#. Click "Add Sink"

#. Click the "Run Export Job" 

#. Select the "BWM Z4M Feature Correlation" Data Collection

#. Enter 100000000 for the number of records per file. 

	* Note that this is a maximum, and not a strict count. Even though there are fewer records in the data collection, multiple files will be created. 

#. Enter the file name prefix of "bmw-z4m-feature-correlations"

#. Select the CSV File Format. 

#. Leave the fields to export empty

#. Leave the character options as default. 

#. Check the "Write Header Line". 

	* This will ensure each file has a header line
	
#. Enter a relative path for saving the files. 

	* Example: /bmw-z4m-data
	
#. Select the "GZip" compression option

#. Do not add any Export Transforms. 

#. Click "Run Job"

#. Allow the export job to complete. 

Your data is now exported to the FTP server. You could re-import this data into another koverse server, or use it in an external tool. 

|
|

Transferring Configuration from one Koverse Instance
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After configuring a Koverse instance with source, transforms, exports, and data collection you may wish to move that configuration. Here you 
will learn how to move the configuration. 

#. Click the "Export Job Details" link in the menu at the top. 

#. Click the  "Configuration Manager" link. 

#. Select the "BMW Z4M Production" and "BMW Z4M Feature Correlations" data collections checkboxes. 


#. Change the Available Items drop down to Transforms. 

#. Select the "BMW Z4M Feature Correlation" transform. 

#. Click the "Download Selected". 

#. Save this file to your local computer. 

	* Now that you have downloaded the configuration, you can upload to another koverse server using the configuration manager application. 

#. Be sure to do these next steps in another koverse server, or simply read them for reference. 

#. Click the "Upload" tab in the configuration manager application.

#. Click the "Choose File" button, and select the previously downloaded configuration file. 

#. Validate the contents of the configuration in the text box. 

#. Click the "Upload" button. 

Your configuration is now transfered. Upload the BMW Z4M data to this new koverse-server will allow you to use the correlation application. 


Administrator Tutorial
---------------------------
.. note:: Finish the End User Tutorial before starting this section of the tutorial. In this tutorial you will learn how to manage users and groups, define permissions, manage addons, monitor system status, and view user activity.

Viewing System Health
^^^^^^^^^^^^^^^^^^^^^

#. From the Applications Dashboard, or in the applications menu, click the "System Monitoring" link. 

#. See the colored squares along the top. Click on a few to view their statuses. 

#. See the Ingest and Query charts in the middle. These will show activity only when jobs are running. 

#. See the Job progress bars below the data charts. 

#. See the resource details at the bottom.

	* The Distributed Storage shows the remaining disk space and the health of the file system. 
	* The Map Reduce section shows the available compute resources and their usage. 
	* The Data Store section shows the data base resources and health. 
	

Viewing the Audit Logs
^^^^^^^^^^^^^^^^^^^^^^


#. From the Applications Dashboard, or in the applications menu, click the "Audit Log" link. 

#. Enter the search term login and click search. 

#. Click the "Older" and "Newer" links to navigate back in time. 

Managing Users and Groups
^^^^^^^^^^^^^^^^^^^^^^^^^

#. From the Applications Dashboard, or in the applications menu, click the "System Administration" link. 

#. Click the "Add User" button. 

#. Enter an email address and name. 

#. Click the "Add User" button. 

	* The user will receive an email with a randomly generated password. 
	* The new user will be in the "Everyone" group. 

#. Click the "Edit User" button on the user to be edited. 

#. Check the groups you desire, or change a user attribute. 

#. Click the "Save" button. 

#. Click the checkbox to the left of the user you created. 

#. Click the "Delete Selected Users" button. 

#. Click the "Delete" button. 

#. Click the "Groups" tab at the top. 

#. Click "Add Group"

#. Enter the group name "Test"

#. Optionally check the "Add to All New Users" check box"

#. Check the "Manage Data Collections" check box. 

#. Click the "Add Group" button. 

#. Click the "Edit Group" button on the "Test" group row. 

#. Make changes as you see fit. 

#. Click the "Save" button. 

#. Click the checkbox to the left of the "Test" group. 

#. Click the "Delete Selected Groups" button. 

#. Click the "Delete" button. 


Managing the System Settings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

System settings are for configuring the Hadoop and data store settings. 

#. Click the "System" tab in the "System Administration" application. 

#. View but do not change these system settings. 


Managing Lock Down Mode
^^^^^^^^^^^^^^^^^^^^^^^

Lock down mode is used stop all inbound and outbound data streams from the system, and to keep users from accessing data. Use lock down mode when data leaks such as incorrect user and group permissions are discovered. 

#. Click the "Lock Down" button. 

#. Click the "Enable LockDown Mode" button. 

#. Click the "Unlock" button. 

#. Click the "Disable LockDown" button. 

Managing Addons
^^^^^^^^^^^^^^^^

Addons are created by developers and installed by system administrators. Addons expand the available sources, transforms, sinks and applications for users. 

#. Click the "Add-Ons" tab in the "System Administration" application. 

#. If you had an addon to deploy, you would use the Install addon section to do so. 

#. Click the koverse-addon-geo-discovery... link. 
	
	* This addon detail view is shown directly after uploading an addon. 

#. See the details about the addon, and the download and disable addon buttons. 

#. Click the tabs at the top to view the contents of this addon. 

Managing Applications
^^^^^^^^^^^^^^^^^^^^^

Developers can create applications for Koverse that are delivered via addons. System administrators can grant permissions for users to access applications, and deploy instances of applications. 

#. Click the "Applications" tab in the "System Administration" application. 

#. Click the "Geo Discovery" link. 

#. See the details of the Geo Discovery application. Note the Change and Delete Application buttons. 

	* Do not change or delete any settings.
	
#. Click the "permissions" tab at the top. 

	* Here you can define permissions for groups to access and manage this application. 
	
#. Click the "parameters" tab at the top

	* Here you can manage any configuration parameters for the application. 
	* The geo discovery application does not have any permissions to manage. 

Managing API Tokens
^^^^^^^^^^^^^^^^^^^^

System Administrators can create API Tokens for use by developers.

#. Click the "API" tab in the "System Administration" application. 

#. Click the "Add API Token" button. 

#. Enter a name for the API Token, such as "Test Token". 

#. Check the "Administrators" checkbox. 

	* This gives the API token the same permissions as an administrator. 

#. Click the "Create Token" button. 

	* The new token string is now listed in the table below. 

#. Click the "Edit Token" button in the newly created row. 

#. Change the token name to "Test Token Renamed". 

#. Click the "Everyone" group checkbox. 

#. Click the "Update Token" button. 

	* The token string stays the same, but the permissions and name changes. 
	
#. Click the checkbox to the left of the "Test Token Renamed". 

#. Click the "Delete Selected API Tokens" button. 

#. Click the "Delete" button. 


Developer Tutorial
------------------
.. note:: Finish the End User and Administrators tutorials before beginning this Developer tutorial. In this tutorial you will learn how to create a custom Import Source, Transform, and Application using the Koverse SDK Project.  


Setup your Koverse SDK based Project
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Koverse SDK is available as a Maven archetype, and comes with complete examples of sources, transforms, sinks and apps. Here we will create a local copy of the Koverse SDK project. 

#. Download and install Apache Maven for your operating system.

	* http://maven.apache.org
	* Version 3.0.5 recommended
	* Eclipse and Netbeans both have Maven integrations.
	
#. Create a directory on your local computer to store the project. 

#. Download the Koverse SDK Project from http://github.com/Koverse/koverse-sdk-project

	* Be sure to switch to the branch for your version of Koverse
	* Use the download button, or fork if you're familiar with Git. 

Add your API Token to your Maven Settings.xml
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This will allow you to build, test, and deploy your addon in a single maven command. 

#. Create an API Token in the administrators group. 

	* See the API Token section of the Administrators Tutorial for steps. 
	
#. Add the following profile to your ~/.m2/settings.xml file

	* Note the koverse.serverurl property may need to start with HTTP or HTTPS
	
::

	<settings>
		<profiles>
			<profile>
				<activation>
					<activeByDefault>true</activeByDefault>
				</activation>
				<properties>
					<koverse.apitoken>API TOKEN HERE</koverse.apitoken>
					<koverse.serverurl>http://<KOVERSE-SERVER-HERE>/Koverse</koverse.serverurl>
				</properties>
			</profile>
		</profiles>
	</settings>


Test your SDK Project
^^^^^^^^^^^^^^^^^^^^^^

You are now ready to perform a test build and deploy. 

#. Use the following command from the project directory

	* ``mvn clean package koverse:deploy``

#. Check that there were no errors. 

	* If there is an error deploying, ensure that the koverse.serverurl and apitoken settings in your ~/.m2/settings.xml are correct. 
	

#. Check that the destination Koverse server received and has the addon installed. 

	* In "System Administration" app under Addons. 
	

Explore the project structure
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Koverse SDK example project includes working source code examples, and build structure. You'll simply delete the unnecessary files and modify the ones you want to fit your use case. 

#. See the Java classes in /src/main/java/... 

	* There are sources, transforms, sinks, application definitions, import time transforms, and a query client. 
	
#. See the classesToInspect file. An example is shown at /src/main/resources/classesToInspect.example
	
	* This important file tells the Koverse server which classes to evaluate when the addon is uploaded. 
	* Rename and edit this file after you change the Java classes. 
	* List all of your source, transform, sink, application, importTransform, securityLabelParser classes. 
	* Do not list dependency classes. 
	
#. See the unit testing code in /src/test/java/...

	* The fastest way to debug will always be using the provided test runners, as shown in this code. 
	* These tests will also be run during the maven test phase.
	

#. Perform a ``mvn clean package``, and then view the ``/target`` directory. 

	* The addon file is named <artifactId>-<version>.jar in the ``/target`` directory


Create a custom Simple Source
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Here we will create a source that returns a single record that contains two fields with user defined values. 

#. From the project directory, open the ``/src/main/java/your/package/MyCustomSource.java`` file. 

	* The source code in here is a fully functional, but extremely minimal Koverse import Source. 

#. Note that this source extends SimpleSource. 

	* Simple source is for simple single connection "pull" models - like databases or twitter streams. 
	* We will cover more advanced multi-connection sources later. 
	

#. Refactor the name of the class to TutorialSource. Change the package if you wish as well. 
	
#. Review the methods in MyCustomSource, and see their JavaDocs more information about their use. 

	* Set the following
		* name = "Tutorial Simple Source"
		* description = "Source from a tutorial"
		* sourceTypeId = "tutorialSource"
			* Needs to be universally unique for your source. Change as necessary. 
		* version = "1.0.0-alpha1"
		* isContinuous = false

#. Give the source two parameters, one string and one number. 

	* Parameters are the user defined configuration for the source. 
	* See the getSourceParameters() method. 
	* First Parameter
		* parameterName = "stringParameter"
		* displayName = "String"
		* type = Parameter.TYPE_STRING
		* defaultValue = null
	* Second Parameter
		* parameterName = "integerParameter"
		* displayName = "Integer"
		* type = Parameter.TYPE_INTEGER
		* defaultValue = "100"

#. Edit the connect() method to read the parameter values. 

	* Be sure to cast the values with error checking. 
	* Note that the getSourceParameters()
	
#. Edit the getNext() method to return only one record, which contains the two parameter values given. 
	
	* The getNext method is called repeatedly until it returns null. 
	* This means that you will need to keep state as to whether getNext() has been previously called. 
	* The first time getNext() is called, return a record. The second time, return null. 

#. Leave the disconnect() method empty. 
	
	* Normally this is where you would clean up connections, but this example has none.
		
#. Edit the ``/src/main/resources/classesToInspect`` file, list only your new TutorialSource class by package name. 

	* Example: ``com.company.project.TutorialSource``


#. Find the ``/src/main/test/java/MyCustomSourceTest.java`` file and rename it ``/src/test/java/TutorialSourceTest.java``.


#. Edit the TutorialSourceTest.java file to validate that your source is working correctly. 

	* Add the string and integer parameter values. 
	* Change the assert record count to equal 1. 
	* Add an assert to evaluate the values of the string and the integer. 
	
#. Compile and upload your new addon

	* ``mvn clean package koverse:deploy``
	* The test from above will be run, and will fail the build if they do not pass. 

#. Test your addon in Koverse

	* In the Data Flow application, add an import source that uses the "Tutorial Source" 
	* Run an import into a new data collection. 
	* View the data collection details after the import has been run, to view the record. 
	
	
Create a custom ListMapReduceSource
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ListMapReduce based sources allow many connections to be used to import data in parallel. This is done by first producing a list of the items to processed - for example a list of files. And then each item is processed by an individual task in MapReduce. Note only the Map phase is used, the reduce phase is not available. 

ListMapReduce sources should be used when the outside data source an handle many connections well, and when the data import logic is parallelizable. 

Here we will make a list based source that will allow the user to define how many mappers are used, and how many records to return from each mapper. You will give the records any values that you like.

#. Rename the ``/src/main/java/com/koverse/foo/MyCustomListSource.java`` class to TutorialListSource. 

#. Edit the file and apply the following settings. 

	* name = "Tutorial List Source"
	* description = "List based Source from a tutorial"
	* sourceTypeId = "tutorialListSource"
		* Needs to be universally unique for your source. Change as necessary. 
	* version = "1.0.0-alpha1"
	* isContinuous = false

#. Give the source two parameters, one string and one number. 

	* Parameters are the user defined configuration for the source. 
	* See the getSourceParameters() method. 
	* First Parameter
		* parameterName = "mapperCount"
		* displayName = "Mapper Count"
		* type = Parameter.TYPE_INTEGER
		* defaultValue = "3"
	* Second Parameter
		* parameterName = "recordsPerMapper"
		* displayName = "Records Per Mapper"
		* type = Parameter.TYPE_INTEGER
		* defaultValue = "100"

#. Edit the initialize() method to pull the user defined parameter values and place them in local variables.

	* Be sure to use a safe cast to an integer

#. Edit the enumerateList() method to produce strings of numbers from 1 to the user defined MapperCount

	* The list returned should have N elements, where N is the number from the mapperCount parameter. 
	
#. Edit the recordsForItem(String item) method to produce the user configured number of elements for each item. 

	* Ideally you should return an Iterable that uses a streaming method of return values. 
	* Even though a Collection (List) is an Iterable, no not return a Collection (List). This is because Collections require that all values are in memory - and that's not scalable.

#. Note the close() method

	* This would normally be used to cleanup connections, etc. 
	
	
#. Edit the ``/src/main/resources/classesToInspect`` file, list only your new TutorialSource class by package name. 

	* Example: ``com.company.project.TutorialSource``

#. Find the ``/src/main/test/java/MyCustomListSourceTest.java`` file and rename it ``/src/test/java/TutorialListSourceTest.java``.

#. Edit the TutorialListSourceTest.java file to validate that your source is working correctly. 

	* Add the mapperCount and recordsPerMapper parameter values. 
	* Change the reference to the TutorialListSource class in the TestRunner line.
	* Change the assert record count to equal 1. 
	* Add an assert to evaluate the number and contents of the values returned.
	
#. Compile and upload your new addon

	* ``mvn clean package koverse:deploy``
	* The test from above will be run, and will fail the build if they do not pass. 

#. Test your addon in Koverse

	* In the Data Flow application, add an import source that uses the "Tutorial Source" 
	* Run an import into a new data collection. 
	* View the data collection details after the import has been run, to view the record. 


Use Pig in a Transform
^^^^^^^^^^^^^^^^^^^^^^^

Koverse has a "Pig Transform", that uses Apache Hadoop Pig script to execute a transform. Pig is useful for joining, group, filtering, and performing basic aggregations on data collections. 

Here you will enter a very simple "copy records" Pig script. For more information about Pig, and examples, see http://pig.apache.org

#. Navigate to the Data Flow App

#. Click the "Add Transform" button

#. Select "Pig Transform" from the list. 

#. Enter the name "Pig Z4M Copy"

#. Select the "BMW Z4M Production" input data collection 

#. Create a "BMW Z4M Production Copy" output data collection. 

#. Do not enter a UDF

#. Enter the following Pig script. 

	* ``BMW_Z4M_Production_Copy = FOREACH BMW_Z4M_Production GENERATE *;``

#. Leave the default flow settings. 

#. Click the "Add Transform" button
	
#. Click the line between "BMW Z4M Production" and "BMW Z4M Production Copy"

#. Click the "Run Transform" button

#. Allow the Transform to complete. 

#. Click the output data collection name to view the results. 


Understanding Map Reduce
^^^^^^^^^^^^^^^^^^^^^^^^^

Map-Reduce is a two phase framework for parallel processing with many useful applications. The Map phase takes an arbitrarily long list of input values, and emits zero,one, or more key/value pairs to the Reduce phase. The reduce phase taskes a key and a list of values for that key, and can output key/value pairs. In either of these phases, you can write out Koverse records. There is a Combine phase available between the Map and the Reduce phase for the purpose of reducing the network congestion between the map and reduce phases, by collapsing associative aglorithm output immediately after the Map phase output - befor enetwork transfer. 

In concrete terms, the Map phase is used for extracting features from input data, and the reduce phase is used for summarizing those extracted features. For example, in the map phase the MyCustomTransform in the Koverse SDK extracts each word from a paragraph. Then in the Combine and Reduce stage, the word counts are summarized via summation. For more information about Map Reduce patterns, search the web for "MapReduce Algorithms". 

Create a custom Transform
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse Transforms are implemented as Map-Combine-Reduce logic in one or many steps. Koverse makes Map Reduce much easier, by easily defining many map and reduce stages in series. The
first stage reads records, the subsequent stages pass key/value pairs. Some familiarity with Map Reduce is necessary. 


Here we will alter the MyCustomTransform to create a "word phrase" counter, that reports the counts of series of words. 


#. Rename the ``/src/main/java/com/koverse/foo/MyCustomTransform.java`` class to TutorialPhraseCountTransform. 

#. Edit the file and apply the following settings. 

	* name = "Tutorial Phrase Count"
	* description = "Counts the phrases of words"
	* jobTypeId = "tutorialPhraseCount"
		* Needs to be universally unique. 
	* version = "1.0.0-alpha1"
	* isIncrementalProcessingSupported = false

#. Give the transform two parameters.

	* Parameters are the user defined configuration for the transform. 
	* See the fillInParameters() method. 
	* First Parameter
		* parameterName = "textFiled"
		* displayName = "Text Field"
		* type = Parameter.TYPE_COLLECTION_FIELD
	* Second Parameter
		* parameterName = "phraseWordCount"
		* displayName = "Phrase Word Count"
		* type = Parameter.TYPE_INTEGER
		* defaultValue = "3"
		
#. Ensure that the fillInStages() method adds one AbstractKVRecordMapperStage class, one AbstractCombinerStage, and one AbstractReducerStage - in that order. 

#. Edit the inner static class MyCustomMapStage.setup() method to read both parameters from the context. 

	* Use type safe checking to ensure valid values. 

#. Edit the MyCustomMapStage.getMapOutputKeyClass() and .getMapOutputValueClass() to ensure they are Text and IntWritable respectively. 

	* These define the types of keys and values that are output in the map phase. 

#. Edit the MyCustomMapStage.map() method to output keys that contain exactly the number of words defined by the user in the phraseWordCount configuration. 

	* For example, the phrase "The fox is fast" contains two 3 word phrases. "The fox is" and "fox is fast". 
	* Output each phrase as the key, and the number one as the value. 
	
#. Edit the MyCustomCombinerStage.combine() method to ensure that it sums all of the received values for a key. 

	* The combiner runs on the same machine as the mapper, and is used to reduce the amount of network traffic. 
	* Combiners can only be used if the algorithm is both associative and commutative (see Google for more info). 
	
#. Note the MyCustomReduceStage.setup() should be empty. 

	* Additional parameter reading or job setup could be performed here. 
	
#. Edit the MyCustomReduceStage.getMapOutputKeyClass() and .getMapOutputValueClass() methods. They should both return NullWritable

	* NullWritable is preferable for the last Transform stage - in which we expect to output no data to Hadoop. 
	
#. Edit the MyCustomReduceStage.reduce() method. 

	* Change the Koverse record key field name to "phrase".
	* Note the use of the getStageContext().writeRecord(r) method. This is out records are output to koverse. 
	
#. Edit the ``/src/test/java/MyCustomTransformTest.java`` class to match the expected behavior of the TutorialPhraseCountTransform. 

	* Change the input data to create a few records with unique phrases. 
	* Change the Assert lines to evaluate the record count and phrases expected. 
	* Change the TransformTestRunner.runTest() method to use the TutorialPhraseCountTransform class. 
	
#. Compile and upload your new addon

	* ``mvn clean package koverse:deploy``
	* The test from above will be run, and will fail the build if they do not pass. 
	
#. Test your transform. 

	* Create a new Data Collection named "Text"
	* Using the file upload app, upload a .txt  file that contains the phrase "The fox is fast" to the Text data collection. 
	* In the Data Flow App add your new transform:
		* Input Data Collection: Text
		* Output Data Collection: Phrase Count
		* Text Field: body
		* Phrase Word Count: 3
		* Flow Type: Automatic
		* Minimum Seconds Between Jobs: 60
	* Click Add New Transform
	* Run your new transform by clicking on the line between Text and Phrase Count data collections. 
	* Click "Run Transform"
	* Allow the transform to run. Then view the output of that transform. 
	
Creating a Custom Koverse HTML/JS Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse applications are written in HTML and JS, and are delivered via addons. The Koverse SDK Project, that you pulled from a maven archetype above, has an example application. Here we will edit this application to perfom a few basic queries of data collections in Koverse. 

#. View the Koverse Javascript API at http(s)://<KOVERSE_SERVER>/Koverse/docs/javascript/

#. Open the ``/src/main/java/MyCustomApplication.java`` class. 

	* This class defines the presence of an application in this addon. 
	* Edit the class as follows:
		* Rename the class to TutorialApplication
		* applicationId = "tutorialApplication"
		* displayName = "Tutorial Application"
		* defaultCategoryName = "Tutorials"
		* version = "1.0.0-alpha1"
		* No parameters
		* autoDeploy = true
		
#. Rename the ``/src/main/resources/apps/mycustomapp`` folder to match your new applicationId

	* ``/src/main/resources/apps/tutorialApplication``
	
#. Edit the ``/src/main/resources/classesToInspect`` file. 

	* Ensure that the TutorialApplication file is listed in that file.
	
#. Open the ``/src/main/resources/apps/tutorialApplication/index.html`` file. 

	* Remove the collection list section. 
	* Add a text input box with an id of "searchTextInput"
	* Add a button with an id of "searchButton"
	* Add a div with an id of "searchResults"

#. Open the ``/src/main/resources/apps/tutorialApplication/js/index.js`` file. 

	* Store the results of  Koverse.getDataCollections method in an array. 
	* Add a jQuery event listener for when the searchButton is pressed. 
	* Add logic that reads the value from the searchTextInput box
	* Use the Koverse.performRecordQuery method to perform a search. 
		* Method signature looks like Koverse.performRecordQuery( query, dataCollectionIdsCommaSeparated, callBack, numRecords, offset, fields )
		* Example: Koverse.performRecordQuery("text", "dataCollectionId1,dataCollectionId2", searchResultHandler, 100, 0, [])
	* Show the count and the contents of the records returned
		* Use the response.records array
		* Be sure to check the response.success boolean to ensure the request was successful. 

#. Compile and upload your new addon

	* ``mvn clean package koverse:deploy``
	* The test from above will be run, and will fail the build if they do not pass. 
	
#. Test your application by clicking on it in the Application dashboard. 

#. When you are ready, set the application permissions for access by others.

	* Navigate to the System Administration App
	* Click the Applications Tab
	* Click the Permissions tab
	* Click the Edit Permissions button
	* Click the Use check box in the Everyone row. 
	* Click Save permissions. 

Creating a custom Record Based Export Sink
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Record Based sinks export to record based systems, such as databases or other non-file based systems. 

#. Open the ``/src/main/java/com/koverse/foo/MyCustomRecordSink.java``

#. Edit the class as follows:

	* Rename the class to TutorialSink
	* sinkTypeId = "tutorialSink"
	* name = "Tutorial Sink"
	* version = "1.0.0-alpha1"
	* getParameters = return one string parameter named "test"
	* getJobParameters = return one string parameter named "job test"
	* executionMethod = Sink.ExecutionMethod.MapReduce;

#. Rename the MyCustomRecordWritter to TutorialRecordWritter

#. Change the RecordWritter implementation to count records written. 

	* Normally, you will use a third party API to connect and write records to an external system. 
	
#. Open the ``/src/test/java/MyCustomRecordSinkTest.java``

	* Change the test to use the TutorialSink
	* Change the test to output to records
	* Change the Assert to test number of records written.
	
#. Compile and upload your new addon

	* ``mvn clean package koverse:deploy``
	* The test from above will be run, and will fail the build if they do not pass. 

#. Test your sink in the Koverse Data Flow app

Creating a custom File Based Export Sink
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The FileBasedSink abstract class can be extend to create custom file sink destinations. These sinks simply open
a file output stream. They do not define a file format. 

#. Open the ``/src/main/java/com/koverse/foo/MyCustomFileSink.java`` class

#. Edit the class as follows

	* Rename the class to TutorialFileSink
	* name = "Tutorial File Sink"
	* sinkTypeID = "tutorialFileSink"
	* description = "Sink from a Tutorial"
	* version = "1.0.0-alpha1"
	* fileSinkParamaters = one string parameter named "test"
	* fileSinkJobParameters  = one string parameter named "jobTest"

#. Change openOutputStream method to count the number of times it is opened. 
	
#. Open the ``/src/test/java/MyCustomFileSinkTest.java``

	* Change the test to use the TutorialSink
	* Change the test to output to records
	* Change the Assert to test number of records written.
	
#. Compile and upload your new addon

	* ``mvn clean package koverse:deploy``
	* The test from above will be run, and will fail the build if they do not pass. 

#. Test your sink in the Koverse Data Flow app


Congratulations!!!
^^^^^^^^^^^^^^^^^^^^

Congrats on finishing the Koverse Developer Training. As a reward, please contact support@koverse.com and ask for your special Koverse cloud instance access. 


	

	
	




 

