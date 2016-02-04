.. _Admin Guide:

:tocdepth: 2

Koverse Administration Guide
============================

System Requirements and Dependencies
------------------------------------

Supported Platforms
^^^^^^^^^^^^^^^^^^^

* GNU/Linux is supported as a development and production platform.

Required Software
^^^^^^^^^^^^^^^^^^

* Jboss 7.1
* Hadoop 2.6
* Accumulo 1.6
* Zookeeper 3.4.5
* Java 1.7
* Kafka 0.8.0 (Scala 2.10)

JBoss
+++++
Version Supported: jboss-as-7.1.1.Final

It is likely that other Java servlet containers, such as Tomcat, will suffice - but they are not supported.

Hadoop
+++++++
Koverse supports Cloudera's release CDH5. 

    http://www.cloudera.com

Koverse also supports HortonWorks' HDP. 

    http://www.hortonworks.com

Koverse support MapR 1.3.0. 

    http://www.mapr.com

Apache Hadoop is also supported.

    http://hadoop.apache.com

Recommended Process Mapping
++++++++++++++++++++++++++++

Recommendations for Process Mapping on Production Cluster

Some general suggestions:

 * Keep YARN nodes and Koverse/Kafka nodes separate
 * Worker nodes can be multi-tasked, e.g. a YARN worker can also be a Zookeeper node.
 * On large clusters, use five node Zookeeper cluster, vice three.  Seems to handle the load beter.
 * Two (or more) node Kafka cluster, to allow replication/failover
 * Tablet server - can be on any data node, but exclude from jobtracker and accumulo master (due to load)
 * koverse-server can be memory-intensive, so make this a memory-heavy node
 * Kafka - can be disk storage/IO intensive, depending on message retention settings, so make this a disk-heavy node

Here is a example suggested production cluster to service mapping:

* Koverse Node (1)

  * jboss - with koverse-webapp deployed
  * koverse-server
  * (optional) apache httpd or other reverse proxy
  * postgresql

* Kafka brokers (2+) (Note: If Kafka is used only for File Upload and not streaming imports, Kafka services could be run on shared nodes)

  * kafka-broker

* Accumulo Master (1)

  * accumulo-gc (garbage collector)
  * accumolo-master
  * accumulo-monitor
  * accumulo-tracer
  * hadoop-hdfs-secondarynamenode

* Hadoop/Spark Master (1)

  * hadoop-yarn-resourcemanager
  * hadoop-hdfs-namenode
  * spark-master

* Worker Nodes

  * accumulo-tablet-server
  * hadoop-hdfs-datanode
  * hadoop-yarn-nodemanager
  * spark-worker

* Zookeeper Nodes (3 or 5) (Note: On heavily loaded clusters, Zookeeper should be run on dedicated servers to reduce resource contention. If this is not possible, it should be given a dedicated disk on a shared server)
  
  * zookeeper-server

Accumulo
++++++++

Accumulo 1.6 or later is supported.

    http://accumulo.apache.org

Zookeeper
+++++++++
Zookeeper 3.4.5 is recommended - and is included in Cloudera's CDH5. 

    http://zookeeper.apache.org

System Requirements
^^^^^^^^^^^^^^^^^^^^
Koverse can be installed on much smaller systems, particularly during, prototype, development and test and in normal operation will only take up a few Gigabytes of disk space. Koverse can be installed in a virtualized environment, but its recommended that Koverse be given high priority CPU and RAM access, for maximum processing efficiency.

Recommended Network Specifications
Nodes in the Hadoop and Koverse cluster should be in a single IP subnet, with line-rate switched direct access ports. Racks of nodes should be connected via a switched 10GB connection.

Dev:
* 4 core processor
* 8+ GB RAM

Small:
* Two Quad-core 2.15Ghz CPUs
* 16 GB of RAM
* Gigabit Ethernet
* 2 to 8 Terabytes of non-RAID data storage
* 1 disk for OS

Logical Architecture
^^^^^^^^^^^^^^^^^^^^^

Koverse runs on top of Accumulo and Hadoop, and requires a Postgres or H2 database for administrative state storage. Koverse connects to outside services, like FTP, Email, Websites, and Databases. Koverse also writes to similiar outside services. Koverse should be installed inside a typical network firewall.

More than one instance of Koverse can be used on a single Accumulo/Hadoop cluster. The "instancePrefix" setting in the <KOVERSE_HOME>/conf/settings.xml defines the unique instance name of the koverse server. Never change this setting after the koverse-server's first boot.


Installation and Configuration
------------------------------

**Linux Configuration**

Koverse is typically deployed on RedHat EL or Centos based systems, but Debian-based and other Linux distributions should work as well.

A 'koverse' user should be created for running the Koverse server. For example::

 sudo useradd koverse

This user should also be added to the HDFS supergroup::

 sudo usermod -a -G hadoop koverse


Before installing Koverse, its important to have a properly configured installation of Hadoop, Accumulo, Zookeeper, and Kafka to ensure proper operation. Please use the following URLs for more information about those packages.

    http://hadoop.apache.org

    http://accumulo.apache.org

    http://zookeeper.apache.org

    http://kafka.apache.org

|

**Hadoop cluster information**


You must know the Namenode and Jobtracker hostname and port. The Namenode and Jobtracker must report no errors.

Create a directory for Koverse that the koverse user can write to::

 sudo -u hdfs hdfs dfs -mkdir /koverse
 sudo -u hdfs hdfs dfs -chown koverse:hadoop /koverse

|

**Zookeeper Servers**

You must know the hostnames and server ports for the zookeeper servers. Zookeepers must all report "iamok" status, and be in a writeable state.


**Accumulo location and credentials**

A user account should be created in Accumulo for the Koverse application. The Koverse server will control access of individual users to its tables.

This user can be created in the accumulo shell via:

 root@accumulo> createuser koverse
 Enter new password for 'koverse': *****
 Please confirm new password for 'koverse': *****

Make a note of the username and password that Koverse will use to connect to Accumulo.

Next the koverse account will need the following permissions:

 root@accumulo> grant -s System.CREATE_TABLE -u koverse
 root@accumulo> grant -s System.DROP_TABLE - koverse
 root@accumulo> grant -s System.ALTER_TABLE -u koverse
 root@accumulo> grant -s System.SYSTEM -u koverse

This will allow the koverse account to manage a set of tables.


**Accumulo Iterators**

In order to utilize the :ref:`aggregation <AggregationIntro>` functions of Koverse, the koverse-aggreation-x.x.x.jar needs to be deployed to a location where Accumulo can load it. The default location would be in $ACCUMULO_HOME/lib/ext on all Accumulo tablet servers.

|

**Installing the Koverse Server**

Koverse server is distributed in following formats:

    * GZipped Tar (.tar.gz) 
    * Zip File (.zip)
    * RPM (.rpm). 

    **To install the GZipped Tar and/or Zip file**

    * Copy the koverse-server archive into a directory on the target server. Unzip or untar the file into a directory on the server that will host the koverse-server service. 

        Tar File Example: **tar -zxvpf koverse-server-x.x.x.tar.gz**

        Zip File Example: **unzip koverse-server-x.x.x.zip**

    * Copy the "init.d" script for your platform from <KOVERSE_HOME>/scripts/... to the /etc/init.d/ directory. 

        Example: **cp <KOVERSE_HOME>/scripts/centos-init.d/koverse-server**

    * Add the service to the startup services. 

        Example: **chkconfig koverse-server on**

|

**Installing the Koverse Webapp**

The Koverse webapp is a simple WAR file that is installed into a J2EE container. This example shows installing the Koverse webapp into a JBoss 7 installation.

    Example: **unzip koverse-webapp-x.x.x.war -d <JBOSS_HOME>/standalone/deployments/**

|

**Koverse Server Configuration Files**

The Koverse Server's configuration files are available for editing in the <KOVERSE_HOME>/conf directory. Properties of interest include the JDBC connection string to the management database - which is an H2 file in <KOVERSE_HOME>/data directory. 

**Koverse Webapp**

Koverse webapp's configuration files are available in the <JBOSS_HOME>/standalone/deployments/koverse-webapp-x.x.x.war/WEB-INF/conf directory. Properties of interest include the hostname and ports of the koverse-server. The default is localhost, assuming the koverse-server and koverse-webapp are running on the same host.

Postgres Configuration
^^^^^^^^^^^^^^^^^^^^^^ 

.. note::  If you create the koverse user with a password other then "password" you will need to execute the "Encrypting the Koverse Password" step.

**CDH Environment**

1. To get the current password run::

        cat /var/lib/cloudera-scm-server-db/data/generated-password.txt

2. Then log into postgres as cloudera-scm::

        psql -U cloudera-scm -h localhost -p 7432 -d postgres

3. To create the koverse user and use 'password' as the password::

        postgres=# CREATE ROLE koverse LOGIN PASSWORD ‘password';

4. To create koverse database::

        postgres=# CREATE DATABASE koverse OWNER koverse ENCODING ‘UTF-8';


**Manual Installed Postgres instance**

1. Change user to postgres::

	su -u postgres

2. Create a new database (schema)::

	createdb koverse

3. Connect to the new database::

	psql -s koverse

4. Create a new user::

	create user koverse password 'password';

5. Give the new user permissions to modifiy the new database (schema)::

	GRANT ALL PRIVILEGES ON DATABASE koverse TO koverse;

6. update pg_hba.conf to set all connections METHOD to trust e.g.::

	local  all  all  trust



Encrypting the Koverse Password
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you are changing the password from the default password you will need to run the koverse-squirrel utility to encrypt the password and store it in koverse-server.properties.

When Koverse runs, it uses the value in the com.koverse.license.verification property of the Koverse-Server and Koverse-Webapp property files as a symmetric key to encrypt decrypt the value of passwords (also located in those property files).

Go to your installation of Koverse server.  In that directory, under the bin folder, there will be a command named**licensetool.sh**.  Note that the passwords from this tool are used in both the Koverse Server and the Koverse Web-app.  However, the licensetool.sh command in only found in the installation of Koverse server.

**Step 1:**

For the passwords used in Koverse Server, go to the conf directory of the Koverse Server installation (or fix the puppet files to do the same thing automatically).  

View the file koverse-server.properties and copy the value of the field 'com.koverse.license.verification'. By default that value is **'5631524b62324648536e526152336856566a46564f513d3d'** but someone may have changed it.  So, be sure to check.

To change the passwords using in the Koverse Webapp:

Navigate to the koverse.war/WEB-INF/conf directory in the file system, located in JBoss's deployment directory (e.g. the standalone/deployments folder). 

The koverse-webapp.properties file you will also find the com.koverse.license.verification field, which you can use just like the above directions for Koverse server.  
The only difference being is that instead of changing the JDBC password for the server, you can change the thrift client password for the web app, whose value is located in the field 'com.server.webapp.thrift.client.password'.

**Step 2:**

Execute the Koverse License tool by changing to the Koverse server's bin directory and executing::

    sh licensetool.sh

That will give you some quick feedback on how to use the program.  The program has two modes of operation: create and encrypt.
The create mode is used to determine the value of the 'com.koverse.license.verification' property. That is likely already done, so be cautious changing it.

To execute it, run::

    sh licensetool.sh -m create

The mode you'll actually need to run is encrypt.  To run that, execute::

    sh licensetool.sh -m encrypt

The license tool will then ask you for the value of the com.koverse.license.verification I had you copy in the previous step.  Paste it in (since it's so long and you're likely to mistype it).

Then, it will ask you for the password to encrypt, (e.g. the JDBC password or the Thrift client password).  Enter the plaintext password.  After that, it will work for a couple seconds and spit out the encrypted password (e.g. JewCeP3V+j5+KJulMqATQA==).  Copy that password.

**Step 3:**

Go back to the koverse-server.properties (or koverse-webapp.properties) file on your server (or in the puppet files) and replace the encrypted password already filled into the 'com.koverse.server.jdbc.password property' (or any other password, whether in the server or the webapp) property with the one you just created.



Recommended changes to standard configurations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**MapReduce**

It is recommended that the "mapred-site.xml" have the following property and value added to enable an appropriate memory allocation for the task tracker processes.

	mapred.java.child.opts        4096M

**ZooKeeper Changes**

It is recommended that the "zoo.conf" configuration file's "maxClientCnxns" property be changed to 200 - to accommodate the number of connections that are normal for a production Accumulo and Kafka installation.

	maxClientCnxns=200


Secure Configuration
^^^^^^^^^^^^^^^^^^^^^
Access to /koverse and /accumulo directories in HDFS should be restricted to the Accumulo, Koverse Server, and Koverse WebApp processes.

Access to the Hadoop JobTracker should be restricted to administrators.

Starting Koverse Services
------------------------------

Koverse has two components, the Koverse Server and the Koverse Webapp.

To start the Koverse Server - use the <KOVERSE_HOME>/bin/startup.sh. Or if installed via an RPM, use the "/etc/init.d/koverse-server start" command.

When the Koverse Server startups correctly you should see this message::

    "Koverse Server was started successfully! All services are ready and listening on ports."

To start the Koverse Webapp, start the J2EE container that contains the koverse-webapp...war file. For example::

     if using JBoss, use the "/etc/init.d/jboss start" command. Or start jboss via the <JBOSS_HOME>bin/startup.sh script. 

**Koverse Default Administrator User**

Koverse's default username and password are both 'admin'. You should change this on first access.

**Koverse Hostname/Port**

Koverse's Web UI is available via the hostname and port of the J2EE container - usually JBoss. Refer to the JBoss setup instructions.

``http://<hostname>:8080/Koverse``


Configuring Koverse's Data Store
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Before Koverse can be used, the data store and related settings must be configured.

#. Access the Koverse Apps dashboard in the Koverse Web UI at ``http://<koversehost>:<port>/Koverse/apps``

#. Click the "System Administration" App.

#. Click the "System" link.

#. Enter the required information.

#. Click Save.

Note: If the dialog does not close in a few seconds, check the koverse-server logs - usually at /var/log/koverse-server because there is probably a problem with the configuration.


Stopping Koverse Services
------------------------------

Koverse has two components - Koverse Server and Koverse Webapp - that are stopped independently.

To stop the Koverse Server - use the <KOVERSE_HOME>/bin/shutdown.sh. Or if installed via an RPM, use the "/etc/init.d/koverse-server stop" command.

To stop the Koverse Webapp, stop the J2EE container that contains the koverse-webapp...war or remove the koverse-webapp...war from the J2EE container. For example, if using JBoss, use the "/etc/init.d/jboss stop" command. Or stop jboss via the <JBOSS_HOME/bin/shutdown.sh script.

Monitoring
-----------
For monitoring of the Koverse platform, please see the :ref:`SystemMonitoringApp` instructions.


.. _Logging:

Logging
--------

Logging for Koverse Web Apps
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In a standard installation, the logs for Koverse Web Apps, which run in JBoss, can be found in */opt/jboss/standalone/log/*.


By default, logging levels are set to "INFO".  If logging levels need to be changed,

	#. SSH to the jboss server(s)
	#. vi /opt/jboss/standalone/deployments/Koverse.war/WEB-INF/classes/log4j.xml
	#. Change the logging level. Below are examples of the 3 suggested log levels.
	#. Restart JBoss Service (If you do not restart JBoss the new log level properties will not take effect.)

Logging levels may be set to one of the following:

DEFAULT:
::

	<root>
		<priority value="INFO"/>
		<appender-ref ref="KoverseFile"/>
		<appender-ref ref="KoverseConsole"/>
	</root>


WARN:
::

	<root>
		<priority value="WARN"/>
		<appender-ref ref="KoverseFile"/>
		<appender-ref ref="KoverseConsole"/>
	</root>

DEBUG:
::

	<root>
		<priority value="DEBUG"/>
		<appender-ref ref="KoverseFile"/>
		<appender-ref ref="KoverseConsole"/>
	</root>


Logging for the Koverse Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In a standard installation, the logs for the Koverse Server can be found in */var/log/koverse-server/*.


By default, logging levels are set to "INFO".  If logging levels need to be changed,

	#. SSH to the Koverse Server host
	#. vi /opt/koverse-server/conf/log4j.xml
	#. Change the logging level. Below are examples of the 3 suggested log levels.
	#. Restart Koverse Server (If you do not restart, the new log level property will not take effect.)

Logging levels may be set to one of the following:

DEFAULT:
::

    <root>
        <priority value="INFO"/>
        <appender-ref ref="KoverseFile"/>
    </root>


WARN:
::

    <root>
        <priority value="WARN"/>
        <appender-ref ref="KoverseFile"/>
    </root>

DEBUG:
::

    <root>
        <priority value="DEBUG"/>
        <appender-ref ref="KoverseFile"/>
    </root>



Backup and Recovery
------------------------------

Koverse relies on Hadoop Data File System (HDFS) for data storage, a relational database (either H2 or Postgres), and a set of configuration files. A production backup strategy must incorporate all three. Here are some suggestions for each.

**Relational database**

Use the tools that ship with the RDBMs. For postgres, use the `pg_dump <http://www.postgresql.org/docs/9.1/static/backup-dump.html>`_ command. To restore, simply re-create the postgres database from the backup.

**Accumulo**

Use the `Accumulo Export Tables <http://accumulo.apache.org/1.5/examples/export.html>`_ feature to backup the "kv_*" tables.

**Configuration Files**

Copy the entire koverse-server directory - specifically the /conf directory must be included.


.. _AutomaticSupportReports:

Automatic Support Reporting
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse Server has an automatic support reporting feature. This feature sends a status report to the Koverse Support Team every hour. This report can be disabled by uncommenting the documented line in /conf/settings.xml. These reports enable Kovers Support
to provide better guidance for support issues.

The report includes:

#. The basic data store and jobtracker information seen in the System Monitor app.

#. The Nodes information seen in the System Monitor app.

#. The version, revision, and build date, seen in the system information details - click on the Koverse logo in the UI.

#. The IP address, date, and time from which the report was sent.


The report does not include:

#. The configuration or contents of any data collections, sources, transforms, and sinks.

#. User or groups information.

#. System level settings or environment configurations.

#. Audit logs, system level logs, or job details.

.. _ConfiguringSparkOnYarn:

Configuring Spark to use YARN
-----------------------------

The Koverse server can be configured to launch Spark Transform jobs using YARN.  By default, Koverse is configured to use the built in Spark cluster manager.  

To change to using YARN, there are prerequisites that must be completed on the machine that the Koverse server process will execute on.  They are:

#. Hadoop must be installed and configured.
#. Spark must be installed and configured.

Both Hadoop and Spark must be installed and configured for the Koverse server to use YARN to execute spark jobs.  The general rule is that if you can't execute a Spark job on the command line
of the same machine that the Koverse server is installed due to an improper configuration of Hadoop or Spark, the Koverse server won't be able to do it either.

After configuring Hadoop and Spark, the following properties in the koverse-server.properties file must be examined and changed if necessary:

#. com.koverse.server.hadoop.conf.dir, which has the default value of "/etc/hadoop/conf" already set.
#. com.koverse.server.spark.dir, which has the default value of "/opt/spark" already set.

The final property in koverse-server.propeties file to set is "com.koverse.server.spark.mode" to "yarn" (instead of "master").

.. _Troubleshooting:

Troubleshooting
----------------

If ever you need assistance please submit questions to support@koverse.com. Please attach logs and steps to reproduce the general issue you are encountering.

Below are some troubleshooting tips to address specific issues,however, most of this section contains fairly advanced operations, so please do not hesitate to reach out to Koverse support.

Checking the Logs
^^^^^^^^^^^^^^^^^
In order to debug issues, it is often helpful to look in the logs of the Koverse Thrift Server, and/or JBoss logs. See the :ref:`Logging` section for instructions on how to do so.

.. _CheckingJBoss:

Checking JBoss
^^^^^^^^^^^^^^^
On the JBoss server(s) in your Koverse cluster, the */etc/init.d/jboss* script can be used to start, stop, and check the status of JBoss.

.. _CheckingServer:

Checking the Koverse Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^
On the Koverse Server node in your Koverse cluster, the */etc/init.d/koverse-server* script can be used to start, stop, and check the status of the Koverse Server.

If you see evidence that applications are having problems connecting to the Koverse Server,

#. Check that Koverse Server is running and start it using the above script if it is not running.

#. Check the Server logs (see :ref:`Logging` for how to do so).  If there are obvious problems being reported in the logs, try restarting the Server, or contact support@koverse.com.

#. If the Server appears to be running fine, check to make sure that the Thrift ports are open:

 	#. On the box that hosts Koverse Server, perform the command 'telnet localhost 12320'.

		* If your connection is refused, the Thrift ports are not open. This generally means the system manager failed to start. Try restarting the Koverse Server.

.. _CheckingMapReduce:

Checking Hadoop MapReduce Jobs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To obtain detailed information about Hadoop MapReduce jobs, use the Hadoop jobtracker page. 

This can be found at ``http://<yourjobtrackerhost>:50030/jobtracker.jsp``


.. _CheckingJobtracker:

Checking Hadoop Jobtracker
^^^^^^^^^^^^^^^^^^^^^^^^^^^
In a CDH4 installation of Hadoop, one can start, stop, or check the status of the Jobtracker process from the command line using the script found in */etc/init.d/hadoop-0.20-mapreduce-jobtracker*.  Other Hadoop installations have a similar executable.

.. _CheckingTasktracker:

Checking Hadoop Tasktracker
^^^^^^^^^^^^^^^^^^^^^^^^^^^
Status of the Hadoop Tasktracker can typically be found at ``http://<yourtasktrackerhost>:50060/tasktracker.jsp`` In a CDH4 installation of Hadoop, one can start, stop, or check the status of the Tasktracker process from the command line of the individual Tasktracker servers using the script found in */etc/init.d/hadoop-0.20-mapreduce-tasktracker*.  Other Hadoop installations have a similar executable.


.. _CheckingNamenode:

Checking the Hadoop Name Node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Status of the Hadoop Namenode can typically be found at ``http://<yournamenodehost>:50070/dfshealth.jsp`` In a CDH4 installation of Hadoop, one can perform operations such as start, stop, etc. on the Namenode process from the command line using the script found in */etc/init.d/hadoop-hdfs-namenode*.  Other Hadoop installations have a similar executable.

.. _CheckingAccumulo:

Checking Accumulo
^^^^^^^^^^^^^^^^^^
Status of the Accumulo Master and Tablet Servers can typically be found at ``http://<yourmasterhost>:50095/``  In a CDH4 installation of Hadoop, one can start, stop, or check the status of the Accumulo Master and Table Server processes from the command line using the scripts found in */etc/init.d/accumulo-master* and */etc/init.d/accumulo-tablest-server*, repectively.  Other Hadoop installations have similar executables.

.. _CheckingZookeeper:

Checking Zookeeper
^^^^^^^^^^^^^^^^^^
In a CDH4 installation of Hadoop, one can start, stop, or check the status of individual Zookeeper nodes from the command line using the script found in */etc/init.d/zookeeper-server*.  Other Hadoop installations have a similar executable.

Failing Transforms
^^^^^^^^^^^^^^^^^^

When you experience problems running transforms do the following:

 * Look at your Job Tracker ``http://<yourjobtrackerhost>:50030/``
 * Go to the Hadoop Job for the Transform that failed, and identify any failed map or reduce tasks.
 * Click on those failed tasks, there should be options to examine their individual runtime logs. Each log should be very short and contain a full exception stack trace.

Submit a support ticket with attached log if you need assistance from the support team.

.. _SafeMode:

Hadoop Safe Mode
^^^^^^^^^^^^^^^^^

If you ever run low on disk space Hadoop will automatically enter Safemode. In order to leave safe mode:

#. *hadoop dfsadmin -safemode leave*

#. Restart all services.


Persistent Login Screen
^^^^^^^^^^^^^^^^^^^^^^^

If users are unable to get past the login screen and there is not a warning that username/password are incorrect, this is an indication that the Koverse Web UI is not able to reach the Koverse Server.  In this case, please follow the troubleshooting steps in :ref:`CheckingServer` to try to resolve the problem.

Waiting for Changelock
^^^^^^^^^^^^^^^^^^^^^^

If the koverse-server shows a "Waiting for Changelog lock"... message on startup, the previous run of liquibase was killed during execution and left a DATABSECHANGELOGLOCK table that is keeping liquibase from executing.

To remove the DBCHANGELOGLOCK table, which will allow liquibase to run, do the following

1) cd <KOVERSE_SERVER_HOME>
2) java -cp lib/h2*.jar org.h2.tools.Shell
3) jdbc:h2:/tmp/koverse
4) DROP TABLE DATABSECHANGELOGLOCK;
5) exit
6) /etc/init.d/koverse-server start

High Availability Namenode and Jobtracker
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse can be configured to utilize high availability Namenodes and Jobtrackers by providing a ``settings.xml`` file that provides the appropriate Hadoop configuration values. The following sample values outline the configuration parameters used when running an HA namenode with two namenodes as well as an HA jobtracker with two job trackers:

.. code:: xml

    <!-- HA namenode properties -->
    <entry key="hadoopJobSetting.fs.defaultFS">
		hdfs://nameservice
	</entry>
    <entry key="hadoopJobSetting.dfs.nameservices">
		myNameservice
	</entry>
    <entry key="hadoopJobSetting.dfs.ha.namenodes.myNameservice">
		namenodeA,namenodeB
	</entry>
    <entry key="hadoopJobSetting.dfs.namenode.rpc-address.myNameservice.namenodeA">
		namenodeA.address:port
	</entry>
    <entry key="hadoopJobSetting.dfs.namenode.rpc-address.myNameservice.namenodeB">
		namenodeB.address:port
	</entry>
    <entry key="hadoopJobSetting.dfs.client.failover.proxy.provider.myNameservice">
		org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider
	</entry>

    <!-- HA jobtracker properties -->
    <entry key="hadoopJobSetting.mapred.job.tracker">
		myJobtracker
	</entry>
    <entry key="hadoopJobSetting.mapred.jobtrackers.myJobtracker">
		jobtracker1,jobtracker2
	</entry>
    <entry key="hadoopJobSetting.mapred.jobtracker.rpc-address.myJobtracker.jobtracker1">
		jobtracker1.address:rpc-port
	</entry>
    <entry key="hadoopJobSetting.mapred.ha.jobtracker.rpc-address.myJobtracker.jobtracker1">
		jobtracker1.address:ha-rpc-port
	</entry>
    <entry key="hadoopJobSetting.mapred.jobtracker.rpc-address.myJobtracker.jobtracker2">
		jobtracker2.address:rpc-port
	</entry>
    <entry key="hadoopJobSetting.mapred.ha.jobtracker.rpc-address.myJobtracker.jobtracker2">
		jobtracker2.address:ha-rpc-port
	</entry>
    <entry key="hadoopJobSetting.mapred.client.failover.proxy.provider.<%= jobtracker %>">
		org.apache.hadoop.mapred.ConfiguredFailoverProxyProvider
	</entry>

Restricting users from using Koverse
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse has the ability to be configured so that users' groups' may or may not be given access to use Koverse. This mode of operation is disabled by default.
If enabled, then only users who are member of groups with the "useKoverse" permission will be able to use Koverse.  Note that the users' groups' may be external, meaning that external systems are configured to allow access to Koverse.

Since this mode of operation is disabled by default, to enable it, configure koverse-server.properties so that the configuration:

com.koverse.server.auth.useKoversePermission.required=false

is set to true.

Note that by default the built in admin user has this permission, so logging in as admin should always work (unless the account is modified to remove it).
However, if existing users are not members of groups that have this permission, making this change will lock them out.

Users who attempt to access Koverse but do not have the permission to do so are redirected to a static HTML page notifying them that they are forbidden from using Koverse.

Care should be taken with this configuration to ensure that external users and groups already contain the "useKoverse" permission, as appropriate for your requirements. This is typically done by adding in JSON files in to the server's conf/load-once directory, which specify such groups and their permissions.

Database cleanup
^^^^^^^^^^^^^^^^^

The Koverse configuration database can grow large with jobs running continuously and it is suggested that the jobs table are purged using a setting in koverse-server.properties:

com.koverse.server.purgeJobsDate=30d

By default this is set to 30 days and will delete statuses and history of jobs older than 30 days. The setting uses the format d(days), h(hours), and m(minutes) i.e. 1d, 1h, 1m. The purge job service runs every 10 minutes and will look for jobs to cleanup older than the duration entered. 




