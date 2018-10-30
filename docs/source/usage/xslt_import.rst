.. _xsltImport:

Providing an XML Transform (XSLT) to import XML data
====================================================

XML can be imported into Koverse as any file can.
To parse XML data into proper Koverse records, an XSLT must be used to convert XML into Koverse Record XML.

For example, let's say you have the following XML file which you wish to import:

.. literalinclude:: /_static/xslt-examples/books-example.xml
  :language: xml

For this example, this XML file would conform to your XML schema (XSD):

.. literalinclude:: /_static/xslt-examples/books-example.xsd
  :language: xml

Now, to transform this XML into XML that represents Koverse records, the following XSLT would be used:

.. literalinclude:: /_static/xslt-examples/books-example.xsl
  :language: xml

Which would produce the following XML file that conforms to the Koverse Record XML Schema:

.. literalinclude:: /_static/xslt-examples/books-example-transformed.xml
  :language: xml

Finally, for your reference, here is the complete Koverse XML Schema:

.. literalinclude:: /_static/xslt-examples/koverse-records.xsd
  :language: xml
