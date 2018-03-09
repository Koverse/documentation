.. _Normalizations:

Normalizations
==============

Normalizations, also sometimes referred to as Import Time Transforms, consist of any changes that are made to data as it is being imported.
In general it is recommended to import data as it arrives from the original source and make any changes to clean up or 'normalize' the data in Transforms so that if a mistake is made, the Transform can be modified and run from the raw data again, or if the way data has been transformed is not appropriate for all consumers a different Transform can be run to create a different representation of the data.

However, sometimes changes at Normalizations are useful for when data simply cannot be imported as is such as when custom logic for ingesting certain values as a specific type must be applied.

The API for Normalizations consists of a class to describe the Normalization's parameters so users can configure it via the Koverse UI and a simple function to transform data as it arrives.

Normalizations are limited to functionality that can be done within a single call to a flat map function, that is, a function that takes a record and returns zero or more records.
It is not possible to aggregate over multiple records in a Normalization.
For that, use a Transform.

To start the project, we'll need to include the Koverse SDK.
See :ref:`LinkingSDK` for details.

Example Normalization
---------------------

In the following example we will build a Normalization that allows us to remove a field from all records being imported.

This example is included in the koverse-sdk-project

First we'll start off with our basic import and package declaration::

  package com.koverse.examples.dataflow;

  import java.util.List;
  import java.util.Map;
  import com.koverse.sdk.Version;

  import com.koverse.com.google.common.collect.Lists;
  import com.koverse.sdk.data.Parameter;
  import com.koverse.sdk.data.SimpleRecord;
  import com.koverse.sdk.ingest.transform.ImportTransform;

  public class CustomNormalization extends ImportTransform {

  }

We'll begin by defining a set of parameters that our Transform will use to request configuration information from a user of the Koverse UI.
In this case we'll ask the user to tell our Normalization which field name they would like to remove.::

  private final String PARAMETER_FIELD_NAME = "fieldName";

  private String fieldName;


To complete our Transform we'll give it a description, name, type ID, and version number::

  @Override
  public String getDescription() {
    return "Remove a field from each records";
  }

  @Override
  public String getName() {
    return "Remove a Field";
  }

  @Override
  public String getTypeId() {
    return "remove-field-normalization";
  }

  @Override
  public Version getVersion() {
    return new Version(1, 0, 0);
  }


  @Override
  public List<Parameter> getParameters() {

    return Lists.newArrayList(
      Parameter.newBuilder()
              .displayName("Field Name")
              .parameterName(PARAMETER_FIELD_NAME)
              .type(Parameter.TYPE_STRING)
              .required(true).build());
  }

  @Override
  public void setup(Map<String, Object> params) {

    fieldName = (String) params.get(PARAMETER_FIELD_NAME);
  }


Next, we remove the field and value from each SimpleRecord if the field name matches what the user has specified::

  @Override
  public Iterable<SimpleRecord> transform(SimpleRecord inputRecord) {
    if (inputRecord.containsKey(fieldName)) {
      inputRecord.remove(fieldName);
    }

    return Lists.newArrayList(inputRecord);
  }


To test our Normalization we'll write a simple unit test, starting with this skeleton class::

  import org.junit.Test;

  import static org.junit.Assert.*;

  import com.koverse.sdk.data.SimpleRecord;

  import java.util.HashMap;
  import java.util.List;
  import java.util.Map;


  public class CustomNormalizationTest {

  }

Now we'll add a simple test to check that our input example records are transformed the way we expect::

  @Test
  public void testNormalization() {

    CustomNormalization norm = new CustomNormalization();

    SimpleRecord simpleRecord = new SimpleRecord();

    simpleRecord.put("fieldA", "valueA");
    simpleRecord.put("fieldB", "valueB");
    simpleRecord.put("fieldC", "valueC");

    // provide configuration that a user would normally provide via the UI
    Map<String, Object> params = new HashMap<>();
    params.put(CustomNormalization.PARAMETER_FIELD_NAME, "fieldB");

    // configure our normalization based on parameters
    norm.setup(params);

    // transform input records
    List<SimpleRecord> results = newArrayList(norm.transform(simpleRecord));

    // should have exactly the same number of results as input records
    assertEquals(1, results.size());

    SimpleRecord resultRecord = results.get(0);

    // should consist of only two fields now
    assertEquals(2, resultRecord.size());

    // should consist of these specific fields
    assertTrue(resultRecord.containsKey("fieldA"));
    assertTrue(resultRecord.containsKey("fieldC"));

    // should no longer have the field we want to remove
    assertFalse(resultRecord.containsKey("fieldB"));
  }

We can run this in an IDE or use maven to verify our Normalization is working::

  $ mvn surefire:test

  [INFO] Scanning for projects...
  [INFO]
  [INFO] ------------------------------------------------------------------------
  [INFO] Building koverse-sdk-project 2.4.2-SNAPSHOT
  [INFO] ------------------------------------------------------------------------
  [INFO]
  [INFO] --- maven-surefire-plugin:2.12.4:test (default-cli) @ koverse-sdk-project ---
  ...

  -------------------------------------------------------
   T E S T S
  -------------------------------------------------------
  Running com.koverse.examples.dataflow.CustomNormalizationTest
  Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.13 sec

  Results :

  Tests run: 1, Failures: 0, Errors: 0, Skipped: 0

  [INFO] ------------------------------------------------------------------------
  [INFO] BUILD SUCCESS
  [INFO] ------------------------------------------------------------------------
  [INFO] Total time: 8.443 s
  [INFO] Finished at: 2018-03-08T15:44:54-08:00
  [INFO] Final Memory: 15M/309M
  [INFO] ------------------------------------------------------------------------

Now that our Normalization appears to be working we can upload it to Koverse so users can apply it to their own data as it is being imported.
If you're using the koverse-sdk-project example code, simply build the project using **mvn install**.
This will produce a JAR file in the target/ directory that you can drop into the Koverse UI.

If you're building your own project make sure to add the line::

  com.koverse.examples.dataflow.CustomNormalization

to the file src/main/resources/classesToInspect.
See the section on :ref:`AddOns` for more details.

Once the AddOn is uploaded to Koverse, our custom Normalization will appear in the list of available Normalizations to apply when importing new data.
