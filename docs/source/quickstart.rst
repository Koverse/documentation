

.. _quickstart:

Quick Start Guide
=================

This Quick Start guide for Koverse is intended for users who want to get up and running quickly with Koverse.  It steps through the installation of Koverse, ingesting data and executing queries. Check out the Koverse User Guide for complete documentation of all features and installation instructions.

Recommendations
^^^^^^^^^^^^^^^

Infrastructure and Software
---------------------------

Koverse and the open source software it leverages must be run on a system with no less than 10 GB of memory.  For workloads beyond simple examples and testing we recommend a properly specified Hadoop cluster with five or more nodes.

An amazon r3.xlarge EC2 instance is a good option for a single node AWS deployment.

Recommended Operating System:

RHEL 6.x or Centos 6.x

Recommended Hadoop Release:

Cloudera Manager 5.5
CDH 5.5 Parcel installed
Accumulo 1.6 Parcel and Service installed. See http://www.cloudera.com/documentation/other/accumulo/latest/PDF/Apache-Accumulo-Installation-Guide.pdf for more details.

Recommended Koverse Release:

Koverse Parcel  http://repo.koverse.com/latest/csd

Installation
^^^^^^^^^^^^

.. include:: /snippets/csdinstall.rst


Once both processes have started up, you can access the Koverse user interface from a web browser at
http://<hostname>:8080/Koverse
The default username and password are ‘admin’ and ‘admin’. The password can be changed immediately after logging in.


.. include:: /snippets/loggingin.rst

Upon successful login you will see the Koverse user interface.


.. include:: /snippets/addingdata1.rst

.. include:: /snippets/addingdata2.rst

.. include:: /snippets/addingdata3.rst

.. include:: /snippets/search.rst
