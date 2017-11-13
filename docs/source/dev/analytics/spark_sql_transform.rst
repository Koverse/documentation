Spark SQL
---------

Koverse supports Apache Spark SQL via a set of native Koverse Spark SQL APIs that let the user query structured data as a distributed dataset (RDD). This makes it easy to run SQL queries.


The following is a high-level outline of the Koverse Spark SQL API framework:

Class JavaSparkSqlTransform
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    **com.koverse.sdk.transform.spark.JavaSparkTransform**

    `@Immutable`

    `@ThreadSafe`

    **public abstract class JavaSparkSqlTransform extends JavaSparkTransform**

    **Description:**
    A transform for executing Spark SQL query transforms

+------------------------------------------------------------+----------------------------------------------------------+-----------------------------------------------------+
| Modifier and Type                                          | Method                                                   | Description                                         |
|                                                            |                                                          |                                                     |
+============================================================+==========================================================+=====================================================+
| protected abstract org.apache.spark.sql.DataFrame          | execute(JavaSparkSqlTransformContext context)            | Execute the Spark SQL query.                        |
+------------------------------------------------------------+----------------------------------------------------------+-----------------------------------------------------+
| protected org.apache.spark.api.java.JavaRDD<SimpleRecord>  | execute(JavaSparkTransformContext sparkTransformContext) | Koverse calls this method to execute your transform |
+------------------------------------------------------------+----------------------------------------------------------+-----------------------------------------------------+

Class JavaSparkSqlTransformContext
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    **com.koverse.sdk.transform.spark.JavaSparkTransform**

    `@NotThreadSafe`

    **public final class JavaSparkSqlTransformContext extends Object**

    **Description:**
    The context for a JavaSparkSqlTransform

+---------------------------------+----------------------------+--------------------------------------------------------------------------------------------------+
| Modifier and Type               | Method                     | Description                                                                                      |
|                                 |                            |                                                                                                  |
+=================================+============================+==================================================================================================+
| JavaSparkTransformContext       | getSparkTransformContext() | Get the JAva spark tranform context, if needed.                                                  |
+---------------------------------+----------------------------+--------------------------------------------------------------------------------------------------+
| org.apache.spark.sql.SQLContext | getSqlContext()            | Get the SQL context, which is ready to go and loaded with the schemas for the input collections. |
+---------------------------------+----------------------------+--------------------------------------------------------------------------------------------------+


Class KoverseSparkSql
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    **com.koverse.sdk.transform.spark.sql**

    **public class KoverseSparkSql extends Object**

    **Description:**

+--------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
| Modifier and Type                                                  | Method                                                                                                                                                                                   | Description                                                                                                                                           |
|                                                                    |                                                                                                                                                                                          |                                                                                                                                                       |
+====================================================================+==========================================================================================================================================================================================+=======================================================================================================================================================+
| static org.apache.spark.sql.DataFrame                              | createDataFrame(org.apache.spark.api.java.JavaRDD<org.apache.spark.sql.Row> rowdRdd, org.apache.spark.sql.SQLContext sqlContext, org.apache.spark.sql.types.StructType schema)           | Create a new Data Frame from an RDD of rows, a SQL Context, and a struct type (the Spark SQL schema)                                                  |
+--------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
| static org.apache.spark.sql.DataFrame | getSqlContext()            | createDataFrame(org.apache.spark.api.java.JavaRDD<SimpleRecord> recorddRdd, org.apache.spark.sql.SQLContext sqlContext, FlatCollectionSchema collectionSchema)                           | Create a new Data Frame from an RDD of records, a SQL Context, and a flat collection schema                                                           |
+--------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
| static org.apache.spark.api.java.JavaRDD<org.apache.spark.sql.Row> | createRowRdd(org.apache.spark.api.java.JavaRDD<SimpleRecord> recordRdd, FlatCollectionSchema collectionSchema)                                                                           | Converts a RDD of records and a flat collection schema into a RDD of rows.                                                                            |
+--------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
| static org.apache.spark.sql.SQLContext| getSqlContext()            | createSqlContext(org.apache.spark.SparkContext sparkContext, Map<String,org.apache.spark.api.java.JavaRDD<SimpleRecord>> recordRdds, Map<String,FlatCollectionSchema> collectionSchemas) | Converts two maps keyed by collection name, one containing record RDDs and the other containing collection schema, into a SQLContext ready for query. |
+--------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
| static org.apache.spark.sql.types.StructType                       | createSqlSchema(FlatCollectionSchema collectionSchema)                                                                                                                                   | cGiven a flat collection schema, create s Spark SQL Struct type, which the SQL schema.                                                                |
+--------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+


See the :ref:`Addons` section for information about building an addon that contains a class that uses the Koverse Spark SQL API.


**For a reference of the supported query syntax in the Spark Java SQL see:**

http://savage.net.au/SQL/sql-99.bnf.html

http://docs.datastax.com/en/datastax_enterprise/4.6/datastax_enterprise/spark/sparkSqlSupportedSyntax.html
