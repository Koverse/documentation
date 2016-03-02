
.. _InstallGuide:

==============
Install Guide
==============

This section describes the prerequisites and process for installing Koverse software on your cluster.

Infrastructure Requirements
---------------------------
For a complete description of the infrastructure required for a Koverse install, please see the :ref:`InfraGuide`.

Operating System
^^^^^^^^^^^^^^^^
Koverse requires a Linux operating system. Installation packages (RPMs) are provided for RedHat/CentOS distributions, but other distributions are also supported with .tar.gz packages.

Koverse requires all servers in a cluster to have clocks synchronized within a few seconds of each other, so it is recommended to use ntpd for this purpose.

Software
^^^^^^^^
A described in the :ref:`InfraGuide`, Koverse runs atop several distributed systems. All of these dependent systems need to be properly installed and configured for Koverse to execute successfully. The proper installation of Hadoop and associated software infrastructure is not within the scope of this document, nor is it a trivial undertaking. If your organization does not have well established provisioning tools and/or experience installing Hadoop ecosystem software, we highly recommend tools like `Cloudera Manager`_ or `Apache Ambari`_ to help automate and manage the installation of the required software infrastructure.

.. _Cloudera Manager: https://cloudera.com/products/cloudera-manager.html
.. _Apache Ambari: http://hortonworks.com/hadoop/ambari/

Koverse is supported on the latest distributions from Cloudera, Hortonworks, and MapR. Due to observed incompatibilities with vendor builds, Koverse requires the Apache distribution of Spark 1.5.1 distribution to be available on its server.


Hardware
^^^^^^^^
Koverse runs on off-the-shelf commodity hardware. The two Koverse software components, koverse-server and koverse-webapp, require minimum HW resources as shown below. As the number of concurrent users of Koverse grows, these resource requirements would also increase.

+----------------+--------------------+--------------------+
| Process        | Minimum CPU(cores) | Minimum Memory(GB) |
+----------------+--------------------+--------------------+
| koverse-server | 2                  | 8                  |
+----------------+--------------------+--------------------+
| koverse-webapp | 1                  | 4                  |
+----------------+--------------------+--------------------+


Step-by-Step Installation Instructions
--------------------------------------
