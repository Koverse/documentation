.. _BuildBootstrapGuide:

====================
Build + Bootstrap
====================

This run book is designed for HDP 3.1 installation for Koverse 3.x using Ambari. Koverse is supported for RHEL and CentOS.


Build
^^^^^^^
First create a directory to place files needed for install::

  sudo mkdir -p -m777 /home/staging

Then create a koverse user for the system::

  sudo useradd koverse -c "koverse" -m -d /home/koverse

Install yum packages::

  sudo yum -y install epel-release.noarch
  sudo yum -y install wget unzip bzip2 cloud-init java-1.8.0-openjdk-devel screen vim-enhanced strace lsof tesseract rpcbind openssl-devel redhat-rpm-config augeas-libs dialog libffi-devel gcc-c++ bind-utils git
  sudo yum update -y

Set the java home variable::

  echo "export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.232.b09-0.el7_7.x86_64/jre" | sudo tee -i /etc/profile.d/java.sh

Install Ambari Repos::

 if [[ -d "/etc/yum.repos.d" ]]; then
    sudo curl -s http://public-repo-1.hortonworks.com/ambari/centos7/2.x/updates/2.7.4.0/ambari.repo -o /etc/yum.repos.d/ambari.repo
    sudo curl -s http://public-repo-1.hortonworks.com/HDP/centos7/3.x/updates/3.1.4.0/hdp.repo -o /etc/yum.repos.d/hdp.repo
    sudo curl -s http://public-repo-1.hortonworks.com/HDP/centos7/3.x/updates/3.1.4.0/HDP-3.1.4.0-315.xml -o /home/staging/HDP-3.1.4.0-315.xml
  fi
Install Ambari and components::

  sudo yum -y install ambari-server ambari-agent zookeeper zookeeper-server hadoop hadoop-hdfs hadoop-libhdfs hadoop-yarn hadoop-mapreduce hadoop-client openssl hive hive-jdbc hive-hcatalog hive-webhcat hive-webhcat-server hive-hcatalog-server hive-server2 hive-metastore hive_warehouse_connector spark2 spark2-master spark2-python spark2-worker spark2-yarn-shuffle accumulo zeppelin hbase livy2 spark_schema_registry libtirpc snappy-devel python34-tkinter python-virtualenv python-tools python34-pip spark_schema_registry mysql-connector-java unzip hdp-select ambari-metrics-collector ambari-metrics-monitor ambari-metrics-hadoop-sink python-kerberos ambari-metrics-grafana mariadb-server pig datafu tez spark-atlas-connector

Link mysql connector to Hive::

  sudo ln -s /usr/share/java/mysql-connector-java.jar /var/lib/ambari-server/resources/

Place the Spark Shuffle Jar in Yarn Node Manager Folder::

  sudo cp /usr/hdp/3.1.4.0-315/spark2/aux/spark-2.3.2.3.1.4.0-315-yarn-shuffle.jar /usr/hdp/current/hadoop-yarn-nodemanager/lib/.


Grab Ambari blueprint and cluster configuration down and place in staging directory::

    sudo curl -s https://location-where-blueprint-is/x-node-blueprint.json -o /home/staging/blueprint.json
    sudo curl -s https://location-where-blueprint-is/x-node-cluster.json -o /home/staging/cluster.json

Here you can learn more about Ambari `Blueprints and Cluster Configurations <https://cwiki.apache.org/confluence/display/AMBARI/Blueprints>`_

Grab your bootstrap scripts::

    sudo curl -s https://location-where-bootstrap-is/bootstrap.sh -o /home/staging/bootstrap.sh
    sudo curl -s https://location-where-bootstrap-is/x-node-bootstrap.py -o /home/staging/real_bootstrap.py

Optional Cloud Formation set up for bootstrap, highly recommended, OS must support Cloud Formation::

  sudo curl https://location-where-bootstrap-is/bootstrap.cfg -o /etc/cloud/cloud.cfg.d/99_bootstrap.cfg


For more information on AWS CloudFormation look `here <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.Walkthrough.html>`_ and for Azure Cloud Formation Supported OS look `here <https://docs.microsoft.com/en-us/azure/virtual-machines/linux/using-cloud-init>`_
Grab Koverse RPMs::

  sudo curl https://nexus.koverse.com/nexus/content/repositories/releases/com/koverse/koverse-server/${KOVERSE_VERSION}/koverse-server-${KOVERSE_VERSION}.rpm -o /home/staging/koverse-server-${KOVERSE_VERSION}.rpm
  sudo curl https://nexus.koverse.com/nexus/content/repositories/releases/com/koverse/koverse-webapp/${KOVERSE_VERSION}/koverse-webapp-${KOVERSE_VERSION}.rpm -o /home/staging/koverse-webapp-${KOVERSE_VERSION}.rpm

Install Koverse then clean up rpms after::

    sudo yum install -y /home/staging/koverse-server-$KOVERSE_VERSION.rpm
    sudo yum install -y /home/staging/koverse-webapp-$KOVERSE_VERSION.rpm
    sudo rm -f /home/staging/*.rpm
Install Koverse Ambari Stack::

  sudo mkdir /var/lib/ambari-server/resources/stacks/HDP/3.1/services/KOVERSE
  sudo cur https://koverse-bdaas.s3.amazonaws.com/hdp3/koverse-ambari-stack-3.0.tar.gz -o /var/lib/ambari-server/resources/stacks/HDP/3.1/services/KOVERSE/KOVERSE.tar.gz
  sudo tar zxvf /var/lib/ambari-server/resources/stacks/HDP/3.1/services/KOVERSE/KOVERSE.tar.gz -C /var/lib/ambari-server/resources/stacks/HDP/3.1/services/KOVERSE
  sudo rm -f $AMBARI_STACK_DIR/KOVERSE/KOVERSE.tar.gz

Bootstrap
^^^^^^^^^^^
Ensure your disks are formatted at this point.

Setup Ambari and tell it where your java install is located::

  ambari-server setup -s -j /usr/lib/jvm/java/

stop Ambari and set the master hostname::

  ambari-agent stop
  ambari-agent reset <hostname>
  ambari-agent start

wait for Ambari to be up and running then post your blueprint::

  curl -H "X-Requested-By: ambari" -X POST -u admin:admin http://localhost:8080/api/v1/blueprints/koverse-cluster -d /home/staging/blueprint.json
then post your cluster configuration::

  curl -H "X-Requested-By: ambari" -X POST -u admin:admin http://localhost:8080/api/v1/clusters/KoverseCluster -d /home/staging/cluster.json
Navigate to the Ambari UI on 8080


Pyspark Environment Installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The installation of the python environment can be done on every node of the cluster during the build process.

Install Miniconda::

  sudo mkdir -p ${MINICONDA_DIR}
  sudo -u koverse bash -c "curl -s https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -o /home/staging/miniconda3-latest-Linux-x86_64.sh"
  sudo chmod +x /home/staging//miniconda3-latest-Linux-x86_64.sh
  sudo bash /home/staging//miniconda3-latest-Linux-x86_64.sh -bu -p /home/koverse/miniconda3
  sudo chown -R koverse:koverse /home/koverse/miniconda3
  sudo echo -e "export PATH=\$PATH:/home/koverse/miniconda3/bin" | sudo tee -i /etc/profile.d/miniconda3.sh

Install Python and Koverse Library::

  sudo mkdir -p /opt/koverse-pyspark-env
  sudo chown -R koverse:koverse /opt/koverse-pyspark-env
  #yaml file to update environment with all python libraries used
  sudo -u koverse bash -c "unset SUDO_GID  SUDO_USER SUDO_UID; ${MINICONDA_DIR}/bin/conda create -y --prefix /opt/koverse-pyspark-env python=3.7"
  sudo -u koverse bash -c "unset SUDO_GID  SUDO_USER SUDO_UID; ${MINICONDA_DIR}/bin/conda install -y --prefix /opt/koverse-pyspark-env numpy pandas scikit-learn matplotlib"
  sudo -u koverse bash -c "unset SUDO_GID  SUDO_USER SUDO_UID; /opt/koverse-pyspark-env/bin/pip install koverse"

