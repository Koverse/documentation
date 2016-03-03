
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

Koverse is supported on the latest distributions from Cloudera, Hortonworks, and MapR. Due to observed incompatibilities with vendor builds, Koverse requires the Apache distribution of Spark 1.5.1 distribution to be available on its server.  Koverse also requires the Hadoop client binaries and configuration to be installed on the server.


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

Users
^^^^^

The *koverse-server* and *koverse-webapp* processes run as the user 'koverse'. To create this user, as root run::

  useradd koverse

HDFS Configuration
^^^^^^^^^^^^^^^^^^

The 'koverse' user added above needs to be in the HDFS Superuser Group. This group is defined in the HDFS configuration property of *dfs.permissions.superusergroup*. Additionally, the value of that property must be a UNIX group on the server. For instance, if *dfs.permissions.superusergroup* was 'hadoop', ensure this group exists, and if not::

  groupadd hadoop

And then add 'koverse' to this group::

  usermod -a -G hadoop koverse

**WHAT ABOUT ACCUMULO USER? do we want to setup a different group besides 'hadoop' and make hdfs://koverse owned by that group and then see if 'accumulo' being in that groups makes things work without 'accumulo' being in the superuser group?**

Now we need to create a directory in HDFS for Koverse to use. Assuming the typical 'hdfs' exists for your Hadoop install, run::

 sudo -u hdfs hdfs dfs -mkdir /koverse
  sudo -u hdfs hdfs dfs -chown koverse:hadoop /koverse

.. _AccumuloInit:

Accumulo Initialization
^^^^^^^^^^^^^^^^^^^^^^^

Koverse will access authenticate to Accumulo using its own username and password. Initially Accumulo has a single user 'root' with a default password of 'secret'. You may have changed the password for 'root' during your install of Accumulo. To create a 'koverse' user in Accumulo, start the Accumulo shell::

  accumulo shell -u root

After entering the password for the 'root' user, create a 'koverse' user and password::

  root@accumulo> createuser koverse

Then grant the 'koverse' Accumulo user the required permissions to manage its tables::

 root@accumulo> grant -s System.CREATE_TABLE -u koverse
  root@accumulo> grant -s System.DROP_TABLE -u koverse
  root@accumulo> grant -s System.ALTER_TABLE -u koverse
  root@accumulo> grant -s System.SYSTEM -u koverse

Koverse Server Install
^^^^^^^^^^^^^^^^^^^^^^

To install the Koverse Server from RPM, simply run::

  yum localinstall koverse-server-<VERSION>.rpm

This will install into */opt/koverse-server/* as well as create a script at */etc/init.d/koverse-server* for starting and stopping the process.

JBoss Install
^^^^^^^^^^^^^

JBoss is the Java application server used to host the Koverse Webapp. There is no reason thought that the Koverse Webapp couldn't run on other Java servlet containers such as Tomcat. To install JBoss, please use the Koverse-provided JBoss RPM and run::

  yum localinstall jboss-rpm-7.1.1-<BUILD VERSION>.rpm

This will install into */opt/jboss/* as well as create a script at */etc/init.d/jboss* for starting and stopping JBoss

Koverse Webapp Install
^^^^^^^^^^^^^^^^^^^^^^

To install the Koverse Webapp from RPM, simply run::

  yum localinstall koverse-webapp-<VERSION>.rpm

This will install an exploded WAR file to */opt/jboss/standalone/deployments/Koverse.WAR/*

.. _PostgreSQLSetup:

PostgreSQL Setup
^^^^^^^^^^^^^^^^

Koverse stores metadata about Data Collections, Users, Transforms, etc in an RDBMS such as PostgreSQL. These instructions assume PostgreSQL has already been installed. In an environment where Cloudera Manager is used, Koverse can leverage the PostgreSQL database that is installed via Cloudera Manager.

Cloudera Manager Environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To get the password needed to log into the existing PostgreSQL database, read the following file::

  cat /var/lib/cloudera-scm-server-db/data/generated_password.txt

Then login with the user 'cloudera-scm'::

  psql -U cloudera-scm -h localhost -p 7432 -d postgres

Create the 'koverse' user with a password of 'koverse1234'. If you wish to use a different password, you will need to follow the procedure in :ref:`AppendixA` for encoding this password before putting it into the *koverse-server.properties* file.::

  postgres=# CREATE ROLE koverse LOGIN PASSWORD 'koverse1234';

And finally create the database that Koverse will use::

  postgres=# CREATE DATABASE koverse OWNER koverse ENCODING ‘UTF-8';

Manually Installed
~~~~~~~~~~~~~~~~~~

Koverse Configuration
^^^^^^^^^^^^^^^^^^^^^

Environment
~~~~~~~~~~~
The 'koverse' user needs to have the 'java' command in their path for the Koverse startup scripts to execute correctly. Again, this needs to be Oracle Java 1.7.x.

The environment variable *HADOOP_CONF_DIR* needs to be set for the 'koverse' user so Koverse can take advantage of the Hadoop client configuration. The startup script */opt/koverse-server/bin/startup.sh* will default this environment variable to */etc/hadoop/conf* if it is not already set.

koverse-server.properties
~~~~~~~~~~~~~~~~~~~~~~~~~

Many of the property values seen in */opt/koverse-server/conf/koverse-server.properties* can be left as their default values. The few that do need to be examined and/or updated are called out below.

**com.koverse.server.jdbc.user**

**com.koverse.server.jdbc.password**

These two properties control how Koverse is authenticated to PostgreSQL and need to follow the username and password from :ref:`PostgreSQLSetup`. The password value is encoded to avoid plaintext passwords, so again if the password choosen was different from the default of 'koverse1234', you will need to follow the process in :ref:`AppendixA` for generating the encoded value for this property.

**com.koverse.server.jdbc.url**

The value of this property needs to be updated to the correct hostname and port of your PostgreSQL install

**com.koverse.server.spark.mode**

If you are running Spark-on-YARN, the value of this property should be 'yarn'. If you are running Spark standalone, set the value to 'master'.

settings.xml
~~~~~~~~~~~~

Like the *koverse-server.properties* file, many of the properties in */opt/koverse-server/conf/settings.xml* can be left with their default values. The following properties will need to be updated.

**dataStoreSetting.instanceName**

The Accumulo instance name can be seen when logging into the Accumulo shell. For instance, the instance name seen below is 'accumulo'::

 -bash-4.1$ accumulo shell -u koverse
  Password: ******

  Shell - Apache Accumulo Interactive Shell
  -
  - version: 1.6.0-cdh5.1.4
  - instance name: accumulo
  - instance id: 3056fcc7-edbd-463b-9bab-5def770d79e0
  -
  - type 'help' for a list of available commands
  -
  koverse@accumulo>

**dataStoreSetting.username**

This is the Accumulo user, likely 'koverse', that was created in :ref:`AccumuloInit`

**dataStoreSetting.password**

This is the password for the Accumulo user created in :ref:`AccumuloInit`

**dataStoreSetting.zookeeperServers**

This is a comma-separated list of ZooKeeper servers in the form of <HOSTNAME>:<PORT>. The default ZooKeeper port is 2181.

koverse-webapp.properties
~~~~~~~~~~~~~~~~~~~~~~~~~

The file */opt/jboss/standalone/deployments/Koverse.war/WEB-INF/conf/koverse-webapp.properties* controls the configuration for the Koverse Webapp. Unless you are running JBoss on a different server than the Koverse Server, there are no properties in this file that are required to be changed. If they are running on different servers, update *com.koverse.server.thrift.host* to the hostname where the Koverse Server is running.

Koverse Aggregation Library Distribution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In order to utilize the :ref:`aggregation <AggregationIntro>` functions of Koverse, the koverse-aggregation-<VERSION>.jar needs to be deployed to a location where Accumulo can load it. The default location would be in $ACCUMULO_HOME/lib/ext on all Accumulo tablet servers. This JAR file can be found on the Koverse Server in */opt/koverse-server/lib/koverse-aggregation-<VERSION>.jar*


Running Koverse
^^^^^^^^^^^^^^^

.. _AppendixA:

Appendix A: Changing Encoded Passwords
--------------------------------------
