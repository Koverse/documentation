..
  TODO: remove this from the SDK

Web App Record Converters
-------------------------

Koverse can be extended to enable downloading of data set records
as any type of file. By default, Koverse supports downloading the records
as either a CSV or JSON file.

However, the download formats can be extended by a developer using the Koverse
SDK. The SDK has an abstract class named
``com.koverse.sdk.record.webapp.AbstractWebAppRecordConverterModule`` and an
interface named ``com.koverse.sdk.record.webapp.WebAppRecordConverter``.
Implementations of these can be placed inside of a JAR file and put in the
Koverse web application's lib directory. Then, after configuring the web
application's configuration file, Koverse will present the user with different
types of files that a data set's records can be downloaded as.

First, create a class that implements the
``com.koverse.sdk.record.webapp.WebAppRecordConverter`` interface from the Koverse
SDK. Koverse will interact with this class to present the user options when
downloading a data set. The main thing to consider is that the class must
report what MIME type it is storing the data as and then must process
Record objects and place the data for the downloaded file into a binary
output stream. A single Java jar can contain as many of these as you wish.
However, you must register each into a module class, as described next.

Second, extend the
``com.koverse.sdk.record.webapp.AbstractWebAppRecordConverterModule`` class
and in the overridden method "configure," bind your implementations of the
WebAppRecordConverter interface. Here is an example:

.. code-block:: java

  @Override
  protected void configure(final Multibinder<WebAppRecordConverter> recordConverterMultibinder) {
    recordConverterMultibinder.addBinding().to(JsonWebAppRecordConverter.class);
    recordConverterMultibinder.addBinding().to(CsvWebAppRecordConverter.class);
    recordConverterMultibinder.addBinding().to(JsonWebAppSampleRecordConverter.class);
  }

Third, package up the above classes into a single jar file and place it into
the Koverse web application's lib directory.

Lastly, modify the Koverse web application's configuration by editing the
``conf/koverse-webapp.properties`` file. To add your module to the existing
download formats, add (or edit if it already exists) the property
``com.koverse.webapp.record.modules`` to be like this, where your module
is named ``com.mycompany.MyWebAppRecordConverterModule``:

.. code-block:: properties

  com.koverse.webapp.record.modules=com.koverse.webapp.record.DefaultWebAppRecordConverterModule, com.mycompany.MyWebAppRecordConverterModule

You can place as many modules as you want for that configuration, separated by
commas. However, there must be at least one module listed or else the Koverse
web application will not start successfully.
