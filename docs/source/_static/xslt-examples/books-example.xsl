<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
  xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
  xmlns:b="http://www.koverse/xml/example/books/1.0.0"
  xmlns="http://www.koverse/xml/records/1.0.0">

  <xsl:output method="xml" indent="yes"/>
  
  <xsl:template match="/">
    <records>
      
      <xsl:for-each select="b:books/b:book">
        <record>
          
          <securityLabel></securityLabel>
          
          <fields>
            
            <entry>
              <entry-name>id</entry-name>
              <entry-value xsi:type="decimal">
                <value>
                  <xsl:value-of select="@id"/>
                </value>
              </entry-value>
            </entry>
            
            <entry>
              <entry-name>author</entry-name>
              <entry-value xsi:type="string">
                <value>
                  <xsl:value-of select="b:author"/>
                </value>
              </entry-value>
            </entry>
            
            <entry>
              <entry-name>title</entry-name>
              <entry-value xsi:type="string">
                <value>
                  <xsl:value-of select="b:title"/>
                </value>
              </entry-value>
            </entry>
            
          </fields>
          
        </record>
      </xsl:for-each>
      
    </records>
  </xsl:template>
  
</xsl:stylesheet>
