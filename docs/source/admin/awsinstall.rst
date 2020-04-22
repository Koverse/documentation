.. _awsInstallation:

Amazon Web Services Installation
================================

Using Koverse with AWS Marketplace
----------------------------------

The paid `Koverse AMI <https://aws.amazon.com/marketplace/pp/B01N74UCB4?ref_=srh_res_product_title>`_ available in the AWS marketplace is an easy way to get a Koverse instance
up and running if you do not need to install on existing infrastructure.  The instructions
below assume a familiarity with AWS and Amazon EC2 instances.

AMI Single-Node Installation
-----------------------------

* Use the AWS Marketplace to select the Koverse AMI and launch an instance using it

.. image:: /_static/AWSInstall/image1.png

* Determine the instance type appropriate for your use case.  For simple proof of concept cases, r5.xlarge will be sufficient, more demanding uses will require more resources.
* Perform the normal launch process for the instance.  Ensure that port 7080 is available in the security group, as this is the port that Koverse uses.
* Instance launch will take 10-15 minutes while the Hadoop stack is configured.
* Once Koverse is available, you can login at this URL: http://<hostname>:7080/ using username 'admin' and the password is the instance id (for example, 'i-1234ab567')
* You can now skip ahead to the Adding a New Data Set section.


AMI Multi-Node Installation
-----------------------------
To setup a multi-node cluster quickly on AWS `CloudFormation <https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-ec2-create-cloudformation-template.html>`_ is recommended.

Prerequistes
^^^^^^^^^^^^^
* An AMI built for the base of you images. A build we recommend is in the :ref:`BuildBootstrapGuide` section of the Admin Guide.
* A Cloud Formation Template to load. An example of a template for a cluster with a master, standby master, three zookeepers and three workers can be found `here <https://koverse-bdaas.s3.amazonaws.com/hdp3-ami/cloudformation.template>`_.

To start the process visit the `AWS Console for CloudFormation <https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/template>`_

Upload your Cloud Formation template to the console

.. image:: /_static/AWSInstall/image2.png

Fill in the required parameters and wait for the instances to come online.
