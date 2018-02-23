.. _Authentication:

Authentication and Authorization
================================

Koverse can be extended to integrate with existing enterprise authentication and authorization systems that may be required for a given production environment.
While an extensible component that is built against the Koverse SDK, these authentication and authorization modules are not like other extensible components like Sources and Transform and packaged into a Koverse AddOn.
Instead, these modules need to be built into a JAR and placed in the classpath of the Koverse Webapp or Koverse Server.
Additionally, the koverse-webapp.properties or koverse-server.properties files need to be modified to identify the module(s) that Koverse should use for authentication and authorization.

Implementing an Authentication and Authorization Module
-------------------------------------------------------

To implement an authentication and authorization module for the webapp, a developer will extend the ``AbstractWebAppAuthModule`` class.
This is a `Guice <https://github.com/google/guice>`_ module that enables the injection of new authentication and authorization implementations.
There are two ways to implement authentication, either with the ``HttpServletRequestAuthenticator`` or the ``WebAppParameterAuthenticator``.
The ``HttpServletRequestAuthenticator`` enables authentication based on information in the HttpServletRequest, such as an X.509 certificate.
The ``WebAppParameterAuthenticator`` enables authentication based on custom, named parameters. To pass external groups or security tokens to Koverse, implement a ``WebAppAuthorizer``.

To implement an authorization module for the server, a developer will extend the ``AbstractServerAuthModule`` class, which is also a Guice module.
Only authorizers can be created for the Koverse Server.
To create one, implement the interface ``ServerAuthorizer`` in your own class.
The Server authorizer can do many of the same things that the Web App authorizer can do, so you may
decide to create a Server authorizer instead of a Web App authorizer.
The only time that an authorizer must be used in the webapp and not the server is when some information avaialble from the HTTP call is required to do the authorization.

Example Webapp Authenticator
----------------------------

For this example, we'll write an authenticator that allows any user to authenticate.
A user record is created by combining the user's IP address and user-agent string 
(e.g. the name of their web browser).

This authenticator is thus very simple, but illustrates the fundamental concepts. An Authenticator
is composed of two classes, one for the logic and one for describing the authenticator.

.. code-block:: java

  package com.koverse.webapp.security.allowall;
  
  import com.koverse.com.google.common.base.Optional;
  import com.koverse.sdk.security.webapp.HttpServletRequestAuthenticator;
  import com.koverse.sdk.security.webapp.HttpServletRequestAuthenticatorDescription;
  
  import com.google.inject.Inject;
  import com.google.inject.Singleton;
  
  import javax.servlet.http.HttpServletRequest;
  
  @Singleton
  public class AllowAllAuthenticator implements HttpServletRequestAuthenticator {
  
    private static final class Description implements HttpServletRequestAuthenticatorDescription {
  
      @Override
      public Class<? extends HttpServletRequestAuthenticator> getAuthenticatorClass() {
        return AllowAllAuthenticator.class;
      }
  
      @Override
      public String getTypeId() {
        return "allowAll";
      }
  
      @Override
      public String getDisplayName() {
        return "Allow All";
      }
    }
  
    private static final HttpServletRequestAuthenticatorDescription DESCRIPTION = new Description();
  
    @Inject
    AllowAllAuthenticator() {}
  
    @Override
    public HttpServletRequestAuthenticatorDescription getDescription() {
      return DESCRIPTION;
    }
  
    @Override
    public Optional<String> authenticate(HttpServletRequest authenticationInfo) {
      final String remoteAddress = authenticationInfo.getRemoteAddr();
      final String agent = authenticationInfo.getHeader("User-Agent");
      final String externalId = String.format("%s-%s", remoteAddress, agent);
  
      return Optional.of(externalId);
    }
  }


The logic is contained in the class above, with the description as an inner class.
The description specifies the type id for the authenticator and any parameters
that the authenticator uses. When the authenticator is invoked via the 
``authenticate()`` method, it is given the details of the HTTP request.
In this example, a user id string is created from that HTTP request.
If your authenticator declines to authenticate a user, simply return 
``Optional.empty()``.

Note that when a custom authenticator is used, any user id that is returned
must belong to a koverse group that has the "useKoverse" system permission.
For testing purposes, this can be done by logging into Koverse as an admistrator
user and giving the group "Everyone" that system permission. Then, any user that
this authenticator creates will automatically become a member of that group and
thus be able to use Koverse.  If the user doe not have this system permission, then
the Koverse user interface will display a notification saying to contact the Koverse
administrator to get access to Koverse.

This is necessary because if your authenticator uses an external system to authenticate
a user (such as LDAP), that does not necessarily mean that the user has permission to use
Koverse. Further customization could be done to map LDAP groups to Koverse groups that
have this system permission to use Koverse.

Example Webapp Auth Module
--------------------------

An auth module must be created in order to use a authenticator.

.. code-block:: java

  package com.koverse.webapp.security;
  
  import com.koverse.sdk.security.webapp.AbstractWebAppAuthModule;
  import com.koverse.sdk.security.webapp.HttpServletRequestAuthenticator;
  import com.koverse.sdk.security.webapp.WebAppAuthorizer;
  import com.koverse.sdk.security.webapp.WebAppParameterAuthenticator;
  import com.koverse.webapp.security.allowall.AllowAllAuthenticator;
  
  import com.google.inject.multibindings.Multibinder;
  
  public class ExampleAuthModule extends AbstractWebAppAuthModule {
  
    @Override
    protected void configure(
            Multibinder<WebAppAuthorizer> authorizersBinder,
            Multibinder<HttpServletRequestAuthenticator> servletRequestAuthenticatorsBinder,
            Multibinder<WebAppParameterAuthenticator> parameterAuthenticatorsBinder) {
  
      servletRequestAuthenticatorsBinder.addBinding().to(AllowAllAuthenticator.class);
    }
  }


In this example, the example authenticator. Simply put the jar(s) containing these classes
into the Koverse web application's ``lib`` directory and then edit the Koverse
web application configuration file **koverse-webapp.properties** file, located
in the ``conf`` directory. All that has to be done is to set the property
``com.koverse.webapp.auth.modules`` to the full class name of the auth module. For example:

.. code-block:: properties

  com.koverse.webapp.auth.modules=com.koverse.webapp.security.ExampleAuthModule

Then, when Koverse starts up again, it will use this auth module instead of
its default one.


Koverse Server Configuration
----------------------------

To update the active authorization modules used by the Koverse Server, set the ``com.koverse.server.security.auth.modules`` property in koverse-server.properties to a comma separated list of Guice module class names.
