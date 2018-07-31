.. _JupyterNotebook:

Jupyter Notebook
================

Jupyter is a web application that allows users to create and share documents containing live code,
equations, visualizations and narrative text.  This section describes how to configure a Jupyter Python 3 notebook
to allow access to Koverse data sets.

The prerequisites for accessing Koverse data sets in a Jupyter Python 3 notebook are::

  Spark 1.6 installed as /opt/spark
  Python 3.5
  Jupyter

Once the prerequisites are met, download the Koverse Spark datasource jar from::

 https://s3.amazonaws.com/share.koverse.com/merck/koverse-spark-datasource-2.5.3-SNAPSHOT.jar

Add the following to your shell start up script::

  export SPARK_HOME=/opt/spark
  export PATH=$SPARK_HOME/bin:$PATH
  export PYSPARK_DRIVER_PYTHON=jupyter
  export PYSPARK_DRIVER_PYTHON_OPTS='notebook'

You are now ready to start the Jupyter notebook using pyspark which is part of the Spark installation::

  pyspark --jars <location of Koverse Spark datasource jar downloaded, above>

An example of reading a Koverse data set in a Jupyter Python 3 notebook is shown below.

.. image:: /_static/Jupyter_Notebook.png
  :height: 550 px
  :width: 800 px

Note that there is currently a limitation requiring Koverse data sets to be written as the user ``Koverse``.
