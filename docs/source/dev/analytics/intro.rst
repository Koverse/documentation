.. _AnalyticsAPI:

Transform API
=============

Putting analytics into production is a phenomenal challenge for most organizations building on newer scalable technologies.
Koverse makes running analytics in production easy.

Koverse wraps an analytic in a Transform, which allows the analytic to be reused for multiple data sets via code-free configuration, and Transforms are also scheduled, monitored, and audited.

Transforms allow data scientists to use the APIs they want to use, and adds to that the ability to manage the analytic deployment.
Transforms can wrap analytics written for the following frameworks and APIs:

* Spark
* Spark SQL
* Spark SQL
* Python
* PySpark

What makes Koverse transforms different from “vanilla” analytics written for these frameworks is that:

- Developers can avoid writing code to read the original format of data. Koverse provides a common format for all data whether structured, semi- or unstructured.
- Developers do not have to specify the schema of the data. Koverse learns and provides this to the underlying frameworks. This makes using structured APIs like Pig and Spark’s SQL or Data Frames much easier.
- Developers can identify which parts of the analytic are configurable. For example, a Sentiment Analysis algorithm can be configured to process the field containing text at run-time. This way it can be run on the ‘text’ field of Twitter data in one workflow, and run on the ‘body’ field of some email data in another workflow. This makes analytics reusable for more than one type of data.
- Developers don’t have to worry about where the output goes. Results can be written back to Koverse, automatically secured and indexed. From there, these results can be queried directly, accessed by applications, fed into additional analytics or exported to external file systems or databases.
- Non-developers can use these analytics simply by configuring them using the Koverse UI. No coding knowledge or command-line access is needed.

Koverse adds the following capabilities to make every analytic production-ready:

- Triggering jobs to run on a scheduled or automatic basis
- Configurable input data windows, e.g. process data from the last 30 days
- Maintaining relationships and lineage between data sets
- Auditing
- Job monitoring and reporting

The following new interfaces were introduced in 3.0.0 and should be implemented for custom transforms:

* com.koverse.sdk.transform.java.DataFrameTransform
* com.koverse.sdk.transform.scala.DataFrameTransform
`DataFrameTransform Example <https://github.com/Koverse/koverse-examples/blob/3.0/analytics/scala/src/main/scala/com/koverse/example/spark/WordCountDataFrameTransform.scala>`_

* com.koverse.sdk.transform.java.DataSetTransform
* com.koverse.sdk.transform.scala.DataSetTransform
`DataSetTransform Example <https://github.com/Koverse/koverse-examples/blob/3.0/analytics/scala/src/main/scala/com/koverse/example/spark/WordCountDatasetTransform.scala>`_

* com.koverse.sdk.transform.java.RDDTransform
`Java RDDTransform Example <https://github.com/Koverse/koverse-examples/blob/3.0/analytics/java/src/main/java/com/koverse/examples/analytics/JavaWordCountTransform.java>`_
* com.koverse.sdk.transform.scala.RDDTransform
`Scala RDDTransform Example <https://github.com/Koverse/koverse-examples/blob/3.0/analytics/scala/src/main/scala/com/koverse/example/spark/WordCountRDDTransform.scala>`_

The following abstract classes are deprecated in 3.0.0 and will be removed in 3.1.0:

* com.koverse.sdk.transform.spark.sql.JavaSparkDataFrameTransform
* com.koverse.sdk.transform.spark.JavaSparkTransform
* com.koverse.sdk.transform.spark.sql.JavaSparkSqlTransform

The above abstract classes implement the com.koverse.sdk.transform.spark.SparkTransform interface which is also
deprecated and will be removed in 3.1.0

Complete code examples from this section can be found at `Koverse SDK Project <https://github.com/Koverse/koverse-sdk-project/tree/2.4/>`_ section .

More details can be found in the Javadocs

Koverse supports prototyping analytics using interactive shells and Notebooks.
For examples of prototyping analytics using specific technologies, see the following:

..
  spark_shell.rst
  zeppelin.rst

.. toctree::
  :maxdepth: 1

  pyspark_shell.rst
  ipython.rst
  jupyter.rst



After prototyping an analytic, learn how to package analytics in production Transforms:

..
  spark_java.rst
  spark_scala_transform.rst
  spark_sql.rst
  python.rst


.. toctree::
  :maxdepth: 1

  spark_java_dataframe_transform.rst
  pyspark_transform.rst
