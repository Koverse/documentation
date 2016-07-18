3rd Party Authentication and Authorization
-------------------------------------------

Koverse can be extended to integrate with existing enterprise authentication and authorization systems that may be required for a given production environment. While an extensible component that is built against the Koverse SDK, these authentication and authorization modules are not like other extensible components like Sources and Transform and packaged into a Koverse AddOn. Instead, these modules need to be built into a JAR and placed in the classpath of the Koverse Webapp. Additionally, the koverse-webapp.properties needs to be modified to identify the module(s) that Koverse should use for authentication and authorization.

**Implementing an Authentication and Authorization Module**
To implement an authentication and authorization module, a developer will extend the ``AbstractWebAppAuthModule`` class. This is a `Guice <https://github.com/google/guice>`_ module that enables the injection of new authentication and authorization implementations. There are two ways to implement authentication, either with the ``HttpServletRequestAuthenticator`` or the ``WebAppParameterAuthenticator``. The ``HttpServletRequestAuthenticator`` enables authentication based on information in the HttpServletRequest, such as an X.509 certificate. The ``WebAppParameterAuthenticator`` enables authentication based on custom, named parameters. To pass external groups or security tokens to Koverse, implement a ``WebAppAuthorizer``.

Full examples of these classes can be found in the `Koverse SDK Project <https://github.com/Koverse/koverse-sdk-project/tree/1.4/>`_ .

**Application Server Configuration**
The module and implementations described above need to be built into a JAR file which is placed in the classpath of the Koverse Webapp. This can be done by simply putting the JAR into the *lib* directory of the Koverse Web App.

**Koverse Webapp Configuration**
To update the active authentication and authorization modules used by the Koverse Webapp, set the ``com.koverse.webapp.auth.modules`` property in koverse-webapp.properties to a comma separated list of Guice modules.
