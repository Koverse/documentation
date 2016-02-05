:tocdepth: 2

===========
Error Codes
===========

Persistence Manager startup failed ::

	Exception in thread "main" java.lang.IllegalStateException: Expected the service to be RUNNING, but the service has FAILED
	at com.koverse.com.google.common.util.concurrent.AbstractService.checkCurrentState(AbstractService.java:285)
	at com.koverse.com.google.common.util.concurrent.AbstractService.awaitRunning(AbstractService.java:229)
	at com.koverse.com.google.common.util.concurrent.AbstractIdleService.awaitRunning(AbstractIdleService.java:151)
	at com.koverse.server.util.service.Services.startServices(Services.java:35)
	at com.koverse.server.util.service.Services.startServices(Services.java:18)
	at com.koverse.server.Server.main(Server.java:57)
	Caused by: java.lang.IllegalStateException: Expected the service to be RUNNING, but the service has FAILED
	at com.koverse.com.google.common.util.concurrent.AbstractService.checkCurrentState(AbstractService.java:285)
	at com.koverse.com.google.common.util.concurrent.AbstractService.awaitRunning(AbstractService.java:229)
	at com.koverse.com.google.common.util.concurrent.AbstractIdleService.awaitRunning(AbstractIdleService.java:151)
	at com.koverse.server.util.service.Services.startServices(Services.java:35)
	at com.koverse.server.util.service.Services.startServices(Services.java:18)
	at com.koverse.server.manager.system.SystemManager.startUp(SystemManager.java:488)
	at com.koverse.server.scope.AbsractKoverseScopeMethodInterceptor.invoke(AbsractKoverseScopeMethodInterceptor.java:23)
	at com.koverse.com.google.common.util.concurrent.AbstractIdleService$2$1.run(AbstractIdleService.java:54)
	at com.koverse.com.google.common.util.concurrent.Callables$3.run(Callables.java:95)
	at java.lang.Thread.run(Thread.java:795)
	Caused by: java.lang.RuntimeException: Persistence Manager startup failed
	at com.koverse.server.manager.persistence.PersistenceManager.startUp(PersistenceManager.java:78)
	... 3 more
	Caused by: java.lang.RuntimeException: Unable to obtain liquibase object
	at com.koverse.server.manager.persistence.PersistenceManager.getLiquibase(PersistenceManager.java:160)
	at com.koverse.server.manager.persistence.PersistenceManager.startUp(PersistenceManager.java:51)
	... 3 more
	Caused by: java.sql.SQLException: Connections could not be acquired from the underlying database!
	at com.mchange.v2.sql.SqlUtils.toSQLException(SqlUtils.java:118)
	at com.mchange.v2.c3p0.impl.C3P0PooledConnectionPool.checkoutPooledConnection(C3P0PooledConnectionPool.java:689)
	at com.mchange.v2.c3p0.impl.AbstractPoolBackedDataSource.getConnection(AbstractPoolBackedDataSource.java:140)
	at com.koverse.server.manager.persistence.PersistenceManager.getLiquibase(PersistenceManager.java:139)
	... 4 more
	Caused by: com.mchange.v2.resourcepool.CannotAcquireResourceException: A ResourcePool could not acquire a resource from its primary factory or source.
	at com.mchange.v2.resourcepool.BasicResourcePool.awaitAvailable(BasicResourcePool.java:1418)
	at com.mchange.v2.resourcepool.BasicResourcePool.prelimCheckoutResource(BasicResourcePool.java:606)
	at com.mchange.v2.resourcepool.BasicResourcePool.checkoutResource(BasicResourcePool.java:526)
	at com.mchange.v2.c3p0.impl.C3P0PooledConnectionPool.checkoutAndMarkConnectionInUse(C3P0PooledConnectionPool.java:755)
	at com.mchange.v2.c3p0.impl.C3P0PooledConnectionPool.checkoutPooledConnection(C3P0PooledConnectionPool.java:682)
	... 6 more
	

Possible Resolution:
Koverse runs on top of Accumulo and Hadoop, and requires a Postgres or H2 database for administrative state storage. 

Could not obtain connection to H2 or Postgres DB. Check your koverse-server.properties file to check which one you are connecting to. 
# ONLY HAVE EITHER H2 or PostgreSQL properties uncommented
# Properties for H2
com.koverse.server.jdbc.url=jdbc:h2:~/koverse;AUTO_SERVER=TRUE;LOCK_TIMEOUT=30000
hibernate.connection.driver_class=org.h2.Driver
hibernate.dialect=org.hibernate.dialect.H2Dialect
# End H2

# Properties for PostgreSQL
#com.koverse.server.jdbc.url=jdbc:postgresql://localhost:5432/koverse
#hibernate.connection.driver_class=org.postgresql.Driver
#hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
# End PostgreSQL


-----------------------------------------------------------------------------------------------------------------------------------------------------------

That error indicates your username/password is incorrect for the h2 db. ::

	2015-07-17 14:31:26,357 WARN [C3P0PooledConnectionPoolManager[identityToken->2rxee79a17p6lu1jag8v5|-22bc4db2]-HelperThread-#0] 								(com.mchange.v2.resourcepool.BasicResourcePool$ScatteredAcquireTask.run():1851)- com.mchange.v2.resourcepool.BasicResourcePool$ScatteredAcquireTask@1e4cfd9e -- Acquisition Attempt Failed!!! 	Clearing pending acquires. While trying to acquire a needed new resource, we failed to succeed more than the maximum number of allowed acquisition attempts (30). Last acquisition attempt 	exception: 
	org.h2.jdbc.JdbcSQLException: Wrong user name or password [28000-174]
	at org.h2.message.DbException.getJdbcSQLException(DbException.java:332)
	at org.h2.message.DbException.get(DbException.java:172)
	at org.h2.message.DbException.get(DbException.java:149)
	at org.h2.message.DbException.get(DbException.java:138)
	at org.h2.engine.Engine.validateUserAndPassword(Engine.java:307)
	at org.h2.engine.Engine.createSessionAndValidate(Engine.java:147)
	at org.h2.engine.Engine.createSession(Engine.java:122)
	at org.h2.engine.Engine.createSession(Engine.java:28)
	at org.h2.engine.SessionRemote.connectEmbeddedOrServer(SessionRemote.java:323)
	at org.h2.jdbc.JdbcConnection.<init>(JdbcConnection.java:105)
	at org.h2.jdbc.JdbcConnection.<init>(JdbcConnection.java:90)
	at org.h2.Driver.connect(Driver.java:73)
	at com.mchange.v2.c3p0.DriverManagerDataSource.getConnection(DriverManagerDataSource.java:146)
	at com.mchange.v2.c3p0.WrapperConnectionPoolDataSource.getPooledConnection(WrapperConnectionPoolDataSource.java:195)
	at com.mchange.v2.c3p0.WrapperConnectionPoolDataSource.getPooledConnection(WrapperConnectionPoolDataSource.java:184)
	at com.mchange.v2.c3p0.impl.C3P0PooledConnectionPool$1PooledConnectionResourcePoolManager.acquireResource(C3P0PooledConnectionPool.java:200)
	at com.mchange.v2.resourcepool.BasicResourcePool.doAcquire(BasicResourcePool.java:1086)
	at com.mchange.v2.resourcepool.BasicResourcePool.doAcquireAndDecrementPendingAcquiresWithinLockOnSuccess(BasicResourcePool.java:1073)
	at com.mchange.v2.resourcepool.BasicResourcePool.access$800(BasicResourcePool.java:44)
	at com.mchange.v2.resourcepool.BasicResourcePool$ScatteredAcquireTask.run(BasicResourcePool.java:1810)
	at com.mchange.v2.async.ThreadPoolAsynchronousRunner$PoolThread.run(ThreadPoolAsynchronousRunner.java:648)
	

The password must be encrypted using our utility. So in order to get things working I recommend using the default which is username: “koverse" password: “password” both without the double quotes.  If you want to use a non default password right now the easiest way to get that encrypted would be to send me the license verification and the password you want to use.

In your koverse-server.properties it should look like this for using the default username/password:
com.koverse.license.verification=5631524b62324648536e526152336856566a46564f513d3d
com.koverse.server.jdbc.user=koverse
com.koverse.server.jdbc.password=DswLW1kn/MyRPBVXQMi48g==



-----------------------------------------------------------------------------------------------------------------------------------------------------------


HDFS Permission issue ::

	2015-07-20 10:15:29,293 WARN [SystemStatusPoller$$EnhancerByGuice$$4e142cf9 RUNNING] (com.koverse.server.manager.system.HDFSManager.getInfo():356)- Unable to reach namenode: Access denied for user root. Superuser privilege is required
	at org.apache.hadoop.hdfs.server.namenode.FSPermissionChecker.checkSuperuserPrivilege(FSPermissionChecker.java:108)
	at org.apache.hadoop.hdfs.server.namenode.FSNamesystem.checkSuperuserPrivilege(FSNamesystem.java:5458)
	at org.apache.hadoop.hdfs.server.namenode.FSNamesystem.datanodeReport(FSNamesystem.java:4514)
	at org.apache.hadoop.hdfs.server.namenode.NameNodeRpcServer.getDatanodeReport(NameNodeRpcServer.java:787)
	at org.apache.hadoop.hdfs.protocolPB.ClientNamenodeProtocolServerSideTranslatorPB.getDatanodeReport(ClientNamenodeProtocolServerSideTranslatorPB.java:634)
	at org.apache.hadoop.hdfs.protocol.proto.ClientNamenodeProtocolProtos$ClientNamenodeProtocol$2.callBlockingMethod(ClientNamenodeProtocolProtos.java)
	at org.apache.hadoop.ipc.ProtobufRpcEngine$Server$ProtoBufRpcInvoker.call(ProtobufRpcEngine.java:585)
	at org.apache.hadoop.ipc.RPC$Server.call(RPC.java:1026)
	at org.apache.hadoop.ipc.Server$Handler$1.run(Server.java:1986)
	at org.apache.hadoop.ipc.Server$Handler$1.run(Server.java:1982)
	at java.security.AccessController.doPrivileged(Native Method)
	at javax.security.auth.Subject.doAs(Subject.java:422)
	at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1548)
	at org.apache.hadoop.ipc.Server$Handler.run(Server.java:1980)
	
-----------------------------------------------------------------------------------------------------------------------------------------------------------
	
I also see the below error connecting to jobtracker. Please check your settings.xml configuration to verify all hostname & ports are correct for connecting to the following services. The default port for the jobtracker is 8032. ::

	2015-07-20 10:16:02,103 WARN [MapReduceJobReconcilerService$$EnhancerByGuice$$32fc0e74 RUNNING] (com.koverse.server.manager.job.impl.mapreduce.reconciler.MapReduceJobReconcilerService.runOneIterationWithinTransaction():223)- unable to connect to jobtracker. JobReconciler returning ..
	org.apache.hadoop.ipc.RpcNoSuchProtocolException: Unknown protocol: org.apache.hadoop.yarn.api.ApplicationClientProtocolPB
		at org.apache.hadoop.ipc.ProtobufRpcEngine$Server$ProtoBufRpcInvoker.getProtocolImpl(ProtobufRpcEngine.java:527)
		at org.apache.hadoop.ipc.ProtobufRpcEngine$Server$ProtoBufRpcInvoker.call(ProtobufRpcEngine.java:566)
		at org.apache.hadoop.ipc.RPC$Server.call(RPC.java:1026)
		at org.apache.hadoop.ipc.Server$Handler$1.run(Server.java:1986)
		at org.apache.hadoop.ipc.Server$Handler$1.run(Server.java:1982)
		at java.security.AccessController.doPrivileged(Native Method)
		at javax.security.auth.Subject.doAs(Subject.java:422)
		at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1548)
		at org.apache.hadoop.ipc.Server$Handler.run(Server.java:1980)

		at sun.reflect.GeneratedConstructorAccessor26.newInstance(Unknown Source)
		at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:57)
		at java.lang.reflect.Constructor.newInstance(Constructor.java:541)
		at org.apache.hadoop.yarn.ipc.RPCUtil.instantiateException(RPCUtil.java:53)
		at org.apache.hadoop.yarn.ipc.RPCUtil.unwrapAndThrowException(RPCUtil.java:104)
		at org.apache.hadoop.yarn.api.impl.pb.client.ApplicationClientProtocolPBClientImpl.getApplications(ApplicationClientProtocolPBClientImpl.java:250)
		at sun.reflect.GeneratedMethodAccessor335.invoke(Unknown Source)
		at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:55)
		at java.lang.reflect.Method.invoke(Method.java:619)
		at org.apache.hadoop.io.retry.RetryInvocationHandler.invokeMethod(RetryInvocationHandler.java:187)
		at org.apache.hadoop.io.retry.RetryInvocationHandler.invoke(RetryInvocationHandler.java:102)
		at com.sun.proxy.$Proxy102.getApplications(Unknown Source)
		at org.apache.hadoop.yarn.client.api.impl.YarnClientImpl.getApplications(YarnClientImpl.java:452)
		at org.apache.hadoop.mapred.ResourceMgrDelegate.getAllJobs(ResourceMgrDelegate.java:134)
		at org.apache.hadoop.mapred.YARNRunner.getAllJobs(YARNRunner.java:167)
		at org.apache.hadoop.mapreduce.Cluster.getAllJobStatuses(Cluster.java:293)
		at org.apache.hadoop.mapred.JobClient$5.run(JobClient.java:811)
		at org.apache.hadoop.mapred.JobClient$5.run(JobClient.java:808)
		at java.security.AccessController.doPrivileged(AccessController.java:366)
		at javax.security.auth.Subject.doAs(Subject.java:572)
		at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1628)
		at org.apache.hadoop.mapred.JobClient.getAllJobs(JobClient.java:806)
		at com.koverse.server.manager.job.impl.mapreduce.reconciler.MapReduceJobReconcilerService.runOneIterationWithinTransaction(MapReduceJobReconcilerService.java:220)
		at com.koverse.server.manager.job.impl.mapreduce.reconciler.MapReduceJobReconcilerService.access$000(MapReduceJobReconcilerService.java:53)
		at com.koverse.server.manager.job.impl.mapreduce.reconciler.MapReduceJobReconcilerService$1.call(MapReduceJobReconcilerService.java:112)
		at com.koverse.server.manager.job.impl.mapreduce.reconciler.MapReduceJobReconcilerService$1.call(MapReduceJobReconcilerService.java:109)
		at com.koverse.server.manager.persistence.PersistenceHelper.executeUnderTransaction(PersistenceHelper.java:81)
		at com.koverse.server.util.service.AbstractUnitOfWorkScheduledService.transaction(AbstractUnitOfWorkScheduledService.java:60)
		at com.koverse.server.manager.job.impl.mapreduce.reconciler.MapReduceJobReconcilerService.runOneIterationWithinUnitOfWork(MapReduceJobReconcilerService.java:109)
		at com.koverse.server.manager.job.impl.mapreduce.reconciler.MapReduceJobReconcilerService$$EnhancerByGuice$$32fc0e74.CGLIB$runOneIterationWithinUnitOfWork$3(<generated>)
		at com.koverse.server.manager.job.impl.mapreduce.reconciler.MapReduceJobReconcilerService$$EnhancerByGuice$$32fc0e74$$FastClassByGuice$$26fd179d.invoke(<generated>)
		at com.google.inject.internal.cglib.proxy.$MethodProxy.invokeSuper(MethodProxy.java:228)
		at com.google.inject.internal.InterceptorStackCallback$InterceptedMethodInvocation.proceed(InterceptorStackCallback.java:72)
		at com.koverse.server.scope.AbsractKoverseScopeMethodInterceptor.invoke(AbsractKoverseScopeMethodInterceptor.java:23)
		at com.google.inject.internal.InterceptorStackCallback$InterceptedMethodInvocation.proceed(InterceptorStackCallback.java:72)
		at com.google.inject.internal.InterceptorStackCallback.intercept(InterceptorStackCallback.java:52)
		at com.koverse.server.manager.job.impl.mapreduce.reconciler.MapReduceJobReconcilerService$$EnhancerByGuice$$32fc0e74.runOneIterationWithinUnitOfWork(<generated>)
		at com.koverse.server.manager.job.impl.mapreduce.AbstractMapReduceJobService.runOneIterationWithinUnitOfWork(AbstractMapReduceJobService.java:76)
		at com.koverse.server.util.service.AbstractUnitOfWorkScheduledService$UnitOfWorkTask.call(AbstractUnitOfWorkScheduledService.java:18)
		at com.koverse.server.util.service.AbstractUnitOfWorkScheduledService$UnitOfWorkTask.call(AbstractUnitOfWorkScheduledService.java:15)
		at com.koverse.server.manager.persistence.PersistenceHelper.executeUnderUnitOfWork(PersistenceHelper.java:45)
		at com.koverse.server.util.service.AbstractUnitOfWorkScheduledService.runOneIteration(AbstractUnitOfWorkScheduledService.java:39)
		at com.koverse.com.google.common.util.concurrent.AbstractScheduledService$1$1.run(AbstractScheduledService.java:174)
		at com.koverse.com.google.common.util.concurrent.Callables$3.run(Callables.java:95)
		at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:482)
		at java.util.concurrent.FutureTask.runAndReset(FutureTask.java:315)
		at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.access$301(ScheduledThreadPoolExecutor.java:193)
		at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:308)
		at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1176)
		at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:641)
		at java.lang.Thread.run(Thread.java:795)
	Caused by: org.apache.hadoop.ipc.RemoteException(org.apache.hadoop.ipc.RpcNoSuchProtocolException): Unknown protocol: org.apache.hadoop.yarn.api.ApplicationClientProtocolPB
		at org.apache.hadoop.ipc.ProtobufRpcEngine$Server$ProtoBufRpcInvoker.getProtocolImpl(ProtobufRpcEngine.java:527)
		at org.apache.hadoop.ipc.ProtobufRpcEngine$Server$ProtoBufRpcInvoker.call(ProtobufRpcEngine.java:566)
		at org.apache.hadoop.ipc.RPC$Server.call(RPC.java:1026)
		at org.apache.hadoop.ipc.Server$Handler$1.run(Server.java:1986)
		at org.apache.hadoop.ipc.Server$Handler$1.run(Server.java:1982)
		at java.security.AccessController.doPrivileged(Native Method)
		at javax.security.auth.Subject.doAs(Subject.java:422)
		at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1548)
		at org.apache.hadoop.ipc.Server$Handler.run(Server.java:1980)

		at org.apache.hadoop.ipc.Client.call(Client.java:1468)
		at org.apache.hadoop.ipc.Client.call(Client.java:1399)
		at org.apache.hadoop.ipc.ProtobufRpcEngine$Invoker.invoke(ProtobufRpcEngine.java:232)
		at com.sun.proxy.$Proxy101.getApplications(Unknown Source)
		at org.apache.hadoop.yarn.api.impl.pb.client.ApplicationClientProtocolPBClientImpl.getApplications(ApplicationClientProtocolPBClientImpl.java:247)
		... 45 more


		Below is a snippet of the koverse "settings.xml"
		<!-- Hadoop Settings -->
		 <entry key="hadoopNameNodeHostname”>yourHostname</entry>
		 <entry key="hadoopNameNodePort”>port#</entry>
		 <entry key="hadoopJobTrackerHostname”>yourHostname</entry>
		 <entry key="hadoopJobTrackerPort”>port#</entry>
		 <entry key="hadoopJobHistoryHostname”>yourHostname</entry>
		 <entry key="hadoopJobHistoryPort”>port#</entry>
		 <entry key="hadoopJobSetting.yarn.app.mapreduce.am.staging-dir”>yourStagingDir</entry>
		 <entry key="hadoopJobSetting.yarn.resourcemanager.scheduler.address”>yourHostname:port#</entry>
		
-----------------------------------------------------------------------------------------------------------------------------------------------------------

Issue: Accumulo Username/Password is invalid

Stacktrace:	::	

		2015-07-21 10:29:08,588 ERROR [SystemStatusPoller$$EnhancerByGuice$$8cacdc17 RUNNING] (com.koverse.datastore.accumulo.AccumuloDataStore.reconfigure():1188)- Could not connect to Accumulo with user root. Check that username and password are configured correctly.
		org.apache.accumulo.core.client.AccumuloSecurityException: Error BAD_CREDENTIALS for user root - Username or Password is Invalid
		at org.apache.accumulo.core.client.impl.ServerClient.execute(ServerClient.java:74)
		at org.apache.accumulo.core.client.impl.ConnectorImpl.<init>(ConnectorImpl.java:70)
		at org.apache.accumulo.core.client.ZooKeeperInstance.getConnector(ZooKeeperInstance.java:237)
		at com.koverse.datastore.accumulo.AccumuloDataStore.reconfigure(AccumuloDataStore.java:1183)
		at com.koverse.server.manager.system.SystemStatusPoller.runOneIterationWithinTransaction(SystemStatusPoller.java:92)
		at com.koverse.server.manager.system.SystemStatusPoller$$EnhancerByGuice$$8cacdc17.CGLIB$runOneIterationWithinTransaction$2(<generated>)
		at com.koverse.server.manager.system.SystemStatusPoller$$EnhancerByGuice$$8cacdc17$$FastClassByGuice$$e467d28a.invoke(<generated>)
		at com.google.inject.internal.cglib.proxy.$MethodProxy.invokeSuper(MethodProxy.java:228)
		at com.google.inject.internal.InterceptorStackCallback$InterceptedMethodInvocation.proceed(InterceptorStackCallback.java:72)
		at com.koverse.server.scope.AbsractKoverseScopeMethodInterceptor.invoke(AbsractKoverseScopeMethodInterceptor.java:23)
		at com.google.inject.internal.InterceptorStackCallback$InterceptedMethodInvocation.proceed(InterceptorStackCallback.java:72)
		at com.google.inject.internal.InterceptorStackCallback.intercept(InterceptorStackCallback.java:52)
		at com.koverse.server.manager.system.SystemStatusPoller$$EnhancerByGuice$$8cacdc17.runOneIterationWithinTransaction(<generated>)
		at com.koverse.server.util.service.AbstractTransactionalScheduledService$TransactionTask.run(AbstractTransactionalScheduledService.java:16)
		at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:482)
		at com.koverse.server.manager.persistence.PersistenceHelper.executeUnderTransaction(PersistenceHelper.java:81)
		at com.koverse.server.manager.persistence.PersistenceHelper.executeUnderTransaction(PersistenceHelper.java:115)
		at com.koverse.server.util.service.AbstractUnitOfWorkScheduledService.transaction(AbstractUnitOfWorkScheduledService.java:52)
		at com.koverse.server.util.service.AbstractTransactionalScheduledService.runOneIterationWithinUnitOfWork(AbstractTransactionalScheduledService.java:40)
		at com.koverse.server.util.service.AbstractUnitOfWorkScheduledService$UnitOfWorkTask.call(AbstractUnitOfWorkScheduledService.java:18)
		at com.koverse.server.util.service.AbstractUnitOfWorkScheduledService$UnitOfWorkTask.call(AbstractUnitOfWorkScheduledService.java:15)
		at com.koverse.server.manager.persistence.PersistenceHelper.executeUnderUnitOfWork(PersistenceHelper.java:45)
		at com.koverse.server.util.service.AbstractUnitOfWorkScheduledService.runOneIteration(AbstractUnitOfWorkScheduledService.java:39)
		at com.koverse.com.google.common.util.concurrent.AbstractScheduledService$1$1.run(AbstractScheduledService.java:174)
		at com.koverse.com.google.common.util.concurrent.Callables$3.run(Callables.java:95)
		at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:482)
		at java.util.concurrent.FutureTask.runAndReset(FutureTask.java:315)
		at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.access$301(ScheduledThreadPoolExecutor.java:193)
		at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:308)
		at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1176)
		at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:641)
		at java.lang.Thread.run(Thread.java:795)
		Caused by: ThriftSecurityException(user:root, code:BAD_CREDENTIALS)
		at org.apache.accumulo.core.client.impl.thrift.ClientService$authenticate_result$authenticate_resultStandardScheme.read(ClientService.java:13855)
		at org.apache.accumulo.core.client.impl.thrift.ClientService$authenticate_result$authenticate_resultStandardScheme.read(ClientService.java:13833)
		at org.apache.accumulo.core.client.impl.thrift.ClientService$authenticate_result.read(ClientService.java:13777)
		at org.apache.thrift.TServiceClient.receiveBase(TServiceClient.java:78)
		at org.apache.accumulo.core.client.impl.thrift.ClientService$Client.recv_authenticate(ClientService.java:498)
		at org.apache.accumulo.core.client.impl.thrift.ClientService$Client.authenticate(ClientService.java:484)
		at org.apache.accumulo.core.client.impl.ConnectorImpl$1.execute(ConnectorImpl.java:73)
		at org.apache.accumulo.core.client.impl.ConnectorImpl$1.execute(ConnectorImpl.java:70)
		at org.apache.accumulo.core.client.impl.ServerClient.executeRaw(ServerClient.java:109)
		at org.apache.accumulo.core.client.impl.ServerClient.execute(ServerClient.java:72)
		... 31 more

Resolution:

