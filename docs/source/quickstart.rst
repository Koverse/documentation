

.. _quickstart:

Quick Start Guide
=================

This Quick Start guide for Koverse is intended for users who want to get up and running quickly with Koverse.  It steps through the installation of Koverse, ingesting data and executing queries. Check out the Koverse User Guide for complete documentation of all features and installation instructions.

Recommendations
^^^^^^^^^^^^^^^

Infrastructure and Software
---------------------------

Koverse and the open source software it leverages must be run on a system with no less than 10 GB of memory.
For workloads beyond simple examples and testing we recommend a properly provisioned Hadoop cluster with five or more nodes.

Using the Cloudera QuickStart VM is not recommended.
See http://www.koverse.com/question/using-the-cloudera-quick-start-vim-and-the-koverse-parcel for more information.

Minimum Hardware Requirements
-----------------------------
Note these are requirements for a dedicated Koverse server supporting a mulit-node cluster

* Amazon r3.xlarge EC2 instance
    - 31 GB memory
    - 4 CPUs
* Local disk
    - 40 GB for /tmp
    - 50 GB for /var/log
* tmpwatch must be configured to clear /tmp every 3 days
    
Software Requirements
---------------------
* Recommended Operating System: 
    - RHEL 6.x or Centos 6.x
* Recommended Hadoop Release: Cloudera Manager 5.5 with the following:
    - CDH 5.5 Parcel installed
    - Accumulo 1.6 Parcel and Service installed. See http://www.cloudera.com/documentation/other/accumulo/latest/PDF/Apache-Accumulo-Installation-Guide.pdf for more details.
* Recommended Koverse Release:
    - Koverse Parcel - see http://repo.koverse.com/latest/csd


.. include:: /tuningguide.rst


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
