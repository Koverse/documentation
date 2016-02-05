.. _Ops Guide:

:tocdepth: 2

Operations Guide
============================

Architecture
------------

Koverse sits on top of a complex set of interworking and distributed services.
These include:

* Hadoop Distributed File System (HDFS)
* Hadoop MapReduce
* Spark
* ZooKeeper
* Accumulo
* Kafka
* Postgres


Total System Startup
--------------------

There is an order to which the underlying systems should be brought online.
When systems do not depend on each other they can be started at the same time.

1. Data Storage and Coordination Layer - these can be started first after system boot.
	* HDFS Data nodes
	* HDFS Namenode
	* ZooKeeper
	* Postgres

2. Data Services Layer - all of these depend on one or more processes in the Storage and Coordination Layer.
	* Hadoop MapReduce JobTracker
	* Hadoop MapReduce TaskTrackers
	* Spark
	* Kafka
	* Accumulo Tablet Servers
	* Accumulo Master
	
3. Application Layer - all of these depend on one or more process in the Data Services Layer
	* Accumulo Monitor
	* Accumulo Garbage Collector
	* Koverse Server
	* Koverse Web App


Total System Shutdown
---------------------
Processes should be stopped in reverse of the startup layer order.

1. Application Layer
	* Koverse Server
	* Koverse Web App
	* Accumulo Monitor
	* Accumulo Garbage Collector

2. Data Services Layer
	* Hadoop MapReduce JobTracker
	* Hadoop MapReduce TaskTrackers
	* Spark Executors
	* Kafka
	* Accumulo Tablet Servers
	* Accumulo Master

3. Data Storage and Coordination Layer
	* HDFS Data nodes
	* HDFS Namenode
	* ZooKeeper
	* Postgres

If a process in say, the Data Storage and Coordination Layer, is stopped before all processes in the Data Services and Application Layers, system state may become unstable or corrupt.
All processes in one layer should be stopped before stopping any processes in the next layer.

Sometimes a single worker process in a lower layer can be stopped and restarted without stopping higher layers.
See "Fixing a simple, single-server failure".


System Recovery
---------------

Automatic Recovery Scenarios
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Hadoop, Accumulo, Kafka, and ZooKeeper are distributed systems designed to recover automatically from single-server failure, often without administrator intervention.
The following things can fail and the system should keep running indefinitely without admin intervention.

Single tablet server process - master will reassign its tablets to other servers and perform recovery of any data in memory.
Clients will automatically detect the failed tablet server and find the tablets of interest on newly assigned servers.

Single data node - the Namenode will redirect remaining data nodes to create new replicas of the blocks on the failed machine.
Clients will use replicas on remaining machines.

Single ZooKeeper node - remaining ZooKeeper nodes will handle load, optionally electing a new leader
Clients will find the new leader automatically.

Accumulo monitor - the web UI will be unavailable but clients can continue to communicate with tablet servers to read and write data.

Accumulo gc - no garbage collection will be performed, but clients will continue to communicate with tablet servers.

Loss of one rack of servers - as long as HDFS rack-awareness is enabled and the servers consist only of worker processes, tablet servers, data nodes, kafka brokers

Fixing a simple, single worker failure
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Most of the time, if a worker process stopped for a non-permanent reason (e.g. not out of disk space) it can simply be started again.
In the case of permanent hardware failure, the server can simply be permanently left out of the cluster.
Remaining servers will take over the failed machines workload, as long as remaining resources allow.

A new process can be started on a new machine for processes that do coordination, such as the master, gc, monitor etc.
 
Single Zombie Processes
^^^^^^^^^^^^^^^^^^^^^^^

Sometimes a process is still running but not responding to requests.
Checking the logs of these processes can reveal problems such as running out of file handles to start new threads, or sockets to handle new requests.
Sometimes servers just have a high workload queued up (such as lots of compactions scheduled) and will become responsive again after working down the queue.
In some cases queued work, such as compactions, can be canceled and scheduled at a more opportune time.

If a server is inexplicably unresponsive despite still running, it can be stopped to cause its responsibilities to be taken over by another machine.
When stopping a zombie process, time should be provided after stopping the process before stopping any other processes or trying to restart the process, in to allow other processes to absorb the workload transferred and optionally perform recovery.


Recoverable Failures Requiring Intervention
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following scenarios will result in data being unavailable until an administrator can intervene:

* More than 2 data node process failures in a short time resulting in all replicas for a block to be missing.

* Accumulo tablet server failure while no master is running - some tablets will be unassigned.

* More than one ZooKeeper server down - may result in a failure to form a quorum and accept writes.


When attempting to recover from a system failure involving more than one server, the following rules should be followed:

Lower layers should be online and healthy before attempting to fix higher layers.

Because system shutdown involves attempting to persist data to disk, starting some stopped processes is often required before shutdown can happen safely.
This will allow the system to become healthy before shutting down.

If Accumulo is still running but some tablets are offline and can't be brought online, it may be that not all data nodes are healthy.


Failures Resulting in Potential Data Loss, or other Unrecoverable States
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Loss of more than 2 hard drives at once - any data replicas living on those 3 or more hard drives will be lost.

While systems that depend on them are running:

* Unavailability of all ZooKeepers at once
* Unavailability of all tablet servers at once
* Unavailability of the Namenode (Single point of failure if not using HA Namenode)
* Loss of the Postgres DB (Single point of failure)

