.. _Addons:

AddOn Packaging
===============

Custom sources, sinks, authentication mechanisms, and analytics are plugged into Koverse via simple packages called AddOns.

An AddOn can be uploaded by developers through the Koverse UI and from there, a wide variety of additional users can take advantage of them.


Creating an Addon
-----------------

AddOns are simply JAR files with some specific files and a well formed directory structure.
The `koverse-sdk-project <https://github.com/Koverse/koverse-sdk-project/>`_ provides a complete example maven project that builds an appropriately constructed Addon JAR.

You may use any assembly framework you like to produce a JAR file with the following attributes

	 * Java binary .class files in the normal Java package directory structure.

	 * A plain text file named 'classesToInspect' must be placed in src/main/resources. This file is a line separated list of all Applications, Transforms, Sources, and Sink Classes. This file tells Koverse which classes to include when loading the Addon. Only classes that directly subclass one of the superclasses in the Koverse SDK need to be included.


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


Uploading an Addon to Koverse
-----------------------------

Addons can be uploaded via the Koverse UI.

Uploading the Example Koverse SDK Project AddOn
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For example, to upload the Addon built by the koverse-sdk-project, we'll first build the project::

  cd koverse-sdk-project
  mvn clean package

Now in the target/ folder we'll find a JAR file named koverse-sdk-project-2.4.0.jar.

In the Koverse UI, click on the Admin tab on the left menu.
Click on the 'Add-Ons' tab.
Drag and drop the newly created JAR file from the target folder into the large grey square or click on the 'Browse Files' button and navigate to and select the new JAR.

Koverse will process the JAR file and notify us that the JAR has been uploaded.
Now if we scroll to the bottom of the page we should see a new card showing our koverse-sdk-project AddOn along with a list of the items within that Addon, including our Analyze Sentiment transform, among others.

Now if we navigate to other parts of the Koverse UI we'll see our custom Sources, Transforms, and Sinks throughout the UI.
Other users of Koverse can start using these right away.

For example if we click on the 'Add' button on the left menu we should now see our Custom File Based Source in the list of available Sources.

Managing Versions for Custom Components
---------------------------------------

The sourceTypeId, transformTypeId, and sinkTypeId property of the Sources, Transforms, and Sinks, are used by Koverse to identify these custom components across their versions.
This means that, except in extreme cases, all versions of a custom component should share a single typeId string.
This allows Koverse to identify when a newly installed custom component should override an existing custom component.


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
