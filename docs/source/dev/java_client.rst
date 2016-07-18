Java Client
-----------

Introduction
^^^^^^^^^^^^

The Java Client allows JVM based software to connect to and interact directly with Koverse through the REST API.
It is capable of interacting with the REST API using plain HTTP connections, SSL, and SSL with client PKI certificates.

The general concept is to instantiate an implementation of the ``com.koverse.client.java.KoverseClient`` interface and invoke its methods.
There are two such implementations, one for interacting with the Koverse web application via REST and another directly to the Koverse server using Thrift.

These instructions will focus on the REST based implementation because the Thrift based implementation is still a work-in-progress.


Basics
^^^^^^

To use the Java client in your software, modify your project's Maven pom.xml to include the koverse java client dependency.
First, include a repositories section in your ``pom.xml`` file and add the koverse repository, for example::

	<repositories>
   		<repository>
      		<id>koverse</id>
      		<name>Koverse Public Repo</name>
      		<url>http://nexus.koverse.com/nexus/content/groups/public/</url>
      		<layout>default</layout>
   		</repository>
	</repositories>


This will allow maven to download the Koverse java client dependency.  This dependency has the groupId ``com.koverse`` and the artifactId ``koverse-client-java``.
Set the version of that dependency to match the version of Koverse your software will be communicating with.  Your ``pom.xml`` file should now have a section similar to::


	<dependencies>
   		<dependency>
      		<groupId>com.koverse</groupId>
      		<artifactId>koverse-client-java</artifact>
      		<version>1.2.0</version>
   		</dependency>
	</dependencies>


Note that if your IDE integrates with Maven, it should be able to download JavaDocs for the koverse client software and display them for you.
If you'd like to download the JavaDocs yourself, visit http://nexus.koverse.com/nexus/content/groups/public/com/koverse/koverse-client-java/ in your browser, select the folder for your version of Koverse, and download the Javadoc archive.

Lastly:

In your Java code, you will be instantiating an instance of ``com.koverse.client.java.KoverseConnection``.  Note that the constructor takes an argument of a ``com.koverse.client.java.KoverseConnection``.
You choose which implementation of KoverseConnection to use in order to specify whether to use plain un-encrypted HTTP or encrypted HTTP (e.g. HTTP over SSL, TLS).

Unencrypted HTTP Connections
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Begin by creating an instance of ``com.koverse.client.java.PlainKoverseConnector``.  Note that its constructor requires you to provide a valid Koverse API Token and the base URL of Koverse (e.g. http://www.myserver/Koverse).
The, create an instance of KoverseConnection, supplying the PlainKoverseConnector you just created as the sole constructor argument.

Now, you may use the create KoverseConnection object to perform operations such as:

* Retrieve collection, including names and collection identifiers.
* Insert, update, and delete records.
* Get user and system information.
* Retrieve collection statistics and download records in bulk.
* Perform queries.
* Perform auto-complete queries.

Please view the JavaDocs for the interface ``com.koverse.client.java.KoverseClient`` for further details on these operations.

Encrypted HTTP Connections
^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuring the KoverseClient to use SSL is somewhat more involved.  IT can be further complicated by using client side certificate authentication.
As such, let's being with just setting up a SSL connection for now.  Client side certificate authentication will be explained in the next section.

Before I begin, please note that this information is also documented in the JavaDocs for the ``com.koverse.client.java.SecureKoverseConnector`` class.  Please feel free to reference that as well.

The important thing to realize is that the use of SSL is configured through the standard JVM mechanism of using special system properties and a Java Key Store.

Since it is most likely the case that the server is not assigned a certificate issued by a trusted CA (Certificate Authority), we must configure your Java software to use a self-signed certificate used by the Koverse server.

As such, the first thing you must do is create a Java keystore that will contain the certificate for the Koverse server.
That is done by using the Java ``keytool`` command, such as so::

	keytool -import -alias koverseserver -file koverseserver.crt -storepass $PASS -keystore koverseserver.keystore

In the above example, we are creating an entry named ``koverseserver`` in the keystore located in the file ``koverseserver.keystore`` from the contents of the certificate file ``koverseserver.crt``.
Additionally, we are protecting the contents of the keystore by encrypting it with the password stored in the environment variable ``$PASS``.

Getting this certificate stored into the keystore is the first step.

The next step is to define special Java system properties when your program is executed so that Java will use the information in the keystore.  Those system properties are:

``-Djavax.net.ssl.trustStoreType=jks``

``-Djavax.net.ssl.trustStore=koverseserver.keystore``

``-Djavax.net.ssl.trustStorePassword=$PASS``

Your program must either be run with the above command line properties or you must programmatically add them to the JVM's System Properties at runtime.

With this done, your software should be capable of interacting with a SSL enabled Koverse Server.  However, in the case that things don't seem to be working for you, there are some tips that can help.

1) Be sure to contact us for support
2) Apply the system property ``-Djavax.net.debug=all`` to get lots of good SSL debugging output.



Encrypted HTTP Connections with Client Side Certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To use client side certificates, do the same as in the previous section, but also make sure the following system properties are set in your software as well:

``-Djavax.net.ssl.keyStoreType=pkcs12``

``-Djavax.net.ssl.keyStore=clientcertificate.p12``

``-Djavax.net.ssl.keyStorePassword=$PASS``

Where you are specifying your client certificate that is located in the file ``clientcertificate.p12``.  This file is a ``pkcs12`` formatted file, protected by the password stored in the system environment variable ``$PASS``
