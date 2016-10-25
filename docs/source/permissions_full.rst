.. _Permissions Guide (Full):

:tocdepth: 2

=========================
Permissions Guide (Full)
=========================
.. contents:: :depth: 2

Introduction
------------
This document formally specifies what is explicitly allowed in the Koverse
system by a particular user (subject) accessing the system.  This specification
requires that any permission not explicitly allowed is not permitted.
It is organized as sys object types, for an example users, and then sub-section
of actions on those object types.  In those sections are contained the specific
exact rule that specifies what a subject must fulfill to perform that operation
on that object type.

System Permissions and States
-----------------------------
Listed below are the permissions  that exist in the Koverse system.  There are
two types of permissions.  The first type are group permissions that apply
across the system.  Note that users (also called subjects, in security
parlance) are not directly assigned permission, only groups are.  Instead,
users are assigned to groups, and that is how the user gains permissions on the
system.  However, each system object has a “responsible user,” typically the
creator of the object, who has some permissions on the object automatically,
regardless of what groups the user is in.

Note that since the security system assumes implicit denial of all permissions,
permissions are simply additive.  This means that a user who is in multiple
groups can simply have the effective permission of the union of those group’s
permissions.  Using an Access Control List (ACL) type system where permissions
can be explicitly denied would have greatly complicated this specification, and
is therefore not recommended at this time.

In addition to system-wide group permissions, there are also group permissions
that apply specifically to data collections.  These permissions are assigned
for individual collections.  For some operations, such as deleting a
collection, both the system wide permissions to manage data collections AND the
collection-specific permission to delete the collection are required for the
subject invoking the delete.

Group Permissions
^^^^^^^^^^^^^^^^^

* Manage Users & Groups
* Manage Data Collections
* Manage System Settings
* View Audit Logs
* Manage Sources
* Manage Lock Down Mode
* Manage Transform Jobs
* Manage Sinks
* Manage AddOns
* Manage API Tokens
* Manage System Reset
* Manage Application
* Manage System Status

Collection Permissions
^^^^^^^^^^^^^^^^^^^^^^

* Read
* Download
* Write & Delete
* Manage Permissions
* Manage Configuration
* Catalog Permissions
* View

Application Permissions
^^^^^^^^^^^^^^^^^^^^^^^

* Use
* Edit Parameters
* Manage Permissions
* Disable

Source Permissions
^^^^^^^^^^^^^^^^^^

* Import
* Edit
* Delete

Sink Permissions
^^^^^^^^^^^^^^^^

* Export?
* Edit?
* Delete?

Transform Permissions
^^^^^^^^^^^^^^^^^^^^^
Transform permissions are completely implicit, based upon access to the input
collections and output collection. Transform schedules inherit the same
permissions as their transform.

System State
^^^^^^^^^^^^

* Locked Down
* Not Locked Down

Records
^^^^^^^

* Visibility Label

Access Right Specification
--------------------------
Each section is composed of a Object type and then an action, e.g. User, Create.

Most actions have uniform meaning for all object types, the uniform actions are:

* View - Is an objected returned in a list or returned from a direct query.
* Create - Can the object be created
* Modify - Can the object be modified
* Delete - Can the object be deleted
* Execute - Can the object be executed (Source, Sink, Transform)
* Invoke - Can the operation on an object be invoked.

In addition to the above actions, Data Collections have a few more that are
unique to it:

* View - Can one even be aware of the existence of the collection
* Read - Can a collection be read from
* Download - Can a collection be downloaded
* Write - Can a collection be written to
* Manage Permissions
* Manage Configuration

Further, the individual records in a collection have an action as well:

* Read:  Can the record be written or even be made aware of

Users
-----
View
^^^^
A subject can view all information about its own user object.
Any subject can view the following information about all users:

* ID
* First Name
* Last Name
* Email address

A subject who is in a group with the Manager Users & Groups permission can see
the following additional information about all users:

* Group membership
* Access Tokens
* Enabled/Disabled state
* Creation Date

Create, Modify, Delete
^^^^^^^^^^^^^^^^^^^^^^
A subject can only create, modify, or delete  a user if:

* The subject is in a group that has the Manage Users & Groups permission.

Groups
------
View
^^^^
All subjects can view all groups, with the exception of user membership
information of that group.
A subject who is in a group with the Manage Users & Groups permissions can
additionally see the user membership of all groups.

Create, Modify, Delete
^^^^^^^^^^^^^^^^^^^^^^
A subject can only create, modify, or delete  a group if:

* The subject is in a group that has the Manage Users & Groups permission.

Data Collections
----------------
View a Data Collection’s Details
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
A subject can only view a collection if:

* The subject is the responsible user for the data collection, or
* The subject is in a group that has one or more of the following permissions on the collection:

  * Read
  * Download
  * Write & Delete
  * Manage Permissions
  * Manage Configuration

Read Data from Collection (including query)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
A subject can only read a collection if:

* The subject is the responsible user for the data collection, or
* The subject is in a group that has the Read permission on the collection.

Create Data Collections
^^^^^^^^^^^^^^^^^^^^^^^
A subject can only create a collection if:

* The subject is in a group that has the Manage Data Collections permission

Download Data from Collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
A subject can only download a collection if:

* The subject is the responsible user for the data collection, or
* The subject is in a group that has the Download permission on the collection.

Write Data to Collections
^^^^^^^^^^^^^^^^^^^^^^^^^
A subject can only write to a collection if:

* The subject is the responsible user for the data collection, or
* The subject is in a group that has the Write & Delete permission on the collection.

Delete Data Collection
^^^^^^^^^^^^^^^^^^^^^^
A subject can only delete a collection if:

* The subject is in a group that has the Manage Data Collections permission, and
* The subject is in a group that has the Write & Delete permission on the collection.

  * The subject is the responsible user for the data collection

Manage Permissions
^^^^^^^^^^^^^^^^^^
A subject can only modify the permissions of a collection if:

* The subject is in a group that has the Manage Data Collections permission, and
* The subject is in a group that has the Manage Permissions permission on the collection, or

  * The subject is the responsible user for the data collection

Manage Configuration (mainly index configuration)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
A subject can only manage a collection’s configuration if:

* The subject is in a group that has the Manage Data Collections permission, and
* The subject is in a group that has the Manage Configuration permission on the collection, or

  * The subject is the responsible user for the data collection

Record
------
Read
^^^^
A subject can only read a record if:

* The subject is in a group that has the Read permission on the collection, and
* The subject possesses tokens that satisfy the visibility label logic for that record.

Catalog
-------
View
^^^^
A subject can only view the catalog:

* The subject is in a group that has the View Catalog permission.

System Settings
---------------
View, Modify
^^^^^^^^^^^^
A subject can only view or modify system settings if:

* The subject is in a group that has the Manage System Settings permission.

Audit Logs
----------
View
^^^^
A subject can only view audit logs if:

* The subject is in a group that has the View Audit Logs permission.

Addons
------
View, Add, Remove
^^^^^^^^^^^^^^^^^
A subject can only view, add, or remove an AddOn if:

* The subject is in a group that has the Manage AddOns permission.

Note
^^^^
The management of Addons requires a policy that includes code review and
understanding of the addon’s effects on the system.  There is no current
technical access control limitations placed on the addon’s executable code.

API Tokens
----------
View, Create, Delete
^^^^^^^^^^^^^^^^^^^^
A subject can only view, create, or delete an API Token if:

* The subject is in a group that has the Manage API Tokens permission.

Note
^^^^
Note that subjects who authenticate using a token will not be audited as an
individual using the system.  Accountability can be greatly diminished if API
tokens are not used properly.
Great care must be taken when assigning the Manage API Tokens to a group.  This
is because any member of that group will be able to create access tokens and
use those tokens without the actions of those subjects using the token being
directly audited to that individual.

System Reset
------------
Invoke
^^^^^^
A subject can only invoke system reset if:

* The subject is in a group that has the Manage System Reset permission.

Applications
------------
Add
^^^
A subject can only add an application if:

* The subject is in a group that has the Manage Applications permission.

Use
^^^
A subject can only use an application if:

* The subject is in a group that has the Use permission on the application.

Edit Parameters
^^^^^^^^^^^^^^^
A subject can only edit an application’s parameters if:

* The subject is in a group that has the Manage Applications permission, and
* The subject is in a group that has the “edit” permission for that application, or

  * The subject is the responsible user for the application, or

Edit Permissions
^^^^^^^^^^^^^^^^
A subject can only edit an application’s permissions if:

* The subject is in a group that has the Manage Applications permission, and
* The subject is in a group that has the “edit permissions” permission for that application, or

  * The subject is the responsible user for the application

Delete Application
^^^^^^^^^^^^^^^^^^
A subject can only delete an application if:

* The subject is in a group that has the Manage Applications permission, and
* The subject is in a group that has the “delete” permission for that application, or

  * The subject is the responsible user for the application

System Status
-------------
View
^^^^
A subject can only view the System Status if:

* The subject is in a group that the Manage System Status permission.

Lock Down
---------
View
^^^^
Any subject can view or generally be aware of the lockdown state.

Enable, Disable
^^^^^^^^^^^^^^^
A subject can only enable or disable lock down if:

* The subject is in a group that has the Manage Lock Down Mode permission.

Sources
-------

The UI does not allow the editing of source permissions. This is to
make the Koverse System easier to use and understand. As long as a user has
access to a data set, the user will see that data set's sources in the data
flow view. However, the user will not be able to edit or delete the source
if they did not create it.

.. NOTE::
   The permissions can be set programatically through the REST API if desired.

View
^^^^
A subject can only view a source if:

* The subject is the responsible user for the source, or
* The subject is in a group which has at least one of the following permission on the source:

  * Import
  * Edit
  * Delete

Create a Source
^^^^^^^^^^^^^^^
*Rule*

A subject can only create a source if:

* The subject is in a group that has the Manage Sources permission

*Pre-Condition*

None.

*Post-Condition*

The created Source is only accessible to the subject that created it.

Edit
^^^^
A subject can only modify a source if:

* The subject is in a group that has the Manage Sources permission, and
* The subject is in a group that has the Edit Permission on the source, or

  * The subject is the responsible user for the source

Delete
^^^^^^
A subject can only delete a source if:

* The subject is in a group that has the Manage Sources permission, and
* The subject is in a group that has the Delete permission on the source, or

  * The subject is the responsible user for the source, or

Execute
^^^^^^^
A subject can only execute a source if:

* The subject is the responsible user for the source, or
* The subject is in a group that has the Import permission on the source.

Note
^^^^
The subject can only execute the source to an output collection that it has
Write & Delete access to.

Sinks
-----

The UI does not allow the editing of sink permissions. This is to
make the Koverse System easier to use and understand. However, the permissions
can be set programatically through the REST API if desired.

View
^^^^
A subject can only view a sink if:

* The subject is the responsible user for the sink, or
* The subject is in a group which has at least one of the following permission on the sink:

  * Export
  * Edit
  * Delete

Create
^^^^^^
A subject can only create a sink if:

* The subject is in a group that has the Manage Sinks permission.

*Pre-Condition*

None.

*Post-Condition*

The created Sink is only accessible to the subject that created it.

Edit
^^^^
A subject can only modify a sink if:

* The subject is in a group that has the Manage Sinks permission, and
* The subject is in a group that has the Edit Permission on the sink, or

  * The subject is the responsible user for the sink

Delete
^^^^^^
A subject can only delete a sink if:

* The subject is in a group that has the Manage Sinks permission, and
* The subject is in a group that has the Delete permission on the sink, or

  * The subject is the responsible user for the sink, or

Execute
^^^^^^^
A subject can only execute a sink if:

* The subject is the responsible user for the sink, or
* The subject is in a group that has the Export permission on the sink.

Note: The subject can only execute the sink from an input collection that it has Read access to.

Transforms
----------
Access control for transforms are very different than that of Sources and
Sinks.  For sources and sinks, access control is explicitly controlled by
assigning permissions to group to edit, delete, and execute them.
In contrast, access control for Transforms are entirely implicit.  The ability
to view or execute a transform is solely determined by the subject’s access to
the input and output collections.  Specifically, a subject must have the Read
permission on all input collections and have Write & Delete permission on the
output collection.

The UI does not allow the editing of transform permissions. This is to
make the Koverse System easier to use and understand. As long as a user has
access to a data set, the user will see that data set's transforms in the data
flow view. However, the user will not be able to edit or delete the transform
if they did not create it.

.. NOTE::
   The permissions can be set programatically through the REST API if desired.


View
^^^^
A subject can only view a transform if:

* The subject is in a group that has at least one of the following permissions on all input collections:

  * Read
  * Download
  * Write & Delete
  * Manage Permissions
  * Manage Configuration, and

* The subject is in a group that has at least one of the following permissions on the output collection:

  * Read
  * Download
  * Write & Delete
  * Manage Permissions
  * Manage Configuration.

Create
^^^^^^
A subject can only create a transform if:

* The subject is in a group that has the Manage Transform Jobs permission, and
* The subject is in a group that has the Read permission on all input collections, and
*  The subject is in a group that has the Write & Delete permission on the output collection.


Modify
^^^^^^
A subject can only modify a transform if:

* The subject is in a group that has the Manage Transform Jobs permission, and
* The subject is in a group that has the Read permission on all input collections, and
* The subject is in a group that has the Write & Delete permission on the output collection.

Note that any modifications the subject makes needs to adhere to the input and
output collection access control restrictions.
Also note that it is possible for a subject to modify the transform in a manner
so that a subject that previously had access to the transform no longer does.
Specifically, if the input and output collections are changed into collections
that the other subject(s) do not have access to.

Execute
^^^^^^^

A subject can only execute a transform if:

* The subject is in a group that has the Read permissions on all input collections, and
* The subject is in a group that has the Write & Delete permission on the output collection.

Import Schedules for Sources
----------------------------
View
^^^^
A subject can only view an import schedule for a source if:

* The subject is in a group that has the Manage Sources permission, and

  * The subject is the responsible user for the source, or
  * The subject is in a group which has at least one of the following permissions on the schedule’s source:

    * Import
    * Edit
    * Delete, and

* The subject is in a group that has at least one of the following permissions on the output collection:

  * Read
  * Download
  * Write & Delete
  * Manage Permissions
  * Manage Configuration

Create
^^^^^^
A subject can only create an import schedule for a source if:

* The subject is in a group that has the Write & Delete permission for the output collection, and
* The subject is in a group that has the Manage Sources permission, and
* The subject is in a group which has the Edit permission on the source, or

  * The subject is the responsible user for the source

Modify
^^^^^^
(Modifications of Import Schedules are not possible at this time)

Delete
^^^^^^
A subject can only delete an import schedule for a source if:

* The subject is in a group that has the Write & Delete permission for the output, and
* The subject is in a group that has the Manage Sources permission, and
* The subject is in a group which has the Edit permission on the source, or

  * The subject is the responsible user for the source

Import Jobs
-----------
View
^^^^
A subject can only view an import job if:

* The subject is in a group that has the Write & Delete permission for the output collection, and
* The subject is the responsible user for the job’s source, or

  * The subject is in a group that has at least one of the following permissions on the job’s source:

    * Import
    * Edit
    * Delete

Transform Jobs
--------------
View
^^^^
A subject can only view a transform job if:

* The subject is in a group that has at least one of the following permissions on all input collections of the transform job:

  * Read
  * Download
  * Write & Delete
  * Manage Permissions
  * Manage Configuration, and

* The subject is in a group that has at least one of the following permissions on the output collection of the transform job:

  * Read
  * Download
  * Write & Delete
  * Manage Permissions
  * Manage Configuration.

Export Jobs
-----------
View
^^^^
A subject can only view an export job if:

* The subject is in a group that has the Read permission for the input collection, and
* The subject is the responsible user for the job’s sink, or

  * The subject is in a group that has at least one of the following permissions on the job’s sink:

    * Export
    * Edit
    * Delete
