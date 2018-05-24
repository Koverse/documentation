.. _DataSetSecurityAndAccessControl:

Data Set Security and Access Control
====================================

Koverse provides fine-grained access control to data sets and even individual records and attributes within data sets.

Organizations can define groups, associate users to groups, and grant permissions to groups for system actions or data set-specific actions.

In some cases the mapping of users to groups is defined by an external system such as Active Directory, LDAP, or another single-sign on system.
If not, Koverse provides a built-in method of defining users and groups.

Regardless of how users and groups are managed, Koverse will manage the permissions granted to groups for Koverse-specific system actions and for access to data sets.

In this section we outline how to carry out common data set access tasks.
For details on how to control access to system actions, see the Administrator's Guide.

All data set specific permissions are controlled via the Permissions tab for a specific data set's details.
To work with the permissions for a data set click on the 'Data' button in the primary navigation menu on the left.
Select the data set of interest from the list, click on the Settings tab and then click the Permissions tab.

Making a Data Set Private
-------------------------

A newly created data set is controlled by the user who created it, known as the 'responsible user'.
By default this user is the only user that can see that this data set exists, and this user can perform all actions on the data set.

To ensure that a data set is private and accessible only by the responsible user, remove all groups from the list on the data sets Permissions tab.
Do this by clicking the red minus icon under the 'Remove' column in the permissions list for all groups.

.. image:: /_static/UsageGuide/setPermissions.png

Making a Data Set Available to a Limited Group of Users
-------------------------------------------------------

To grant specific access to a limited group of users, first add the group that you wish to allow access to by typing in the name of the group in the input box labeled 'Add Group', if the group does not already appear in the permissions list.

.. image:: /_static/UsageGuide/addGroup.png

Even though the group is now added to the permissions list, the users that belong to this will only be able to know of its existence until specific actions are granted.
Select the specific actions to grant to this group from the list, which includes:

Read
This allows members of the group to query this data set.
Download
This allows members of the group to download the entire data set.
Write & Delete
Members of the group can import new data to this data set and can delete existing data.
Manage Permissions
Members of the group can grant permissions to other groups.
Manage Configuration
Members of the group can change the name, indexing options, and other settings for this data set.

Making a Data Set Available to Everyone
---------------------------------------

Koverse ships by default with a group called 'Everyone', which all new users are added to when they are created.

To make a data set available to everyone, simply add the 'Everyone' group to the permissions table and grant the actions desired to this group.

Masking Specific Data Set Attributes
-------------------------------------

Koverse allows data set owners to mask specific attributes so that their values are not visible in search results or downloads.

To edit a data set's masking settings click on the Data tab on the left navigation menu and select the data set you want.
Click on the Settings tab and then the Masking tab.

.. image:: /_static/UsageGuide/masking.png

This will show a list of all the attributes within this data set.
By default all attributes are visible to users that can query this data set.

To mask specific attributes, click on the check box next to each attribute to mask.
Selected attributes will be masked for all users unless specific groups are excepted.
To allow specific groups to see the values of a masked attribute, click the 'Add Excepted Group' button and select a group.
To remove a group from the list of excepted groups for an attribute, click the minus icon next to the group name.

.. image:: /_static/UsageGuide/exceptGroup.png

When finished making changes to masking settings, click the 'Save' button at the bottom of the page.

Masked attributes will display the value '[masked]' in search results and downloaded files for all users except users in at least one excepted group.

.. image:: /_static/UsageGuide/maskedResults.png

Values of masked attributes are not masked when the data set is processed in transforms or exported to external systems.
If an attribute needs to be completely removed, a new data set should be created via a transform to create a new data set without particular attributes.
