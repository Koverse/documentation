.. _ApiTokens:

API Tokens
----------

API Tokens are used to authenticate and authorize web applications that are designed to allow all users of that particular web application to access certain Data Sets within Koverse.
API Tokens are managed like individual users, so you can think of an API Token as representing an application as if an application were a Koverse user.
This means that your application will not differentiate its own set of users in terms of what information they see, they all see the same data.

In many cases it's useful to create a specific Koverse user to represent your web application.
Then this user can be assigned to a Group that is authorized to read all the Data Sets your application requires.

Generating an API Token Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To generate an API token, you must have permission to 'Create and remove API authentication tokens'.
The 'admin' example user in the Koverse :ref:`DevImage` has this permission.

For example, if you are building the example web app described in :ref:`ExampleWebApp` and you've generated a data set containing the results of the example Sentiment Analysis analytic described in :ref:`SparkJavaDataFrameTransform`, you can create a user identified by 'example-webapp'.

Create a user account to represent this app:

#. Click on the Admin button on the left menu to access administrative functions. The first table selected is the 'Users' tab.
#. Click the 'Add User' button on the right and enter 'Example' as the first name, 'Webapp' as the last name, and 'example-webapp' as the username and click 'Save'.

Create a new group:

#. Now click on the Groups tab.
#. Click 'Add Group' on the right. Enter 'Example Webapp' as the group name.
#. The only system permission this group needs is the 'Use Koverse' permission.
#. Click the checkbox next to 'Use Koverse' and click the 'Save' button on the lower right to create the group.

Now 'Example Webapp' should appear in the list of groups.

Add our user account to the new group:

#. Click on the 'Example Webapp' group.
#. On the right there is a drop down for adding users to this group.
#. Click on the text input labeled 'Search for Member' and begin typing 'example'.
#. You should see a drop down menu containing the 'Example Webapp' user.
#. Click on that user. The user is now part of the group, there is no need to click 'Save'

Now we have a new user, in a new group.
We can grant permissions to this new group to read specific data sets.
But before we do that we'll create an API token to allow our example web app to access Koverse as this new user account.

Create an API token:

#. Click on the 'API Tokens' tab.
#. Click the 'Add API Token' on the lower right.
#. Type 'example-webapp-api-token' as the Name
#. Choose 'Example Webapp' as the Associated User
#. Click 'Save'. Now you should see 'example-webapp-api-token' in the list of API tokens.
#. Click on 'example-webapp-api-token' to view the token. It looks like a long string such as "568fc008-7931-4976-8dd2-d232f4f6fc45"
#. Copy this token into the webapp koverse.js file in :ref:`ExampleWebApp`

Now we just need to allow our new user, and associated API token, to access our Sentiment Analysis results.

Grant access to analysis results:

#. Click on the 'Data' tab on the left menu.
#. Select the Data Set containing results of the :ref:`SparkJavaDataFrameTransform` example.
#. Click the 'Settings' tab.
#. Select 'Permissions'.
#. On the right in the input box that says 'Search for Group', begin typing 'Example Webapp'. You should see a drop down menu containing the 'Example Webapp' group.
#. Click on 'Example Webapp'. This adds the group to the list of groups that can access this data set.
#. Click on 'Example Webapp' in the list of associated groups. You should see a drop down of various permission types.
#. Check the 'Read' permission box
#. Click 'Save'

Now our web app can query this Data Set as long as it issues REST calls using the API Token we generated.
The web app's access to this Data Set can be revoked by revoking the read access of the Example Webapp group here.
