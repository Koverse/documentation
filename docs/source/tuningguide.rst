.. _Tuning Guide:


Based on this example, the following configurations would apply.

Accumulo
--------
* master_max_heapsize: 4G         //this is actually running on the koverse node
* tserver_max_heapsize: 8G
* tserver.memory.maps.max: 2G

YARN
----
* yarn.nodemanager.resource.memory-mb: 40G       // total memory for YARN apps per node
* yarn.nodemanager.resource.cpu-vcores: 5        // total CPUs for YARN apps per node
* yarn.scheduler.minimum-allocation-mb: 2G       // min container memory
* yarn.scheduler.maximum-allocation-mb: 8G       // max container memory

Spark
-----
These would go in /etc/spark/conf/spark-defaults.conf:

* spark.executor.instances: 1                    // 1 executor per worker
* spark.executor.cores: 2                        // each executor can use 2 CPU cores
* spark.executor.memory: 7G                      // leave room for overhead between this and container

MapReduce
---------
These would go in koverse-server settings.xml:

* mapreduce.map.memory.mb: 8G
* mapreduce.map.java.opts.max.heap: 8/1.2 = 6.66G
* mapreduce.map.cpu.vcores: 1
* mapreduce.reduce.memory.mb: 8G
* mapreduce.reduce.java.opts.max.heap: 8/1.2 = 6.66G
* mapreduce.reduce.cpu.vcores: 1

HDFS
----
It has come up on some smaller clusters that having HDFS Trash enabled, coupled with decent amounts of ingest, can cause disk space to quickly fill up due to Accumulo's Write-Ahead-Log (WAL) filling up HDFS Trash as files are removed during compaction. In these low disk space environments, you can disable HDFS Trash (fs.trash.interval = 0) or set it to something far lower than a day which is ofter the default value from a Hadoop distribution. Alternatively you can set gc.trash.ignore to true in Accumulo http://accumulo.apache.org/1.6/accumulo_user_manual.html#_gc_trash_ignore. 

Max Files, Processes
--------------------
Another key set of configurations, which must be cluster wide, are the max number of processes and files a user can have open.  These two configs: "open files" and "max user processes" - can be seen by running:

ulimit -a

It seems Cloudera often takes care of these, per user, in /etc/security/limit.d/<koverse-user>.conf.  However if checking as the koverse user shows defaults of 1024 for each, create a /etc/security/limit.d/<koverse-user>.conf (in this case koverse-user is koverse) with:

* koverse        hard    memlock unlimited
* koverse        soft    memlock unlimited
* koverse        hard    nofile  1048576
* koverse        soft    nofile  32768
* koverse        soft    nproc   65536
* koverse        hard    nproc   unlimited

Install this file on all nodes in the cluster.  No reboots needed to take effect.


Additional information on cluster tuning can be found here:

* http://www.cloudera.com/content/www/en-us/documentation/enterprise/5-3-x/topics/cdh_ig_yarn_tuning.html
* http://blog.cloudera.com/blog/2015/03/how-to-tune-your-apache-spark-jobs-part-2/
* http://accumulo.apache.org/1.6/accumulo_user_manual.html
* http://spark.apache.org/docs/latest/running-on-yarn.html
