Settings
--------

- Admin Email
  + This is the administrator Email for your Koverse Connections system.

- Koverse URL
  + This is the url where you can find your Koverse Connections UI.
  + Eg: server.koverse.com:3000

- Koverse API Token
  ***

- Autocomplete Values Dataset IDs (comma-separated)
  + The data set ID associated with your Autocomplete Values data set. This data set is created by Step 6b of the data flow: gather field values transform which takes the Hydrated Entities data set as input and outputs the Autocomplete Values data set.

- Derived Assertions Dataset IDs (comma-separated)
  + The data set ID associated with your Scores data set. This data set is created by Step 7a of the data flow: Spark SQL Copy Transform: only select Scores which takes the Raw Scores data set as input and outputs the Scores data set.

- External Assertions Dataset IDs (comma-separated)
  + The data set ID associated with your Assertions data set. This data set is created by Step 2a of the data flow: Spark SQL Transform: only select assertions (optional) which takes the Raw Assertions data set as input and outputs the Assertions data set.

- User Assertions Dataset ID
  + The data set ID associated with your User Assertions data set. This data set ingests values from the UI as users score entities.

- Headlines Dataset ID
  + The data set ID associated with your Headlines data set. This data set is created by Step 8 of the data flow: Headline Generation transform which takes the Hydrated Entities data set and each Scores data set as input and outputs the Headlines data set.

- Hydrated Dataset ID
  + The data set ID associated with your Hydrated Entities data set. This data set is created by Step 5a of the data flow: Entity Hydration Transform which takes the Assertions data set and the User Assertions data set and outputs the Hydrated Entities data set.

- Ontology Dataset ID
  + The data set ID associated with your User Ontology data set. This data set ingests data from the UI as users create ontologies.

- Metadata Dataset ID
  + The data set ID associated with your Metadata data set. This data set is created by Step 9: Metadata Transform which take the Hydrated Entities data set and the Headlines data set as input and outputs the Metadata data set.

- Queue Dataset ID
  + The data set ID associated with your KISP queue data set. This data set ingests from the UI as users queue jobs such as running Lookalike or Weighted Models.

- SMTP Host
  + The hostname or IP address to connect to.

- SMTP Port
  + The port your SMTP connection will use. Set to 465 if you will use a secure connection. Set to 587 or 25 if you will not use a secure connection.

- SMTP secure connection (TLS)
  + This checkbox enables a TLS encrypted SMTP connection.
  + If you choose to use a TLS encrypted connection (TLS secure option set to true), your SMTP connection will use port 465.
  + If you choose to not use a secure TLS encrypted connection (TLS secure option set to false), your SMTP connection will use port 587 or 25.

- SMTP User​
  + Your SMTP username

- SMTP Password​
  + Your SMTP password

- From Email Address
  + This is the email address that your Koverse Connections system will use to send notifications such as lookalike and weighted models being run.
