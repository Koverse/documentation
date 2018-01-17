.. _AnalyticsAPI:

Analytics API
=============

Putting analytics into production is a phenomenal challenge for most organization building on newer scalable technologies.
Koverse makes running analytics in production easy.

Koverse wraps an analytic in a Transform, which allows the analytic to be reused for multiple data sets via code-free configuration, and Transforms are also scheduled, monitored, and audited.

Transforms allow data scientists to use the APIs they want to use, and adds to that the ability to manage the analytic deployment.
Transforms can wrap analytics written for the following frameworks and APIs:

* Spark
* Spark SQL
* MapReduce
* Pig
* Python


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

Complete code examples from this section can be found at `Koverse SDK Project <https://github.com/Koverse/koverse-sdk-project/tree/2.4/>`_ section .

Koverse supports prototyping analytics using interactive shells and Notebooks.
For examples of prototyping analytics using specific technologies, see the following:

..
  spark_shell.rst
  zeppelin.rst

.. toctree::

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

   spark_java_dataframe_transform.rst
