Using PySpark and iPython Notebook with Koverse
-----------------------------------------------

iPython Notebook is a popular tool for creating Python scripts that can display results and be shared with others.

PySpark can be used in the context of iPython Notebook to create repeatable workflows.

First, follow the steps to configure PySpark to work with Koverse as described in the previous section.

To use Koverse with PySpark and iPython Notebook, create a new iPython profile::

  ipython profile create pyspark

This will create a profile in ~/.ipython/profile_pyspark. In that directory, create a file called ipython_config.py with the following contents::

 c = get_config()

 c.NotebookApp.ip = '*'
 c.NotebookApp.open_browser = False
 c.NotebookApp.port = 8880

Next, in ~/.ipython/profile_pyspark/startup create a file called 00-pyspark-setup.py with the following contents::

 import os
 import sys

 spark_home = os.environ.get('SPARK_HOME', None)
 if not spark_home:
    raise ValueError('SPARK_HOME environment variable is not set')
 sys.path.insert(0, os.path.join(spark_home, 'python'))
 sys.path.insert(0, os.path.join(spark_home, 'python/lib/py4j-0.8.2.1-src.zip'))

 execfile(os.path.join(spark_home, 'python/pyspark/shell.py'))

 from koverse.spark import *


Export the following env vars::

 export SPARK_HOME=[path to your spark installation]

 export PYSPARK_PYTHON=/usr/local/bin/python2.7

 export PYSPARK_SUBMIT_ARGS="--deploy-mode client --jars koverse-sdk.jar,koverse-sdk-xml.jar,koverse-thrift.jar,accumulo-core.jar,guava.jar,accumulo-fate.jar,accumulo-trace.jar,koverse-server-base.jar,koverse-shaded-deps.jar"

 export KOVERSE_HOME=[path to your Koverse installation]


Now iPython Notebook can be started from the Spark installation directory::

 ipython notebook --profile=pyspark

Visit http://localhost:8880 in a web browser to access iPython Notebook and create a new notebook.
In this new notebook, everything should be imported and initialized for us to start using PySpark with Koverse.

Use the same methods described in the previous section on PySpark in iPython notebooks to obtain RDDs from Koverse collections, process them, and persist RDDs to Koverse collections.

.. image:: /_static/PySpark_Notebook.png
	:height: 550 px
	:width: 800 px
