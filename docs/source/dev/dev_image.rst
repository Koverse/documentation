.. _DevImage:

Developer Docker Image
----------------------

To develop integration components, analytics, or web applications on Koverse APIs it can be useful to use a docker image designed to run on a developer machine. The Koverse Docker image includes the full software stack and Koverse processes so anything developed against it will work seamlessly on a production Koverse instance.

To run the Koverse Docker image for development, ensure Docker is installed on your host operating system and pull the latest Koverse image::

  docker pull koverse/koverse:latest

When doing development it can often be useful to access the administrative user interfaces of various parts of the big data software stack, so when starting a new container based on the Koverse image we'll expose several ports that allow us to see the status of various processes and log information::

  docker run -ti -h koversevm -P -p 8080:8080 -p 8088:8088 -p 4040:4040 -p 18080:18080 -p 50095:50095 -p 19888:19888 -p 8042:8042 koverse/koverse:latest /etc/bootstrap.sh -bash

These ports are mapped to underlying systems thus:

+-------+-----------------------+
| Port  | System                |
+=======+=======================+
| 8080  | Koverse               |
+-------+-----------------------+
| 8088  | YARN Resource Manager |
+-------+-----------------------+
| 8042  | YARN Node Manager     |
+-------+-----------------------+
| 19888 | YARN Job History      |
+-------+-----------------------+
| 4040  | Spark Application     |
+-------+-----------------------+
| 18080 | Spark Master          |
+-------+-----------------------+
| 50095 | Accumulo Monitor      |
+-------+-----------------------+

When a Koverse Docker container starts up it will start the Koverse Server and log messages from it can be seen on the console. Although Koverse does deliver error information to the Koverse UI from jobs that do things like importing data and running analytics, this log may contain additional information about problems. Additional log information about specific jobs can be found by following the links provided in the Koverse UI which may navigate to a page of information in the YARN Resource Manager, YARN Node Manager, Spark Master, or Spark Application.

Once the Koverse Docker container is running you can access the Koverse UI by pointing a browser at http://localhost:8080. The default login is username: 'admin' and password: 'admin'. By default this admin user has permission to do everything in Koverse.
