.. _addons:

Addons
======

The following addons are packaged with Koverse

Databases
#########

Sinks
*****

* MySQL
* Oracle

Sources
*******

* MS SQL Server
* MySQL (MariaDB)
* MySQL (MariaDB) Continuous
* PostgreSQL
* Oracle 11g 2
* Oracle 11g 2 (Connection String)
* Oracle RAC 11g 2
* PostgreSQL Continuous

Social Media
############

Sources
*******

* Twitter Streaming
* Twitter Timeline

File Systems
############

Sinks
*****

* File Transfer Protocol Server (FTP)
* Hadoop Distributed File System (HDFS)
* Amazon Simple Storage Service (S3)

Sources
*******

* File Transfer Protocol Server (FTP)
* Hadoop Distributed File System (HDFS)
* Koverse File Upload (HDFS)
* Amazon Simple Storage Service (S3)

  * Requires AWS Access Key ID and Secret
* Secure File Transfer Protocol Server (SFTP)
* Google Drive

   * Requires a Google Service Account https://support.google.com/a/answer/7378726?hl=en
   * This user must have at least Drive https://www.googleapis.com/auth/drive and Drive File https://www.googleapis.com/auth/drive.file scopes
   * Service Account must have access to the documents to be imported (share documents or folders with Service Account)


E-Mail
######

Sources
*******

* Email Account (IMAP)

Queues
######

Sinks
*****
* Kafka Queue

Sources
*******

* Kafka Queue for Kafka version 2.0.0

Web
###

Sources
*******

* Newsfeed Source
* URL Source
* All of Wikipedia
* Wikipedia Pages

Structured Data
###############

Formats
*******

* Avro
* EdiX13
* MS Excel
* GeoJSON
* JSON
* JSON Stream
* Parquet
* CSV
* TSV
* XML

Structured Data Export
######################

Genomics
########

Transforms
**********

* Generate Protein Sequence N-Grams
* Sequence Similarity

Spark SQL
#########

Transforms
**********

* Spark SQL Transform
* Spark Copy Transform

Text
####

MS Office, Text and PDF

Formats
*******

* Vector Documents (pdf, eps, ai, ps)
* MS Office (ppt, pptx, doc, docx, xls, xlsx, msg, pst)
* Textual Documents (pub, wri, rtf, txt)
* Web (css)
* Images (jpg, jpeg, psd, bmp, bpg, png, gif, tiff)
* Video (mp4, ogg, mov)
* Audio (mp3, wav, aac, flac)

Transforms
**********

* Extract Keywords

Time
####

H2O
###

Transforms
**********

* H2O Model Predictions
