.. _Python:

Python
======

Python is a popular interpreted programming language.

Koverse ships with a Python client to allow Python scripts to access the Koverse API.

The Koverse Python client uses Apache Thrift to communicate with the Koverse server. It is possible to generate clients for other languages as well.

To use the Koverse Python client, do the following::

 sudo pip install koverse
 Downloading/unpacking koverse
  Downloading koverse-1.4.0-py2.py3-none-any.whl (144kB): 144kB downloaded
 Requirement already satisfied (use --upgrade to upgrade): thrift in /Library/Python/2.7/site-packages (from koverse)
 Requirement already satisfied (use --upgrade to upgrade): kafka-python in /Library/Python/2.7/site-packages (from koverse)
 Requirement already satisfied (use --upgrade to upgrade): six in /Library/Python/2.7/site-packages (from kafka-python->koverse)
 Installing collected packages: koverse
 Successfully installed koverse
 Cleaning up...

The Koverse Python client can then be used in Python scripts by importing the koverse module::

 $ python
 Python 2.7.6 (default, Sep  9 2014, 15:04:36)
 [GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.39)] on darwin
 Type "help", "copyright", "credits" or "license" for more information.
 >>> from koverse import client

Connecting to the Koverse Server
--------------------------------

The Python client can connect to the hostname of the Koverse Server (note: this is not the address of the Koverse Web App).::

 >>> client.connect('localhost')

If for some reason the client loses the connection to the Koverse Server, such as when the Koverse Server is restarted, the client can reconnect simply by calling client.connect() again.

Users can authenticate themselves to the Koverse server using their username and base-64 encoded passwords::

 >>> import base64
 >>> client.authenticateUser('myusername', base64.b64encode('mypassword'))
 >>>

If the authentication is unsuccessful an exception is raised::

 Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/Library/Python/2.7/site-packages/koverse/client.py", line 93, in authenticateUser
    tUser = ugClient.authenticateUser(auth, None, parameters)
  File "/Library/Python/2.7/site-packages/koverse/thriftgen/usergroup/UserGroupService.py", line 782, in authenticateUser
    return self.recv_authenticateUser()
  File "/Library/Python/2.7/site-packages/koverse/thriftgen/usergroup/UserGroupService.py", line 807, in recv_authenticateUser
    raise result.ke
 koverse.thriftgen.ttypes.TKoverseException: TKoverseException(_message='No authenticated user found')

Querying Koverse Collections
----------------------------

The Koverse Python client can be used to interactively query collections, fetch samples, create collections and run transforms.

To query one or more collections, use the client's query() method. In this example, we'll query Koverse for any collection that has a value above 100 in a field named 'Close'.::

 >>> results = client.query({'Close': {'$gt': 100.0}})
 >>> len(results)
 736

Results are returned as a list of Python dicts, each representing a record from a Koverse collection::

 >>> import pprint
 >>> pprint.pprint(results[0])
 {'AdjClose': 34.9,
  'Close': 256.88,
  'Date': time.struct_time(tm_year=42304, tm_mon=11, tm_mday=6, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=6, tm_yday=311, tm_isdst=0),
  'High': 267.88,
  'Low': 199.25,
  'Open': 263.84,
  'Volume': 236228300}

Koverse records contain fields and values. Values may be of a simple type such as int and date, but may also contain lists or dicts.

To query a specific set of collections, specify an optional parameter with a list of collection names to query::

 >>> client.query({'Close': {'$gt': 100.0}}, ['stocks'])

or, by using the name parameter 'collections'::

 >>> client.query({'Close': {'$gt': 100.0}}, collections=['stocks'])

Clients can also request that the results be limited to a set number, and can request that the Koverse server deliver results beginning at a specified offset. For example::

 >>> client.query({'Close': {'$gt': 100.0}}, collections=['stocks'], limit=10, offset=100)

Clients can also request that the Koverse Server return only a subset of the fields in each record by specifying a list of field names to include::

 >>> pprint.pprint(client.query({'Close': {'$gt': 100.0}}, collections=['stocks'], limit=10, offset=100, fields=['Close']))
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

Fetching Collection Samples
---------------------------

Because Python runs on a single machine, and because Koverse collections may contain a large volume of records, it can be useful to
work with a sample of a collection's records, especially when building statistical models designed to be trained on a representative sample.

Koverse maintains representative samples for all collections by default. These samples can be retrieved by the client using the getSamples() method::

 >>> samples = client.getSamples('stocks')
 >>> len(samples)
 1000



Uploading resource files
------------------------

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

Now we'll store our 'model', which just consists of these two numbers, the mean and standard deviation, in a file that we can upload and use in a transform.
Typically we wouldn't do this for such a simple model, we could pass those numbers as parameters to a transform. But for more complicated models using a file is much more convenient.
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
--------------------------------------

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

 # records from input collections are delivered as JSON objects via stdin
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
 inputCollection: Input Collection(s)
 outputCollection: Output Collection
 pythonPathParam: Path to Python Executable
 scriptParam: Python script
 resourceFiles: Comma separated resource file paths

The pythonPathParam should reference the path to the Python executable on MapReduce workers. This allows us
to use a particular version of the Python interpreter if necessary.

Define the options we'll pass to our Transform, which includes the Python script and the model filename we stored in the previous section.
We don't need to specify the input and output collections here, we'll do that later in the call to create the transform.::

 >>> options = {
	'pythonPathParam': '/usr/local/bin/python2.7',
	'scriptParam': script,
	'resourceFiles': modelFilename
 }

Create a collection to store the output::

 >>> client.createCollection('anomalous changes')

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

Note that Transforms are configured by default to not run sooner than once per hour. Any jobs submitted earlier than that will be blocked until an hour has passed.

The output will be stored in the output collection we specified.
We can examine a sample of the output to verify our results::

 >>> sampleOutput = client.getSamples('anomalous changes')
 >>> first = sampleOutput[0]
 >>> print first['Close'] - first['Open']
 -22.44

This shows an example of a day when a stock dropped by 22.44 points, which is more than two standard deviations from the typical daily change.

The Python client can also be used in the context of Python tools such as iPython Notebook (http://ipython.org/notebook.html).
Simply use the same methods described above in iPython Notebooks.
