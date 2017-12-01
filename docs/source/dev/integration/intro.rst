.. _IntegrationAPI:

Integration API
---------------

Koverse is designed to work with existing data sources and systems throughout the enterprise. There are three types of connectors:

* Sources - a connector to a system from which Koverse imports data
* Sinks - a connector to a system to which Koverse writes data
* Authenticators and Authorizers - connectors that allow Koverse to uses enterprise authentication and authorization systems such as Single Sign On (SSO), Active Directory, or PKI systems.

To find out how to build a custom connector for Koverse, check out the details and examples in the Integration API documents.



Koverse makes it easy to integrate with specific data sources, file formats, data consumers (sinks), and authentication systems.

See specific examples for how to build a custom Koverse connector:

.. toctree::

   sources.rst
   file_format.rst
   sinks.rst
   export_file_format.rst
   third_party_auth.rst
