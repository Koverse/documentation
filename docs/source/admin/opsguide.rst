.. _Ops Guide:

Operations Guide
============================

Koverse Operations
------------------

Starting and Stopping
^^^^^^^^^^^^^^^^^^^^^
As mentioned in the :ref:`InstallGuide`, the two Koverse software components can be stopped and started using the scripts installed into */etc/init.d* by the RPMs::

	service koverse-server stop|start|status
	service koverse-webapp stop|start|status

Both the koverse-server and koverse-webapp processes are configured to run as the 'koverse' user.

Logging
^^^^^^^

Koverse Server App Logging
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The main application logs for the koverse-server are in */var/log/koverse-server/koverse-server.log*.

By default, logging levels are set to "INFO".  If logging levels need to be changed,

#. SSH to the Koverse Server host
#. vi /opt/koverse-server/conf/log4j.xml
#. Change the Log4J configuration as needed.
#. Restart Koverse Server (If you do not restart, the new log level property will not take effect.)

Additional logs may be found in */opt/koverse-server/logs/server.err* and */opt/koverse-server/logs/server.out*. These files are where the stderr and stdout of the Koverse Server process are redirected to and may contain messages, especially in the case of fatal startup issues. Additionally, the server.err file contains the output of any Spark drivers that run and may be useful in debugging issues with Spark Transforms.

Koverse Web App Logging
~~~~~~~~~~~~~~~~~~~~~~~

Logs for the Koverse Web App go to */var/log/koverse-webapp/koverse-webapp.log*.

By default, logging levels are set to "INFO".  If logging levels need to be changed,

#. SSH to the Koverse Web App host
#. vi */opt/koverse-webapp/conf/log4j.xml*
#. Change the Log4J configuration as needed.
#. Restart Koverse Web App (If you do not restart, the new log level property will not take effect.)


Backup and Recovery
^^^^^^^^^^^^^^^^^^^
Koverse relies on Accumulo for data storage, PostgreSQL for metadata storage, and a set of configuration files. A production backup strategy must incorporate all three. Here are some suggestions for each.

**PostgreSQL**

Use the `pg_dump <http://www.postgresql.org/docs/9.1/static/backup-dump.html>`_ command. To restore, simply re-create the postgres database from the backup.

**Accumulo**

Use the `Accumulo Export Tables <http://accumulo.apache.org/1.6/examples/export.html>`_ feature to backup the "kv_*" tables.

**Configuration Files**

Copy the entire koverse-server directory - specifically the /conf directory must be included.

High Availability and Failover with Cloudera Integration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Running an application in a high-availability configuration where one instance is active and the other is a warm standby instance that can be activated in case the active instance fails or is in need of maintenance is a common method of decreasing downtime.  However, Cloudera Manager currently lacks the ability to mark a service instance as disabled (as of Cloudera 5.9).  This means that for an application to run in active-standby mode with Cloudera Manager integration, it must implement its own methods to start and stop services.  This section details how Koverse has implemented active-standby functionality with Cloudera Manager integration.

**Pre-Requisites**

* Koverse must be using a PostgreSQL database to store its metadata and both the active and standby node must have access to the PostgreSQL database.  The H2 backend database is accessed via the local filesystem and cannot be shared between nodes.
* If Kerberos is used in the environment, the same principal must be used by both active and standby instances.  The keytab must be present on both systems in identical locations on the filesystem.
* If TLS is used to secure Koverse, the certificates must be present on both active and standby nodes in the same location on the filesystem.
* If custom authentication libraries are installed, they must be present in the appropriate directories on both active and standby nodes.

**Installation**

The HA functionality may require a new version of the Koverse Cloudera Service Descriptor (CSD).  This CSD can be retrieved from http://repo.koverse.com/latest/csd.  The installation process is as follows:

* The KOVERSE-2.0-CS.jar file should be copied to the parcels directory on the Cloudera Manager host.
* Cloudera Manager should be restarted to activate the new CSD.
* Once the new CSD is activated, you can now assign roles to the standby instance that will take over in case the active instance fails.  It is recommended that all of the standby roles be on the same instance to simplify the failover dependencies.
* To assign these roles, navigate to the Koverse Service -> Instances screen in Cloudera Manager and click the “Add Role Instances” button:
.. image:: /_static/OpsGuide/image1.png
* You now will be presented with the option to select which hosts to assign the standby roles to.  It is recommended that all of the standby roles be on the same instance to simplify the failover dependencies.
.. image:: /_static/OpsGuide/image2.png
* Once roles are assigned, you will need to re-deploy client changes to the host and possibly restart the Koverse service.  Cloudera Manager should detect which changes need to be made and display the appropriate prompts.
.. image:: /_static/OpsGuide/image3.png
* After you proceed through the re-deployment process, the Koverse Standby processes will need to be started.  This does not make the standby instance take over for the active Koverse service, but will indicate if the standby instance is available to be activated.
.. image:: /_static/OpsGuide/image4.png
.. image:: /_static/OpsGuide/image5.png
* After the standby instances start, Koverse should now be running in a warm high-availability capacity and the standby instance can be manually activated as detailed below.

**Failover Procedure**

This procedure assumes that there is one Koverse node that is normally active and runs the Koverse Server and Koverse Web Server services.  It also assumes that there is a second node that runs the Koverse Server Standby and the Koverse Web Server Standby instances.
1. Ensure that the Koverse Server and Koverse Web Server are stopped.  To do this manually, navigate to the Koverse Service -> Instances and select both the Koverse Server and Koverse Web Server.  Then perform the Stop action.
.. image:: /_static/OpsGuide/image6.png
.. image:: /_static/OpsGuide/image7.png
2. Navigate back to Koverse Service -> Status and from the Actions drop down, select “Start Standby Server”
.. image:: /_static/OpsGuide/image8.png
3. From the Koverse Service -> Status screen, use the Actions drop down to select “Start Standby Web Server”
.. image:: /_static/OpsGuide/image9.png
4. The standby processes may take 5-10 minutes to start.  After they have finished starting, you should now be able to access the Koverse web application on the Standby Node.

**Failback Procedure**

Once the active node is available again, the following procedure can be followed to de-activate the standby instance and re-active the active instance.
1. Navigate to Koverse Service -> Status and use the Actions drop-down to select the “Stop Standby Web Server” command.
.. image:: /_static/OpsGuide/image10.png
2. From the Koverse Service -> Status screen, use the Actions drop-down to select the “Stop Standby Server” command.
.. image:: /_static/OpsGuide/image11.png
3. Navigate to the Koverse Service -> Instances screen and select the Koverse Server and Koverse Web Service instances.  Then use the Actions drop down to select “Start”
.. image:: /_static/OpsGuide/image12.png
4. It will take 5-10 minutes for the processes to restart on the Active node.  After this, the Koverse web interface will be available at the original URL again.

**Notes**
The way that monitoring is implemented in Cloudera Manager means that the red/green status indicators in Cloudera Manager are not entirely accurate for Koverse Standby instances.  In general, a green indicator for a Koverse Standby instance indicates that the instance is available to be activated, it does NOT indicate whether or not it is active.

High Availability and Failover with Cloudera Integration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Running an application in a high-availability configuration where one instance is active and the other is a warm standby instance that can be activated in case the active instance fails or is in need of maintenance is a common method of decreasing downtime.  However, Cloudera Manager currently lacks the ability to mark a service instance as disabled (as of Cloudera 5.9).  This means that for an application to run in active-standby mode with Cloudera Manager integration, it must implement its own methods to start and stop services.  This section details how Koverse has implemented active-standby functionality with Cloudera Manager integration.

**Pre-Requisites**

* Koverse must be using a PostgreSQL database to store its metadata and both the active and standby node must have access to the PostgreSQL database.  The H2 backend database is accessed via the local filesystem and cannot be shared between nodes.
* If Kerberos is used in the environment, the same principal must be used by both active and standby instances.  The keytab must be present on both systems in identical locations on the filesystem.
* If TLS is used to secure Koverse, the certificates must be present on both active and standby nodes in the same location on the filesystem.
* If custom authentication libraries are installed, they must be present in the appropriate directories on both active and standby nodes.

**Installation**

The HA functionality may require a new version of the Koverse Cloudera Service Descriptor (CSD).  This CSD can be retrieved from http://repo.koverse.com/latest/csd.  The installation process is as follows:

* The KOVERSE-2.0-CS.jar file should be copied to the parcels directory on the Cloudera Manager host.
* Cloudera Manager should be restarted to activate the new CSD.
* Once the new CSD is activated, you can now assign roles to the standby instance that will take over in case the active instance fails.  It is recommended that all of the standby roles be on the same instance to simplify the failover dependencies.
* To assign these roles, navigate to the Koverse Service -> Instances screen in Cloudera Manager and click the “Add Role Instances” button:
	.. image:: /_static/OpsGuide/image1.png
* You now will be presented with the option to select which hosts to assign the standby roles to.  It is recommended that all of the standby roles be on the same instance to simplify the failover dependencies.
	.. image:: /_static/OpsGuide/image2.png
* Once roles are assigned, you will need to re-deploy client changes to the host and possibly restart the Koverse service.  Cloudera Manager should detect which changes need to be made and display the appropriate prompts.
	.. image:: /_static/OpsGuide/image3.png
* After you proceed through the re-deployment process, the Koverse Standby processes will need to be started.  This does not make the standby instance take over for the active Koverse service, but will indicate if the standby instance is available to be activated.
	.. image:: /_static/OpsGuide/image4.png
	.. image:: /_static/OpsGuide/image5.png
* After the standby instances start, Koverse should now be running in a warm high-availability capacity and the standby instance can be manually activated as detailed below.

**Failover Procedure**

This procedure assumes that there is one Koverse node that is normally active and runs the Koverse Server and Koverse Web Server services.  It also assumes that there is a second node that runs the Koverse Server Standby and the Koverse Web Server Standby instances.

* Ensure that the Koverse Server and Koverse Web Server are stopped.  To do this manually, navigate to the Koverse Service -> Instances and select both the Koverse Server and Koverse Web Server.  Then perform the Stop action.
	.. image:: /_static/OpsGuide/image6.png
	.. image:: /_static/OpsGuide/image7.png
* Navigate back to Koverse Service -> Status and from the Actions drop down, select “Start Standby Server”
	.. image:: /_static/OpsGuide/image8.png
* From the Koverse Service -> Status screen, use the Actions drop down to select “Start Standby Web Server”
	.. image:: /_static/OpsGuide/image9.png
* The standby processes may take 5-10 minutes to start.  After they have finished starting, you should now be able to access the Koverse web application on the Standby Node.

**Failback Procedure**

Once the active node is available again, the following procedure can be followed to de-activate the standby instance and re-active the active instance.

* Navigate to Koverse Service -> Status and use the Actions drop-down to select the “Stop Standby Web Server” command.
	.. image:: /_static/OpsGuide/image10.png
* From the Koverse Service -> Status screen, use the Actions drop-down to select the “Stop Standby Server” command.
	.. image:: /_static/OpsGuide/image11.png
* Navigate to the Koverse Service -> Instances screen and select the Koverse Server and Koverse Web Service instances.  Then use the Actions drop down to select “Start”
	.. image:: /_static/OpsGuide/image12.png
* It will take 5-10 minutes for the processes to restart on the Active node.  After this, the Koverse web interface will be available at the original URL again.

**Notes**

The way that monitoring is implemented in Cloudera Manager means that the red/green status indicators in Cloudera Manager are not entirely accurate for Koverse Standby instances.  In general, a green indicator for a Koverse Standby instance indicates that the instance is available to be activated, it does NOT indicate whether or not it is active.


Distributed System Operations
-----------------------------

Koverse sits on top of a complex set of interworking and distributed services.
These include:

* Hadoop Distributed File System (HDFS)
* Hadoop YARN
* Spark
* ZooKeeper
* Accumulo
* PostgreSQL


Total System Startup
^^^^^^^^^^^^^^^^^^^^

There is an order to which the underlying systems should be brought online.
When systems do not depend on each other they can be started at the same time.

1. Data Storage and Coordination Layer - these can be started first after system boot.
	* HDFS DataNodes
	* HDFS NameNode
	* ZooKeeper
	* PostgreSQL

2. Data Services Layer - all of these depend on one or more processes in the Storage and Coordination Layer.
	* YARN ResourceManager
	* YARN NodeManagers
	* Accumulo Tablet Servers
	* Accumulo Master

3. Application Layer - all of these depend on one or more process in the Data Services Layer
	* Accumulo Monitor
	* Accumulo Garbage Collector
	* Koverse Server
	* Koverse Web App


Total System Shutdown
^^^^^^^^^^^^^^^^^^^^^
Processes should be stopped in reverse of the startup layer order.

1. Application Layer
	* Koverse Server
	* Koverse Web App
	* Accumulo Monitor
	* Accumulo Garbage Collector

2. Data Services Layer
	* YARN ResourceManager
	* YARN NodeManagers
	* Accumulo Tablet Servers
	* Accumulo Master

3. Data Storage and Coordination Layer
	* HDFS DataNodes
	* HDFS NameNode
	* ZooKeeper
	* PostgreSQL

If a process in say, the Data Storage and Coordination Layer, is stopped before all processes in the Data Services and Application Layers, system state may become unstable or corrupt.
All processes in one layer should be stopped before stopping any processes in the next layer.

Sometimes a single worker process in a lower layer can be stopped and restarted without stopping higher layers.
See "Fixing a simple, single-server failure".


System Recovery
^^^^^^^^^^^^^^^

Automatic Recovery Scenarios
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Hadoop, Accumulo, Kafka, and ZooKeeper are distributed systems designed to recover automatically from single-server failure, often without administrator intervention.
The following things can fail and the system should keep running indefinitely without admin intervention.

Single TableServer process - Accumulo Master will reassign its tablets to other servers and perform recovery of any data in memory.
Clients will automatically detect the failed tablet server and find the tablets of interest on newly assigned servers.

Single DataNode - the NameNode will redirect remaining data nodes to create new replicas of the blocks on the failed machine.
Clients will use replicas on remaining machines.

Single Zookeeper node - remaining Zookeeper nodes will handle load, optionally electing a new leader
Clients will find the new leader automatically.

Accumulo Monitor - the web UI will be unavailable but clients can continue to communicate with tablet servers to read and write data.

Accumulo GC - no garbage collection will be performed, but clients will continue to communicate with tablet servers.


Fixing a simple, single worker failure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Most of the time, if a worker process stopped for a non-permanent reason (e.g. not out of disk space) it can simply be started again.
In the case of permanent hardware failure, the server can simply be permanently left out of the cluster.
Remaining servers will take over the failed machines workload, as long as remaining resources allow.

A new process can be started on a new machine for processes that do coordination, such as the master, gc, monitor etc.

Single Zombie Processes
~~~~~~~~~~~~~~~~~~~~~~~

Sometimes a process is still running but not responding to requests.
Checking the logs of these processes can reveal problems such as running out of file handles to start new threads, or sockets to handle new requests.
Sometimes servers just have a high workload queued up (such as lots of compactions scheduled) and will become responsive again after working down the queue.
In some cases queued work, such as compactions, can be canceled and scheduled at a more opportune time.

If a server is inexplicably unresponsive despite still running, it can be stopped to cause its responsibilities to be taken over by another machine.
When stopping a zombie process, time should be provided after stopping the process before stopping any other processes or trying to restart the process, in to allow other processes to absorb the workload transferred and optionally perform recovery.


Recoverable Failures Requiring Intervention
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following scenarios will result in data being unavailable until an administrator can intervene:

* More than 2 DataNode process failures in a short time resulting in all replicas for a block to be missing.

* Accumulo TabletServer failure while no Master is running - some tablets will be unassigned.

* More than one Zookeeper server down - may result in a failure to form a quorum and accept writes.


When attempting to recover from a system failure involving more than one server, the following rules should be followed:

Lower layers should be online and healthy before attempting to fix higher layers.

Because system shutdown involves attempting to persist data to disk, starting some stopped processes is often required before shutdown can happen safely.
This will allow the system to become healthy before shutting down.

If Accumulo is still running but some tablets are offline and can't be brought online, it may be that not all data nodes are healthy.


Failures Resulting in Potential Data Loss, or other Unrecoverable States
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Loss of more than 2 hard drives at once - any data replicas living on those 3 or more hard drives will be lost.

While systems that depend on them are running:

* Unavailability of all Zookeepers at once
* Unavailability of all TabletServers at once
* Unavailability of the NameNode (Single point of failure if not using HA Namenode)
* Loss of the PostgreSQL DB (Single point of failure)


Cloudera Manager Default Ports
------------------------------

+--------------------+-------------------------------+
| Port(s)            | Service                       |
+--------------------+-------------------------------+
| 10010              | Accumulo Master               |
+--------------------+-------------------------------+
| 10011              | Accumulo Tablet Servers       |
+--------------------+-------------------------------+
| 8020, 8022, 50070  | HDFS                          |
+--------------------+-------------------------------+
| 7432               | Postgres DB                   |
+--------------------+-------------------------------+
| 8030-8033, 10020   | YARN                          |
+--------------------+-------------------------------+
| 2181               | Zookeeper                     |
+--------------------+-------------------------------+




Ambari Default Ports
--------------------

+-------------------------------+-------------------------------+
| Port                          | Service                       |
+-------------------------------+-------------------------------+
| 9999                          | Accumulo Master               |
+-------------------------------+-------------------------------+
| 50095, 4560                   | Accumulo Monitor, Log4j       |
+-------------------------------+-------------------------------+
| 9997                          | Accumulo Tablet Servers       |
+-------------------------------+-------------------------------+
| 50092                         | Accumulo GC                   |
+-------------------------------+-------------------------------+
| 12234                         | Accumulo Trace                |
+-------------------------------+-------------------------------+
| 8480-8481, 50475, 50070, 8020 | HDFS                          |
+-------------------------------+-------------------------------+
| 5432                          | Postgres DB                   |
+-------------------------------+-------------------------------+
| 8088                          | YARN                          |
+-------------------------------+-------------------------------+
| 2181                          | Zookeeper                     |
+-------------------------------+-------------------------------+
| 17010, 17000, 17030, 17020    | HBase                         |
+-------------------------------+-------------------------------+
| 13562                         | MapReduce                     |
+-------------------------------+-------------------------------+
| 10000-10002, 10500-1502       | Hive                          |
+-------------------------------+-------------------------------+
