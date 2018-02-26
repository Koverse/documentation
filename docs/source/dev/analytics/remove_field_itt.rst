.. _remove_field_itt:

Import Time Transform - Removing A Field
=========================================

In the following example we will be building a Import Time Transform for the purpose of removing a Field from the import data.

Remove A Field Example
---------------------------


First we'll start off with our basic import and package declaration::

  package com.koverse.importtransform;

  import java.util.List;
  import java.util.Map;
  import com.koverse.sdk.Version;


  import com.koverse.com.google.common.collect.Lists;
  import com.koverse.sdk.data.Parameter;
  import com.koverse.sdk.data.SimpleRecord;
  import com.koverse.sdk.ingest.transform.ImportTransform;


  public class RemoveFieldImportTransform extends ImportTransform {

  }

We'll begin by defining a set of parameters that our Transform will use to request configuration information from a user of the Koverse UI.
In this case we'll ask the user to tell our Transform which field name they would like to remove.::

  private final String PARAMETER_FIELD_NAME = "fieldName";
  private final String PARAMETER_DROP_VALUE = "dropValue";

  private String fieldName;
  private Boolean dropValue;


To complete our Transform we'll give it a description, name, type ID, and version number::

  @Override
  public String getDescription() {
    return "Remove Fields from Records";
  }

  @Override
  public String getName() {
    return "Remove a Field";
  }

  @Override
  public String getTypeId() {
      return "RemoveFieldImportTransform";
  }

  @Override
  public Version getVersion() {
  return new Version(1, 0, 0);
  }


  @Override
  public List<Parameter> getParameters() {

    return Lists.newArrayList(
      Parameter.newBuilder().displayName("Field Name").parameterName(PARAMETER_FIELD_NAME).type(Parameter.TYPE_STRING).required(true).build(),
      Parameter.newBuilder().displayName("Drop Field").parameterName(PARAMETER_DROP_VALUE).type(Parameter.TYPE_BOOLEAN).required(true).build());

  }

  @Override
  public void setup(Map<String, Object> params) {

  fieldName = (String) params.get(PARAMETER_FIELD_NAME);
  dropValue = (Boolean) params.get(PARAMETER_DROP_VALUE);

  }


Next, using SimpleRecord we drop the value if the field name matches or we print an error to console.::

  @Override
  public Iterable<SimpleRecord> transform(SimpleRecord inputRecord) {

    if (dropValue) {
    inputRecord.remove(fieldName);
    }
    else {
        System.out.println ( "******ERROR: could not remove Field******");
    }
    return Lists.newArrayList(inputRecord);

    }
  }
