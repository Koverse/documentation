Spark Scala
^^^^^^^^^^^

These examples give a quick overview of the Koverse Spark Scala Transform API. Koverse 1.4 currently provides a single transform API in Scala.

The Koverse transform class called:  **SimpleSparkTransform()**

To use the Scala Transform, simply run the **SimpleSparkTransform.execute()** method with the proper arguments; JavaSparkContext and org.apache.spark.api.java.JavaRDD.

Please refer to JavaDoc's for full detailed usage description.

The transform consists of the following high level steps:

#. Get the 'projectField' field property from the JavaSparkContext
#. Map the input collection RDDs to Scala map
#. Get the collection from the Scala map
#. Scan and pull out java records/objects from RDD
#. Output the total record count for Java records
#. Output the total record count for Scala records

Here is an example of a Spark Scala execute() method::

    protected def execute(context: JavaSparkTransformContext): JavaRDD[SimpleRecord] = {
        val field = context.getParameters.get(C.FIELD_PARAM)
        println(s"looking for field $field in the records")

        val map = mapAsScalaMap(context.getInputCollectionRDDs)
        println("mapped input collection RDDs to scala map")

        val collectionKV = map.iterator.next
        println(s"got collection ${collectionKV._1} from map")

        val rdd = JavaRDD.toRDD(collectionKV._2)
        println("pulled out RDD from tuple")

        val transformRDD = rdd
            .filter(r => r.containsKey(field))
            .map(r => {
            val outputRecord: SimpleRecord = new SimpleRecord

            if(r.containsKey(field)) {
            outputRecord.put(field, r.get(field))
            } else {
            outputRecord.put(field, "NOTHING")
            }

            println(s"${field} => ${r.get(field)}")
            outputRecord
      })
    println(s"total java records ${transformRDD.count()}")

    val output = JavaRDD.fromRDD(transformRDD)
    println(s"total scala records ${output.count}")

    output
  }


You can run Java and Scala examples by passing the class name to Spark’s bin/run-example script; for instance:

``./bin/run-example <scala class>``

For a description of the Spark Scala statements that are supported see the Scala Docs at:

https://spark.apache.org/docs/latest/api/scala/index.html#org.apache.spark.package
