.. _Run book:

Run Book
=============

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

Additional logs may be found in */var/log/koverse-server/stderr* and */var/log/koverse-server/stdout*. These files are where the stderr and stdout of the Koverse Server process are redirected to and may contain messages, especially in the case of fatal startup issues. Additionally, the server.err file contains the output of any Spark drivers that run and may be useful in debugging issues with Spark Transforms.

Koverse Web App Logging
~~~~~~~~~~~~~~~~~~~~~~~

Logs for the Koverse Web App go to */var/log/koverse-webapp/koverse-webapp.log*.

By default, logging levels are set to "INFO".  If logging levels need to be changed,

#. SSH to the Koverse Web App host
#. vi */opt/koverse-webapp/conf/log4j.xml*
#. Change the Log4J configuration as needed.
#. Restart Koverse Web App (If you do not restart, the new log level property will not take effect.)


Apache Ambari
--------------

`Apache Ambari <https://ambari.apache.org/>`_ has many features that make it appealing for cluster management; platform independence, pluggable components, version management and upgrade, configuration management, metrics visualization and dashboarding, complete visibility to cluster health, extensibility, failure recovery and centralized security.

Ambari provides REST APIs that are easy to use. Ambari consist of an Ambari Server, Webpage and Agents. Agents help to provide the health status of services on the cluster. The Agents run on the nodes which take commands from the server, they also provide heartbeats to the server to let it know which nodes are available for tasks. The agents also collect metrics from the nodes like RAM and CPU usage which is presented in the web UI as graphs.

Prerequisites
^^^^^^^^^^^^^^

You can use Ambari whether a system is online or offline, you will only need the repositories for downloading all related RPMs. Repos include the Ambari Server, Agent and Monitoring Packages.

Repositories required

* HDP ( Hadoop packages including full stack for Hadoop Ecosystem )
* HDP_UTIL ( Utility packages for Ambari include HDP, monitoring, compression, rrd, etc )
* EPEL ( Extra Packages for Enterprise Linux )


Ambari Health Info
^^^^^^^^^^^^^^^^^^^

To monitor the cluster health you can view the service panel. The green light indicates that the service is up and running successfully.

.. image:: /_static/Runbook/image1.png

To view the cluster meterics go to the Dashboard view on the Ambari Webpage. There you can customize and view various useful information like HDFS Utilization, CPU/Network/Memory Usage and Cluster Load.

.. image:: /_static/Runbook/image4.png

For more on managing cluster health see `here <https://docs.cloudera.com/HDPDocuments/Ambari-2.7.5.0/managing-and-monitoring-ambari/content/amb_view_cluster_health.html>`_


Ambari Alerts
^^^^^^^^^^^^^^

Ambari uses the service indicators to convey the status of a service, when issues arise you can view detailed information on the Alerts page.

.. image:: /_static/Runbook/image3.png

A user can also set up email or slack alerting that is customizable.

.. image:: /_static/Runbook/image2.png


Backup and Recovery
^^^^^^^^^^^^^^^^^^^
Koverse relies on Accumulo for data storage, PostgreSQL for metadata storage, and a set of configuration files. A production backup strategy must incorporate all three. Here are some suggestions for each.

**PostgreSQL**

Use the `pg_dump <http://www.postgresql.org/docs/9.1/static/backup-dump.html>`_ command. To restore, simply re-create the postgres database from the backup.

**Accumulo**

Use the `Accumulo Export Tables <http://accumulo.apache.org/1.6/examples/export.html>`_ feature to backup the "kv_*" tables::

  root@test17 table1> clonetable table1 table1_exp
  root@test17 table1> offline table1_exp
  root@test17 table1> exporttable -t table1_exp /tmp/table1_export


Koverse Tables of Interest

* kv_index
* kv_record
* kv_samples
* kv_field_stats
* kv_schema


**Configuration Files**

Copy the entire koverse-server and koverse-webapp directories - specifically the /conf directory must be included.


**Add-ons**

Koverse Addons are located in HDFS in the /koverse/kv/addons directory. Use Hadoop's Distributed Copy (discp) to copy the addons to your selected backup storage account.



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

