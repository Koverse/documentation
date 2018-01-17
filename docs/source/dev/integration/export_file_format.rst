.. _ExportFileFormats:

Export File Formats
===================

Developers can extend ExportFileFormat to easily create new ways to export Koverse Records to file-based Sinks. ExportFileFormats are parameterized like other classes.

There are three primary methods to define when creating an ExportFileFormat:

	``public void startFile()``

startFile is used to do initialization. The method getOutputStream() can be used to get a reference to the OutputStream to which SimpleRecords are written. Some ExportFileFormats wrap the OutputStream object with other objects to make it easier to output records.

This method can also be used to write out header information to the output file.

	``public void writeRecordToFormat(SimpleRecord record) throws IOException``

This writeRecordToFormat method is used to output individual records to the output file. SimpleRecord objects can be converted into the bytes that the file format requires.

	``public void endFile()``

The endFile function is used to write out any footer information required by the file format. It is not necessary to close the OutputStream as this is done automatically by the super class.
