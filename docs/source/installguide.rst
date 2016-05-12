
.. _InstallGuide:

==============
Install Guide
==============

This section describes the prerequisites and process for installing Koverse software on your cluster.

Infrastructure Requirements
^^^^^^^^^^^^^^^^^^^^^^^^^^^
For a complete description of the infrastructure required for a Koverse install, please see the :ref:`InfraGuide`.

Operating System
----------------
Koverse requires a Linux operating system. Installation packages (RPMs) are provided for RedHat/CentOS distributions, but other distributions are also supported with .tar.gz packages.

Koverse requires all servers in a cluster to have clocks synchronized within a few seconds of each other, so it is recommended to use ntpd for this purpose.

Software
--------
As described in the :ref:`InfraGuide`, Koverse runs atop several distributed systems. All of these dependent systems need to be properly installed and configured for Koverse to execute successfully. The proper installation of Hadoop and associated software infrastructure is not within the scope of this document, nor is it a trivial undertaking. If your organization does not have well established provisioning tools and/or experience installing Hadoop ecosystem software, we highly recommend tools like `Cloudera Manager`_ or `Apache Ambari`_ to help automate and manage the installation of the required software infrastructure.

.. _Cloudera Manager: https://cloudera.com/products/cloudera-manager.html
.. _Apache Ambari: http://hortonworks.com/hadoop/ambari/

Koverse is supported on the latest distributions from Cloudera, Hortonworks, and MapR. Koverse also requires the Hadoop client binaries and configuration to be installed on the server.


Hardware
--------
Koverse runs on off-the-shelf commodity hardware. The two Koverse software components, koverse-server and koverse-webapp, require minimum HW resources as shown below. As the number of concurrent users of Koverse grows, these resource requirements would also increase.

+----------------+--------------------+--------------------+
| Process        | Minimum CPU(cores) | Minimum Memory(GB) |
+----------------+--------------------+--------------------+
| koverse-server | 2                  | 8                  |
+----------------+--------------------+--------------------+
| koverse-webapp | 1                  | 4                  |
+----------------+--------------------+--------------------+


.. _RpmInstallation:

RPM Installation
^^^^^^^^^^^^^^^^

Before starting this install process, you should have downloaded the 2 required Koverse RPMs listed below. If you do not know where to get the RPMs from, please contact Koverse Support at support@koverse.com.

#. koverse-server-<VERSION>.rpm
#. koverse-webapp-<VERSION>.rpm

While separate components, typical installs will install both the Koverse Server and Koverse Web App on the same server. The directions below assume commands are being executed on this single server.

Users
-----

The *koverse-server* and *koverse-webapp* processes run as the user 'koverse'. To create this user, as root run::

  useradd koverse

HDFS Configuration
------------------

The 'koverse' user added above needs to be in the HDFS Superuser Group. This group is defined in the HDFS configuration property of *dfs.permissions.superusergroup*. Additionally, the value of that property must be a UNIX group on the server. For instance, if *dfs.permissions.superusergroup* was 'hadoop', ensure this group exists, and if not::

  groupadd hadoop

And then add 'koverse' to this group::

  usermod -a -G hadoop koverse

It is also currently required to have the 'accumulo' user in this same group, so also run::

  usermod -a -G hadoop accumulo

Now we need to create a directory in HDFS for Koverse to use. Assuming the typical 'hdfs' user exists for your Hadoop install, run::

 sudo -u hdfs hdfs dfs -mkdir /koverse
 sudo -u hdfs hdfs dfs -chown koverse:hadoop /koverse

.. _AccumuloInit:

Accumulo Initialization
-----------------------

Koverse will authenticate to Accumulo using its own username and password. Initially Accumulo has a single user 'root' with a default password of 'secret'. You may have changed the password for 'root' during your install of Accumulo. To create a 'koverse' user in Accumulo, start the Accumulo shell::

  accumulo shell -u root

After entering the password for the 'root' user, create a 'koverse' user and password::

  root@accumulo> createuser koverse

Then grant the 'koverse' Accumulo user the required permissions to manage its tables::

 root@accumulo> grant -s System.CREATE_TABLE -u koverse
 root@accumulo> grant -s System.DROP_TABLE -u koverse
 root@accumulo> grant -s System.ALTER_TABLE -u koverse
 root@accumulo> grant -s System.SYSTEM -u koverse

Koverse Server Install
----------------------

To install the Koverse Server from RPM, simply run::

  yum localinstall koverse-server-<VERSION>.rpm

This will install into */opt/koverse-server/* as well as create a script at */etc/init.d/koverse-server* for starting and stopping the process.

Koverse Web App Install
-----------------------

To install the Koverse Web App from RPM, simply run::

  yum localinstall koverse-webapp-<VERSION>.rpm

This will install into */opt/koverse-webapp/* as well as create a script at */etc/init.d/koverse-webapp* for starting and stopping the process.

.. _PostgreSQLSetup:

PostgreSQL Setup
----------------

Koverse stores metadata about Data Collections, Users, Transforms, etc in an RDBMS such as PostgreSQL. These instructions assume PostgreSQL has already been installed. In an environment where Cloudera Manager is used, Koverse can leverage the PostgreSQL database that is installed via Cloudera Manager. If you wish to use a different password than the default 'koverse1234', you will need to follow the procedure in :ref:`AppendixA` for encoding this password before putting it into the *koverse-server.properties* file.

Cloudera Manager Environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To get the password needed to log into the existing PostgreSQL database, read the following file::

  cat /var/lib/cloudera-scm-server-db/data/generated_password.txt

Then login with the user 'cloudera-scm'::

  psql -U cloudera-scm -h localhost -p 7432 -d postgres

Create the 'koverse' user with a password of 'koverse1234'::

  postgres=# CREATE ROLE koverse LOGIN PASSWORD 'koverse1234';

And finally create the database that Koverse will use::

  postgres=# CREATE DATABASE koverse OWNER koverse ENCODING 'UTF-8';

Manually Installed
~~~~~~~~~~~~~~~~~~

If you have manually install PostgreSQL, use the following steps to setup the user and database for Koverse.::

  su -u postgres
  createdb koverse
  psql -s koverse
  postgres=# CREATE USER koverse PASSWORD 'koverse1234';
  postgres=# GRANT ALL PRIVILEGES ON DATABASE koverse TO koverse;

Finally, update pg_hba.conf to set all connections METHOD to password e.g.::

	local  all  all  password

Configuration
-------------

Follow the instructions below in the `Koverse Configuration`_ section.

Running Koverse
---------------

As discussed, Koverse software runs as two processes. To start the Koverse Server, as root run::

  service koverse-server start

And for the Web App, run::

  service koverse-webapp start

Once both processes have started up, you can access the Koverse user interface from a web browser at

``http://<hostname>:8080``

The default username and password are 'admin' and 'admin'. The password can be changed immediately after logging in.

Logs
----
The Koverse Server redirects stdout and stderr to */opt/koverse-server/logs/server.err* but most application logging can be seen in */var/log/koverse-server/koverse-server.log*

The Koverse Web App logs to */var/log/koverse-webapp/koverse-webapp.log* with stdout and stderr redirected to the same directory.

More information on the operations of Koverse can be found in the :ref:`Ops Guide`

.. _ClouderaParcelInstallation:

Cloudera Manager Installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse provides a Cloudera Manager Parcel and Custom Service Descriptor (CSD) for easy installation and management through Cloudera Manager.

Prerequisites
---------------
- Cloudera Manager version 5.5 or greater
- CDH installed via Parcel, not Packages
- Accumulo Parcel and Service installed. See http://www.cloudera.com/documentation/other/accumulo/latest/PDF/Apache-Accumulo-Installation-Guide.pdf for more details.

Files
-------
The following files are provided to support both online and offline installs.

KOVERSE-1.0.jar
  Custom Service Descriptor for Koverse
  http://repo.koverse.com/KOVERSE-1.0.jar
KOVERSE-2.0.2-el6.parcel
  Parcel file (download for offline install)
  http://repo.koverse.com/KOVERSE-2.0.2-el6.parcel
KOVERSE-2.0.2-el6.parcel.sha
  Parcel SHA file (download for offline install)
  http://repo.koverse.com/KOVERSE-2.0.2-el6.parcel
manifest.json
  Repository file for local parcel repository (download for offline install)
  http://repo.koverse.com/manifest.json


CSD Installation
-------------------

- Copy the CSD file onto the Cloudera Manager server and place it in */opt/cloudera/csd*
- Change the permissions on the CSD file
  ::

    chmod 644 /opt/cloudera/csd/KOVERSE-1.0.jar

- Change the owner of the CSD file to *cloudera-scm*
  ::

    chown cloudera-scm:cloudera-scm /opt/cloudera/csd/KOVERSE-1.0.jar

- Restart Cloudera Manager to pick up the new Koverse Service from the Cloudera Service Descriptor
  ::

    service cloudera-scm-server restart

- For further reference: http://www.cloudera.com/documentation/enterprise/5-5-x/topics/cm_mc_addon_services.html

Manual Parcel Installation (Optional)
-----------------------------------------
The CSD automatically installs the parcel repository where Cloudera Manager can download the Koverse Parcel from. If you are installing on a cluster without Internet connectivity though, you will need to manually install the Koverse parcel and checksum to the local parcel respository.

- Copy the parcel file and SHA file to */opt/cloudera/parcel-repo*
- Copy over manifest.repo to */opt/cloudera/parcel-repo*
- Change ownership of all files *cloudera-scm*
  ::

    chown cloudera-scm:cloudera-scm /opt/cloudera/parcel-repo/*


Distribute and Activate Parcel(s)
----------------------------------
1. Click the Parcel icon in the menu bar of the Cloudera Manager UI. The Koverse parcel should be visible in the list. If not, click the *Check for new Parcels* button.
2. Click the *Download* button. Once downloaded, the button becomes the *Distribute* button.
3. Click the *Distribute* button. Once distribuetd, the button become the *Active* button.
4. Click the *Activate* button.

As described in the :ref:`InfraGuide`, Koverse depends on Apache Accumulo 1.6 for data storage. If you do not have it installed already, you should now install the ACCUMULO 1.6.0 Parcel. Follow the above Download, Distribute, and Activate process and then install the Accumulo Service.

Configuration
-------------
Currently there are a few manual configuration steps that need to occur before adding and starting the Koverse Service in Cloudera Manager. In the future, these will be automated as part of the parcel install. All of these should be performed on the host where you will install the Koverse Service.

- Ensure that *dfs.permissions.superusergroup* is set to an existing Unix group. You can check the value of this property in Cloudera Manger by navigating to the HDFS Service and then selecting the Configuration tab and searching for this property. On the host you can view */etc/group* to confirm this group exists. A *dfs.permissions.superusergroup* value of "hadoop" is used in the examples below.
- Add koverse and accumulo users to the superusergroup
  ::

    usermod -a -G hadoop koverse
    usermod -a -G hadoop accumulo

- Ensure that the java binaries are available in the path for the koverse user.  If these are not already in the system path somewhere, it can be added using these commands
  ::

    alternatives --install /usr/bin/java java /usr/java/jdk1.7.0_67-cloudera/bin/java 120 --slave /usr/bin/keytool keytool /usr/java/jdk1.7.0_67-cloudera/bin/keytool --slave /usr/bin/rmiregistry rmiregistry /usr/java/jdk1.7.0_67-cloudera/bin/rmiregistry

    alternatives --install /usr/bin/javac javac /usr/java/jdk1.7.0_67-cloudera/bin/javac 120 --slave /usr/bin/jar  jar  /usr/java/jdk1.7.0_67-cloudera/bin/jar --slave /usr/bin/rmic rmic /usr/java/jdk1.7.0_67-cloudera/bin/rmic


Add the Koverse Service
-------------------------
1. In Cloudera Manager, click the dropdown menu for your cluster and click *Add a Service*.
2. Select the Koverse Service and click the *Continue* button.
3. Select the host where you want to install the Koverse Server and Koverse Web Server Roles. The same server should be selected for both Roles. Click the *Continue* button.
4. Enter the initial configuration

  a. Accumulo Instance: This is the instance name for the Accumulo cluster. It can be found in Cloudera Manager in Configuration section of the Accumulo Service under *accumulo_instance_name*
  b. JDBC connection string: It is recommended to share the existing PostgreSQL database server that Cloudera Manager uses. If you have installed the Koverse Roles on the same host as you are running the Cloudera Manager server, you can leave the default value of "jdbc:postgresql://localhost:7432/koverse". If you have installed the Koverse Roles on a different host, you will need to update the host in the connection string to the hostname of the Cloudera Manager server. Also if running on a different host, you may need to update the PostgreSQL configuration in */var/lib/cloudera-scm-server-db/data/pg_hba.conf* to allow remote connections to the *koverse* database.
  c. Zookeeper Servers: A comma separated list of host:port where ZooKeeper is running. The hosts can be seen in Cloudera Manager under the ZooKeeper Service on the Instances tab.
  d. PostgreSQL Password: this can be left blank if you are using the Cloudera Manager PostgreSQL database as the installation process will automatically retrieve the login credentials.
  e. Accumulo Password: The password for the root user in Accumulo. Accumulo's default is "secret".
  f. Webserver port: The port the Koverse webserver will listen on.


Verify that everything has installed and started properly:


Koverse Configuration
^^^^^^^^^^^^^^^^^^^^^

Environment
-----------
The 'koverse' user needs to have the 'java' command in their path for the Koverse startup scripts to execute correctly. Again, this needs to be Oracle Java 1.7 or 1.8.

The environment variable *HADOOP_CONF_DIR* needs to be set for the 'koverse' user so Koverse can take advantage of the Hadoop client configuration. The startup script */opt/koverse-server/bin/startup.sh* will default this environment variable to */etc/hadoop/conf* if it is not already set.

koverse-server.properties
-------------------------

Many of the available configuration properties for Koverse can be left to their default values. Please see the :ref:`ConfigurationGuide` for the complete list of properties. */opt/koverse-server/conf/koverse-server.properties* is where required properties can be set or defaults overriden. A few of these commonly set user properties are discussed below.

**com.koverse.server.jdbc.user**

**com.koverse.server.jdbc.password**

These two properties control how Koverse is authenticated to PostgreSQL and need to follow the username and password from :ref:`PostgreSQLSetup`. The password value is encoded to avoid plaintext passwords, so again if the password choosen was different from the default of 'koverse1234', you will need to follow the process in :ref:`AppendixA` for generating the encoded value for this property.

**com.koverse.server.jdbc.url**

The value of this property needs to be updated to the correct hostname and port of your PostgreSQL install

**com.koverse.server.spark.mode**

If you are running Spark-on-YARN, the value of this property should be 'yarn'. If you are running Spark standalone, set the value to 'master'.

**com.koverse.server.spark.dir**

This needs to be set to the directory where Spark is installed locally. Koverse uses the 'spark-submit' script and therefore needs to know where it is located.

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
-------------------------

Again, please see the :ref:`ConfigurationGuide` for the complete list of properties that can be set for the Koverse Web App. */opt/koverse-webapp/conf/koverse-webapp.properties* is where required properties can be set or defaults overriden, for example to change the ports for the web server or to enable and configure HTTPS.

Koverse Aggregation Library Distribution
----------------------------------------

In order to utilize the :ref:`aggregation <AggregationIntro>` functions of Koverse, the koverse-aggregation-<VERSION>.jar needs to be deployed to a location where Accumulo can load it. The default location would be in $ACCUMULO_HOME/lib/ext on all Accumulo tablet servers. This JAR file can be found on the Koverse Server in */opt/koverse-server/lib/koverse-aggregation-<VERSION>.jar*





.. _AppendixA:

Appendix A: Changing Encoded Passwords
--------------------------------------

If you are changing a password from its default you will need to run the koverse-squirrel utility to encode the password and store it in koverse-server.properties.

When Koverse runs, it uses the value in the *com.koverse.license.verification* property as a symmetric key to encode and decode the value of passwords. This is not intended to be a cryptographically secure solution, but simply to provide some level of obfuscation versus plaintext passwords.

To generate a new encoded password, run::

  sh /opt/koverse-server/bin/licensetool.sh -m encrypt

First enter the *com.koverse.license.verification* value from *koverse-server.properties* when prompted. Then you will be prompted to enter the password that you wish to encoded. Copy and paste the encoded password into the properties file, for example to change the value for *com.koverse.server.jdbc.password*
