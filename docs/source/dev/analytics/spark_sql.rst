.. _SparkSQL:

..
  TODO: rewrite

Spark SQL
=========

Koverse supports Transforms written using the Apache Spark API, including Spark SQL. Spark SQL allows Koverse records to be processed using the popular SQL language, which is useful for many common operations such as reshaping data, filtering, combining, and aggregation.

Spark SQL can be used in two ways in Koverse Transforms: first, using the generic Spark SQL transform, developers can simply paste a SQL script into a new instance of a Spark SQL Transform in the Koverse UI.

Second, transform developers can create Koverse AddOns which include Spark SQL statements as part of a Java or Scala class. These can be packaged, uploaded to the Koverse platform, and reused to transform multiple input collections.

**Using the generic Spark SQL Transform**

Koverse ships with a generic Spark SQL Transform that allows users to simply paste a Spark SQL statement into a text parameter and applies that script to the input collection specified.

To create a transform like this, start in the Data Flow application from the main menu. Click ‘Add Transform’ and select ‘Spark SQL Transform’ from the drop down list.

Configure the input collections desired.

In the text input marked ‘SQL select statement’, paste in a SQL statement. When specifying a table, use position parameters to identify which input collection should be used. For example, if you’ve selected an input collection ‘stocks’ in the input collections control it will be referenced in the SQL statement as $1. The second input collection is referenced as $2 and so on.

.. image:: /_static/CollectionManagerScreenshots/DataFlow.*
	:height: 400 px
	:width: 600 px


For a description of the SQL statements that are supported see https://spark.apache.org/docs/latest/sql-programming-guide.html

**Building a new AddOn that includes Spark SQL statements**

Developers can also build Koverse AddOns that can leverage the Spark SQL API in transforms. To create a Spark SQL transform, create a Java class that extends JavaSparkSQLTransform and implement the required methods.

An abbreviated example is as follows. Create a new class extending JavaSparkSQLTransform::

    …
    import com.koverse.sdk.transform.spark.sql.JavaSparkSqlTransform;
    import com.koverse.sdk.transform.spark.sql.JavaSparkSqlTransformContext;
    import org.apache.spark.sql.DataFrame;
    import org.apache.spark.sql.SQLContext;
    …

    public class MySparkSqlTransform extends JavaSparkSqlTransform {

Provide any parameters you wish to expose to users to configure this transform, and the basic information about the transform that will help users identify it in the UI::

    public Iterable<Parameter> getParameters()
    public String getName()
    public String getTypeId()
    public Version getVersion()
    .....

Now in the execute() method, access is provided to a SqlContext. Input collections are already loaded as data frames into the Sql Context and only need to be referenced in SQL statements. The input collection IDs can be accessed via the JavaSparkSqlTransformContext::

    protected DataFrame execute(JavaSparkSqlTransformContext context) {{

    final SQLContext sql = context.getSqlContext();

    final List<String> inputCollections =

    context.getJavaSparkTransformContext()

    .getInputCollectionIds();

    …

Collection Schemas are also available, but they do not need to be used to execute SQL statements. They are there in case additional DataFrames need to be created.

    ``Map<String, CollectionSchema> schemas =``

        ``context.getJavaSparkTransformContext().getInputCollectionSchemas();``

SQL statements should be edited to reference the input collection IDs, and can be executed simply by passing the SQL string to the SqlContext. The resulting data frame should be returned and Koverse will persist the output as a new collection.

    ``return sql.sql(sqlStatement)``
