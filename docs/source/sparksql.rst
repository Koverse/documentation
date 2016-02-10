:tocdepth: 2

.. _SparkSql:

===============================
Spark SQL
===============================


.. _kov-Introduction:

Introduction
^^^^^^^^^^^^

Koverse has a Spark SQL transform which is able to execute SQL queries on a collection and store the results in another collection.
To do this, Koverse builds a representation of all records in a collection as a SQL table.

However, to support this Koverse may need to rename some record fields if the same field contains more than one data type
among the records.

Data Type Renaming
^^^^^^^^^^^^^^^^^^

Because Koverse records can contain fields that are structures, arrays, and of different scalar data types, they do not directly correlate with
SQL table schemas.  For example, if a record has a field named "stuff" with both string and number values,
that field must be renamed to two SQL table columns named "stuff_STRING" and "stuff_NUMBER", where the string values are placed in the
former column and the number values in the latter column. The same applies for the other data types as well:

- _BOOLEAN
- _DATE
- _BYTES
- _STRUCTURE
- _ARRAY

Note that if there are no data type conflicts, the field names are NOT changed, they will directly map to a single
SQL table column.

The first three scalar data types should be expected. However, the _STRUCTURE and _ARRAY data type renaming requires some extra explanation.
In Koverse, it is possible for a field
in different records to also be a structure or an array while in others it may be a scalar value such as a string or number.
Therefore, if such a conflict occurs, a field could be split into two or more renamed fields, such as "stuff_STRUCTURE" or
"stuff_ARRAY".

An additional level of renaming can occur if koverse records contain an array with different field types.  In SQL, an array
must have elements that are of the same data type.  However, Koverse has no such constraint.  Therefore, records with fields
that contain an array with two or more data types are further renamed to account for that.  For example, a field could be split
and renamed into the SQL columns "stuff_ARRAY_1" and "stuff_ARRAY_2".

Conclusion
^^^^^^^^^^

Because of the complexities involved in this renaming that must occur, it is recommened to use the Spark SQL capability with
collections that contain records whose fields only contain a single type of value.  If that is not the case, it is recommend to
use other transforms to make the records homogenous.  The support that Koverse has to rename field names is only there as a precautionary
measure and should not be relied upon extensively; it is better to transform the records in a collection to make them more appropriate
for SQL queries than to rely too heavily on Koverse field renaming capabilities.
