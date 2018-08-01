.. _JupyterNotebook:

Jupyter Notebook
================

Jupyter is a web application that allows users to create and share documents containing live code,
equations, visualizations and narrative text.  This section describes how to configure a Jupyter Python 3 notebook
to allow access to Koverse data sets.

The prerequisites for accessing Koverse data sets in a Jupyter Python 3 notebook are::

  Spark 1.6
  Python 3.5
  Jupyter

Once the prerequisites are met, you will need to download a koverse-spark-datasource JAR file.  The version you download should
match your installed Koverse.  You can find the JAR files here::

 https://nexus.koverse.com/nexus/content/groups/public/com/koverse/koverse-spark-datasource/

Next, you will make additions and changes to your environment variables, as follows.  Be sure to replace ``/opt/spark``
with the location of your installed Spark 1.6 and ``/usr/local/bin/python`` with the location of your Python 3 binary executable::

  export SPARK_HOME=/opt/spark
  export PATH=$SPARK_HOME/bin:$PATH
  export PYSPARK_PYTHON=/usr/local/bin/python
  export PYSPARK_DRIVER_PYTHON=jupyter
  export PYSPARK_DRIVER_PYTHON_OPTS='notebook'

You are now ready to start the Jupyter notebook using ``pyspark`` which is part of the Spark installation::

  pyspark --jars <location of koverse-spark-datasource JAR file downloaded, above>

An example of reading a Koverse data set in a Jupyter Python 3 notebook is shown below.

.. image:: /_static/Jupyter_Notebook.png
  :height: 550 px
  :width: 800 px

Note that there is currently a limitation requiring Koverse data sets to be written as the user ``Koverse``.
