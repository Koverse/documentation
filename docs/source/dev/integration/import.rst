Import Transforms
-----------------

Koverse ImportTransforms allow Records to be transformed during an Import job.

ImportTransforms can be parameterized to allow users to configure the ImportTransform at runtime. Parameters can be accessed via the setup method thus:

    ``public void setup(Map<String, Object> params) throws IOException``

Developers can grab the values of Parameters and store them for use in the transform method.

The core of an ImportTransform is the transform method:

  ``public Iterable<SimpleRecord> transform(SimpleRecord inputRecord)``

The transform method takes one input SimpleRecord and returns zero or more SimpleRecords.
