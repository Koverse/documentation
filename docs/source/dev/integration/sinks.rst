Sinks
-----

Koverse Sinks are designed to write Koverse Records to external data stores. For example, customers often want transformed data exported into HDFS for follow-on processing by down stream systems. Java developers can create
custom Sinks to support specific destination data stores.

Sinks are executed as MapReduce jobs with only a map phase. The sinks API provides an interface that allows the developer to open a connection to an outside system, deliver records, and then close that connection.

See the :ref:`koverse-archetype-project` section for details about a ready made project for creating custom sinks.
