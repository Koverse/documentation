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
------------------------------------

Koverse allows data set owners to mask specific attributes so that their values are not visible in search results or downloads. This enables organizations to protect sensitive values, such as personally identifiable information, in order to comply with privacy policies and regulations such as HIPAA and GDPR.

To edit a data set's masking settings click on the Data tab on the left navigation menu and select the data set you want.
Click on the Settings tab and then the Masking tab.

.. image:: /_static/UsageGuide/masking.png

This will show a list of all the attributes within this data set.
By default all attributes are visible to users that can query this data set.

To mask an attribute, select the attribute name from the drop down menu and click the 'Add Masker' button. As an example, let's say we want to protect employee information in a field called 'name'. We'll choose the 'Completely Mask Values' option, which is the default. As of now, the 'name' field is masked for all users.

.. image:: /_static/UsageGuide/oneMasker.png

Instead of seeing employee names, all users will now see the text '[masked]'. This also applies to the data if we now download it.

.. image:: /_static/UsageGuide/maskedResults1.png

But if we want to apply different masking logic for a specific group of users, we can exclude a specific group so that he masker no longer applies to users belonging to that group. For example, we can choose to except the 'Administrators' group from the first masker we applied, the 'Completely Mask Values' masker. To exclude a group, click the plus icon next to the masker you wish to modify, click on the drop down menu labeled 'Excepted Groups' and check the boxes next to the groups to be excluded.

.. image:: /_static/UsageGuide/exceptGroup.png

Now the 'Completely Mask Values' masker no longer applies to our example 'admin' user since that user belongs to the 'Administrators' group. The 'name' field will still continue to be masked for everyone else.

We can now apply a second masker that will take effect for all groups excluded from the first masker. Simply select the 'name' field again and click 'Add Masker'. This time we'll apply the 'SHA Hasher' masker.

.. image:: /_static/UsageGuide/twoMaskers.png

Now, users in the 'Administrators' group will see hashed values instead of employee names, while all other users see the text '[masked]'.

.. image:: /_static/UsageGuide/maskedResults2.png

If we were to add 'Administrators' to the list of excepted groups for this second 'SHA hasher' masker we would again see the unprotected employee names. When there are one or more maskers applied to an field, the first masker that a user is not excluded from will take effect. This way data can be masked differently for different user groups, allowing for a wide variety of data protection policies to be enforced.

It is important to note that while values are masked in search results and downloads from the Koverse UI and REST API, values of masked attributes are not masked when the data set is processed in transforms or exported to external systems via a Koverse export. For this reason, the ability to export and transform data should be restricted when using masking.

Also note that users who are not able to see masked values may still perform searches for a value that is masked and get results, albeit with the masked values still masked in results. If searches should not be performed on values of a masked field the field can be excluded from being indexed, thereby preventing searching on masked values.

If an attribute needs to be completely removed, a new data set should be created via a transform to create a new data set without particular attributes.
