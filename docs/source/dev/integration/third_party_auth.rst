Authentication and Authorization
--------------------------------

Koverse can be extended to integrate with existing enterprise authentication and
authorization systems that may be required for a given production environment.
While an extensible component that is built against the Koverse SDK, these
authentication and authorization modules are not like other extensible
components like Sources and Transform and packaged into a Koverse AddOn.
Instead, these modules need to be built into a JAR and placed in the classpath
of the Koverse Webapp or Koverse Server. Additionally, the
koverse-webapp.properties or koverse-server.properties files need to be
modified to identify the module(s) that Koverse should use for authentication
and authorization.

**Implementing an Authentication and Authorization Module**
To implement an authentication and authorization module for the webapp, a
developer will extend the ``AbstractWebAppAuthModule`` class. This is a
`Guice <https://github.com/google/guice>`_ module that enables the injection of
new authentication and authorization implementations. There are two ways to
implement authentication, either with the ``HttpServletRequestAuthenticator``
or the ``WebAppParameterAuthenticator``. The ``HttpServletRequestAuthenticator``
enables authentication based on information in the HttpServletRequest, such as
an X.509 certificate. The ``WebAppParameterAuthenticator`` enables
authentication based on custom, named parameters. To pass external groups or
security tokens to Koverse, implement a ``WebAppAuthorizer``.

To implement an authorization module for the server, a developer will extend the
``AbstractServerAuthModule`` class, which is also a Guice module. Currently,
only authorizers can be created for the Koverse Server. To create one, implement
the interface ``ServerAuthorizer`` in your own class. The Server authorizer
can do many of the same things that the Web App authorizer can do, so you may
decide to create a Server authorizer instead of a Web App authorizer. The only
time that an authorizer must be used in the webapp and not the server is when
some information avaialble from the HTTP call is required to do the
authorization.

**Application Server Configuration**
The module and implementations described above need to be built into a JAR file
which is placed in the classpath of the Koverse Webapp or Koverse Server,
depending o what kind of authorizer it is. Authenticators are only supported in
the webapp and not in the server.
This can be done by simply putting the JAR into the *lib* directory of the
Koverse Web App or Server.

**Koverse Webapp Configuration**
To update the active authentication and authorization modules used by the
Koverse Webapp, set the ``com.koverse.webapp.auth.modules`` property in
koverse-webapp.properties to a comma separated list of Guice module class names.

**Koverse Server Configuration**
To update the active authorization modules used by the
Koverse Server, set the ``com.koverse.server.security.auth.modules`` property in
koverse-server.properties to a comma separated list of Guice module class names.
