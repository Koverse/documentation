

.. _quickstart:

Quick Start Guide
=================

This Quick Start guide for Koverse is intended for users who want to get up and running quickly with Koverse.  It steps through the installation of Koverse, ingesting data and executing queries. Check out the Koverse User Guide for complete documentation of all features and installation instructions.

Recommendations
^^^^^^^^^^^^^^^
The recommended Operating System is RHEL 6.x or Centos 6.x.

Recommended Hadoop Release is Cloudera Manager 5.5 with Accumulo 1.6 Parcel and Service installed. See http://www.cloudera.com/documentation/other/accumulo/latest/PDF/Apache-Accumulo-Installation-Guide.pdf for more details.

Recommended Koverse release can be found at http://repo.koverse.com/latest/csd

Infrastructure and Software
---------------------------

Koverse and the open source software it leverages must be run on a system with no less than 10 GB of memory.
For workloads beyond simple examples and testing we recommend a properly provisioned Hadoop cluster with five or more nodes.

Using the Cloudera QuickStart VM is not recommended.
See http://www.koverse.com/question/using-the-cloudera-quick-start-vim-and-the-koverse-parcel for more information.


Installation
^^^^^^^^^^^^

.. include:: /snippets/awsinstall.rst

.. include:: /snippets/csdinstall.rst


Once both processes have started up, you can access the Koverse user interface from a web browser at
http://<hostname>:8080/
The default username and password are ‘admin’ and ‘admin’. The password can be changed immediately after logging in.


.. include:: /snippets/loggingin.rst

Upon successful login you will see the Koverse user interface.


.. include:: /snippets/addingdata1.rst

.. include:: /snippets/addingdata2.rst

.. include:: /snippets/addingdata3.rst

.. include:: /snippets/search.rst
