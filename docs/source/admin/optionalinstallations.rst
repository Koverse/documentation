.. _OptionalInstalls:

Optional Installation Guide
===========================
The following installations are not required but are necessary if you will be using python or doing prototyping with shells like pyspark, or using interactive notebooks like Zeppelin or Jupyter.

Using Python with Koverse
-------------------------

Koverse ships with a Python client to allow Python scripts to access the Koverse API.
The Koverse Python client uses Apache Thrift to communicate with the Koverse server. It is possible to generate clients for other languages as well.

To use the Koverse Python client, do the following::

 sudo pip install koverse
 Downloading/unpacking koverse
  Downloading koverse-X.X.X-py2.py3-none-any.whl (144kB): 144kB downloaded
 Installing collected packages: koverse
 Successfully installed koverse
 Cleaning up...

Or for a specific version, do the following::

 sudo pip install koverse=3.2.6

The Koverse Python client can then be used in Python scripts by importing the koverse module after downloading and using the koverse data source::

 >>> from koverse import client

Koverse Spark Data Source
-------------------------

The Koverse Spark Data Source provides an easy way to load a Koverse Data Set as a Spark DataFrame for interactive analysis in Spark shells, including pyspark, spark-shell, and sparkR. To reference the Koverse Spark Data Source package, use the following coordinates::

 group: com.koverse
 artifactId: koverse-spark-datasource
 version: 3.2.6

This JAR file will need to be placed on the system where the system will be able to access it.  The Koverse Spark Data Source is not distributed as part of the core product, so you will need to download the correct JAR file for your version of Koverse from http://nexus.koverse.com/nexus/content/repositories/releases/com/koverse/koverse-spark-datasource/
For example, this shows downloading the file for Koverse 3.2.6 and placing it in the /home/zeppelin directory::

   cd /home/zeppelin
   wget http://nexus.koverse.com/nexus/content/repositories/releases/com/koverse/koverse-spark-datasource/3.2.6/koverse-spark-datasource-3.2.6.jar
   chown zeppelin:zeppelin /home/zeppelin/koverse-spark-datasource-3.2.6.jar

For example, to include it when starting the spark shell::

  $ spark-shell --jars /home/zeppelin/koverse-spark-datasource-3.2.6.jar

This package can be added to Spark using the :code:`--packages` command line option when also referencing the Koverse Maven repository.::

  $ spark-shell --repositories http://nexus.koverse.com/nexus/content/groups/public/ --packages com.koverse:koverse-spark-datasource:3.2.6

Apache Zeppelin
------------------

Apache Zeppelin is a notebook tool that allows developers to create code and comments in an interactive manner without
requiring a full development environment.  It supports a variety of interpreters for different programming languages.  This
documentation will detail how to use Apache Zeppelin with Scala to analyze data in Koverse via the Koverse Spark Data Source.

Setup

* Apache Spark 3.2 is required by Zeppelin to work with the Koverse Spark Data Source, so this will need to be available on your cluster.
* The Koverse Spark Data Source as described above
* Zeppelin an Ambari stack available in HDP 2.5 and later to allow for easy integration into these common control panels.  There are instructions at https://docs.hortonworks.com/HDPDocuments/HDP2/HDP-2.5.0/bk_zeppelin-component-guide/content/ch_installation.html for installing Zeppelin using on HDP 2.5 and later.

* If you need to install Zeppelin manually, you can follow the instructions at https://zeppelin.apache.org/download.html to install it from source:

* Once Zeppelin is installed, you will need to configure Zeppelin to connect to the Koverse data source. Edit the zeppelin-env.sh file and add the location of the Koverse Spark Data Source JAR to the SPARK_SUBMIT_OPTIONS variable, for example::

    export SPARK_SUBMIT_OPTIONS="--jars /home/zeppelin/koverse-spark-datasource-3.2.6.jar"

  Restart Zeppelin to make these configuration changes active.
* To authenticate from Zeppelin to Koverse, you will need to create an API token as described in the :ref:`ApiTokens`.

* You can now proceed with creating Zeppelin notebooks that access Koverse. Simply create a new notebook and then create a new data frame using the Koverse Spark Data Source as follows::

    // Connect to the Koverse Spark Data Source on localhost and create a data frame using the data set named "employees"
    val df = sqlContext.read.format("com.koverse.spark").option("hostname", "localhost").option("apiToken", "99ff62de-42ac-4b8b-b7dd-79b02bb50da2").load("employees")

* The data in the data frame can now be manipulated as any other data in Spark.  For example, see below for a full example
  using the sample bank employee data available at https://s3.amazonaws.com/koverse-datasets/financial+demo/employees.csv

  .. image:: /_static/UsageGuide/zeppelinNotebook.png


Jupyter Notebook
------------------

`Jupyter <http://jupyter.org/>`_ is a development tool that allows users to create notebooks containing comments and code using different programming languages please contact your Koverse representative for instructions to install and configure Jupyter Notebooks.
