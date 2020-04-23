
.. _InfraGuide:

====================
Infrastructure Guide
====================

Software Infrastructure
-----------------------

A Koverse cluster relies on the following software infrastructure

+------------------+------------------+
| Software         | Required Version |
+------------------+------------------+
| Hadoop - HDFS    | 3.1.1            |
+------------------+------------------+
| Hadoop - YARN    | 3.1.1            |
+------------------+------------------+
| Hadoop - MR2     | 3.1.1            |
+------------------+------------------+
| Spark2           | 2.3.2            |
+------------------+------------------+
| ZooKeeper        | 3.4              |
+------------------+------------------+
| Accumulo         | 1.7              |
+------------------+------------------+
| PostgreSQL       | 8.x or 9.x       |
+------------------+------------------+
| Oracle Java      | 1.8 or 1.9       |
+------------------+------------------+


Koverse leverages Hadoop MapReduce2 and Spark2 for data processing and analytics, but these components run as applications on YARN, so besides some very lightweight Job History servers, they don't require any running infrastructure besides YARN.

Additionally the Koverse software runs as

* a server java process (koverse-server)
* a web application process using embedded Jetty (koverse-webapp)

Much of the required infrastructure software is actually comprised of multiple processes that run as a distributed system.
As such, there are clearly many combinations of how to map all of these processes to some number of servers in a cluster.
For production use cases where fault tolerance is required (a disk or server can fail without data loss) there are some guidelines that should be considered.

* Multiple HDFS nodes for proper data replication
* 3 or 5 Zookeeper process
* RAIDed disk for RDBMS and HDFS/YARN master processes


Ignoring High Availability (HA) configurations, we can segregate processes by how many instances of them run on a cluster.
Some processes, such as the YARN ResourceManager, have a single instance. Others, such as the Accumulo Tablet Server, will have 1 process per worker node and thus scale with the size of the cluster.

* Worker processes (1 process per worker node)

  * HDFS DataNode
  * YARN NodeManager
  * Accumulo Tablet Server
  * Various Clients (Spark2, YARN, etc)

* "Master" processes (1 process per cluster)

  * HDFS NameNode
  * HDFS Secondary NameNode
  * YARN ResourceManager
  * Accumulo Master
  * Koverse Server
  * Koverse Web App
  * Postgresql

* In-between processes (1+ process per cluster, depending on usage)

  * Zookeeper (1 is required, 3 is needed for fault tolerance)

Example Configurations
----------------------
As noted, there can be many combinations of how the processes are mapped to servers in a cluster.
A large variable in this equation is the system resources (disk, CPU, memory, and network I/O) available to each node.
Many of these processes are sensitive to having adequate resources and thus the load on servers needs to be considered.
Shown below are some example configurations along with the budgeting of system resources.
In all cases, 1GbE is the minimum recommended network interface, with 10GbE preferred.

1-Node Proof-Of-Value (POV)
^^^^^^^^^^^^^^^^^^^^^^^^^^^
Example Minimum HW: EC2 r5.4xlarge with 16 CPU, 128G memory

**NOTE: Not production ready with no data replication and a single ZK. If you lose a disk, you will likely lose data and have to rebuild your system.**

+------------+-------------------------------+---------------------+---------------------+
| Node ID(s) | Process Name                  | CPU(cores) per node | Memory(GB) per node |
+------------+-------------------------------+---------------------+---------------------+
| 0          | koverse-server                | 2                   | 8                   |
+------------+-------------------------------+---------------------+---------------------+
|            | koverse-webapp                | 1                   | 4                   |
+------------+-------------------------------+---------------------+---------------------+
|            | Postgresql                    | 1                   | 2                   |
+------------+-------------------------------+---------------------+---------------------+
|            | HDFS NameNode                 | .5                  | 2                   |
+------------+-------------------------------+---------------------+---------------------+
|            | HDFS Secondary NameNode       | .5                  | 2                   |
+------------+-------------------------------+---------------------+---------------------+
|            | YARN ResourceManager          | .5                  | 2                   |
+------------+-------------------------------+---------------------+---------------------+
|            | Accumulo Master               | 1                   | 8                   |
+------------+-------------------------------+---------------------+---------------------+
|            | Accumulo Monitor              | .5                  | 2                   |
+------------+-------------------------------+---------------------+---------------------+
|            | Accumulo GC                   | .5                  | 2                   |
+------------+-------------------------------+---------------------+---------------------+
|            | ZooKeeper                     | .5                  | 2                   |
+------------+-------------------------------+---------------------+---------------------+
|            | HDFS DataNode                 | 1                   | 1                   |
+------------+-------------------------------+---------------------+---------------------+
|            | YARN NodeManager              | 1                   | 1                   |
+------------+-------------------------------+---------------------+---------------------+
|            | YARN Applications (MR, Spark) | 4                   | 48                  |
+------------+-------------------------------+---------------------+---------------------+
|            | Accumulo TabletServer         | 2                   | 8                   |
+------------+-------------------------------+---------------------+---------------------+
| 0 Totals   |                               | 16                  | 92                  |
+------------+-------------------------------+---------------------+---------------------+


3-Node Proof-Of-Value (POV)
^^^^^^^^^^^^^^^^^^^^^^^^^^^
Example Minimum HW: EC2 r5.2xlarge with 8 CPU, 64G memory

**NOTE: Not production ready with a single ZK.** HDFS replication factor of 2.

+--------------+-------------------------------+---------------------+---------------------+
| Node ID(s)   | Process Name                  | CPU(cores) per node | Memory(GB) per node |
+--------------+-------------------------------+---------------------+---------------------+
| 0            | koverse-server                | 2                   | 8                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | koverse-webapp                | 1                   | 4                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | Postgresql                    | 1                   | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | HDFS NameNode                 | .5                  | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | HDFS Secondary NameNode       | .5                  | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | YARN ResourceManager          | .5                  | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | Accumulo Master               | 1                   | 8                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | Accumulo Monitor              | .5                  | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | Accumulo GC                   | .5                  | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | ZooKeeper                     | .5                  | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
| 0 Totals     |                               | 8                   | 34                  |
+--------------+-------------------------------+---------------------+---------------------+
| {1,2}        | HDFS DataNode                 | 1                   | 1                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | YARN NodeManager              | 1                   | 1                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | YARN Applications (MR, Spark) | 4                   | 48                  |
+--------------+-------------------------------+---------------------+---------------------+
|              | Accumulo TabletServer         | 2                   | 8                   |
+--------------+-------------------------------+---------------------+---------------------+
| {1,2} Totals |                               | 8                   | 58                  |
+--------------+-------------------------------+---------------------+---------------------+


5-Node Production
^^^^^^^^^^^^^^^^^^^^^^^^^^^
Example Minimum HW: EC2 r5.2xlarge with 8 CPU, 64G memory

3-node ZK quorum. HDFS replication of 2

+--------------+-------------------------------+---------------------+---------------------+
| Node ID(s)   | Process Name                  | CPU(cores) per node | Memory(GB) per node |
+--------------+-------------------------------+---------------------+---------------------+
| 0            | koverse-server                | 2                   | 8                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | koverse-webapp                | 1                   | 4                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | Postgresql                    | 1                   | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | HDFS NameNode                 | .5                  | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | HDFS Secondary NameNode       | .5                  | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | YARN ResourceManager          | .5                  | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | Accumulo Master               | 1                   | 8                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | Accumulo Monitor              | .5                  | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | Accumulo GC                   | .5                  | 2                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | ZooKeeper                     | .5                  | 1                   |
+--------------+-------------------------------+---------------------+---------------------+
| 0 Totals     |                               | 8                   | 33                  |
+--------------+-------------------------------+---------------------+---------------------+
| {1,2}        | HDFS DataNode                 | .75                 | 1                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | YARN NodeManager              | .75                 | 1                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | YARN Applications (MR, Spark) | 4                   | 48                  |
+--------------+-------------------------------+---------------------+---------------------+
|              | Accumulo TabletServer         | 2                   | 8                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | ZooKeeper                     | .5                  | 1                   |
+--------------+-------------------------------+---------------------+---------------------+
| {1,2} Totals |                               | 8                   | 59                  |
+--------------+-------------------------------+---------------------+---------------------+
| {3,4}        | HDFS DataNode                 | 1                   | 1                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | YARN NodeManager              | 1                   | 1                   |
+--------------+-------------------------------+---------------------+---------------------+
|              | YARN Applications (MR, Spark) | 4                   | 48                  |
+--------------+-------------------------------+---------------------+---------------------+
|              | Accumulo TabletServer         | 2                   | 8                   |
+--------------+-------------------------------+---------------------+---------------------+
| {3,4} Totals |                               | 8                   | 58                  |
+--------------+-------------------------------+---------------------+---------------------+


20-Node Production
^^^^^^^^^^^^^^^^^^^^^^^^^^^
ZooKeeper is sensitive to resource contention and thus it is recommended to have dedicated ZooKeeper nodes, especially as cluster size grows.
ZooKeeper doesn't require large amounts of physical resources, so these nodes can be significantly smaller/cheaper.
This example configuration specifies a different node type for the dedicated ZooKeeper servers.

Example Minimum HW: EC2 r5.2xlarge with 8 CPU, 64G memory

Example ZooKeeper HW: EC2 m3.medium with 1 CPU, 3.75G memory, and 4G local SSD storage for ZooKeeper data

3-node ZK quorum. HDFS replication of 3

+-----------------+-------------------------------+---------------------+---------------------+
| Node ID(s)      | Process Name                  | CPU(cores) per node | Memory(GB) per node |
+-----------------+-------------------------------+---------------------+---------------------+
| 0               | koverse-server                | 4                   | 24                  |
+-----------------+-------------------------------+---------------------+---------------------+
|                 | koverse-webapp                | 2                   | 12                  |
+-----------------+-------------------------------+---------------------+---------------------+
|                 | Postgresql                    | 2                   | 4                   |
+-----------------+-------------------------------+---------------------+---------------------+
| 0 Totals        |                               | 8                   | 40                  |
+-----------------+-------------------------------+---------------------+---------------------+
| 1               | HDFS NameNode                 | 2                   | 4                   |
+-----------------+-------------------------------+---------------------+---------------------+
|                 | HDFS Secondary NameNode       | .5                  | 4                   |
+-----------------+-------------------------------+---------------------+---------------------+
|                 | YARN ResourceManager          | 2                   | 4                   |
+-----------------+-------------------------------+---------------------+---------------------+
|                 | Accumulo Master               | 2                   | 12                  |
+-----------------+-------------------------------+---------------------+---------------------+
|                 | Accumulo Monitor              | .5                  | 2                   |
+-----------------+-------------------------------+---------------------+---------------------+
|                 | Accumulo GC                   | 1                   | 4                   |
+-----------------+-------------------------------+---------------------+---------------------+
| 1 Totals        |                               | 8                   | 30                  |
+-----------------+-------------------------------+---------------------+---------------------+
| [2..17]         | HDFS DataNode                 | 1                   | 1                   |
+-----------------+-------------------------------+---------------------+---------------------+
|                 | YARN NodeManager              | 1                   | 1                   |
+-----------------+-------------------------------+---------------------+---------------------+
|                 | YARN Applications (MR, Spark) | 4                   | 48                  |
+-----------------+-------------------------------+---------------------+---------------------+
|                 | Accumulo TabletServer         | 2                   | 8                   |
+-----------------+-------------------------------+---------------------+---------------------+
| [2..17] Totals  |                               | 8                   | 58                  |
+-----------------+-------------------------------+---------------------+---------------------+
| [18..20]        | ZooKeeper                     | 1                   | 2                   |
+-----------------+-------------------------------+---------------------+---------------------+
| [18..20] Totals |                               | 1                   | 2                   |
+-----------------+-------------------------------+---------------------+---------------------+
