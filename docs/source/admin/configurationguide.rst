.. _ConfigurationGuide:

====================
Configuration Guide
====================


Koverse Server Configuration
----------------------------

The following subsections list the koverse server properties along with their
default value and a description.

Core Properties
^^^^^^^^^^^^^^^

The properties control the core of the server operation.

=======================================================  ==================================================  ===============
  property name                                            default value                                       description
=======================================================  ==================================================  ===============
com.koverse.addons.dir                                   addons                                              The directory, relative to the server install directory, where addons can be loaded from
com.koverse.server.password.hash.salt                    JKB//GmLoy8PpNCrt79PPg==                            The obfuscated salt to use for user passwords
com.koverse.license.verification                         5631524b62324648536e526152336856566a46564f513d3d    An obfuscated key used to verify and encrypt sensitive property values
com.koverse.server.logging.externalProcess.port          12400                                               The TCP/IP port used to route logging data from processes created by the server
com.koverse.lib.jar.path                                 lib                                                 The directory, relative to the server install directory, where server library files are stored
com.koverse.server.security.auth.modules                                                                     Comma-separated list of java classes that define 3rd party authentication and authorization modules
com.koverse.server.authorizations.autoadd                true                                                Whether to automatically add a data store authorizations when a user tries to use one
com.koverse.server.import.withoutsecfield                true                                                Whether to import records without a security field or not
com.koverse.server.auth.useKoversePermission.required    false                                               Whether users need a special permission to use Koverse at all
com.koverse.server.query.allowTableScan                  true                                                Allow inneficient queries to run that would normally require a composite index to be created
com.koverse.server.purgeJobsDate                         30d                                                 Jobs older than this time will be deleted from the server, may also use "h" or "m" for hours or minutes (e.g. 12h)
instancePrefix                                           kv                                                  In a multi-tenant setup, this prefix identifies each tenant
settingsSavedOnce                                        true                                                Deprecated setting, just always leave it as "true"
disableAutomaticSupportReport                            true                                                Koverse can send support reports through email, it is disabled by default
defaultDataCollectionFieldStatsMinimumExecutionPeriod    0                                                   The minimum number of milliseconds required between executions of data collection field stats
defaultDataCollectionSamplingMinimumExecutionPeriod      0                                                   The minimum number of milliseconds required between executions of data collection sampling jobs
defaultDataCollectionSchemaMinimumExecutionPeriod        0                                                   The minimum number of milliseconds required between executions of data collection schema jobs
logoffDisabled                                           false                                               Deprecated property, has no effect
accountMenuDisabled                                      false                                               Deprecated property, has no effect
usersCanChangePassword                                   true                                                Whether to allow a user ot change his or her own password. In PKI environments, it makes no sense for the user to change their password
usersCanEditAccountDetails                               true                                                Deprecated property, has no effect
temporaryWorkingDirectory                                /var/tmp                                            Deprecated property, has no effect
serializationMaxBufferSize                               104857600                                           Buffer size in bytes to use for Kryo serialization
com.koverse.server.jmx.client.url                                                                            Deprecated property, has no effect
=======================================================  ==================================================  ===============

Database Properties
^^^^^^^^^^^^^^^^^^^

These properties control how the server uses the backend RDBMS.

======================================================  ==========================  ===============
  property name                                           default value               description
======================================================  ==========================  ===============
com.koverse.server.jdbc.user                            koverse                     The database user
com.koverse.server.jdbc.password                        dMvU/kr0e8muMC2fwpWukw==    The encrypted data password
com.koverse.server.jdbc.url                                                         The JDBC URL used to connect to the database
com.koverse.server.jdbc.acquireIncrement                3                           How many connections to acquire for the connection pool at a time when one is needed
com.koverse.server.jdbc.initialPoolSize                 3                           The initial size of the connection pool
com.koverse.server.jdbc.maxPoolSize                     15                          The maximum size of the connection pool
com.koverse.server.jdbc.maxIdleTime                     0                           How long a connection stations in the connection pool before being discarded
com.koverse.server.jdbc.minPoolSize                     3                           The minimum possible size of the connection pool
com.koverse.server.jdbc.maxConnectionAge                0                           How long a connection can stay in a pool, even if used
com.koverse.server.jdbc.maxIdleTimeExcessConnections    0                           How long a connection can be idle before being removed from the pool
======================================================  ==========================  ===============

Hibernate Properties
^^^^^^^^^^^^^^^^^^^^

These properties adjust how koverse uses the Hibernate Object-Relational framework

=====================================  =========================================  ===============
  property name                          default value                              description
=====================================  =========================================  ===============
hibernate.c3p0.min_size                10                                         The minimum size of the C3P0 database connection pool
hibernate.c3p0.max_size                100                                        The maximum size of the C3P0 database connection pool
hibernate.c3p0.timeout                 300                                        The maximum length of time a connection stays in the C3P0 database connection pool
hibernate.c3p0.max_statements          50                                         Number of prepared statements to cache at any one time
hibernate.c3p0.idle_test_period        3000                                       The maximum amount of time in ms that a connection can stay in the C3P0 database connection pool
hibernate.c3p0.numHelperThreads        10                                         The number of helper threads to use for slow asynchronous operations
hibernate.cache.provider_class         org.hibernate.cache.NoCacheProvider        The caching system to use
hibernate.id.new_generator_mappings    true                                       Whether to use Hibernate's "new" generator mappings or not, you probably certainly do want to use them
hibernate.hbm2ddl.auto                 validate                                   Whether Hibernate creates DDL or just validates the DDL. We use Liquibase to create the DDL, so Hibernate just verifies it
hibernate.show_sql                     false                                      Log the SQL that Hibernate generates, only really useful for debugging purposes
hibernate.format_sql                   false                                      Pretty print the show SQL, if SQL is being logged
hibernate.use_sql_comments             false                                      Show SQL comments, if SQL is being logged
hibernate.connection.driver_class      org.postgresql.Driver                      The JDBC driver class to use, change it for your database. By default it is setup to use Postgres
hibernate.dialect                      org.hibernate.dialect.PostgreSQLDialect    The Hibernate dialect, change it if you are not using Postgres
=====================================  =========================================  ===============

Thrift Properties
^^^^^^^^^^^^^^^^^

These properties control how the server uses its Thrift services

==================================================  =================  ===============
  property name                                       default value      description
==================================================  =================  ===============
com.koverse.server.thrift.numberOfThreads           20                 The number of threads to use to process the calls to each of the thrift services
com.koverse.server.thrift.socketTimeoutSeconds      0                  The maximum socket timeout for a thrift call
com.koverse.server.thrift.maxBufferReadSizeBytes    1073741824         The amount of memory to use to process each thrift call
com.koverse.server.thrift.dataflow.port             12320              The TCP/IP port for the thrift dataflow service
com.koverse.server.thrift.usergroup.port            12321              The TCP/IP port for the thrift users and groups service
com.koverse.server.thrift.collection.port           12322              The TCP/IP port for the thrift data set service
com.koverse.server.thrift.audit.port                12323              The TCP/IP port for the thrift audit service
com.koverse.server.thrift.query.port                12324              The TCP/IP port for the thrift query service
com.koverse.server.thrift.admin.port                12325              The TCP/IP port for the thrift administration service
com.koverse.server.thrift.resource.port             12327              The TCP/IP port for the thrift resource service
com.koverse.server.thrift.addon.port                12328              The TCP/IP port for the thrift addon service
com.koverse.server.thrift.basic.addon.port          12330              The TCP/IP port for the thrift basic addon service
==================================================  =================  ===============

Metrics Properties
^^^^^^^^^^^^^^^^^^^

These properties control how the server reports metrics, both locally to a log
and to external systems like Ganglia

====================================================================  =================  ===============
  property name                                                         default value      description
====================================================================  =================  ===============
com.koverse.server.metrics.logging.reporter.enabled                   false              Whether local log metrics reporting is enabled
com.koverse.server.metrics.logging.reporter.periodInSeconds           30                 At what interval to log reports
com.koverse.server.metrics.ganglia.reporter.enabled                   false              Whether Ganglia reporting of metrics is enabled
com.koverse.server.metrics.ganglia.reporter.periodInSeconds           10                 At what interval to report metrics to Ganglia
com.koverse.server.metrics.ganglia.reporter.host                                         The Ganglia host
com.koverse.server.metrics.ganglia.reporter.port                      8649               The Ganglia port
com.koverse.server.metrics.ganglia.reporter.clientHostnameOverride                       Override the client host name, leave blank to not overrride
com.koverse.server.metrics.ganglia.reporter.aggregationsWhiteList                        An optional selection of aggragations to report on, leave blank to report all
com.koverse.server.metrics.ganglia.reporter.metricsWhiteList                             An optional selection of metrics to report on, leave blank to report all
====================================================================  =================  ===============

Spark Properties
^^^^^^^^^^^^^^^^^

These properties control how the server interacts with Spark.

If the mode is set to 'yarn', the following MUST be done for it to work properly:

1. The system environment variable 'HADOOP_CONF_DIR' must be set to the hadoop config directory (e.g. /etc/hadoop/conf) for the koverse server process
2. The property 'com.koverse.server.spark.dir' must be set to the directory containing the spark install

=================================  =================  ===============
  property name                      default value      description
=================================  =================  ===============
com.koverse.server.spark.mode      master             Can be one of 'master' and 'yarn'.
com.koverse.server.spark.master    local              If mode is 'master', specify what kind of master
com.koverse.server.spark.dir       /opt/spark         The directory where spark is installed
=================================  =================  ===============

Data Store Properties
^^^^^^^^^^^^^^^^^^^^^

These properties control how the server uses the backend Data Store. At
this time, the only type of data store supported is Accumulo.

======================================  =================  ===============
  property name                           default value      description
======================================  =================  ===============
dataStoreType                           ACCUMULO           Only ACCUMULO is supported at this time
dataStoreSetting.instanceName           koverse            The Accumulo instance name
dataStoreSetting.username               koverse            The Accumulo user name
dataStoreSetting.password               secret             The Accumulo password
dataStoreSetting.zookeeperServers                          The ZooKeepers used for Accumulo
dataStoreSetting.stringDelimiter        _                  Deprecated property, has no effect
dataStoreSetting.numberOfBuckets        4                  Deprecated property, has no effect
dataStoreSetting.batchDurationSec       10                 Deprecated property, has no effect
dataStoreSetting.clockDeltaBufferSec    5                  Deprecated property, has no effect
======================================  =================  ===============

Email Sending Properties
^^^^^^^^^^^^^^^^^^^^^^^^

These properties control how the server sends email.
Note that this capability is diabled by default.

=======================  ================================  ===============
  property name            default value                     description
=======================  ================================  ===============
smtpEnabled              false                             Enable the server being able to send emails
koverseBaseURL           http://koversevm:8080/Koverse     The URL to send in the email for koverse
smtpServerHostName       smtp.koverse.com                  The SMTP host name
smtpServerPort           465                               The SMTP TCP/IP port
smtpUsername             do-not-reply@koverse.com          The SMTP user name
smtpPassword                                               The SMTP password
smtpFromEmailAddress     do-not-reply@koverse.com          The SMTP "from" email address
smtpConnectionType       SSL                               The SMTP connection type, can be one of SSL, TLS, or plain
=======================  ================================  ===============

Kerberos Properties
^^^^^^^^^^^^^^^^^^^^^

These properties control the server's integration with Kerberos. Note that this
integration is disabled by default.

If you wish to integrate with Kerberos, be sure to use the following guidelines
to define the Kerberos user and keytab path.

If the HADOOP_CONF_DIR environment variable is NOT set, these values will have no effect.

If you are NOT running in a Kerberized environment, still, do NOT leave these values as empty!

==============================================  ======================================  ===============
  property name                                   default value                           description
==============================================  ======================================  ===============
com.koverse.server.kerberos.accumulo.disable    true                                    Disables Kerberos integration
com.koverse.server.kerberos.user                koverse@TEST.KOVERSE.COM                The Kerberos user name/principal
com.koverse.server.kerberos.keytab.path         /home/koverse/koverse.service.keytab    The path for the Kerberos keytab file
com.koverse.server.kerberos.delay               3600                                    How often to run the kinit command, in seconds
==============================================  ======================================  ===============

Koverse Web App Configuration
-----------------------------

The following subsections list the koverse webapp properties along with their
default value and a description.

Core Properties
^^^^^^^^^^^^^^^

The properties control the core of the webapp operation.

==================================================  ==============================================================  ===============
  property name                                       default value                                                   description
==================================================  ==============================================================  ===============
com.koverse.webapp.showDemoTour                     false                                                           Whether to show a Koverse demonstraiton tour after the user logs in or not
com.koverse.webapp.googleAnalyticsId                                                                                A Google Analytics Identifier
com.koverse.webapp.demoMode                         false                                                           Whether Koverse is in demonstation mode
com.koverse.license.verification                    5631524b62324648536e526152336856566a46564f513d3d                An obfuscated license key that verifies Koverse installation and passwords
com.koverse.webapp.auth.modules                     com.koverse.webapp.security.DefaultAuthModule                   Comma separated list of guice modules that define auth module classes
com.koverse.webapp.record.modules                   com.koverse.webapp.record.DefaultWebAppRecordConverterModule    Guice module for customized web app record converters
com.koverse.webapp.jetty.http.port                  8080                                                            The HTTP port to use
com.koverse.webapp.jetty.https.port                 8443                                                            The HTTPS port to yse
com.koverse.webapp.jetty.http.enabled               true                                                            If HTTP protocol and port is used
com.koverse.webapp.jetty.https.enabled              false                                                           If HTTPS protocol and port is used
com.koverse.webapp.jetty.tls.keystore                                                                               The Keystore used for HTTPS keys
com.koverse.webapp.jetty.tls.keystore.password                                                                      The password to the Keystore
com.koverse.webapp.jetty.tls.truststore                                                                             the truststore used for HTTPS certificates
com.koverse.webapp.jetty.tls.truststore.password                                                                    The password to the truststore
com.koverse.webapp.jetty.tls.needClientAuth         false                                                           If using HTTPS, whether the client must use PKI auth or not
com.koverse.webapp.jetty.tls.validateCerts          false                                                           If use HTTPS, whether to validate PKI certificates or not
==================================================  ==============================================================  ===============


Thrift Properties
^^^^^^^^^^^^^^^^^

The properties control the thrift-based communications of the webapp to the server.

============================================  ==========================  ===============
  property name                                 default value               description
============================================  ==========================  ===============
com.koverse.server.thrift.host                localhost                   The koverse server hostname
com.server.webapp.thrift.client.id            defaultClient               The client identifier to use to authenticate with the koverse server
com.server.webapp.thrift.client.password      7c7m2BWwMwLkRx1i+Kgiag==    The encrypted password used to authenticate with the koverse server
com.server.webapp.thrift.client.poolSize      20                          The size of the connection pool for each thrift service
com.koverse.client.thrift.socketTimeout       120                         The TCP/IP socket timeout for connecting to the koverse server.
com.koverse.server.thrift.dataflow.port       12320                       The TCP/IP port for the koverse server's data flow service
com.koverse.server.thrift.usergroup.port      12321                       The TCP/IP port for the koverse server's user and group service
com.koverse.server.thrift.collection.port     12322                       The TCP/IP port for the koverse server's data set service
com.koverse.server.thrift.audit.port          12323                       The TCP/IP port for the koverse server's audit service
com.koverse.server.thrift.query.port          12324                       The TCP/IP port for the koverse server's query service
com.koverse.server.thrift.admin.port          12325                       The TCP/IP port for the koverse server's administration service
com.koverse.server.thrift.backup.port         12326                       The TCP/IP port for the koverse server's backup service
com.koverse.server.thrift.resource.port       12327                       The TCP/IP port for the koverse server's resource service
com.koverse.server.thrift.addon.port          12328                       The TCP/IP port for the koverse server's add on service
com.koverse.server.thrift.basic.addon.port    12330                       The TCP/IP port for the koverse server's basic add on service
com.koverse.server.thrift.application.port    12329                       The TCP/IP port for the koverse server's application service
============================================  ==========================  ===============

Metrics Properties
^^^^^^^^^^^^^^^^^^^

These properties control how the webapp reports metrics, both locally to a log
and to external systems like Ganglia

====================================================================  ===================  ===============
  property name                                                         default value        description
====================================================================  ===================  ===============
com.koverse.webapp.metrics.logging.reporter.enabled                   false                Whether local log metrics reporting is enabled
com.koverse.webapp.metrics.logging.reporter.periodInSeconds           30                   At what interval to log reports
com.koverse.webapp.metrics.ganglia.reporter.enabled                   false                Whether Ganglia reporting of metrics is enabled
com.koverse.webapp.metrics.ganglia.reporter.periodInSeconds           10                   At what interval to report metrics to Ganglia
com.koverse.webapp.metrics.ganglia.reporter.host                      control              The Ganglia host
com.koverse.webapp.metrics.ganglia.reporter.port                      8649                 The Ganglia port
com.koverse.webapp.metrics.ganglia.reporter.clientHostnameOverride    koverse1:koverse1    Override the client host name, leave blank to not overrride
====================================================================  ===================  ===============

Kerberos Properties
^^^^^^^^^^^^^^^^^^^^

These properties control the webapp's integration with Kerberos. Note that this
integration is disabled by default.

If you wish to integrate with Kerberos, be sure to use the following guidelines
to define the Kerberos user and keytab path.

If the HADOOP_CONF_DIR environment variable is NOT set, these values will have no effect.

If you are NOT running in a Kerberized environment, still, do NOT leave these values as empty!

==============================================  ======================================  ===============
  property name                                   default value                           description
==============================================  ======================================  ===============
com.koverse.server.kerberos.user                koverse@TEST.KOVERSE.COM                The Kerberos user name/principal
com.koverse.server.kerberos.keytab.path         /home/koverse/koverse.service.keytab    The path for the Kerberos keytab file
com.koverse.server.kerberos.delay               3                                       How often to run the kinit command, in seconds
==============================================  ======================================  ===============
