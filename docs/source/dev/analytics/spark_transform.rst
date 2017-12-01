Spark Transform API
^^^^^^^^^^^^^^^^^^^

Introduction


Koverse now supports the Apache Spark cluster computing framework through a set of native Koverse APIs that leverage much of the Spark primitives. The Koverse Spark APIs allow a developer of Koverse a set of routines, protocols, and tools for building software applications based upon the Koverse technology.

See the :ref:`Addons` section for information about building an addon that contains a class that uses the Koverse Spark API.

Note that by default, the RDDs that Koverse provides to your transform
may have a relatively small number of partitions.
This can result in decreased performance for anything but very simple processing algorithms.
Specifically, the RDD will be partitioned by the number of record batches that your koverse server is configured to use.

Therefore, you may want to repartition the RDDs that Koverse provides you in order to increase performance.
Note that how many partitions to use is highly dependent on the algorithm that
you are creating in your transform, you may need to experiment with the number of partitions
you use to maximize performance.

The following is a high-level outline of the Koverse Spark API framework:

Interface SparkTransform

    **com.koverse.sdk.transform.spark**

    `@ThreadSafe`

    `@Immutable`

    **public interface SparkTransfor**

    **Description:**
    The following methods, when executed in order, obtain information on how to execute the transform: *getName(), getVersion() and getParameters()*.
    These methods are used to configure the transform before performing execution using ``execute(com.koverse.sdk.transform.spark.SparkTransformContext)`` which is passed a **SparkTransformContext** to give it the information needed to run the spark transform.

+------------------------------------------+---------------------------------+------------------------------------------------------+
| Modifier and Type                        | Method                          | Description                                          |
|                                          |                                 |                                                      |
+==========================================+=================================+======================================================+
| org.apache.spark.rdd.RDD                 | getName()                       | Koverse calls this method to execute your transform. |
| <SimpleRecord>                           |                                 |                                                      |
+------------------------------------------+---------------------------------+------------------------------------------------------+
| String                                   | getName()                       | Get the name of this transform.                      |
+------------------------------------------+---------------------------------+------------------------------------------------------+
| Iterable<Parameter>                      | getParameters()                 | Get the parameters of this transform.                |
+------------------------------------------+---------------------------------+------------------------------------------------------+
| String                                   | getTypeId()                     | Get a programmatic identifier for this transform.    |
+------------------------------------------+---------------------------------+------------------------------------------------------+
| Version                                  | getVersion()                    | Get the version of this transform.                   |
+------------------------------------------+---------------------------------+------------------------------------------------------+
| boolean                                  | supportsIncrementalProcessing() | Whether the transform supports incremental output.   |
+------------------------------------------+---------------------------------+------------------------------------------------------+

**Example**
    ``final RDD<SimpleRecord> actual; actual = se.execute(sparkTransformContext);``


Interface SparkTransformContext

    **com.koverse.sdk.transform.spark**

    `@NotThreadSafe`

    `@Immutable`

    **public interface SparkTransformContext**

    **Description:**
    Given to a SparkTransform when it is executed. Provides context information to assist in the execution.

+----------------------------------------------------+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Modifier and Type                                  | Method                          | Description                                                                                                                                                                       |
|                                                    |                                 |                                                                                                                                                                                   |
+====================================================+=================================+===================================================================================================================================================================================+
| Map<String,org.apache.spark.rdd.RDD                | getInputCollectionRDDs()        | Get all Koverse input collection RDDs from the parameters that were input by the user.                                                                                            |
| <SimpleRecord>>                                    |                                 |                                                                                                                                                                                   |
+----------------------------------------------------+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Map<String,Collection                              | getInputCollectionSchemas()     | Get the schemas for all input collections.                                                                                                                                        |
| Schema>                                            |                                 |                                                                                                                                                                                   |
+----------------------------------------------------+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Map<String,String>                                 | getInputCollectionSchemas()     | Get all parameters that is input by the user, with the exception of collection parameters (which are given as RDDs). None of the keys or values in the returned map will be null. |
+----------------------------------------------------+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| org.apache.spark.SparkContext                      | getSparkContext()               | Get the spark context to use during execution                                                                                                                                     |
+----------------------------------------------------+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Class JavaSparkTransform

    **com.koverse.sdk.transform.spark**

    `@ThreadSafe`

    `@Immutable`

    **public abstract class JavaSparkTransform extends Object implements SparkTransform, Serializable**

    **Description:**
    A version of of spark transforms that are easier to work with when the spark code is written in Java.

+--------------------------------------------------------------------+----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| Modifier and Type                                                  | Method                                                   | Description                                                                                                                                     |
|                                                                    |                                                          |                                                                                                                                                 |
+====================================================================+==========================================================+=================================================================================================================================================+
| protected abstract org.apache.spa                                  | execute(JavaSparkTransformContext sparkTransformContext) | Koverse calls this method to execute your transform                                                                                             |
| rk.api.java.JavaRDD<SimpleRecord>                                  |                                                          |                                                                                                                                                 |
+--------------------------------------------------------------------+----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| org.apache.spark.rdd.RDD                                           | execute(SparkTransformContext sparkTransformContext)     | Invokes execute(com.koverse.sdk.transform.spark.JavaSparkTransformContext) after wrapping up the Scala specific types into Java friendly types. |
| <SimpleRecord>                                                     |                                                          |                                                                                                                                                 |
+--------------------------------------------------------------------+----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| boolean                                                            | supportsIncrementalProcessing()                          | Override this method if transform supports incremental processing - i.e.                                                                        |
+--------------------------------------------------------------------+----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+

Class JavaSparkTransformContext


    **com.koverse.sdk.transform.spark**

    `@Immutable`

    `@NotThreadSafe`

    **public final class JavaSparkTransformContext extends Object**

    **Description:**
    A version of the Spark Transform Context more tailored for use with pure Java Spark code.

+----------------------------------------------------------------+-----------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Modifier and Type                                              | Method                      | Description                                                                                                                                                                   |
|                                                                |                             |                                                                                                                                                                               |
+================================================================+=============================+===============================================================================================================================================================================+
| Map<String,org.apache.spark.                                   | getInputCollectionRDDs()    | Get all Koverse input collection RDDs from the parameters that were input by the user.                                                                                        |
| api.java.JavaRDD<SimpleRecord>>                                |                             |                                                                                                                                                                               |
+----------------------------------------------------------------+-----------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Map<String,CollectionSchema>                                   | getInputCollectionSchemas() | Get the schemas for all input collections.                                                                                                                                    |
+----------------------------------------------------------------+-----------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Map<String,String>                                             | getParameters()             | Get all parameters that is input by the user, with the exception of collection parameters (which are given as RDDs)                                                           |
|                                                                |                             | None of the keys or values in the returned map will be null.                                                                                                                  |
+----------------------------------------------------------------+-----------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| org.apache.spark.api.java.                                     | getSparkContext()           | Get the spark context to use during execution.                                                                                                                                |
| JavaSparkContext                                               |                             |                                                                                                                                                                               |
+----------------------------------------------------------------+-----------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+


Class SparkTransformLoader

    **com.koverse.sdk.transform.spark**

    **public class SparkTransformLoader extends Object**

    **Description:**

+-------------------+----------------+--------------------------------------+
| Modifier and Type | Method         | Description                          |
|                   |                |                                      |
+===================+================+======================================+
| String            | getName()      | Get name                             |
+-------------------+----------------+--------------------------------------+
| List<Parameter>   | getParmeters() | Get all the parameters input by user |
+-------------------+----------------+--------------------------------------+
| String            | getTypeId()    | Get Type Id                          |
+-------------------+----------------+--------------------------------------+
| Version           | getVersion()   | Get the spark version                |
+-------------------+----------------+--------------------------------------+
