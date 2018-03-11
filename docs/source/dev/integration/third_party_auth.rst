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
The Server authorizer can do many of the same things that the Web App authorizer can do, so you may decide to create a Server authorizer instead of a Web App authorizer.
The only time that an authorizer must be used in the webapp and not the server is when some information avaialble from the HTTP call is required to do the authorization.

Example Webapp Authenticator
----------------------------

For this example, we'll write an authenticator that uses LDAP and PKI to authenticate.
In this scenario, the user needs to have X509 security certificates installed in their browser.
Those certificates will be sent to the koverse web app when the user visits the koverse URL with their browser.
The certificates will then be used to attempt to login to an LDAP server.
If more than one certificate is provided by the user's web browser, each will be tried and the first one to sucessfully authenticate with the LDAP server will authenticate the user.
This authenticator is thus very simple, but illustrates the fundamental concepts.

First, create a class that implements ``HttpServletRequestAuthenticator``:

.. code-block:: java

  @Slf4j
  public class PkiAuthenticator implements HttpServletRequestAuthenticator {
  
    private final String ldapUrl;
    private final String ldapInitialContextFactory;
  
    @Inject
    public PkiAuthenticator(
          @Named("com.koverse.auth.ldap.url") final String ldapUrl,
          @Named("com.koverse.auth.ldap.initial.context.factory") final String ldapInitialContextFactory) {
  
      this.ldapUrl = ldapUrl;
      this.ldapInitialContextFactory = ldapInitialContextFactory;
    }
  }

This authenticator requires that two properties be specified in the ``koverse-webapp.properties`` file to specify the LDAP URL and which Java class to use to get the initial LDAP context.
An example is below:

.. code-block:: properties

  com.koverse.auth.ldap.initial.context.factory=com.sun.jndi.ldap.LdapCtxFactory
  com.koverse.auth.ldap.url=ldap://localhost/

This class will be instantiated by Koverse with the named parameters being populated by the ``koverse-webapp.properties`` file.
If the properties file does not contain values for the named properties, the koverse webapp will fail to start and show an error describing that the properties could not be found.

Next, a method is added to return a description of this authenticator:

.. code-block:: java
  

  @Override
  public HttpServletRequestAuthenticatorDescription getDescription() {
    return new HttpServletRequestAuthenticatorDescription() {
      @Override
      public Class<? extends HttpServletRequestAuthenticator> getAuthenticatorClass() {
        return PkiAuthenticator.class;
      }
  
      @Override
      public String getDisplayName() {
        return "Example PKI LDAP Authentication";
      }
  
      @Override
      public String getTypeId() {
        return "example-pki-ldap-auth";
      }
    };
  }

The authenticator class that is returned by the description is simply the class of this authenticator.
Koverse uses this to instantiate the autheticator when the web app starts.
The display name is the human readable name of the authenticator.
The type id is a string that uniquely identifies this authenticator.

Next is the logic to perform the authentication:

.. code-block:: java


  @Override
  public Optional<String> authenticate(HttpServletRequest authenticationInfo) {

    final X509Certificate[] certificates = (X509Certificate[]) authenticationInfo.getAttribute("javax.servlet.request.X509Certificate");

    if (certificates == null || certificates.length == 0) {
      log.warn("No X509 certificates found");
      return Optional.absent();
    } else {
      log.info("Found {} X509 certificates", certificates.length);

      for (final X509Certificate certificate : certificates) {
        final Principal principal = certificate.getSubjectDN();
        final Hashtable<String, Object> environment = new Hashtable<>();

        log.info("Trying X509 certificate for principal: {}", principal.getName());

        environment.put(Context.INITIAL_CONTEXT_FACTORY, ldapInitialContextFactory);
        environment.put(Context.PROVIDER_URL, ldapUrl);
        environment.put(Context.SECURITY_PRINCIPAL, principal);
        environment.put(Context.SECURITY_CREDENTIALS, certificate);
  
        try {
          final InitialDirContext initialDirContext = new InitialDirContext(environment);
    
          initialDirContext.close();
          log.info("X509 certificate authentication suceeded for principal : {}", principal);
          return Optional.of(principal.getName());
        } catch (AuthenticationException e) {
          log.warn("X509 certificate authentication failed for principal : {}", principal, e);
        } catch (NamingException e) {
          log.error("Could not contact LDAP server for X509 certificate principal : {}", principal, e);
        }
      }
    
      log.warn("No X509 certificates succeeded for login");
      return Optional.absent();
  
    }
  }
  
The authentication logic works by getting the X509 certificates from the Java Servlet API.
These are the certificates that the user's web browser sent.
Each certificate is then used to attempt to authenticate with the LDAP server.
If one of the certificates works, the user is authetnicated and their user name is the principal of the certificate.
If none of the certificates work, the user is not logged in, as indicated by returning ``Optional.absent()``.

Here is the authenticator source code in its entirety:

.. code-block:: java

  package com.koverse.webapp.security.pki;
  
  import com.koverse.com.google.common.base.Optional;
  import com.koverse.sdk.security.webapp.HttpServletRequestAuthenticator;
  import com.koverse.sdk.security.webapp.HttpServletRequestAuthenticatorDescription;
  
  import com.google.inject.Inject;
  import com.google.inject.name.Named;
  import lombok.extern.slf4j.Slf4j;
  
  import java.security.Principal;
  import java.security.cert.X509Certificate;
  import java.util.Hashtable;
  
  import javax.naming.AuthenticationException;
  import javax.naming.Context;
  import javax.naming.NamingException;
  import javax.naming.directory.InitialDirContext;
  import javax.servlet.http.HttpServletRequest;
  
  @Slf4j
  public class PkiAuthenticator implements HttpServletRequestAuthenticator {
  
    private final String ldapUrl;
    private final String ldapInitialContextFactory;
  
    @Inject
    public PkiAuthenticator(
          @Named("com.koverse.auth.ldap.url") final String ldapUrl,
          @Named("com.koverse.auth.ldap.initial.context.factory") final String ldapInitialContextFactory) {
  
      this.ldapUrl = ldapUrl;
      this.ldapInitialContextFactory = ldapInitialContextFactory;
    }
  
    @Override
    public HttpServletRequestAuthenticatorDescription getDescription() {
      return new HttpServletRequestAuthenticatorDescription() {
        @Override
        public Class<? extends HttpServletRequestAuthenticator> getAuthenticatorClass() {
          return PkiAuthenticator.class;
        }
  
        @Override
        public String getDisplayName() {
          return "Example PKI LDAP Authentication";
        }
  
        @Override
        public String getTypeId() {
          return "example-pki-ldap-auth";
        }
      };
    }
  
    @Override
    public Optional<String> authenticate(HttpServletRequest authenticationInfo) {
  
      final X509Certificate[] certificates = (X509Certificate[]) authenticationInfo.getAttribute("javax.servlet.request.X509Certificate");
  
      if (certificates == null || certificates.length == 0) {
        log.warn("No X509 certificates found");
        return Optional.absent();
      } else {
        log.info("Found {} X509 certificates", certificates.length);
  
        for (final X509Certificate certificate : certificates) {
          final Principal principal = certificate.getSubjectDN();
          final Hashtable<String, Object> environment = new Hashtable<>();
  
          log.info("Trying X509 certificate for principal: {}", principal.getName());
  
          environment.put(Context.INITIAL_CONTEXT_FACTORY, ldapInitialContextFactory);
          environment.put(Context.PROVIDER_URL, ldapUrl);
          environment.put(Context.SECURITY_PRINCIPAL, principal);
          environment.put(Context.SECURITY_CREDENTIALS, certificate);

          try {
            final InitialDirContext initialDirContext = new InitialDirContext(environment);
  
            initialDirContext.close();
            log.info("X509 certificate authentication suceeded for principal : {}", principal);
            return Optional.of(principal.getName());
          } catch (AuthenticationException e) {
            log.warn("X509 certificate authentication failed for principal : {}", principal, e);
          } catch (NamingException e) {
            log.error("Could not contact LDAP server for X509 certificate principal : {}", principal, e);
          }
        }
      
        log.warn("No X509 certificates succeeded for login");
        return Optional.absent();
  
      }
    }
  }

Note that when a custom authenticator is used, any user id that is returned must belong to a koverse group that has the "useKoverse" system permission.
For testing purposes, this can be done by logging into Koverse as an admistrator user and giving the group "Everyone" that system permission.
Then, any user that this authenticator creates will automatically become a member of that group and thus be able to use Koverse.
If the user doe not have this system permission, then the Koverse user interface will display a notification saying to contact the Koverse administrator to get access to Koverse.

This is necessary because if your authenticator uses an external system to authenticate a user (such as LDAP), that does not necessarily mean that the user has permission to use Koverse.
Further customization could be done to map LDAP groups to Koverse groups that have this system permission to use Koverse.

Example Webapp Auth Module
--------------------------

An auth module must be created in order to use a authenticator.
This module wires the authenticator to the Koverse Web app authentication processing.

.. code-block:: java

  package com.koverse.webapp.security.pki;
  
  import com.koverse.sdk.security.webapp.AbstractWebAppAuthModule;
  import com.koverse.sdk.security.webapp.HttpServletRequestAuthenticator;
  import com.koverse.sdk.security.webapp.WebAppAuthorizer;
  import com.koverse.sdk.security.webapp.WebAppParameterAuthenticator;
  
  import com.google.inject.multibindings.Multibinder;
  
  public class PkiAuthModule extends AbstractWebAppAuthModule {
  
    @Override
    protected void configure(
            Multibinder<WebAppAuthorizer> authorizersBinder,
            Multibinder<HttpServletRequestAuthenticator> servletRequestAuthenticatorsBinder,
            Multibinder<WebAppParameterAuthenticator> parameterAuthenticatorsBinder) {
  
      servletRequestAuthenticatorsBinder.addBinding().to(PkiAuthenticator.class);
    }
  }



In this example, the example authenticator is wired to be used as the Koverse authenticator.
To install, simply put the jar(s) containing these classes into the Koverse web application's ``lib`` directory and then edit the Koverse web application configuration file **koverse-webapp.properties** file, located in the ``conf`` directory.
All that has to be done is to set the property ``com.koverse.webapp.auth.modules`` to the full class name of the auth module. For example:

.. code-block:: properties

  com.koverse.webapp.auth.modules=com.koverse.webapp.security.pki.PkiAuthModule

Then, when Koverse starts up again, it will use this auth module instead of its default one.


Koverse Server Configuration
----------------------------

To update the active authorization modules used by the Koverse Server, set the ``com.koverse.server.security.auth.modules`` property in koverse-server.properties to a comma separated list of Guice module class names.
