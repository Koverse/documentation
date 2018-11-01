
.. _InstallGuide:

=============
Install Guide
=============

This section describes the prerequisites and process for installing Koverse software on your cluster.

Infrastructure Requirements
^^^^^^^^^^^^^^^^^^^^^^^^^^^
For a complete description of the infrastructure required for a Koverse install, please see the :ref:`InfraGuide`.

Operating System
----------------
Koverse requires a Linux operating system. Installation packages (RPMs) are provided for RedHat/CentOS distributions, but other distributions are also supported with .tar.gz packages.

Koverse requires all servers in a cluster to have clocks synchronized within a few seconds of each other, so it is recommended to use ntpd for this purpose.

Here are the recommended operating system for a Cloudera installation:

- RHEL 6.x or Centos 6.x
- Accumulo 1.6 Parcel and Service installed. See http://www.cloudera.com/documentation/other/accumulo/latest/PDF/Apache-Accumulo-Installation-Guide.pdf for more details.

Software
--------
As described in the :ref:`InfraGuide`, Koverse runs atop several distributed systems.
All of these dependent systems need to be properly installed and configured for Koverse to execute successfully.
The proper installation of Hadoop and associated software infrastructure is not within the scope of this document, nor is it a trivial undertaking.
If your organization does not have well established provisioning tools and/or experience installing Hadoop ecosystem software, we highly recommend tools like `Cloudera Manager`_ or `Apache Ambari`_ to help automate and manage the installation of the required software infrastructure.

.. _Cloudera Manager: https://cloudera.com/products/cloudera-manager.html
.. _Apache Ambari: http://hortonworks.com/hadoop/ambari/

Koverse is supported on the latest distributions from Cloudera, Hortonworks, and MapR.
Koverse also requires the Hadoop client binaries and configuration to be installed on the server.

The latest Koverse parcel can be found here:

- http://repo.koverse.com/latest/csd


Hardware
--------
Koverse runs on off-the-shelf commodity hardware.
The two Koverse software components, koverse-server and koverse-webapp, require minimum HW resources as shown below.
As the number of concurrent users of Koverse grows, these resource requirements would also increase.

+----------------+--------------------+--------------------+
| Process        | Minimum CPU(cores) | Minimum Memory(GB) |
+----------------+--------------------+--------------------+
| koverse-server | 2                  | 8                  |
+----------------+--------------------+--------------------+
| koverse-webapp | 1                  | 4                  |
+----------------+--------------------+--------------------+

Here are recommended hardware specifications for a decicated Koverse installation running the koverse-server and koverse-webapp:

- 31 GB memory
- 4 CPUs
- 40 GB disk space for /tmp
- 50 GB disk space for /var/log
- tmpwatch configured to clear /tmp every three days

The above specs are based on an AWS d3.xlarge instance.  The disk space for logging that goes in /var/log is for the rolling koverse-server and koverse-webapp logs, and can be tuned via the log4j configuration to use less than 50 GB.  However 50 GB is a safe starting point.  Also note Koverse uses /tmp for small temporary data for each job run on the cluster by Koverse - these are small artifacts, and certianly does not fill up 40 GB in three days even on a very busy cluster, however this is again a safe starting point to accomodate for other processes (with the Centos tmpwatch clearing it every three days).

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

  sudo useradd koverse

HDFS Configuration
------------------

The 'koverse' user added above needs to be in the HDFS Superuser Group.
This group is defined in the HDFS configuration property of *dfs.permissions.superusergroup*.
Additionally, the value of that property must be a UNIX group on the server where the HDFS Name Node resides.
For instance, if *dfs.permissions.superusergroup* was 'hadoop', ensure this group exists, and if not::

  sudo groupadd hadoop

And then add 'koverse' to this group::

  sudo usermod -a -G hadoop koverse

It is also currently required to have the 'accumulo' user in this same group, so also run::

  sudo usermod -a -G hadoop accumulo

Now we need to create a directory in HDFS for Koverse to use.
Assuming the typical 'hdfs' user exists for your Hadoop install, run::

 sudo -u hdfs hdfs dfs -mkdir /koverse
 sudo -u hdfs hdfs dfs -chown koverse:hadoop /koverse

.. _AccumuloInit:

Accumulo Initialization
-----------------------

Koverse will authenticate to Accumulo using its own username and password.
Initially Accumulo has a single user 'root' with a default password of 'secret'.
You may have changed the password for 'root' during your install of Accumulo.
To create a 'koverse' user in Accumulo, start the Accumulo shell::

  accumulo shell -u root

After entering the password for the 'root' user, create a 'koverse' user and password::

  root@accumulo> createuser koverse

Then grant the 'koverse' Accumulo user the required permissions to manage its tables::

 root@accumulo> grant -s System.CREATE_TABLE -u koverse
 root@accumulo> grant -s System.DROP_TABLE -u koverse
 root@accumulo> grant -s System.ALTER_TABLE -u koverse
 root@accumulo> grant -s System.SYSTEM -u koverse
 root@accumulo> grant -s System.ALTER_USER -u koverse

If using Kerberos with Accumulo you can do this via the following commands.
Creating a koverse user in the Accumulo shell is not required, but a Kerberos principal for Koverse should have been created.
To create this principal do::

 kadmin.local -q "addprinc -randkey koverse/my.hostname.com"
 kadmin.local -q "xst -k koverse.service.keytab koverse/my.hostname.com"

And ensure the koverse.service.keytab file is placed in /etc/security/keytabs owned by the koverse user with permissions r--------

Authenticate as the Kerberos principal that acts as Accumulo root::

 su accumulo
 kinit -kt /etc/security/keytabs/accumulo.headless.keytab accumulo-Hostname@MY.HOSTNAME.COM

Then grant permissions in the shell::

 accumulo shell

 accumulo-Hostname@MY.HOSTNAME.COM@accumulo> grant -s System.CREATE_TABLE -u koverse/my.hostname.com@MY.HOSTNAME.COM
 accumulo-Hostname@MY.HOSTNAME.COM@accumulo> grant -s System.DROP_TABLE -u koverse/my.hostname.com@MY.HOSTNAME.COM
 accumulo-Hostname@MY.HOSTNAME.COM@accumulo> grant -s System.ALTER_TABLE -u koverse/my.hostname.com@MY.HOSTNAME.COM
 accumulo-Hostname@MY.HOSTNAME.COM@accumulo> grant -s System.SYSTEM -u koverse/my.hostname.com@MY.HOSTNAME.COM
 accumulo-Hostname@MY.HOSTNAME.COM@accumulo> grant -s System.ALTER_USER -u koverse/my.hostname.com@MY.HOSTNAME.COM
 accumulo-Hostname@MY.HOSTNAME.COM@accumulo> grant -s System.OBTAIN_DELEGATION_TOKEN -u koverse/my.hostname.com@MY.HOSTNAME.COM

Note that an additional permission, System.OBTAIN_DELEGATION_TOKEN, is required.

Accumulo Configuration
----------------------

If SSL is enabled for Accumulo clients, ensure that the user Koverse runs as has the following settings in $HOME/.accumulo/config::

  instance.rpc.ssl.enabled	true

If a custom CA is used for Accumulo's server certificate, a copy of the trust store must be copied to a location the client can access and the following additional settings should be added::

  rpc.javax.net.ssl.trustStore	[Path to trust store JKS file]
  rpc.javax.net.ssl.trustStorePassword	[trust store password]

Koverse Server Install
----------------------

To install the Koverse Server from RPM, simply run::

  sudo yum localinstall koverse-server-<VERSION>.rpm

This will install into */opt/koverse-server/* as well as create a script at */etc/init.d/koverse-server* for starting and stopping the process.

Koverse Web App Install
-----------------------

To install the Koverse Web App from RPM, simply run::

  sudo yum localinstall koverse-webapp-<VERSION>.rpm

This will install into */opt/koverse-webapp/* as well as create a script at */etc/init.d/koverse-webapp* for starting and stopping the process.

.. _PostgreSQLSetup:

PostgreSQL Setup
----------------

Koverse stores metadata about Data Collections, Users, Transforms, etc in an RDBMS such as PostgreSQL.
These instructions assume PostgreSQL has already been installed.
In an environment where Cloudera Manager is used, Koverse can leverage the PostgreSQL database that is installed via Cloudera Manager.
If you wish to use a different password than the default 'koverse1234', you will need to follow the procedure in :ref:`AppendixA` for encoding this password before putting it into the *koverse-server.properties* file.

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

  sudo service koverse-server start

And for the Web App, run::

  sudo service koverse-webapp start

Once both processes have started up, you can access the Koverse user interface from a web browser at

``http://<hostname>:8080``

The default username and password are 'admin' and 'admin'.
The password can be changed immediately after logging in.
It is recommended that you also change the e-mail address of the admin user to a real e-mail address, so that in the event that the password is lost, you are able to reset the password.
It is also recommended to change the e-mail settings in koverse-server.properties to support automated password resets.

Logs
----
The Koverse Server redirects stdout and stderr to */opt/koverse-server/logs/server.err* but most application logging can be seen in */var/log/koverse-server/koverse-server.log*

The Koverse Web App logs to */var/log/koverse-webapp/koverse-webapp.log* with stdout and stderr redirected to the same directory.

More information on the operations of Koverse can be found in the :ref:`Ops Guide`

.. _ClouderaParcelInstallation:

Cloudera Manager Installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse provides a Cloudera Manager Parcel and Custom Service Descriptor (CSD) for easy installation and management through Cloudera Manager.

Prerequisites
-------------
- Cloudera Manager version 5.5 or greater
- CDH installed via Parcel, not Packages
- RHEL 6 is highly recommended.  The Accumulo Parcel installation is not officially supported on RHEL 7 by Cloudera.  If you require Cloudera on RHEL 7, please contact Koverse technical support for more information about the installation process.
- Accumulo 1.6 Parcel and Service installed. See http://www.cloudera.com/documentation/other/accumulo/latest/PDF/Apache-Accumulo-Installation-Guide.pdf for more details.

Files
-----
The following files are provided to support both online and offline installs.

KOVERSE-<VERSION>.jar
  CSD for Koverse
KOVERSE-<VERSION>-<ARCHITECTURE>.parcel
  Parcel file (download for offline install)
KOVERSE-<VERSION>-<ARCHITECTURE>.parcel.sha
  Parcel SHA file (download for offline install)




Once both processes have started up, you can access the Koverse user interface from a web browser at

``http://<hostname>:8080``

The default username and password are 'admin' and 'admin'. The password can be changed immediately after logging in.  It is recommended that you also change the e-mail address of the admin user to a real e-mail address,
so that in the event that the password is lost, you are able to reset the password.  It is also recommended to change the e-mail settings in koverse-server.properties to support automated password resets.

.. _AmbariStackInstallation:

Apache Ambari Installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Ambari control panel allows for custom services to be integrated into its management interface.  The method for this integration is known as a Stack, which contains all the information necessary for Ambari to configure, control and monitor the Service.  Koverse provides a Stack that Ambari users can use to easily install and manage Koverse.

Prerequisites
-------------
- Apache Ambari version 1.7 or greater
- Linux distribution that uses yum for software package management.  RHEL 6 is recommended.
- Accumulo Service Installed

Files
-----
The following files are provided.

koverse-server-<VERSION>.rpm
  RPM installation package for the Koverse Server

koverse-webapp-<VERSION>.rpm
  RPM installation package for the Koverse Web User Interface

koverse-ambari-stack-<VERSION>.tar.gz
  The Stack files for Koverse, note that the version of this may not match the RPM version

Stack Installation
--------------------
Install the koverse-server and koverse-webapp RPMs, see the RPM Installation section for more information::

  sudo yum localinstall koverse-server-<VERSION>.rpm
  sudo yum localinstall koverse-webapp-<VERSION>.rpm

Extract the koverse-ambari-stack-<VERSION>.tar.gz to the appropriate place on the file system::

  mkdir -p /var/lib/ambari-server/resources/stacks/HDP/2.4/services/KOVERSE
  tar xzf koverse-ambari-stack-<VERSION>.tar.gz  -C /var/lib/ambari-server/resources/stacks/HDP/2.4/services/KOVERSE
  chown -R root:root /var/lib/ambari-server/resources/stacks/HDP/2.4/services/KOVERSE

Restart Ambari Server to make the Koverse Service accessible

``service ambari-server restart``

The Koverse Service can now be added through the Ambari User interface.  During installation, the stack attempts to use default settings appropriate to most installations; however, they should be verified against your environment.  Of especial interest is the Advanced koverse-server.properties section.  You can find full details of these configuration options below.

Once both processes have started up, you can access the Koverse user interface from a web browser at

``http://<hostname>:7080``

The default username and password are 'admin' and 'admin'. The password can be changed immediately after logging in.


Koverse Configuration
^^^^^^^^^^^^^^^^^^^^^

Environment
-----------
The 'koverse' user needs to have the 'java' command in their path for the Koverse startup scripts to execute correctly.
This needs to be Oracle Java 1.7 or 1.8.

The environment variable *HADOOP_CONF_DIR* needs to be set for the 'koverse' user so Koverse can take advantage of the Hadoop client configuration.
The startup script */opt/koverse-server/bin/startup.sh* will default this environment variable to */etc/hadoop/conf* if it is not already set.

koverse-server.properties
-------------------------

Many of the available configuration properties for Koverse can be left to their default values.
Please see the :ref:`ConfigurationGuide` for the complete list of properties. */opt/koverse-server/conf/koverse-server.properties* is where required properties can be set or defaults overridden.
A few of these commonly set user properties are discussed below.

**com.koverse.server.jdbc.user**

**com.koverse.server.jdbc.password**

These two properties control how Koverse is authenticated to PostgreSQL and need to follow the username and password from :ref:`PostgreSQLSetup`.
The password value is encoded to avoid plaintext passwords, so again if the password chosen was different from the default of 'koverse1234', you will need to follow the process in :ref:`AppendixA` for generating the encoded value for this property.

**com.koverse.server.jdbc.url**

The value of this property needs to be updated to the correct hostname and port of your PostgreSQL install

**com.koverse.server.spark.mode**

If you are running Spark-on-YARN, the value of this property should be 'yarn'.
If you are running Spark standalone, set the value to 'master'.

**com.koverse.server.spark.dir**

This needs to be set to the directory where Spark is installed locally.
Koverse uses the 'spark-submit' script and therefore needs to know where it is located.

**dataStoreSetting.instanceName**

The Accumulo instance name can be seen when logging into the Accumulo shell.
For instance, the instance name seen below is 'accumulo'::

 -bash-4.1$ accumulo shell -u koverse
  Password: ******

  Shell - Apache Accumulo Interactive Shell
  -
  - version: 1.6.0
  - instance name: accumulo
  - instance id: 3056fcc7-edbd-463b-9bab-5def770d79e0
  -
  - type 'help' for a list of available commands
  -
  koverse@accumulo>

**dataStoreSetting.username**

This is the Accumulo user, likely 'koverse', that was created in :ref:`AccumuloInit`.
This is used in environments where Kerberos is not enabled.

**dataStoreSetting.password**

This is the password for the Accumulo user created in :ref:`AccumuloInit`
This is used in environments where Kerberos is not enabled.

**dataStoreSetting.zookeeperServers**

This is a comma-separated list of ZooKeeper servers in the form of <HOSTNAME>:<PORT>. The default ZooKeeper port is 2181.

**koverseBaseURL**

The URL that will be sent out in password reset e-mails, this should be the same URL that you are using to access the Koverse user interface, for example http://demo.koverse.com

**smtpServerHostName**

The e-mail server that the Koverse software will use to send e-mail, needs to be enabled for automated password resets to work.
Should be a hostname, for example: smtp.example.com

**smtpServerPort**

The network port that Koverse will use to send e-mail via SMTP, the default is 25.

**smtpUsername**

If authentication is required for Koverse to send e-mail, this should be set to the username to use when authenticating to the SMTP server.

**smtpPassword**

If authentication is required for Koverse to send e-mail, this should be set to the password to use when authenticating to the SMTP server.

**smtpFromEmailAddress**

When Koverse sends e-mails, it will use this setting to determine what address to use as a sending address.
For example, no-reply@example.com

**smtpConnectionType**

The type of network security to use when connecting to the SMTP server.
Can be one of plain,TLS or SSL.
TLS is strongly recommended unless it is not supported by your SMTP server.



koverse-webapp.properties
-------------------------

Please see the :ref:`ConfigurationGuide` for the complete list of properties that can be set for the Koverse Web App. */opt/koverse-webapp/conf/koverse-webapp.properties* is where required properties can be set or defaults overriden, for example to change the ports for the web server or to enable and configure HTTPS.


Kerberos Configuration
^^^^^^^^^^^^^^^^^^^^^^

To configure Koverse to authenticate with a cluster with Kerberos enabled follow these steps.

Create a principal for Koverse

  kadmin.local -q "addprinc -randkey koverse/your.koverseserver.com"

Create a keytab file in /etc/security/keytabs

  kadmin.local -q "xst -k koverse.service.keytab koverse/your.koverseserver.com"

Set the following properties in koverse-server.properties with the appropriate kerberos realm and keytab location::

  com.koverse.server.kerberos.user=koverse@MY.HOSTNAME.COM
  com.koverse.server.kerberos.keytab.path=/etc/security/keytabs/koverse.service.keytab
  com.koverse.server.kerberos.delay=3600


Koverse Aggregation Library Distribution
----------------------------------------

In order to utilize the aggregation functions of Koverse, the koverse-aggregation-<VERSION>.jar needs to be deployed to a location where Accumulo can load it.
The default location would be in $ACCUMULO_HOME/lib/ext on all Accumulo tablet servers.
This JAR file can be found on the Koverse Server in */opt/koverse-server/lib/koverse-aggregation-<VERSION>.jar*



.. _AppendixA:

Appendix A: Changing Encoded Passwords
--------------------------------------

If you are changing a password from its default you will need to run the koverse-squirrel utility to encode the password and store it in koverse-server.properties.

When Koverse runs, it uses the value in the *com.koverse.license.verification* property as a symmetric key to encode and decode the value of passwords.
This is not intended to be a cryptographically secure solution, but simply to provide some level of obfuscation versus plaintext passwords.

To generate a new encoded password, run::

  sh /opt/koverse-server/bin/licensetool.sh -m encrypt

First enter the *com.koverse.license.verification* value from *koverse-server.properties* when prompted.
Then you will be prompted to enter the password that you wish to encoded.
Copy and paste the encoded password into the properties file, for example to change the value for *com.koverse.server.jdbc.password*
