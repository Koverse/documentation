
.. _managing-automation-clients:

Managing Automation Clients
===========================

External clients must be registered with Koverse to access the Thrift Automation API methods.
To register a new client go to the "Admin" section in the Koverse UI.

Clients can be registered as either multi-user web clients, or single-user automation clients.

Automation clients are designed to operate as a single Koverse user, and must be associated with an API token.

See :ref:`ApiTokens` for details on creating an API token.

Once you have the new API token copied, select "API Clients" from the top tab.
Select "Add API Client" from the right side.

.. image:: /_static/DevGuide/automation/addClient.png

Enter a "Name".
Select "Application acts on behalf of the single user.", then paste the API Token into the API Token space.
Click 'save'.

.. image:: /_static/DevGuide/automation/editClient.png

Select the client Name from the list to view the client secret.

.. image:: /_static/DevGuide/automation/viewClients.png

.. image:: /_static/DevGuide/automation/copyClientSecret.png

This, along with the client name, can be stored in a secure configuration file or environment variable that your application uses to authenticate.

Now your application is registered ready to start calling the Automation API methods.
