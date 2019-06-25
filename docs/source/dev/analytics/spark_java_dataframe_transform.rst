.. _SparkJavaDataFrameTransform:

Spark Java DataFrame Transform
==============================

Spark DataFrames provide functionality for working with structured data easily and allows SQL functions to be used.
Koverse provides the records in user-selected data sets to Spark as DataFrames and automatically defines the schema of each DataFrame according to the structure of records in each Koverse data set.

To start a project containing a custom Transform, we'll need to include the Koverse SDK.
See :ref:`LinkingSDK` for details.

DataFrame Transform Example
---------------------------

In this example we'll generate sentiment analysis scores for records containing text and a date field using a Spark DataFrame and Java.
This will allow us to see if sentiment is changing over time.

First we'll start off by subclassing JavaSparkDataFrameTransform::

  package com.koverse.examples.analytics;

  import com.koverse.sdk.Version;
  import com.koverse.sdk.data.Parameter;
  import com.koverse.sdk.transform.java.DataFrameTransform;
  import com.koverse.sdk.transform.java.DataFrameTransformContext;
  import org.apache.spark.broadcast.Broadcast;
  import org.apache.spark.sql.Dataset;
  import org.apache.spark.sql.Row;
  import org.apache.spark.sql.api.java.UDF1;
  import org.apache.spark.sql.functions;
  import org.apache.spark.sql.types.DataTypes;

  import java.util.Map;


  public class SentimentAnalysis extends DataFrameTransform {

  }

If you're using an IDE such as Eclipse or Netbeans you can use the IDE's function to generate stubs for the functions required to be implemented by the JavaSparkDataFrameTransform class.

We'll begin by defining a set of parameters that our Transform will use to request configuration information from a user of the Koverse UI.
In this case we'll ask the user to tell our Transform which field in their data contains text and which field contains a date::

    public static final String TEXT_COL_PARAM = "textCol";
    public static final String DATE_COL_PARAM = "dateCol";
    public static final String ANALYZE_SENTIMENT_TRANSFORM = "analyze-sentiment";

    @Override
    public Iterable<Parameter> getParameters() {
      return newArrayList(
          Parameter.newBuilder()
              .displayName("Text field")
              .parameterName(TEXT_COL_PARAM)
              .required(Boolean.TRUE)
              .type(Parameter.TYPE_COLLECTION_FIELD)
              .build(),
          Parameter.newBuilder()
              .displayName("Date field")
              .parameterName(DATE_COL_PARAM)
              .required(Boolean.TRUE)
              .type(Parameter.TYPE_COLLECTION_FIELD)
              .build(),
          Parameter.newBuilder()
              .required(true)
              .type(Parameter.TYPE_INPUT_COLLECTION)
              .parameterName("inputDataset")
              .displayName("Dataset containing input records")
              .build());
    }

Next will implement our *execute()* function which will generate sentiment scores based on the text field and return a new data frame with the new score field and original text and date fields.
We'll start by extracting the user specified names for the text and date fields::

    @Override
    public Dataset<Row> execute(DataFrameTransformContext context) {
      String textCol = context.getParameters().get(TEXT_COL_PARAM);
      String dateCol = context.getParameters().get(DATE_COL_PARAM);

We'll generate a sentiment score by using a word list published in the `AFINN data set <http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010>`_.
The example code in the koverse-sdk-project repo contains this data set represented in the AfinnData class as a static Java Map that we'll use to lookup the sentiment score of each word and generate an average sentiment for each message.

To help us distribute this list in our Spark job, we'll take advantage of `Spark's broadcast variables <https://spark.apache.org/docs/1.6.0/programming-guide.html#broadcast-variables>`_, which will distribute our list once per executor so we don't ship it on a per-task basis::

    // distribute our word list
    final Broadcast<Map<String, Integer>> broadcastWordList =
        context.getSparkContext().broadcast(AfinnData.getWordList(), scala.reflect.ClassTag$.MODULE$.apply(Map.class));

Since this is a data frame transform Spark expects us to use SQL functions or custom user-defined functions (UDFs).
We'll write a UDF that references our word list to generate an overall score for each message based off of all the words that appear in that message::

    UDF1 sentimentUDF = new UDF1<String, Double>() {

      @Override
      public Double call(String text) throws Exception {

        Map<String, Integer> wordList = broadcastWordList.getValue();

        // compute average score from all words
        String[] words = text.toLowerCase().split("\\s+");
        Double score = 0.0;
        for (String word : words) {
          if (wordList.containsKey(word)) {
            score += wordList.get(word);
          }
        }

        score /= words.length;
        return score;
      }
    };

We have to register our UDF in order to use it to create a new column for our data frame::

    context.getSQLContext().udf().register("sentimentUDF", sentimentUDF, DataTypes.DoubleType);

Now we'll grab the data frame created by Koverse from a data set the user has specified.
Then we'll select only the text column and date column from it (naming the text column "text" for consistency), drop any rows that are missing a value for the date or text columns, and generate a new column consisting of sentiment scores using our UDF::

    Dataset<Row> rowDataset = context.getDataFrames().values().iterator().next();

    return rowDataset
       .select(rowDataset.col(textCol).alias("text"), rowDataset.col(dateCol))
        .na().drop()
        .withColumn("score", functions.callUDF("sentimentUDF", rowDataset.col("text")));
  }

We return the resulting data frame and Koverse will store the information in that data frame as a new Data Set in Koverse.
It will index all the data in the Data Set and apply access protection to this Data Set.
By default, the user that created the resulting Data Set is the only user allowed to see the data within it until he or she decides to grant access to users in other groups.

To complete our Transform we'll give it a description, name, type ID, and version number::

      @Override
      public String getDescription() {
      return "Generate a sentiment score for each record containing text. "
          + "Also requires records to have a date field so changes in sentiment can be seen over time";
      }

      @Override
      public String getName() {
        return "Analyze Sentiment Over Time";
      }

      @Override
      public String getTypeId() {
        return ANALYZE_SENTIMENT_TRANSFORM;
      }

      @Override
      public Version getVersion() {
        return new Version(0, 1, 0);
      }

      @Override
      public boolean supportsIncrementalProcessing() {
        return false;
      }
  }

Testing Transforms
------------------

Koverse is designed primarily as a production big data system, providing analytics developers with the ability to provide analytics to a broad community of users and supporting running analytics in a production environment with monitoring, scheduling, and access control capabilities.
But before we're ready for production we need to test our new analytic prototype.
For that we'll write a small test class that uses the Koverse *SparkTestTransformRunner* to rapidly check that our transform is producing the desired output.

We'll write a few unit tests that uses the SparkTestTransformRunner to process some test records and produce output we can inspect and check::


  package com.koverse.examples.analytics;

  import static org.junit.Assert.assertEquals;

  import com.koverse.sdk.data.SimpleRecord;
  import com.koverse.sdk.test.SparkTransformTestRunner;

  import org.junit.Test;

  import java.util.ArrayList;
  import java.util.Date;
  import java.util.HashMap;
  import java.util.List;
  import java.util.Map;

  public class TestSentimentAnalysisOverTime {

    @Test
    public void simpleTest() {
      // todo
    }
  }


In the *simpleTest* method we'll need some input records to test.
The Koverse UI supports downloading a sample of a data set to a CSV or JSON file.
The *CsvToSimpleRecord* or *JsonToSimpleRecord* classes in the com.koverse.sdk.test package could then be used to convert your sample file into a List of SimpleRecord objects that can be passed to the test runner.

It's often a good idea to test your transform on real data, in order to find out if there are irregularities that your Transform will need to handle such as missing values, truncated values, and varying value types.
For our unit test we're going to create some simple test messages::

  // create messages
  double badScore = AfinnData.sentiment("bad");
  double goodScore = AfinnData.sentiment("good");

  SimpleRecord badMessage = new SimpleRecord();
  badMessage.put("message", "bad");
  badMessage.put("date", new Date());

  SimpleRecord goodMessage = new SimpleRecord();
  goodMessage.put("message", "good");
  goodMessage.put("date", new Date());

  SimpleRecord mixedMessage = new SimpleRecord();
  mixedMessage.put("message", "bad good");
  mixedMessage.put("date", new Date());

  List<SimpleRecord> testMessages = new ArrayList<>();
  testMessages.add(badMessage);
  testMessages.add(goodMessage);
  testMessages.add(mixedMessage);

We'll also want to create a set of expected scores that we can check our Transform's output against for correctness.
Our score algorithm simply averages the sentiment of each word in a message::

  // define the scores we expect to see for each message
  Map<String, Double> expectedScore = new HashMap<>();
  expectedScore.put("bad", badScore);
  expectedScore.put("good", goodScore);
  expectedScore.put("bad good", (badScore + goodScore) / 2.0);

Let's setup our transform as if a user had configured it via the Koverse UI.
We'll specify which fields our transform should look for, that correspond with the data we'll generate::

  Map<String, String> params = new HashMap<>();
  params.put(SentimentAnalysisOverTime.TEXT_COL_PARAM, "message");
  params.put(SentimentAnalysisOverTime.DATE_COL_PARAM, "date");

  // associate our records with a data set name
  Map<String, List<SimpleRecord>> dataSets = new HashMap<>();
  dataSets.put("test messages", testMessages);

Now we can run our Transform logic on this data to generate sentiment scores::

  // process the input records using our Transform class
  List<SimpleRecord> output =
          SparkTransformTestRunner.runTest(SentimentAnalysisOverTime.class, params, dataSets, "sentiment data");

The output will consist of the transformed records with newly calculated sentiment scores for each message, along with the original message text so we can tell which message is which.
We'll compare the calculated scores to the scores we expect::

  // check the output
  for (SimpleRecord record : output) {
    System.out.println(record);
    assertEquals(expectedScore.get((String)record.get("text")), (Double)record.get("score"));
  }

Now we can run our test.
The SparkTransformTestRunner creates an instance of the Spark runtime in local mode and uses that to executes our code.
If we've coded up our Transform correctly, our test should pass.

We also printed out the output to allow us to visually inspect the structure and values of our output records for correctness.
Here we see that the 'bad' message had a negative sentiment score, which we expected, the 'good' message had a positive score, and the 'mixed' message had an average score of 0::

  SimpleRecord{collection=null, securityLabel=null, fields={date=Tue Jan 09 22:06:03 PST 2018, score=-3.0, text=bad}}
  SimpleRecord{collection=null, securityLabel=null, fields={date=Tue Jan 09 22:06:03 PST 2018, score=3.0, text=good}}
  SimpleRecord{collection=null, securityLabel=null, fields={date=Tue Jan 09 22:06:03 PST 2018, score=0.0, text=bad good}}

This looks like our sentiment algorithm is producing the right kind of output.
Now that we think our transform is working, we'll upload it to Koverse so it can be used to process data sets.

Uploading the Transform to Koverse
----------------------------------

We'll package our Transform in a JAR file and upload it to Koverse as an Addon.
To do this we just need to add a file that helps Koverse decide what classes will to inspect.
There is already a plain text file called 'classesToInspect' under src/main/resources.
In that file our class is listed on a line by itself, along with other classes, each on their own line.

Then compile a JAR file using::

  mvn clean package

This will produce a JAR file under the 'target/' folder.
Open up the Koverse UI in a browser.
If you're using the :ref:`DevImage` this will likely be at 'http://localhost:8080'.

Click on the 'Admin' button on the left menu.
Click the 'Addons' tab.

Here we see a list of Addons already loaded into the system.
Drag and drop the JAR file in your target/ folder to the large gray space labeled 'Drag and drop files from your computer' or click the 'Browse Files' button to navigate to your new JAR file.

Koverse will process this file and you should see a new card appear in the list of loaded Addons named 'koverse-sdk-project'.
Also listed on that card should be the name of our Transform.
If that does not appear, double check that your Transform class was compiled in the JAR using 'jar -tf [your-jar]' and verify that the correct name of your Transform class appears in the 'classesToInspect' file in src/main/resources.

See :ref:`Addons` for additional details on building and uploading Addons.

Running the Transform on a Data Set
-----------------------------------

Our Transform is general enough to be run on any Data Set that contains text and an associated date.
This includes social media data, email, chat logs, etc.
Feel free to use the included Twitter, Imap, or other sources provided with the Koverse distribution to process data like this.
But in the interest of illustrating a simple example we can use some synthetic data to get a sense for how to run this Transform on a Data Set quickly.

We'll use the example Synthetic Messages Source described in :ref:`GeneralSource` to generate some synthetic messages to use to test our Transform as it would be used in a production environment.
To generate the synthetic data, follow the instructions in :ref:`GeneralSource`.
The output data can be explored using the example web application described in :ref:`ExampleWebApp` and having a good number of messages will allow us to search for subsets of records and get back a good number of results.

To setup our Transform to analyze the synthetic message data, click the 'Transforms' button on the left menu.
You should see 'Analyze Sentiment Over Time' in the list of Transforms.
Click on 'Analyze Sentiment Over Time' and click the 'Select' button.

Now we see the form that Koverse generates for configuring our Transform.
Note that Koverse will present users with varying inputs corresponding to the type of Parameter objects we declared in our Transform code, to aid users in specifying how the Transform will be configured.
These values will be then made available to our Transform code via the *context.getJavaSparkTransformContext().getParameters()* mechanism.
This is what makes Koverse Transforms flexible and reusable for more than one data set and by users who are not developers.

Select the data set containing the synthetic messages as the lone input data set.
For the 'Text field' choose 'message' and for 'Date field' choose 'date'.
Click the 'New Data Set' option under 'Where should we save the result of this transform?' and click the 'Save' button at the lower right.

This will cause the Transform job to start.
We can watch the progress of the Transform as well as the follow-on jobs to index and profile the new data set.
Once it is complete we can click on the 'Data' tab to see a few example records.

All Transforms write their output data back to Koverse in this way.
The newly created Data Set is accessible at first only by the user who created it.
See :ref:`DataSetSecurityAndAccessControl` for details on grating other groups of users access to this data set.

The results of Transforms are also indexed so that interactive applications can query them to retrieve specific results for many concurrent users.
To see how an example application can be used to present these results to users interactively, see :ref:`ExampleWebApp`.


.. _DataFrameDataTypes:

Data Types supported by DataFrameTransform
------------------------------------------

Many of the data types supported by Koverse are supported by the DataFrameTransform sdk. They include:

+--------------------------------------+--------------------------------------------------+
| Native Value Type                    | Examples and support string formats              |
+======================================+==================================================+
| String                               | "A string of text characters"                    |
+--------------------------------------+--------------------------------------------------+
| Integer                              | 15                                               |
+--------------------------------------+--------------------------------------------------+
| Long                                 | 10000000000L                                     |
+--------------------------------------+--------------------------------------------------+
| Float                                | 44.26                                            |
+--------------------------------------+--------------------------------------------------+
| Double                               | 200.05                                           |
+--------------------------------------+--------------------------------------------------+
| Date                                 | Unix Timestamp:  1371277293 UTC (GMT)            |
|                                      |                                                  |
|                                      | Epoch Timestamp: 1371277293                      |
|                                      |                                                  |
|                                      | DTG:   271545ZFEB13                              |
|                                      |                                                  |
|                                      | Other various date formats supported             |
|                                      |                                                  |
|                                      | * yyyyMMdd hh:mm:ss                              |
|                                      | * EEE MMM d HH:mm:ss Z yyyy                      |
|                                      | * EEE MMM d HH:mm:ss zzz yyyy                    |
|                                      | * yyyy-MM-dd                                     |
|                                      | * yyyy-MM                                        |
|                                      | * yyyy/MM/dd HH:mm:ss                            |
|                                      | * yyyy-MM-dd HH:mm:ss                            |
|                                      | * yyyy/MM/dd HH:mm:ss.SSS                        |
|                                      | * yyyy-MM-dd HH:mm:ss.SSS                        |
|                                      | * MM/dd/yyyy HH:mm                               |
|                                      | * MM-dd-yyyy HH:mm                               |
|                                      |                                                  |
|                                      | requires formatting on input (SimpleDateFormat)  |
+--------------------------------------+--------------------------------------------------+
| KoverseGeoPoint                      | Well Known Text String Format: Point 1.23 60.423 |
|                                      |                                                  |
|                                      | Comma separated decimal lat,long: 1.23,60.423    |
+--------------------------------------+--------------------------------------------------+
| Inet4Address                         | 192.168.1.1                                      |
+--------------------------------------+--------------------------------------------------+
| Boolean                              | true                                             |
+--------------------------------------+--------------------------------------------------+
| byte[]                               | An array of binary bytes such as the             |
|                                      | original bytes of a file                         |
+--------------------------------------+--------------------------------------------------+

As well as Nested types:

+--------------------------------------+--------------------------------------------------+
| Map                                  | Map of String, String ("dog","cat")              |
|                                      | Map of String, Array  ("dog",{1.0,2.0})          |
+--------------------------------------+--------------------------------------------------+
| Array                                | Includes array of string, long,                  |
|                                      | double, bytes, etc.                              |
|                                      | {"cat","dog","rabbit"}                           |
+--------------------------------------+--------------------------------------------------+
| List                                 | java.util.List                                   |
+--------------------------------------+--------------------------------------------------+
| Sequence                             | scala.collection.Seq                             |
+--------------------------------------+--------------------------------------------------+
