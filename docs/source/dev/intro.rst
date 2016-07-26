.. _kov-Introduction:

Introduction
^^^^^^^^^^^^

Organizations are likely to require some custom software development to address their own unique set of data analytics requirements.
These custom software features will require their own unique sources and methods that provide strategic insight and competitive advantage.

Each organization could have potentially some combination of unique data sets, mission-specific data processing requirement used to analyze and transform those data sets, and custom interactive user interfaces.

With this in mind, Koverse provides this developer documentation describing how to programmatically extend Koverse with additional functionality, and how to deploy that functionality into an operational Koverse instance.

.. tip:: The Javadocs for the Koverse SDK are available from the Koverse UI.
  From the UI, just navigate to the Info panel by clicking on the Info panel icon at bottom left of the screen.
  The Info panel will provide links to the Javadocs.

References
^^^^^^^^^^
:ref:`kov-Glossary`

Customizations Types
^^^^^^^^^^^^^^^^^^^^

Developers can customize and extend Koverse in several ways, such as:

* Koverse Apps - Web Applications that are hosted by Koverse leverage the Javascript SDK to support interaction with Koverse for a large number of users. Apps may also include custom Transforms to help get Data Sets into a structure that the App expects.

* AddOns - these are packages that extend Koverse with custom Sources, Transforms, and Sinks.

* Koverse Clients - these are processes that interact with Koverse via an API and that can be embedded in other services etc.
