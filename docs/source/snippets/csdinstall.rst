


CSD Installation
----------------

- Copy the CSD file onto the Cloudera Manager server and place it in */opt/cloudera/csd*
- Change the permissions on the CSD file
  ::

    sudo chmod 644 /opt/cloudera/csd/KOVERSE-2.0.jar

- Change the owner of the CSD file to *cloudera-scm*
  ::

    sudo chown cloudera-scm:cloudera-scm /opt/cloudera/csd/KOVERSE-2.0.jar

- Restart Cloudera Manager to pick up the new Koverse Service from the Cloudera Service Descriptor
  ::

    service cloudera-scm-server restart

- For further reference: http://www.cloudera.com/documentation/enterprise/5-5-x/topics/cm_mc_addon_services.html

Manual Parcel Installation (Optional)
-----------------------------------------
The CSD automatically installs the parcel repository where Cloudera Manager can download the Koverse Parcel from. If you are installing on a cluster without Internet connectivity though, you will need to manually install the Koverse parcel and checksum to the local parcel respository.

- Copy the parcel file and SHA file to */opt/cloudera/parcel-repo*
- Copy over manifest.repo to */opt/cloudera/parcel-repo*
- Change ownership of all files *cloudera-scm*
  ::

    chown cloudera-scm:cloudera-scm /opt/cloudera/parcel-repo/*


Distribute and Activate Parcel(s)
----------------------------------
1. Click the Parcel icon in the menu bar of the Cloudera Manager UI. The Koverse parcel should be visible in the list. If not, click the *Check for new Parcels* button.
2. Click the *Download* button. Once downloaded, the button becomes the *Distribute* button.
3. Click the *Distribute* button. Once distributed, the button become the *Active* button.
4. Click the *Activate* button.

As described in the :ref:`InfraGuide`, Koverse depends on Apache Accumulo 1.6 for data storage. If you do not have it installed already, you should now install the ACCUMULO 1.6.0 Parcel. Follow the above Download, Distribute, and Activate process and then install the Accumulo Service.

Configuration
-------------
Currently there are a few manual configuration steps that need to occur before adding and starting the Koverse Service in Cloudera Manager. In the future, these will be automated as part of the parcel install. All of these should be performed on the host where you will install the Koverse Service.

- Ensure that *dfs.permissions.superusergroup* is set to an existing Unix group. You can check the value of this property in Cloudera Manger by navigating to the HDFS Service and then selecting the Configuration tab and searching for this property. On the host you can view */etc/group* to confirm this group exists. A *dfs.permissions.superusergroup* value of "hadoop" is used in the examples below.
- Add koverse and accumulo users to the superusergroup
  ::

    usermod -a -G hadoop koverse
    usermod -a -G hadoop accumulo

- Ensure that the java binaries are available in the path for the koverse user.  If these are not already in the system path somewhere, it can be added using these commands
  ::

    alternatives --install /usr/bin/java java /usr/java/jdk1.7.0_67-cloudera/bin/java 120 --slave /usr/bin/keytool keytool /usr/java/jdk1.7.0_67-cloudera/bin/keytool --slave /usr/bin/rmiregistry rmiregistry /usr/java/jdk1.7.0_67-cloudera/bin/rmiregistry

    alternatives --install /usr/bin/javac javac /usr/java/jdk1.7.0_67-cloudera/bin/javac 120 --slave /usr/bin/jar  jar  /usr/java/jdk1.7.0_67-cloudera/bin/jar --slave /usr/bin/rmic rmic /usr/java/jdk1.7.0_67-cloudera/bin/rmic


Add the Koverse Service
-------------------------
1. In Cloudera Manager, click the dropdown menu for your cluster and click *Add a Service*.
2. Select the Koverse Service and click the *Continue* button.
3. Select the host where you want to install the Koverse Server and Koverse Web Server Roles. The same server should be selected for both Roles. Click the *Continue* button.
4. Enter the initial configuration

  a. Accumulo Instance: This is the instance name for the Accumulo cluster. It can be found in Cloudera Manager in Configuration section of the Accumulo Service under *accumulo_instance_name*
  b. JDBC connection string: It is recommended to share the existing PostgreSQL database server that Cloudera Manager uses. If you have installed the Koverse Roles on the same host as you are running the Cloudera Manager server, you can leave the default value of "jdbc:postgresql://localhost:7432/koverse". If you have installed the Koverse Roles on a different host, you will need to update the host in the connection string to the hostname of the Cloudera Manager server. Also if running on a different host, you may need to update the PostgreSQL configuration in */var/lib/cloudera-scm-server-db/data/pg_hba.conf* to allow remote connections to the *koverse* database.
  c. Zookeeper Servers: A comma separated list of host:port where ZooKeeper is running. The hosts can be seen in Cloudera Manager under the ZooKeeper Service on the Instances tab.
  d. PostgreSQL Password: this can be left blank if you are using the Cloudera Manager PostgreSQL database as the installation process will automatically retrieve the login credentials.
  e. Accumulo Password: The password for the root user in Accumulo. Accumulo's default is "secret".


Verify that everything has installed and started properly.
