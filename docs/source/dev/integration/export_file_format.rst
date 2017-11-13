Export File Formats
----

Developers can extend ExportFileFormat to easily create new ways to export Koverse Records to file-based Sinks. ExportFileFormats are parameterized like other classes.

There are three primary methods to define when creating an ExportFileFormat:

	``public void startFile()``

startFile is used to do initialization. The method getOutputStream() can be used to get a reference to the OutputStream to which SimpleRecords are written. Some ExportFileFormats wrap the OutputStream object with other objects to make it easier to output records.

This method can also be used to write out header information to the output file.

	``public void writeRecordToFormat(SimpleRecord record) throws IOException``

This writeRecordToFormat method is used to output individual records to the output file. SimpleRecord objects can be converted into the bytes that the file format requires.

	``public void endFile()``

The endFile function is used to write out any footer information required by the file format. It is not necessary to close the OutputStream as this is done automatically by the super class.


Parameters
^^^^^^^^^^

Koverse Transforms, Sources, and Sinks are all configured via Parameters. Parameters are defined by the developer and allow specific instances of Transforms, Sources, and Sinks to be configured and deployed into varying environments by authorized non-developer users.


When creating a specific implementation of a Transform, Source, or Sink, developers provide a list of Parameters to present to the end-user via the User Interface.

Parameters are created with the following fields:


* **String parameterName** (required) - uniquely identifies the parameter within the class.


* **String displayName** (required) - the name of the parameter that is shown to the user.


* **String type** (required) - one of the possible types defined in Parameter (see below).


* **String defaultValue** (optional) - a value set as the default.


* **String referencedParameterNames** (optional) - any parameterName that should be referenced. For example, for Parameters of the type TYPE_COLLECTION_FIELD, the possible values presented to the user in the UI are taken from the parameter defined in the referencedParameterName.


* **Boolean required** (optional) - whether the parameter must be set by the user. The default is false


* **Boolean hideInput** (optional) - whether the value of the parameter should be hidden in the UI. Used for sensitive parameters such as passwords.


* **String hint** (optional) - a string of text to be shown to the user as an additional hint for applying a value to the parameter.


For example, a Source may define a parameter in its constructor as follows::


	private static final String URL_PARAMETER = url;


	public NewsFeedSource() {
	inputParameters.add(
	new Parameter(
	URL_PARAMETER,
	"RSS Feed URL",
	Parameter.TYPE_STRING,
	"http://rssfeedurl.xml"));
	}


Parameters can be of the following types:


* TYPE_STRING - for passing in single line short strings such as a hostname or URL.

* TYPE_TEXT - for passing in longer multi-line strings, such as an entire script.

* TYPE_BOOLEAN - presents a checkbox to the user and is set to true or false.

* TYPE_INTEGER - allows the user to specify an integer value.

* TYPE_FILE - Allows the to user choose a file from the local file system. The file is uploaded, and its contents are made available as a stream at execution time to the custom component.

* TYPE_COLLECTION_FIELD - allows the user to select a single field from a collection. The referencedParameterName must be equal to the parameterName of an TYPE_INPUT_COLLECTION or TYPE_OUTPUT_COLLECTION parameterName. This is useful for informing classes of a specific field to use.

* TYPE_COLLECTION_MULTIPLE_FIELD - allows the user to choose a set of fields from a collection selected as an input or output collection parameter. This is useful for informing classes of a specific set of fields to use.


There are additional Parameter types used primarily by the system:


* TYPE_INPUT_COLLECTION - an input collection parameter presents the user with a list of collections from which the user is authorized to read. The UI then fills in this parameter with the internal unique ID of the collection the user chose. This component generally allows the end-user to select multiple input collections. The contents of all input collections are read into transform and export jobs for example.


* TYPE_OUTPUT_COLLECTION - an output collection parameter presents the user with a list of collections to which the user is authorized to write. The UI then fills in this parameter the internal ID of the collection the user chose. This parameter generally only allows the user to select a single collection.


* TYPE_SECURITY_LABEL_PARSER - presents the user with a list of Security Label parser options. Security label parsers are responsible for translating from a source security label to a Koverse record security label.


Transforms are pre-configured with parameters for input and output Data Sets. Sources and Sinks are pre-configured with output or input collections, respectively.
