Export Transforms
-----------------

Koverse ExportTransforms can be used to transform Records as they are being written to a Koverse Sink.

ExportTransforms can be parameterized to allow users to configure the ExportTransform at runtime. Parameters can be accessed via the setup method thus:

    ``public void setup(Map<String, Object> params) throws IOException``

Developers can grab the values of Parameters and store them for use in the transform method.

The core of an ExportTransform is the transform method:

  ``public Iterable<SimpleRecord> transform(SimpleRecord inputRecord)``

The transform method takes one input SimpleRecord and returns zero or more SimpleRecords.
