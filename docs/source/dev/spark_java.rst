Spark Java API with Examples
----------------------------

Koverse now supports Transforms written using the Apache Spark API. Koverse APIs leverages much of the Spark primitive abilities that can be applied by writing a custom Transform or use an existing Transform provided by the Koverse API.

``public class MySparkSqlTransform extends JavaSparkSqlTransform {``

Provide any parameters you wish to expose to users to configure this transform, and the basic information about the transform that will help users identify it in the UI:

**public Iterable<Parameter> getParameters()**

Example::

    @Override
	public Iterable<Parameter> getParameters() {
		ArrayList<Parameter> params = new ArrayList<Parameter>();
		params.add(new Parameter(FIELD_PARAM, "Field to project", Parameter.TYPE_COLLECTION_FIELD));
		return params;
	}

**public String getName()**

Example::

    @Override
	public String getName() {
		return "Spark Java";
	}

**public String getTypeId()**

Example::

    @Override
	public String getTypeId() {
		return "Spark Java Transform";
	}

**public Version getVersion()**

Example::

    @Override
	public Version getVersion() {
		return new Version(0, 1, 0);
	}


Here is an example of usage (**Create a new class extending JavaSparkTransform()**)::

    final JavaSparkTransform javaSparkTransform;
    final SparkTransformContext sparkTransformContext
    final RDD<SimpleRecord> actual;

    javaSparkTransform = new JavaSparkTransform() {
            @Override
            public Iterable<Parameter> getParameters() {
                throw new UnsupportedOperationException("Not supported yet.");
            }

            @Override
            public String getName() {
                throw new UnsupportedOperationException("Not supported yet.");
            }

            @Override
            public String getTypeId() {
                throw new UnsupportedOperationException("Not supported yet.");
            }

            @Override
            public Version getVersion() {
                throw new UnsupportedOperationException("Not supported yet.");
            }

            @Override
            protected JavaRDD<SimpleRecord> execute(JavaSparkTransformContext sparkTransformContext) {
                return sparkTransformContext.getInputCollectionRDDs().get("input");
            }
       };

       actual = javaSparkTransform.execute(sparkTransformContext);
    }

For a complete description of the Spark Java APIs that are supported see the Spark Java Docs at:  https://spark.apache.org/docs/latest/api/java/index.html
