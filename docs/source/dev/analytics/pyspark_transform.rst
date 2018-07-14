.. _PySparkTransform:

PySpark Transforms
==================

Koverse supports writing Transforms using Apache Spark's PySpark API.

To write a PySpark Transform, create a python file called transform.py.
This file should contain a class called PySparkTransform and should start out with the following code::


  class PySparkTransform(object):
    def __init__(self, params):
      pass

    def execute(self, context):
      pass

The init() function is where the parameters object is delivered, that contains the values users have specified in the Koverse UI for this Transform.

The execute() function is passed a context object that contains the input data sets users have specified using the Koverse UI. Each input data set is available as both an RDD of Python dicts, and as a DataFrame, and are retrieve from the inputRdds and inputDataFrames fields respectively. The context object also contains a reference to the SparkContext and SQLContext.

The structure of the context object passed is as follows::

 {
  inputRdds: {
    'inputRddOne': rdd,
    'inputRddTwo': rdd,
    ...
  },
  {
    inputDataFrames: {
      'inputDataFrameOne': dataFrame,
      'inputDataFrameTwo': dataFrame,
      ...
    }
  },
  sparkContext: sparkContext,
  sqlContext: sqlContext
 }

Each PySpark Transform also requires a description.yaml file in which we'll name our Transform and declare parameters required to configure the Transform at run time. The list of properties that should be filled out in all Transforms is as follows::

 id: string - a unique identifier like 'my-pyspark-transform'
 name: string - a readable name that will be displayed in the UI
 description: string - a readable description
 parameters: list - a list of parameters as described below
 version: string - a version number like '1.0.0'

In addition, the following optional properties may be specified::

 supportsIncrementalProcessing : false - whether the transform supports being run on just a new bit of input data or needs to be run on all the data every time

Parameters should have the following properties specified::

 displayName: string - the name of the parameter shown in the UI
 parameterName: string - a unique identifier to be used in your transform to retrieve the value of this parameter
 type: one of the available types described below

In addition, parameters can have the following optional properties::

 enumerations: list - a set of values to be presented to users in the UI for parameters of the type enumeration
 defaultValue: string - a default value to assign to this parameter
 required: true - whether this parameter must be specified
 hint: string - a helpful hint as to what value to specify for this parameter
 parameterGroup: string - a name of a group in which this parameter should be grouped when displayed in the UI
 placeholder: string - an example value to be shown until the user enters a value
 position: 0 - where this parameter should be displayed within it's parameter group
 hideInput: false - whether to mask the value of this value in the UI, for things like passwords

Parameters can have the following types::

 string - simple string value
 text - multiline string value
 url - string that can be interpreted as a URL
 boolean - either 'true' or 'false'
 date - a date time value
 integer - numerical integer value
 enum - one of a set of values specified in the 'enumerations' option above
 collectionField - the name of a field appearing in an input data set
 collectionMultipleField - a comma-separated set of field names appearing in an input data set

For this example, we'll write a PySpark Transform that extracts the average sentiment score associated with each subject (noun phrase) mentioned in a set of sentences in a body of text. Our Transform will use the TextBlob library (http://textblob.readthedocs.io) to break text into sentences, identify noun phrases, and assign a sentiment score to each sentence that we will associate with each noun phrase and then average. This is intended to give us a general sense of the sentiment associated with various subjects mentioned in a text document.

This Transform will only require users to tell us which text field to which we should apply our analysis. This way this Transform can be used to associate sentiment with subjects in any data set containing text, whether it's a set of customer service emails, social media posts, news articles, etc.

First we'll make a description file to define our transform and declare its parameters::

 id: subject-sentiment
 name: 'Extract Subject Sentiment'
 description: 'Extract the average sentiment associated with subjects mentioned in text'
 parameters:
   -
       displayName: 'Text field'
       parameterName: textField
       type: collectionField
 version: '0.1.0'
 supportsIncrementalProcessing: true

We'll save this in a file called description.yaml.

In order to use the TextBlob library, which depends on NLTK, so we'll need to pip install those on every machine in our cluster that is running a PySpark executor::

 sudo pip install textblob
 sudo pip install nltk

At the beginning of our Transform we'll need to import those too, and ensure we have some corpora required for sentiment analysis and sentence splitting::

  from textblob import TextBlob
  import nltk
  nltk.download('punkt')
  nltk.download('brown')

Next we'll fill in the functions we declared above in our PySparkTransform class. Starting with the init() function::

 def __init__(self, params):
   self.textField = params['textField']

Here, were simply saving off the value of the 'textField' parameter we declared in our description.yaml file. The id of the parameter must match what we write here.

Next we'll write our execute() function. First we'll simply grab the first data set passed in via the context object::

  def execute(self, context):
    inputRdd = context.inputRdds.items()[0][1]

Instead of grabbing the RDD we can instead grab a DataFrame. To grab a Data Frame instead we could have written::

  def execute(self, context):
    inputDF = context.inputDataFrames.items()[0][1]

For the rest of this example we'll stick with an RDD.

Next we'll write a function to extract noun_phrase and sentiment pairs from a blob of text using the TextBlob library. We'll also write a simple function to average a list of numbers::

  def execute(self, context):
    inputRdd = context.inputRdds.items()[0][1]

    def extractSentimentPerPhrase(doc):
      blob = TextBlob(doc)
      tuples = []
      for sent in blob.sentences:
        sentiment = sent.sentiment.polarity
        # pair the sentence sentiment with each noun phrase in it
        for phrase in sent.noun_phrases:
          tuples.append((phrase, sentiment))
      return tuples

    def average(l):
      return sum(map(float, l)) / float(len(l))

Now we'll apply these functions to our data::

    textField = self.textField

    rdd = context.inputRdds.items()[0][1]

    # get only the records that have some text
    textRecords = rdd.filter(lambda r: textField in r and len(r[textField]) > 0)
    # extract the text
    textRdd = textRecords.map(lambda r: r[textField])
    # extract subjects and sentiment pairs
    subjectSentiments = textRdd.flatMap(extractSentimentPerPhrase)
    # average sentiment per subject
    subjectAvgSentiment = subjectSentiments.groupByKey().map(lambda t: (t[0], average(t[1])))
    # convert to python dicts
    return subjectAvgSentiment.map(lambda t: {'subject': t[0], 'average sentiment': t[1]})

Note that Transform should return either an RDD of Python dicts or a DataFrame.

We can write a simple test program to try out our code on some example data. We'll create a file called test.py with the following::

  from koverse.transformTest import PySparkTransformTestRunner
  from transform import PySparkTransform
  import unittest

  text = '''
  I can't stand writing test cases, I really hate it.
  On the other hand well-tested code is a pretty great thing to have.'
  '''

  class TestSubjectSentimentTransform(unittest.TestCase):

      def testExtractSubjectSentiment(self):
          global text
          inputDatasets = [[{'text': text}]]
          runner = PySparkTransformTestRunner({'textField': 'text'}, PySparkTransform)
          output = runner.testOnLocalData(inputDatasets).collect()

          # check we have the output schema we expect
          self.assertTrue('subject' in output[0])
          self.assertTrue('average sentiment' in output[0])

          # check output
          for rec in output:
              if rec['subject'] == 'test cases':
                  self.assertTrue(rec['average sentiment'] < 0.0)
              if rec['subject'] == 'pretty great thing':
                  self.assertTrue(rec['average sentiment'] > 0.0)


  if __name__ == '__main__':
      unittest.main()

    def execute(self, context):
      inputDF = context.inputDataFrames.items()[0][1]


We can run this test by running spark-submit on our test.py file::

  $SPARK_HOME/bin/spark-submit test.py

If all goes we'll our test passes. We can correct any errors in our Transform and keep running our test until it passes.

Now our Transform is ready to be deployed to a Koverse instance so everyone can use it in production pipelines. We'll simply zip up the description.yaml and transform.py files into a zip file. (We can also zip up our test.py file and it shouldn't cause any problems.) We should name our zip file SubjectSentimentAddon.zip.

Then we can upload our new zip file as a Koverse AddOn the same way we upload other addons via the UI. For steps to do that see :ref:`AddOns` for more details.
