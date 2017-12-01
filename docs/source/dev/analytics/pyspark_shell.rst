PySpark Shell
^^^^^^^^^^^^^

PySpark is the name of Apache Spark's Python API and it includes an interactive shell for analyzing large amounts of data with Python and Spark.

Koverse supports processing data from Koverse Collections using PySpark and storing Resilient Distributed Datasets (RDDs) into Koverse Collections.

To use Koverse with PySpark, follow these steps.

Set the following environment variables::

 export SPARK_HOME=[your Spark installation directory]
 export ACCUMULO_HOME=[your Accumulo installation directory]
 export KOVERSE_HOME=[your Koverse installation directory]
 export PYSPARK_PYTHON=/usr/local/bin/python2.7

Copy the following JAR files into a the Spark installation directory::

 cd $SPARK_HOME

 cp $ACCUMULO_HOME/lib/accumulo-core.jar .
 cp $ACCUMULO_HOME/lib/accumulo-fate.jar .
 cp $ACCUMULO_HOME/lib/accumulo-tracer.jar .
 cp $ACCUMULO_HOME/lib/accumulo-trace.jar .
 cp $ACCUMULO_HOME/lib/guava.jar .

 cp $KOVERSE_HOME/lib/koverse-sdk-xml*.jar koverse-sdk-xml.jar
 cp $KOVERSE_HOME/lib/koverse-sdk-1*.jar koverse-sdk.jar
 cp $KOVERSE_HOME/lib/koverse-server-base*.jar koverse-server-base.jar
 cp $KOVERSE_HOME/lib/koverse-shaded-deps*.jar koverse-shaded-deps.jar
 cp $KOVERSE_HOME/lib/koverse-thrift*.jar koverse-thrift.jar


Install Koverse python files.
As described above, the Koverse Python client can be installed using::

 pip install koverse

Start PySpark::

 bin/pyspark --deploy-mode client \
 --jars koverse-sdk.jar,koverse-sdk-xml.jar,koverse-thrift.jar, \
 accumulo-core.jar,guava.jar,accumulo-fate.jar,accumulo-trace.jar, \
 koverse-server-base.jar,koverse-shaded-deps.jar

 Python 2.7.6 (default, Sep  9 2014, 15:04:36)
 [GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.39)] on darwin
 Type "help", "copyright", "credits" or "license" for more information.
 Spark assembly has been built with Hive, including Datanucleus jars on classpath
 Using Spark's default log4j profile: org/apache/spark/log4j-defaults.properties
 Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /__ / .__/\_,_/_/ /_/\_\   version 1.3.0
      /_/

 Using Python version 2.7.6 (default, Sep  9 2014 15:04:36)
 SparkContext available as sc, HiveContext available as sqlCtx.

To access Koverse's Spark functionality import the following::

 >>> from koverse.spark import *

A KoverseSparkContext object is used to obtain Spark RDDs for specified Koverse collections.
Simply pass in the pre-created SparkContext object, the hostname of the Koverse Server, and your username and password::

 >>> import base64
 >>> ksc = KoverseSparkContext(sc, 'localhost', 'username', base64.b64encode('password'))

To get an RDD for a Koverse Collection, call the koverseCollection() method::

 >>> rdd = ksc.koverseCollection('stocks')

This rdd can be used like other RDDs.

 >>> rdd.take(1)
 [{u'Volume': 26765000, u'High': 25.42, u'AdjClose': 25.17, u'Low': 24.46, u'Date': datetime.datetime(2014, 9, 1, 20, 0), u'Close': 25.17, u'Open': 24.94}]

If, for example, we wanted to repeat our previous analysis of this example data set, we could build a model using a few simple functions::

 >>> differences = rdd.map(lambda r: {'Date': r['Date'], 'Change': r['Close'] - r['Open']})

 >>> sum  = differences.map(lambda r: r['Change']).reduce(lambda a, b: a + b)
 >>> mean = sum / differences.count()
 >>> mean
 -0.08547297297297289

 >>> ssq = differences.map(lambda r: (r['Change'] - mean) ** 2).reduce(lambda a, b: a + b)
 >>> var = ssq / differences.count()
 >>> import math
 >>> stddev = math.sqrt(var)
 >>> stddev
 8.613426809227452

Now we can apply our model directly to our differences RDD.

 >>> anomalies = differences.flatMap(lambda r: [r] if (abs(r['Change']) - mean) / stddev > 2.0 else [])
 >>> anomalies.count()
 12
 >>> anomalies.first()
 {'Date': datetime.datetime(1998, 8, 31, 20, 0), 'Change': -22.439999999999998}

Note that, unlike the previous example, here we are not setting up a Koverse Transform which means this analysis workflow will only exist during this PySpark session.
We can persist the output, but if we want to repeat this process we'll need to run these commands again.

If we wish to persist these anomalies in a Koverse collection to that applications and users can access and search these results we can use the saveAsKoverseCollection() method.

 >>> ksc.saveAsKoverseCollection(anomalies, 'anomalies')

This will create a collection called 'anomalies' and store the information from our RDD into it.

If the collection already exists and we wish to simply add new data to it, we can specify append=True

 >>> ksc.saveAsKoverseCollection(anomalies, 'anomalies', append=True)
