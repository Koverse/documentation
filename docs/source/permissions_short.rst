.. _Permissions Guide (Short):

:tocdepth: 2

=========================
Permissions Guide (Short)
=========================
.. contents::

Overview
--------
Koverse provides administrators and data owners fine grained controls over what
actions users of the system can perform and what data they can see. Koverse
maintains several types of permissions to enable this functionality.
**System Permissions** control what actions a user can take within the system.
For instance, if a given user is allowed to create new Data Collections or not.
**Data Collection Permissions** control what data is visible to which Users and
what actions Users can perform with respect to a specific Data Collection
(such as, read/write). **Source** and **Sink Permissions** control who can
view and execute Imports and Exports that have been created in the system.
Finally, **Application Permissions** control who can use both the built-in and
custom Applications loaded in Koverse. All of these permissions are controlled
at the Group level. Users inherit the permissions that have been given to the
groups they belong to. The following sections describe each permission type in
more detail.

System Permissions
------------------

Manage User & Groups
^^^^^^^^^^^^^^^^^^^^
Most User and Group management in Koverse is done through the System
Administration Application.  In addition to having the Manage Users & Groups
Permission, a User would also need permission to use the System Administration
Application.

Users in a group with this permission are able to:

* View all Groups and Group membership (both Koverse and External)
* Create new Koverse Groups (externally defined Groups are automatically created)
* Modify Koverse Groups
* Delete Koverse Groups
* View all Users
* Create new Users
* Modify Users
* Delete Users

Manage Data Collections
^^^^^^^^^^^^^^^^^^^^^^^
Users in a group with this permission are able to:

* Create Data Collections
* Delete Owned Data Collections

Manage System Settings
^^^^^^^^^^^^^^^^^^^^^^
This permission is required in order to use the System Administration Application.

Users in a group with this permission are able to:

* View System Settings (Hadoop, Accumulo, Zookeeper configuration)
* Modify System Settings

View Audit Logs
^^^^^^^^^^^^^^^
Users in a group with this permission are able to:
* View System Audit Logs

Manage Sources
^^^^^^^^^^^^^^
Each Source has an owner, the user that created the Source. Source Permissions
can be used to “share” the Source with Groups in different ways. See Source
Permissions for more information.

Users in a group with this permission are able to:

* Create Sources
* View Owned or Shared Sources
* Edit Owned or Shared Sources
* Delete Owned or Shared Sources
* Run Owned or Shared Sources


Manage Transform Jobs
^^^^^^^^^^^^^^^^^^^^^
Users in a group with this permission are able to:

* Create Transforms
* Execute Transforms
* Modify Transforms

Users without this permission may still be able to View Transforms, given they
have Read access to all input Data Collections and the Output Data Collection.

Manage Sinks
^^^^^^^^^^^^
Each Sink has an owner, the user that created the Sink. Sink Permissions can
be used to “share” the Sink with Groups in different ways. See Sink
Permissions for more information.

Users in a group with this permission are able to:

* Create Sinks
* View Owned or Shared Sinks
* Edit Owned or Shared Sinks
* Delete Owned or Shared Sinks
* Run Owned or Shared Sinks

Manage Addon
^^^^^^^^^^^^
Users in a group with this permission are able to:

* Create/Upload Addons
* View Addons
* Remove/Disable Addons

Manage API Tokens
^^^^^^^^^^^^^^^^^
Users in a group with this permission are able to:

* Create API Tokens
* View API Tokens
* Delete API Tokens

Manage System Reset
^^^^^^^^^^^^^^^^^^^
This System Permission is not currently used.

Manage Applications
^^^^^^^^^^^^^^^^^^^
Each Application has an owner, the user that created the Application.
Application Permissions can be used to “share” the Application with Groups in
different ways. A User would also need Manage Addons to be able to initially
deploy a new Application. See Application Permissions for more information.

Users in a group with this permission are able to:

* Modify Application Permissions

Manage System Status
^^^^^^^^^^^^^^^^^^^^
This System Permission is not currently used.

Run Interactive Jobs
^^^^^^^^^^^^^^^^^^^^
Running interactive jobs, such as PySpark jobs that are launched when opening
a Jupyter Notebook, allocate a fixed set of cluster resources for the lifetime
of the interactive session. As cluster resources are limited, this permission
exists to allow the set of users who can launch interactive jobs to be limited.

Users in a group with this permission are able to:

* Access Data Collections from PySpark/Juptyer Notebooks

Use Koverse
^^^^^^^^^^^
Koverse can be configured, via the
com.koverse.server.auth.useKoversePermission.required property in
koverse-server.properties, to require the Use Koverse permission for basic
access to Koverse. The use case for this property and associated permission is
in environments where any enterprise user can authenticate to Koverse via
their credentials, for example client PKI certificates. While any enterprise
user can authenticate, they might not be authorized for basic access to
Koverse. In this use case, you would set the property to true and then an
enterprise user would need to be in a Group that had the Use Koverse
permission, otherwise they would be greeted with a message stating they are
not authorized to use Koverse.

Data Collection Permissions
---------------------------
By default, only the User who creates a Data Collection has access to it. Data
Collection Permissions allow a Data Collection owner to provide varying access
to the data within the Collection as well as administrative control over the
Data Collection.

Read
^^^^
Users in a group with this permission are able to:

* View the existence of the Data Collection
* Read samples, statistics, and Records from the Data Collection. This is required for being able to search a Data Collection.

Download
^^^^^^^^
Users in a group with this permission are able to:

* View the existence of the Data Collection
* Download the contents of the Data Collection

Write
^^^^^^^^^^^^^^
Users in a group with this permission are able to:

* View the existence of the Data Collection
* Write Data into the Data Collection via an Import Job.
* Clear/Delete Data from the Collection. This does not mean they can delete the Data Collection itself.

Manage Permissions
^^^^^^^^^^^^^^^^^^
Users in a group with this permission are able to:

* View the existence of the Data Collection
* Change the Data Collection Permissions for the Data Collection

Manage Configuration
^^^^^^^^^^^^^^^^^^^^
Users in a group with this permission are able to:

* View the existence of the Data Collection
* Change the configuration (indexing, frequency of stats jobs, etc) of the Data Collection
* Delete the Data Collection

View Audit Logs
^^^^^^^^^^^^^^^
Users in a group with this permission are able to:

* View the existence of the Data Collection
* View the Collection-specific Audit Logs

Source Permissions
------------------
By default, only the User who creates a Source has access to it. Source
Permissions allow a Source owner to control what access other Users have to
the Source. Users must have the Manage Sources System Permission to create new
Sources.

The UI does not allow the editing of source permissions. This is to
make the Koverse System easier to use and understand. As long as a user has
access to a data set, the user will see that data set's sources in the data
flow view. However, the user will not be able to edit or delete the source
if they did not create it.

.. NOTE::
   The permissions can be set programatically through the REST API if desired.

Import
^^^^^^
Users in a group with this permission are able to:

* View the existence of the Source
* Run an Import Job using the Source.

Edit
^^^^
Users in a group with this permission are able to:

* View the existence of the Source
* Edit the configuration of the Source. This also requires the Manage Sources System Permission.

Delete
^^^^^^
Users in a group with this permission are able to:

* View the existence of the Source
* Delete the Source. This also requires the Manage Sources System Permission.

Sink Permissions
----------------
By default, only the User who creates a Sink has access to it. Sink
Permissions allow a Sink owner to control what access other Users have to the
Sink. Users must have the Manage Sinks System Permission to create new Sinks.

The UI does not allow the editing of sink permissions. This is to
make the Koverse System easier to use and understand. As long as a user has
access to a data set, the user will see that data set's sinks in the data
flow view. However, the user will not be able to edit or delete the sink
if they did not create it.

.. NOTE::
   The permissions can be set programatically through the REST API if desired.

Export
^^^^^^
Users in a group with this permission are able to:

* View the existence of the Sink
* Run an Export Job using the Sink. This also requires Read Data Collection Permission to the Data Collection being exported.

Edit
^^^^
Users in a group with this permission are able to:

* View the existence of the Sink
* Edit the configuration of the Sink. This also requires the Manage Sinks System Permission.

Delete
^^^^^^
Users in a group with this permission are able to:

* View the existence of the Sink
* Delete the Sink. This also requires the Manage Sinks System Permission.

Application Permissions
-----------------------
Application Permissions allow the accessibility and management of Koverse
Applications to be controlled. Built-in Koverse Applications, like the Data
Collections App and System Administration App, are bootstrapped to have default
Application Permissions that control their access to members of the Koverse
“Administrators” and “Everyone” Groups. These can later be edited to control
access for other Groups. By default, new Applications that are added via
Koverse Addon, will only be visible and usable by the owner who deployed the
Application. The Manage Applications System Permission is required to deploy a
new Application to Koverse. Changing Application Permissions via the Koverse UI
also requires the Use Application Permission on the System Administration
Application.

Use
^^^
Users in a group with this permission are able to:

* View and use an Application

Edit Parameters
^^^^^^^^^^^^^^^
Users in a group with this permission are able to:

* View and use an Application
* Edit Parameters for the Application. This also requires the Manage Applications System Permission.

Manage Permissions
^^^^^^^^^^^^^^^^^^
Users in a group with this permission are able to:

* View and use an Application
* Change the Application Permissions for the Application. This also requires the Manage Applications System Permission.

Disable
^^^^^^^
Users in a group with this permission are able to:

* View and use an Application
* Disable the Application so it can’t be viewed or used. This also requires the Manage Applications System Permission.
