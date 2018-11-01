.. _devGuideIntroduction:

Introduction
============

Organizations often to require custom software development to address their own unique set of data analytics requirements.
These custom software features will require their own unique sources and methods that provide strategic insight and competitive advantage.

Each organization could have potentially some combination of unique data sets, mission-specific data processing requirement used to analyze and transform those data sets, and custom interactive user interfaces.

There are three main categories of custom development on Koverse:

#. Creating custom analytics
#. Building web applications to deliver analytical results throughout the organization.
#. Integrating Koverse with data sources, authentication systems, and downstream data consumer services

.. _LinkingSDK:

Linking to the Koverse API
--------------------------

The Koverse platform's Integration and Analytics APIs are implemented in Java.
Projects written on these APIs can pull in the Koverse SDK as a dependency adding the following to a pom.xml file for use with Maven.::

  <dependency>
    <groupId>com.koverse</groupId>
    <artifactId>koverse-sdk</artifactId>
    <version>2.8.1</version>
  <dependency>
  <repositories>
    <repository>
      <id>koverse</id>
      <name>Koverse Public Repo</name>
      <url>http://nexus.koverse.com/nexus/content/groups/public/</url>
      <layout>default</layout>
    </repository>
  </repositories>

Make sure to use a version of the Koverse SDK that is compatible with the version of the Koverse instance on which your custom code will be deployed.

All bug-fix releases of the same major and minor versions (e.g. 2.4.1 and 2.4.2) should work with each other.

If your code is built against a version of the Koverse SDK with an earlier minor version than your Koverse instance (e.g. SDK version of 2.3.0 and a Koverse instance of 2.4.0) your code should run fine with no changes.

Code built against a major version number earlier than the Koverse instance version is not guaranteed to work as there may be breaking API changes (e.g. custom code built on Koverse SDK 1.5.0 with a Koverse instance of 2.4.0)

Accessing Example Code
----------------------

Code to accompany examples in this documentation can be found at https://github.com/Koverse/koverse-sdk-project .
