.. _usageIntroduction:

Introduction
===============

Key Terms and Concepts
----------------------

Data Set
  A set of records managed by Koverse.
  These records may have been imported into Koverse from an external data source such as a relational database, a set of structured files such as CSV files or JSON or more unstructured files such as Microsoft Office documents in a remote file system such as an FTP server, or even a messages from a streaming source such network socket or a message queue.

Record
  A set of one or more attributes.

Attribute
  Sometimes called a 'field' or a 'column'.
  A single attribute consists of a name and a value.
  For example, from a relational database we may import several rows from a table, each of which is stored as a record in Koverse.
  The individual columns of each row from the database table are the attributes of the record.
  But Koverse records in the same data set do not necessarily all have the same set of attributes.
  And a value associated with an attribute may be a simple value, such as a number or a date, but may also be a large body of text, or a complex value such as a list or a set of name-value pairs.

Transform
  Data sets can be processed to produce new data sets via 'Transforms', which are distributed data processing jobs.
