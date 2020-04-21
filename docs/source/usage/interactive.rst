.. _InteractiveAnalytics:

Prototyping Analytics
=====================

In addition to running transforms to process data sets at scale, Koverse also enables users to perform interactive analysis of data sets at scale via popular tools such as Apache Spark and Zeppelin Notebook and Spark shells, including pyspark, spark-shell, and sparkR.  Users may want to retrieve and analyze part or a whole data set.  As mentioned  in the “Indexing and Search Guide” users may query the whole system or a set of datasets this can be performed in notebooks and shells.   Many of the examples here will be from a dataset that can be downloaded from here, follow the instructions to upload a dataset to put this into Koverse.
https://s3.amazonaws.com/koverse-datasets/financial+demo/employees.csv


Analytics Setup
---------------
Please reference the :ref:`OptionalInstalls` to setup each of the following. The python client and Koverse Spark Data Sourse must be installed before performing these exercises.

 * Python Client
 * Koverse Spark Data Source
 * Zeppelin

API Token
---------
For these examples you should also have an API Token, setting this up is as described in the :ref:`ApiTokens` section it should be something like the following image. These examples will be referencing the token.
Note the hostname and the apiToken.

- :code:`hostname`: The FQDN of the server running the koverse-server process, this could be 'localhost'
- :code:`apiToken`: A Koverse API Token that will have the required access to the Data Set being loaded. You can create API Tokens via the Koverse Admin UI. Use the API Token UUID, not its name.

  .. image:: /_static/UsageGuide/zeppelinAPIToken2.png

Launching Pyspark
-----------------
In this document we will discuss using Pyspark but these examples can be performed in a notebook as well.  An example of starting the Python Spark shell is seen below, note the datasource should be changed to the data source version and the location where you downloaded the jar file for the Koverse Spark Data Source.

 $ pyspark --jars /home/koverse/<your path>/koverse-spark-datasource-3.2.6.jar

You can also run using the nexus.koverse.com repository.

 $ pyspark --repositories http://nexus.koverse.com/nexus/content/groups/public/ --packages com.koverse:koverse-spark-datasource:3.2.6

Note that at this point the SparkContext :code:`sc` and the SQLContext :code:`sqlContext` are initialized. To load a Koverse Data Set into a DataFrame:

.. code-block:: python

  >>> df = sqlContext.read.format('com.koverse.spark').options(hostname='<your koverse fqdn>', apiToken='<your api token>').load('<your data set name>')

.. code-block:: python

  >>> df = sqlContext.read.format('com.koverse.spark').options(hostname='localhost', apiToken='11111111-11111-1111-1111111111111111').load('employees')

Now you have access to the Koverse Data Set via the Spark DataFrame API.

Note that at this point the SparkContext sc and the SQLContext sqlContext are initialized.   Koverse ships with a Python client to allow Python scripts to access the Koverse API. The Koverse Python client uses Apache Thrift to communicate with the Koverse server. It is possible to generate clients for other languages as well.
The Koverse Python client can then be used in Python scripts by importing the koverse module:

 >>> from koverse import client


Connecting to the Koverse Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Python client can connect to the hostname of the Koverse Server (note: this is not the address of the Koverse Web App) and the authenticatorId and apiTokenId have been created in Koverse:

.. code-block:: python

 from koverse import client
 from koverse.thriftgen.security.ttypes import TAuthInfo
 client.connect('localhost')
 client.auth = TAuthInfo()
 client.auth.authenticatorId = 'zeppelin'
 client.auth.apiTokenId = '11111111-11111-1111-1111111111111111'
 client.auth.externalTokens = []
 client.auth.externalGroups = []

If the authentication is unsuccessful an exception is raised:

.. code-block:: python

  Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/Library/Python/2.7/site-packages/koverse/client.py", line 93, in authenticateUser
    tUser = ugClient.authenticateUser(auth, None, parameters)
  File "/Library/Python/2.7/site-packages/koverse/thriftgen/usergroup/UserGroupService.py", line 782, in authenticateUser
    return self.recv_authenticateUser()
  File "/Library/Python/2.7/site-packages/koverse/thriftgen/usergroup/UserGroupService.py", line 807, in recv_authenticateUser
    raise result.ke
  koverse.thriftgen.ttypes.TKoverseException: TKoverseException(_message='No authenticated user found')

Querying Koverse Data Sets
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Koverse Python Client can be used to interactively query data sets, fetch samples, create data sets and run transforms.

To query one or more data sets, use the client's query() method. In this example, we’ll query Koverse for any data set that has a value “INTR-345” in a field named ‘name’.

.. code-block:: python

  >>> results = client.query({'orgCode': 'INTR-345'})
  >>> print("Datasets Containing query",len(results))
  >>> print("Number of records in first dataset",len(list(results[0].records)))
  Datasets Containing query 1
  Number of records in first dataset 19

Results are returned as a list of Python dicts, each representing a record from a Koverse data set:

.. code-block:: python

  >>> import pprint
  >>> pprint.pprint(list(results[0].records)[0])
  {'businessUnit': 'IN',
 'hireDate': time.struct_time(tm_year=45199, tm_mon=12, tm_mday=31, tm_hour=0,   tm_min=3, tm_sec=20, tm_wday=4, tm_yday=365, tm_isdst=0),
 'name': 'James Barlow',
 'orgCategory': 'INTR',
 'orgCategoryDescription': 'Investments - Trading',
 'orgCode': 'INTR-345',
 'traderId': 'TRD0050299'}


Koverse records contain fields and values. Values may be of a simple type such as int and date, but may also contain lists or dicts.

To query a specific set of data sets, specify an optional parameter with a list of data set names to query:

.. code-block:: python

  >>> results = client.query({'orgCode': 'INTR-345'}, ['employees'])

or, by using the name parameter 'datasets':

.. code-block:: python

  >>> client.query({'Close': {'$gt': 100.0}}, datasets=['stocks'])

Clients can also request that the results be limited to a set number, and can request that the Koverse server deliver results beginning at a specified offset. For example:

.. code-block:: python

  >>> client.query({'Close': {'$gt': 100.0}}, datasets=['stocks'], limit=10, offset=100)

Clients can also request that the Koverse Server return only a subset of the fields in each record by specifying a list of field names to include:

.. code-block:: python

  >>> pprint.pprint(client.query({'Close': {'$gt': 100.0}}, data sets=['stocks'], limit=10, offset=100, fields=['Close']))
    [{'Close': 110.88},
    {'Close': 111.56},
    {'Close': 111.25},
    {'Close': 110.75},
    {'Close': 111.63},
    {'Close': 111.25},
    {'Close': 111.5},
    {'Close': 111.25},
    {'Close': 111.5},
    {'Close': 111.5}]

Fetching Data Set Samples
^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse data sets may contain a large volume of records, it can be useful to work with a sample of a data set’s records, especially when building statistical models designed to be trained on a representative sample.
Koverse maintains representative samples for all data sets by default. These samples can be retrieved by the client using the getSamples() method:

.. code-block:: python

  >>> samples = client.getSamples(dataset = 'employees', maxRecords=100, removeByteArrays=False, maxStringLength=100)
  >>> pprint.pprint(list(samples))
  [{'businessUnit': 'IN',
  'hireDate': time.struct_time(tm_year=40242, tm_mon=4, tm_mday=22, tm_hour=20, tm_min=3, tm_sec=20, tm_wday=4, tm_yday=112, tm_isdst=0),
  'name': 'Charde Moore',
  'orgCategory': 'INTR',
  'orgCategoryDescription': 'Investments - Trading',
  'orgCode': 'INTR-345',
  'traderId': 'TRD0050376'},
 {'businessUnit': 'PB',
  'hireDate': time.struct_time(tm_year=40008, tm_mon=8, tm_mday=22, tm_hour=16, tm_min=20, tm_sec=0, tm_wday=4, tm_yday=235, tm_isdst=0),
  'name': 'Evelyn Carr',
  'orgCategory': 'PBCS',
  'orgCategoryDescription': 'Private Banking - Client Services',
  'orgCode': 'PBCS-67',
  'traderId': 'TRD0050130'},


..
  Uploading resource files
  ^^^^^^^^^^^^^^^^^^^^^^^^^

  One advantage of Python is that is has a number of well supported libraries for doing
  sophisticated data analysis , such as numpy (http://www.numpy.org), scipy (http://www.scipy.org),
  nltk for natural language processing (http://nltk.org),
  pandas for data manipulation and analysis http://pandas.pydata.org,
  scikit-learn for machine learning (http://scikit-learn.org/stable/), etc.

  For this simple example, we'll model the distribution of day to day changes in stock prices so we can identify anomalous jumps or dips in price.
  We can pull a sample of the stock prices from Koverse using the getSamples() method::

   >>> samples = client.getSamples('stocks')

  We'll model the day-to-day changes in price as a gaussian random walk (https://en.wikipedia.org/wiki/Random_walk#Gaussian_random_walk).::

   >>> differences = [r['Close'] - r['Open'] for r in samples]
   >>> import numpy
   >>> mean = numpy.mean(differences)
   >>> mean
   -0.085472972972972849
   >>> stddev = numpy.std(differences)
   >>> stddev
   8.6134268092274517

  Now we'll store our model, which just consists of these two numbers, the mean and standard deviation, in a file that we can upload and use in a transform.
  Typically we wouldn't do this for such a simple model, we could pass those numbers as parameters to a transform.
  But for more complicated models using a file is much more convenient.
  The storeResourceFile() method will upload the model data to a file in HDFS so that it can be accessed by workers in parallel::

   >>> import cPickle
   >>> modelData = base64.b64encode(cPickle.dumps((mean, stddev)))
   >>> modelFilename = client.storeResourceFile('model1',modelData)
   >>> modelFilename
   '1438664105966model1'

  Note: we used the numpy package to obtain these parameters, which means numpy must also be installed on our MapReduce worker nodes.

  The storeResourceFile() method returns a unique filename that Transform scripts can reference.
  Now we can use it to score all the daily changes in price to look for anomalous changes, for example: changes that are greater than two standard deviations from the mean.
  We'll do that in the next section.

  Running a Python Script as a Transform
  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  Koverse supports running Python scripts in Transforms. These transforms are simple map-only transforms.


  We'll write our Python script for scoring daily stock changes based on our model.
  The list of any resource files included will be passed in as an argument to our script.
  In our case, we have one model filename. If there are multiple resource files, they will be separated by commas::

   >>> script = '''
   #/usr/bin/python

   import numpy
   import cPickle
   import base64
   import sys
   import json

   # load our model
   modelFile = sys.argv[1]
   f = open('/tmp/' + modelFile)
   mean, stddev = cPickle.loads(base64.b64decode(f.read()))
   f.close()

   # records from input data sets are delivered as JSON objects via stdin
   for line in sys.stdin:

  	record = json.loads(line.strip())

  	# calculate price change
  	change = record['Close'] - record['Open']

  	# if change is more than two standard deviations from the mean
  	# consider it anomalous and output the record
  	if abs(change - mean) / stddev > 2.0:
  		print json.dumps(record)
  		sys.stdout.flush()

   '''

  Be sure to call sys.stdout.flush() after outputting a new record.

  Any libraries our script needs to use should be installed on all the MapReduce worker nodes before hand.
  Care should be taken to ensure the proper versions of libraries are installed.
  See instructions on this site https://www.digitalocean.com/community/tutorials/how-to-set-up-python-2-7-6-and-3-3-3-on-centos-6-4 for tips on installing python 2.7 packages on CentOS.

  In our example, workers will need the popular numpy package, which can be installed via::

   sudo /usr/local/bin/pip install numpy

  once Python 2.7 and pip are installed.

  To get a description of a Transform use the getTransformDescription() method. This will tell us the parameters we need to fill out to create a transform.
  We're using the Python script Transform that ships with Koverse, identified by the name 'python-transform'::

   >>> desc = client.getTransformDescription('python-transform')
   >>> for param in desc.parameters:
   ...     print param.parameterName + ': ' + param.displayName
   ...
   inputDataSet: Input Data Set(s)
   outputDataSet: Output Data Set
   pythonPathParam: Path to Python Executable
   scriptParam: Python script
   resourceFiles: Comma separated resource file paths

  The pythonPathParam should reference the path to the Python executable on MapReduce workers. This allows us
  to use a particular version of the Python interpreter if necessary.

  Define the options we'll pass to our Transform, which includes the Python script and the model filename we stored in the previous section.
  We don't need to specify the input and output data sets here, we'll do that later in the call to create the transform.::

   >>> options = {
  	'pythonPathParam': '/usr/local/bin/python2.7',
  	'scriptParam': script,
  	'resourceFiles': modelFilename
   }

  Create a data set to store the output::

   >>> client.createDataSet('anomalous changes')

  To setup a transform, use the createTransform() method.::

   >>> transform = client.createTransform(
  		'python-transform',
  		'score daily changes',
  		['stocks'],
  		'anomalous changes',
  		options)

  This returns a Transform object.
  To obtain a list of Transforms that have already been created, use the listTransforms() method.

  To run the transform we'll use its run() method::

   >>> job = transform.run()

  This will instantiate a MapReduce job that executes our Python script on all of the MapReduce worker nodes in parallel.
  This way we can process a large amount of data efficiently.

  The output will be stored in the output data set we specified.
  We can examine a sample of the output to verify our results::

   >>> sampleOutput = client.getSamples('anomalous changes')
   >>> first = sampleOutput[0]
   >>> print first['Close'] - first['Open']
   -22.44

  This shows an example of a day when a stock dropped by 22.44 points, which is more than two standard deviations from the typical daily change.

  The Python client can also be used in the context of Python tools such as iPython Notebook (http://ipython.org/notebook.html).
  Simply use the same methods described above in iPython Notebooks.


Spark Shell (Scala)
---------------------

An example of starting the Scala Spark shell is seen below::

 $ spark-shell --repositories http://nexus.koverse.com/nexus/content/groups/public/ --packages com.koverse:koverse-spark-datasource:3.2.6

Like with the PySpark shell, at this point the SparkContext :code:`sc` and the SQLContext :code:`sqlContext` are initialized. To load a Koverse Data Set into a DataFrame::

 scala> val df = sqlContext.read.format("com.koverse.spark").option("hostname", "<your koverse fqdn>").option("apiToken", "<your api token>").load("<your data set name>")

SparkR
-------

An example of starting the R Spark shell is seen below. Note, this has the prerequisite of the R runtime already being installed::

  $ sparkR --repositories http://nexus.koverse.com/nexus/content/groups/public/ --packages com.koverse:koverse-spark-datasource:3.2.6

To load a Koverse Data Set into a DataFrame::

  df <- read.df(sqlContext, "com.koverse.spark", hostname="<your koverse fqdn>", apiToken="<your api token>", path="<your data set name")

Apache Zeppelin
------------------

Apache Zeppelin is a notebook tool that allows developers to create code and comments in an interactive manner without
requiring a full development environment.  Refer to the :ref:`OptionalInstalls` to install Zeppelin.
You can now proceed with creating Zeppelin notebooks that access Koverse. Simply create a new notebook and then create a new data frame using the Koverse Spark Data Source as follows::

    // Connect to the Koverse Spark Data Source on localhost and create a data frame using the data set named "employees"
    val df = sqlContext.read.format("com.koverse.spark").option("hostname", "localhost").option("apiToken", "99ff62de-42ac-4b8b-b7dd-79b02bb50da2").load("employees")

* The data in the data frame can now be manipulated as any other data in Spark.  For example, see below for a full example
  using the sample bank employee data available at https://s3.amazonaws.com/koverse-datasets/financial+demo/employees.csv

  .. image:: /_static/UsageGuide/zeppelinNotebook.png
