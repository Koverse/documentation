.. _awsInstallation:

Amazon Web Services Installation
================================

Using Koverse with AWS Marketplace
----------------------------------

The paid AMI available in the AWS marketplace is an easy way to get a Koverse instance
up and running if you do not need to install on existing infrastructure.  The instructions
below assume a familiarity with AWS and Amazon EC2 instances.

AMI Installation
----------------

- Use the AWS Marketplace to select the Koverse AMI and launch an instance using it.
- Determine the instance type appropriate for your use case.  For simple proof of concept cases, r3.xlarge will be sufficient, more demanding uses will require more resources.
- Perform the normal launch process for the instance.  Ensure that port 7080 is available in the security group, as this is the port that Koverse uses.
- Instance launch will take 10-15 minutes while the Hadoop stack is configured.
- Once Koverse is available, you can login at this URL: http://<hostname>:7080/ using username 'admin' and the password is the instance id (for example, 'i-1234ab567')
- You can now skip ahead to the Adding a New Data Set section.
