
Transform Stages
^^^^^^^^^^^^^^^^

Many algorithms involve more than just one map() and one reduce() function. Koverse Transforms are organized into stages which are run one after the other, the output of the previous stage becoming the input to the following stage.


Transforms are specified by the developer defining the individual stages, and then specifying the order in which the stages should be run. The Transform framework handles the details of scheduling map, combine, and reduce stages into jobs to submit to Hadoop.


For example, if the first stage of a Transform is a reduce stage, the framework knows to set up an identity mapper in the first Hadoop job created to pass records directly to the reducer.


The only restriction on the order in which stages are run is that Combine stages must be followed by a Reduce stage.


Another item to note is that the first Map stage of a transform receives Record objects from the input Koverse Data Sets. Subsequent stages receive whatever objects are emitted by previous stages.


If a stage fails, the errors are reported to the User Interface and subsequent stages are cancelled.


Stages are defined by subclassing one of the Stage types described below.


RecordMapStage
^^^^^^^^^^^^^^

This type of stage operates on Records from the input Data Sets specified when the Transform was configured.


 ``public void map(Record record)``


KVMapStage
^^^^^^^^^^

This type of stage is used when mapping over the output of a previous stage.


 ``public void map(Object key, Object value)``


CombineStage
^^^^^^^^^^^^

A CombineStage is used to locally combine the output of a previous map stage before the keys and values are sent to a ReduceStage. A CombineStage must be followed by a ReduceStage


 ``public void combine(Object key, Iterable<Object> values)``


ReduceStage
^^^^^^^^^^^

A ReduceStage takes a key and a set of values and emits one or more new key value pairs for consumption by a subsequent Stage, or writes Koverse Records to the output Collection in the data store.


 ``public void reduce(Object key, Iterable<Object> values)``


Emitter
^^^^^^^

The emitter is used to either send key value pairs to the next Stage or to write Records to the output collection. Usually all but the last Stage emit key value pairs and the last Stage writes Records.


Key value pairs emitted by emit() are sent to HDFS where they are read by a subsequent Stage and then deleted whereas Records emitted from writeRecord are written to the output Collection of the Transform and are indexed and made searchable according to the configuration of the output Collection.::


        emit(Object key, Object value)


        writeRecord(Record record)


Transform Runner
^^^^^^^^^^^^^^^^

The transform runner is reponsible for assembling MapReduce jobs out of stages and incrementing a given transform job's current stage. The runner will peek at proceeding stages in an attempt to execute map, combine and reduce stages as parts of a single job. After configuring a job, it will submit the job to the cluster.


Transform class
^^^^^^^^^^^^^^^

Stages are packaged up into a single Transform by defining a subclass of the Transform class.


Security
^^^^^^^^

Koverse ensures that a Transform only reads records from collections from which the submitting user is authorized to read. In addition, any restrictions on the imported with additional security labels is applied so that individual records that the user is not authorized to see are not delivered to the Transform for processing.


The output Records of each Transform are labeled by the framework so that access to them is controlled.

Tips and Tricks
^^^^^^^^^^^^^^^

* When writing transform logic, keep in mind that Koverse Records may vary in structure.  As such, one cannot assume that certain fields will be present, or that the content of fields will conform to any particular format.  Code must be defensive against variation in fields and their values.
