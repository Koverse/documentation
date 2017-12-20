
Spark Java DataFrame Transform
==============================

Spark DataFrames provide functionality for working with structured data easily and allows SQL functions to be used.

In this example we'll generate sentiment analysis scores for records containing text and a date field using a Spark DataFrame and Java. This will allow us to see if sentiment is changing over time.

First we'll start off by subclassing JavaSparkDataFrameTransform::

  package com.koverse.examples.analytics;

  import static com.koverse.com.google.common.collect.Lists.newArrayList;

  import com.koverse.sdk.Version;
  import com.koverse.sdk.data.Parameter;
  import com.koverse.sdk.transform.spark.sql.JavaSparkDataFrameTransform;
  import com.koverse.sdk.transform.spark.sql.JavaSparkDataFrameTransformContext;

  import org.apache.spark.broadcast.Broadcast;
  import org.apache.spark.sql.DataFrame;
  import org.apache.spark.sql.api.java.UDF1;
  import org.apache.spark.sql.functions;
  import org.apache.spark.sql.types.DataTypes;

  import java.util.Map;


  public class SentimentAnalysis extends JavaSparkDataFrameTransform {

  }

If you're using an IDE such as Eclipse or Netbeans you can use the IDE's function to generate stubs for the functions required to be implemented by the JavaSparkDataFrameTransform class.

We'll begin by defining a set of parameters that our Transform will use to request configuration information from a user of the Koverse UI. In this case we'll ask the user to tell our Transform which field in their data contains text and which field contains a date::

    private static final String TEXT_COL_PARAM = "textCol";
    private static final String DATE_COL_PARAM = "dateCol";

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
                      .build());
    }

Next will implement our execute() function which will generate sentiment scores based on the text field and return a new data frame with the new score field and original text and date fields. We'll start by extracting the user specified names for the text and date fields::

  @Override
  protected DataFrame execute(JavaSparkDataFrameTransformContext context) {
    String textCol = context.getJavaSparkTransformContext().getParameters().get(TEXT_COL_PARAM);
    String dateCol = context.getJavaSparkTransformContext().getParameters().get(DATE_COL_PARAM);

We'll generate a sentiment score by using a word list published in the AFINN data set (http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010). We've copied that data set into a Java Map that we'll use to lookup the sentiment score of each word and generate an average sentiment for each message.

To help us distribute this list in our Spark job, we'll take advantage of Spark's broadcast variables, which will distribute our list once per executor so we don't ship it on a per-task basis::

    // distribute our word list
    final Broadcast<Map<String, Integer>> broadcastWordList =
            context.getJavaSparkTransformContext().getJavaSparkContext().broadcast(AfinnData.getWordList());

Since this is a data frame transform Spark expects us to use SQL functions or custom user-defined functions or UDFs. We'll write a UDF that references our word list to generate an overall score for each message based off of all the words that appear in that message::

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

    context.getSqlContext().udf().register("sentimentUDF", sentimentUDF, DataTypes.DoubleType);

Now we'll grab the data frame created by Koverse from a data set the user has specified. Then we'll select only the text column and date column from it, drop any rows that are missing a value for the date or text columns, generate our new column consisting of sentiment scores using our UDF, and filter out any results that have a sentiment score of 0::

    DataFrame dataFrame = context.getDataFrames().values().iterator().next();

    return dataFrame
            .select(textCol, dateCol)
            .na().drop()
            .withColumn("score", functions.callUDF("sentimentUDF", dataFrame.col(textCol)))
            .filter("score != 0");
  }

We return the resulting data frame and Koverse will store the information in that data frame as a new Data Set in Koverse. It will index all the data in the Data Set and apply access protection to this Data Set. By default the user that created the resulting Data Set is the only user allowed to see the data within it until he or she decides to grant access to users in other groups.

To complete our Transform we'll give it a description, name, type ID, and version number::

    @Override
    public String getDescription() {
      return "Generate a sentiment score for each record containing text. "
              + "Also requires records to have a date field so changes in sentiment can be seen over time";
    }

    @Override
    public String getName() {
      return "Analyze Sentiment";
    }

    @Override
    public String getTypeId() {
      return "analyze-sentiment";
    }

    @Override
    public Version getVersion() {
      return new Version(0, 1, 0);
    }

  }

Now we're ready to include our Transform in a JAR file and upload it to Koverse as an Addon. See XYZ for details on building and uploading Addons.
