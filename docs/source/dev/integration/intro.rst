.. _IntegrationAPI:

Integration API
===============

Koverse is designed to work with existing data sources and systems throughout the enterprise. There are three types of integration points:

* Sources - a connector to a system from which Koverse imports data
* Sinks - a connector to a system to which Koverse writes data
* Authenticators and Authorizers - connectors that allow Koverse to uses enterprise authentication and authorization systems such as Single Sign On (SSO), Active Directory, or PKI systems.

A Source is only needed when talking to a system that requires a whole new data protocol.
For example, if you had an FTP source and wanted to connect instead to and HTTP server you would need to write a new Source.
Koverse provides built-in sources for many popular data protocols (including HTTP and FTP).

Some Sources share much in common and the Koverse Integration API provides subclasses that make it easier to create a new Source.
For example, database Sources can use a common base class, as well as file-system based sources.

If you need to connect to a remote file system using a source that already exists for your protocol, such as FTP, but you want to be able to parse a new type of file Koverse provides a `File Format API` that can be used to parse new file types.
File Formats can be used with any existing or new file system based source.

Similarly, Sinks that write to a file system can produce files in custom formats by creating an Export File Format class.

Finally, 3rd party Authenticators and Authorizers can allow Koverse to integrate with existing user management systems so that data access can be granted to specific roles and groups already defined for an organization.

Linking to the Koverse Integration API

The Koverse platform's Integration API is implemented in Java. Projects written on this API can pull in the Koverse SDK as a dependency adding the following to a pom.xml file for use with Maven::

  <dependency>
    <groupId>com.koverse</groupId>
    <artifactId>koverse-sdk</artifactId>
  <dependency>
  <repositories>
    <repository>
      <id>koverse</id>
      <name>Koverse Public Repo</name>
      <url>http://nexus.koverse.com/nexus/content/groups/public/</url>
      <layout>default</layout>
    </repository>
  </repositories>

..
  file_format.rst
  sinks.rst
  export_file_format.rst
  third_party_auth.rst

.. toctree::

   sources.rst
