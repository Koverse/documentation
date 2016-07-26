.. _Addons:

Addons
---------------------

Any custom code, whether it be one or more applications, transforms, or custom sources or sinks, can be packaged up into a simple JAR -  referred to in Koverse as an Addon. Addons are uploaded to Koverse, via the System Administration app, for deployment.

Koverse reads the contents of the JAR file and extracts necessary metadata from any classes extending Koverse known types, such as Application, Transform, Source, and Sink.


Creating an Addon
^^^^^^^^^^^^^^^^^

Addons are simply JAR files with some specific files and a well formed directory structure. The koverse-sdk-project provides a complete example maven project that builds an appropriately constructed Addon JAR. You may use any assembly framework you like to produce a JAR file with the following attributes


	 * Java binary .class files in the normal Java package directory structure.


	 * Koverse Application HTML and JavaScript should be placed in the /apps/<applicationId> folder - where applicationId matches the string your CustomApplication.getApplicationId() method returns.


	 * A file named classesToInspect can optionally be placed at the root level of the JAR. This file is a line separated list of all Applications, Transforms, Sources, and Sink Classes. Including this file causes Koverse to inspect only the classes listed in this file. This is useful when your Addon includes classes whose dependencies are not present in the JAR.


Example Addon JAR directory structure::

	MyCustomAddon.jar
	|
	| -- classesToInspect
	| -- com
	           | -- mycompany
	                 | -- myproject
	                        | -- MyCustomTransform.class
	                        | -- MyCustomApplication.cass
	|-- some
	        | -- other
	                | -- dependency
	                        | -- OtherDependency.class


	| -- apps
	        | -- myApplicationId
	                | -- index.html
	                | -- css
	                        |-- index.css
	                | -- javascript
	                        |-- index.js
	        | -- mySecondApplicationId
	                | -- index.html
	                | -- someFolder
	                        | -- some.file


Uploading an Addon to Koverse
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

See the :ref:`Addons` section.

Applications may be auto deployed, and immediately ready for use - if so defined by the developer of the application. Sources, Transforms, and Sinks are also now ready for immediate use as well.


Managing Versions for Custom Components
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The applicationId, sourceTypeId, transformTypeId, and sinkTypeId property of the Applications, Sources, Transforms, and Sinks, are used by Koverse to identify these custom components across their versions. This means that, except in extreme cases, all versions of a custom component should share a single typeId string. This allows Koverse to identify when a newly installed custom component should override an exisisting custom component.


Here is an example life cycle of a single Addon containing a single custom source.


	 #. An administrator or developer user uploads a MyCustomAddon-1.0.0.jar Addon into a Koverse installation. This JAR contains a MyCustomSource with a sourceTypeId of myCustomSource.

	 #. The source  is used by many other end users over time to import data from various systems.

	 #. A developer releases a new updated version of the Source. This source is now named My New Custom Source, has a sourceTypeId of myCustomSource, and is in an Addon named MyNewCustomAddon-2.0.0.jar.

	 #. An administrator or developer uploads this new Addon JAR file.

	 #. Koverse inspects the MyNewCustomAddon at install time, and discovers that the MyNewCustomSource has the same sourceTypeId as the existing MyCustomSource.

	 #. Koverse automatically disables the old MyCustomSource. All instances of this source now execute the MyNewCustomSource code. This means end users may need to consider the changes in parameters or behavior.

	 #. When all of the components of an Addon have been disabled, either manually or via uploading of new overlapping components, the old addon itself is disabled - and is therefore removed from the administration interface. In this case, MyCustomAddon-1.0.0.jar is disabled.

	 #. Koverse does not discard the logging or reference to the old Addon. These items remain for auditing and provenance purposes.


The Version Property
^^^^^^^^^^^^^^^^^^^^

The version properties of these custom components are simply used to identify the active installed version for troubleshooting and verification purposes. Koverse uses a last installed methodology when selecting the implementation version for custom Application, Source, Transforms, and Sinks. This means that the end user can simply upload any version of an Addon, and be assured they are using the last installed. The version string itself has no affect on which version is executed.


Change Control Across Versions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Developers should consider that customers upgrading from one version to the next, or down grading, may have already established Source, Transform, or Sink instances that have existing parameter values. This means the developer may need to handle outdated parameter configurations. The most appropriate method to handle changing parameter sets across versions is to inform the user that new configuration is needed, when simple error checking of parameters fails.



Defining Custom Apps in Addons
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Addons enable developers to deliver custom "Apps" that are managed and deployed in Koverse installations. When a system administrator uploads an Addon JAR file, it is inspected for custom Application definitions. The custom application contents are included included in the JAR, so that it's contents can then be delivered to the end user.

**Application Definition**

See the koverse-sdk-project/src/main/com/koverse/foo/MyCustomApplication.java file for an example of defining a custom application. That file defines the presence of a custom application type.

**HTML/JS code in Addons**

See the `Creating an Addon` section for the structure of an HTML/JS app in side an addon. The top directory name of the app's html/js code should match the output of getApplication() method.
