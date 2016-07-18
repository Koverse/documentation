Pig Scripts
-----------

Koverse supports using `Pig <http://pig.apache.org>` as a transform. Pig transforms are simple pig scripts - where Koverse defines the load and store functions. To use Pig, follow these steps.

#. Open the Data Flow app.
#. Click Add Transform
#. Choose 'Pig' from the transform type drop down.
#. Choose Input and Output collections.
#. Write the Pig script in provided text area.

Koverse automatically provides the "load" and "store" functions. You'll simply need to write a Pig script that references the input collections by name, and assigns a value to the output collection by name. Pig variables are case sensitive, and have some restrictions. Therefore Koverse transforms Data Set names to use only case sensitive alphanumeric and underscore characters. Also, Pig table names cannot start with a non Alpha character (A-Z or a-z) - therefore Koverse prepends the character A when a data collection name starts with a non alpha character. Here are some example data collection name conversions.

* "My 1st Data Set" = My_1st_Data_Collection
* "P*22" = P_22
* "cAsE sEnSiTiVe" = cAsE_sEnSiTiVe
* "9Items" = "A9Items"
* "_Items" = "A_Items"

Koverse records are converted into tuples. The field names are applied as the Pig field names with the same conversion as above.

While Koverse allows unstructured data, Pig requires highly structured data. The schema defined for Pig fields is derived using the data type(s) seen in the Collection Details Field's page in Koverse. If a field has only a single type detected, the conversions in the table below are used directly. If a field has more than one type detected, and one of those types is a String, all values for that field will take a chararray type in Pig. Otherwise, if more than one type is detected but none are Strings, for example, if a field is 90% Number and 10% Date, it will be defined as a double value type in Pig. Here are the conversions of Koverse data types to Pig data types.

==================   ============
Koverse                 Pig
==================   ============
String               chararray
Number		     double
Date		     DateTime
KoverseGeoPoint	     [double,double]
Byte[]		     bytearray
Object		     map
==================   ============

**Example Pig Scripts**

The following is a simple pig script that would copy the contents of DataCollection1 to DataCollection2::

	DataCollection2 = DataCollection1

This more complex Pig script would perform a Group By operation on fieldA with a sum on fieldb::

	A = GROUP DataCollection1 BY fieldA;
	DataCollection2 = FOREACH A GENERATE FLATTEN(group) as fieldA, SUM(fieldB) as fieldBSum;


Pig Transforms Special Considerations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Pig transforms are executed as multiple stage map reduce jobs. They're considered "non-incremental" transforms in Koverse. Never restart the koverse-server process while a Pig transform is executing - as the job's state will be lost and the job will never finish.
