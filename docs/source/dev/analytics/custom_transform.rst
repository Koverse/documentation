
..
  TODO: delete probably

Custom Transforms Code Examples
-------------------------------

This code example is provided as a bootstrap to developing your own 'custom transform'. The 'companyTransform' class presented here can be used as a template.

Custom Transform Example::

    package com.company.transform;

    import com.koverse.sdk.data.Parameter;
    import com.koverse.sdk.data.Record;
    import com.koverse.sdk.data.TermTypeDetector;
    import com.koverse.sdk.transform.AbstractRecordMapStage;
    import com.koverse.sdk.transform.AbstractReduceStage;
    import com.koverse.sdk.transform.AbstractTransform;
    import com.koverse.sdk.transform.TransformStage;

    import java.io.DataInput;
    import java.io.DataOutput;
    import java.io.IOException;
    import java.net.InetAddress;
    import java.util.ArrayList;
    import java.util.HashMap;
    import java.util.Iterator;
    import java.util.List;
    import java.util.Map;

    import org.apache.hadoop.io.Text;
    import org.apache.hadoop.io.Writable;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;

    import java.util.Map.Entry;

    public class CompanyTransform extends AbstractTransform {

    private static Logger logger = LoggerFactory
   		 .getLogger(CompanyTransform.class);

    public static class CompanyCustomValue implements Writable {

   	 public String companyCustomValue;

   	 public CompanyCustomValue() {
   	 }

   	 public CompanyCustomValue(String myCustomValue) {
   		 this.companyCustomValue = myCustomValue;
   	 }

        @Override
   	 public void write(DataOutput out) throws IOException {
   		 out.writeUTF(companyCustomValue);
   	 }

   	 @Override
   	 public void readFields(DataInput in) throws IOException {
   		 companyCustomValue = in.readUTF();
   	 }
    }

    private static final String PARAM_MY_CUSTOM = "myCustomParam";

    public CompanyTransform() {
    } // Necessary for Hadoop

    public static class CompanyCustomMapStage extends AbstractRecordMapStage {

   	 private String companyCustomParam = null;

   	 /**
   	  * Perform Mapper setup here. Read parameters, setup data structures,
   	  * etc
   	  */
   	 @Override
   	 public void setup() {
   		 companyCustomParam = getStageContext().getParameterValue(
   				 PARAM_MY_CUSTOM);
   	 }

   	 /*
   	  * This mapper will takes in a list of IP address for each record and
   	  * create all unique combinations in any direction i.e.
   	  * 127.0.0.1,255.255.255.255 is the same as 255.255.255.255, 127.0.0.1
   	  */
   	 public void map(Record inputRecord) throws IOException,
   			 InterruptedException {

   		 HashMap<String, ArrayList<String>> mapOfIps = new HashMap<String, ArrayList<String>>();

   		 ArrayList<String> ipsArrayList = new ArrayList<String>();

   		 // System.out.println("********This is the mapper running!*********");

   		 for (Entry<String, Object> fields : inputRecord.fields.entrySet()) {

   			 Object value = inputRecord.get(fields.getKey());

   			 // Get the record value and nested values
   			 checkIP(value, ipsArrayList);

   		 }

   		 // call to get unique pairs
   		 uniquePairs(ipsArrayList, mapOfIps);

   		 /*
   		  * emit resulting map using key and custom class in the format of
   		  * {"127.0.0.1,255.255.255.255", count} The sort and group function
   		  * will then combine all identical keys and create larger lists,
   		  * which are then sent to reducer to do the final count for each
   		  * grouping
   		  */
   		 CompanyCustomValue myCustomValueClass = null;

   		 for (Entry<String, ArrayList<String>> fields : mapOfIps.entrySet()) {

   			 // System.out.println("this is the new data structure");

   			 String key = fields.getKey();

   			 ArrayList<String> ips = (ArrayList<String>) mapOfIps.get(key);

   			 // System.out.println("for emit new key is:" + key);

   			 myCustomValueClass = new CompanyCustomValue(
   					 Integer.toString(ips.size()));

   			 getStageContext().emit(new Text(key.toString()),
   					 myCustomValueClass);
   		 }
   	 }

        @Override
   	 public Class<Text> getMapOutputKeyClass() {
   		 return Text.class;
   	 }

   	 @Override
   	 public Class<CompanyCustomValue> getMapOutputValueClass() {
   		 return CompanyCustomValue.class;
   	 }

   	 // recursive function takes record and then continues to iterate through
   	 public void checkIP(Object value, ArrayList<String> ipsArrayList) {
   		 if (value instanceof List) {

   			 try {
   				 Iterator<?> iterator = ((List<?>) value).iterator();

   				 while (iterator.hasNext()) {
   					 Object listValue = (Object) iterator.next();
   					 checkIP(listValue, ipsArrayList);

   				 }

   				 // System.out.println("this value is instance of list");

   			 } catch (Exception e) {
   				 e.printStackTrace();
   			 }

   		 } else if (value instanceof Map) {

   			 try {

   				 Map<?, ?> result = (Map<?, ?>) value;

   				 Iterator<?> iterator = result.keySet().iterator();

   				 while (iterator.hasNext()) {
   					 Object resultValue = result.get(iterator.next());

   					 checkIP(resultValue, ipsArrayList);
   				 }

   				 // System.out.println("this value is instance of map");

   			 } catch (Exception e) {
   				 e.printStackTrace();
   			 }

   		 } else if (value instanceof InetAddress) {
   			 ipsArrayList.add(((InetAddress) value).getHostAddress());

   			 // System.out.println("check it is INET:" + ((InetAddress)
   			 // value).getHostAddress());

   		 } else if (value instanceof String) {

   			 String removedSlash = ((String) value).replace("/", "");

   			 if (TermTypeDetector.typify(removedSlash) instanceof InetAddress) {
   				 ipsArrayList.add(removedSlash);
   			 } else {
   				 // System.out.println("This is not INET!:" + removedSlash);
   			 }
   		 }
   	 }

         public void uniquePairs(ArrayList<String> ipsArrayList,
   			 HashMap<String, ArrayList<String>> mapOfIps) {

   		 // go through list and build unique ip address pairs
   		 String ipAddress = "";
   		 String ipAddress2 = "";
   		 String pair = "";

   		 ArrayList<String> pairs = new ArrayList<String>();

   		 for (int i = 0; i < ipsArrayList.size(); i++) {
   			 ipAddress = (String) ipsArrayList.get(i);

   			 for (int j = i; j < ipsArrayList.size(); j++) {
   				 if (j == i)
   					 continue;

   				 ipAddress2 = (String) ipsArrayList.get(j);

   				 pair = ipAddress + "," + ipAddress2;

   				 // System.out.println(pair);

   				 pairs.add(pair);
   			 }

   		 }

   		 // take unique list of pairs that is any directional and build a
   		 // HashMap with ArrayList of ip pairs
   		 for (int i = 0; i < pairs.size(); i++) {
   			 String testPair = (String) pairs.get(i);

   			 String[] indIps = testPair.split(",");
   			 String firstPart = (String) indIps[0];
   			 String secondPart = (String) indIps[1];
   			 String testReversePair = secondPart + "," + firstPart;

   			 if (mapOfIps.get(testPair) != null) {
   				 ArrayList<String> testList = (ArrayList<String>) mapOfIps
   						 .get(testPair);
   				 testList.add(testPair);
   			 } else if (mapOfIps.get(testReversePair) != null) {
   				 ArrayList<String> testList = (ArrayList<String>) mapOfIps
   						 .get(testReversePair);
   				 testList.add(testReversePair);
   			 } else {
   				 ArrayList<String> testList = new ArrayList<String>();
   				 testList.add(testPair);
   				 mapOfIps.put(testPair, testList);
   			 }

   		 }

   	 }

    }

    /*
     * The reduce will count all of the ip pairs and write them through Record.
     * The count for each grouping will occur and then records will be written
     * out independent of other reduce tasks.
     */
    public static class CompanyCustomReduceStage extends AbstractReduceStage {

   	 private String companyCustomParam;

   	 /** Perform setup here */
   	 public void setup() {
   		 companyCustomParam = getStageContext().getParameterValue(
   				 PARAM_MY_CUSTOM);
   	 }

   	 /** Perform main work here */
   	 @Override
   	 public void reduce(Object feature, Iterable<Object> entities)
   			 throws IOException {

   		 // System.out.println("******This is the reduce running!*******");

   		 // System.out.println("feature: " + feature.toString());

   		 Iterator<Object> i = entities.iterator();

   		 int mergedCount = 0;

   		 while (i.hasNext()) {
   			 CompanyCustomValue count = (CompanyCustomValue) i.next();

   			 mergedCount += Integer.parseInt(count.companyCustomValue);

   			 // System.out.println("count: " + count.companyCustomValue);
   			 // System.out.println("merge count: " + mergedCount);

   		 }

   		 String[] splitIPs = feature.toString().split(",");
   		 ArrayList<String> listIPs = new ArrayList<String>();

   		 for (int l = 0; l < splitIPs.length; l++) {
   			 listIPs.add("/" + splitIPs[l]);
   		 }

   		 Record myCustomRecord = new Record();
   		 myCustomRecord.addField("IP_ADDRESS", listIPs);
   		 myCustomRecord.addField("count", mergedCount);

   		 try {
   			 // Write the record to the data store, if this is the last stage
   			 getStageContext().writeRecord(myCustomRecord);

   		 } catch (InterruptedException e) {
   			 logger.error(e.getMessage(), e);
   		 }

   	 }

   	 public Class<Text> getMapOutputKeyClass() {
   		 return Text.class;
   	 }

   	 public Class<CompanyCustomValue> getMapOutputValueClass() {
   		 return CompanyCustomValue.class;
   	 }

    }

    @Override
    protected void fillInParameters(List<Parameter> parameters) {
   	 // Add custom parameters
   	 parameters.add(new Parameter(PARAM_MY_CUSTOM, "Custom Parameter",
   			 Parameter.TYPE_STRING));
    }

    @Override
    public String getName() {
   	 return "Company IP Address Transform";
    }

    @Override
    public String getJobTypeId() {
   	 return "companyTransform";
    }

    @Override
    protected void fillInStages(List<Class<? extends TransformStage>> stages) {
   	 /**
   	  * Add all stages in order here
   	  */
   	 stages.add(CompanyCustomMapStage.class);
   	 stages.add(CompanyCustomReduceStage.class);
    }

    @Override
    public String getVersion() {
   	 return "1.0.0";
    }
  }


Aggregation Query API
^^^^^^^^^^^^^^^^^^^^^^
The sections above have gone into detail about how to configure Aggregations on the Records in a Data Set. As originally stated, the primary use case for
Aggregations is to maintain precomputed statistics over time to support interactive (sub-second) queries from applications such as analytic dashboards. This section
will provide detail on the query API. The REST API will be discussed, but a Thrift API is also available and is very similar.

Queries are submitted via HTTP POST requests to http://<host:port>/api/query/aggregate. The Content-Type header should be set to "application/json". An example query for the first example above might look like::

  {
    "collectionId":"web_logs_20150828_212035_291",
    "dimensionValuesPairs":[
      {
        "dimensionValues":[{"field":"1mBin","value":"1440785460000"}],
        "producer":{"type":"count"}
      }
    ],
    "generateTotal":true,
  }

This will query the web log Data Set for the event count in the 1-min bin of 1440785460000. This would have been the events that occured between 18:11:00 and 18:12:00 GMT on Fri, 28 Aug 2015.
The dimensionValuesPairs property is an array so a single query may contain many dimensionValues which enables you to batch requests which can be useful when pulling the data for a timeseries graph for example.
There currently is no range query, so instead you would batch together all of the 1mBin values that you need to render your graph. The requests are also batched on the server so this ends up being fast even if your
query has 100s of dimensionValues.

Below we show another query, but this one is for the 3rd Aggregation example from above, the number of unique users per country per day::

  {
    "collectionId":"web_logs_20150828_212035_291",
    "dimensionValuesPairs":[
      {
        "dimensionValues":[{"field":"1dBin","value":"1441166400000"}, {"field":"country", "value":"USA"}],
        "producer":{"type":"cardest", "relation":"userId"}
      }
    ],
    "generateTotal":true,
  }

Here we see how the field (or relation) is specified in conjunction with the aggregation function. We also see how additional dimensions can be added to the query easily.
Below is a table mapping the Scala aggregation function to the type used in the query API.

==========================          ==============
Function                            Type String
==========================          ==============
Count                               count
CountMap                            countmap
TopK                                topk
SumInteger                          sumint
SumDecimal                          sumdec
Min                                 min
Max                                 max
Average                             ave
StringSet                           set
CardinalityEstimate                 cardest
QuantileEstimate                    quantest
==========================          ==============

The generateTotal property above enables the query to request a final reduction on the server for when the query returns more than one value. This can be very useful in certain cases where the client can't perform the reduction itself. For example, you could aggregate and query for the individual event counts for each day of a week and then add these values together on the client to get a total number of events for the week. What if you were trying to get the total number of unique users for the week? You are likely to get a very wrong answer if you simply add up the unique users for each day of the week as the same users may access the web site on several days during the week. By requesting the final reduction on the server, it can properly merge the data structures that hold the cardinality estimates and then return the total.

The query response looks very similar to the query, but with values::

  {
    "recordCountEstimate": 0,
    "responseTime": 0,
    "success": true,
    "recordsWritten": 0,
    "aggregateQueryResult": {
        "collectionId": "web_logs_20150828_212035_291",
        "aggregateValues": [
            {
                "dimensionValuesProducerPair": {
                    "dimensionValues": [
                        {
                            "field": "1mBin",
                            "value": "1440785460000"
                        }
                    ],
                    "producer": {
                        "type": "count"
                    }
                },
                "value": "3"
            }
        ],
        "total": "38",
        "lastAggregationExecuted": 1440797400467
    }
  }

Here we see there were 38 events for the 1-minute bin that was queried. The query response also shows the last time an aggregation job was run and completed, which provides a "freshness" to the results.
