Using PySpark and Jupyter with Koverse
-----------------------------------------------

Jupyter is a development tool that allows users to create notebooks containing comments and code, like iPython Notebook. Jupyter supports other languages via the use of 'kernels'.

To use Jupyter with Koverse and PySpark, first create a kernel.json file in a folder called 'koverse'

Configure the kernel.json file as follows by setting the right value for SPARK_HOME::

 {
  "display_name": "Koverse PySpark",
  "language": "python",
  "argv": [
   "/usr/bin/python",
   "-m",
   "ipykernel",
   "-f",
   "{connection_file}"
  ],
  "env": {
   "SPARK_HOME": "",
   "PYTHONPATH": “$SPARK_HOME/python/:$SPARK_HOME/python/lib/py4j-0.8.2.1-src.zip",
   "PYTHONSTARTUP": “$SPARK_HOME/bin/pyspark",
   "PYSPARK_SUBMIT_ARGS": "--deploy-mode client --jars koverse-sdk.jar,koverse-sdk-xml.jar,koverse-thrift.jar,koverse-server-base.jar,koverse-shaded-deps.jar,accumulo-core.jar,accumulo-fate.jar,accumulo-trace.jar,accumulo-tracer.jar,guava.jar,commons-validator-1.4.0.jar pyspark-shell"
  }
 }


Install the kernel file via the command::

 ipython kernelspec install koverse/

Place the following jars into the $SPARK_HOME folder::

 accumulo-core.jar
 accumulo-trace.jar
 commons-validator-1.4.0.jar
 koverse-sdk-xml.jar
 koverse-server-base.jar
 koverse-thrift.jar
 accumulo-fate.jar
 accumulo-tracer.jar
 guava.jar
 koverse-sdk.jar
 koverse-shaded-deps.jar


Install the Koverse python module via::

 pip install koverse

Then you can fire up Jupyter and create a new notebook using the newly installed Koverse kernel.

In that notebook, you can connect to a Koverse instance via::

 import pyspark
 from koverse.spark import *
 import base64
 sc = SparkContext()
 ksc = KoverseSparkContext(sc, 'localhost', ‘your-username', base64.b64encode(‘your-password’))

You can create an RDD from a Koverse instance as follows, for example::

 rentals = ksc.koverseCollection('Customer Rentals')
 rentals.take(1)

 [{u'email': u'DIANNE.SHELTON@sakilacustomer.org',
   u'first_name': u'DIANNE',
   u'title': u'ACADEMY DINOSAUR'}]

You can process the RDD the same as other Spark RDDs::

 pairs = rentals.map(lambda r: (r['first_name'].lower(), 1))
 nameCount = pairs.reduceByKey(lambda a, b: a + b)
 nameCount.count()
 591
 nameCount.take(1)
 [(u'sheila', 18)]

When you want to write an RDD to Koverse, convert it to be a set of Python dicts and save::

 ncRecords = nameCount.map(lambda nc: {'name': nc[0], 'count': nc[1]})
 ksc.saveAsKoverseCollection(ncRecords, 'name count', append=True)
