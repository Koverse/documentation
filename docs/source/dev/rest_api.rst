REST API
--------

**Note**: Clients written in Javascript can use the Javascript SDK rather than interacting directly with the REST API.

Koverse provides an HTTP REST API for providing access to third party tools and integrations. This documentation explains how to access the REST API, and provide third party integrations such as widgets and data management. All responses, and HTTP payload requests are encoded in JSON.

See the REST API generated documentation for a complete list of methods and their signatures. The REST API documentation is hosted in koverse itself open \https://<host:port>/docs/rest/

Response Messages
^^^^^^^^^^^^^^^^^

All response messages from the REST API are encoded in JSON, and include common attributes on the base response object. The most important attribute is the success boolean flag, that indicates whether the requested operation was successful. If the success value is false, then there will be a failureMessage attribute that provides a plain english statement as to the reason.

Example:

{"success": false, "failureMessage": "Something went wrong."}

Commonly used methods
^^^^^^^^^^^^^^^^^^^^^

Almost all applications will require the following functionality

* User Authentication and Authorization
* Fetching Data Sets
* Performing Queries

Additional Methods

* User management
* Collection management
* Index management
* Kicking off imports, transforms, exports
* Many others

API Tokens
^^^^^^^^^^

Koverse Administrators can create API Tokens, which are used by outside systems to authenticate. These are generally unused outside of the context of a direct users request. For example, a server that periodically updates it's own cache using a Koverse query.

All REST API methods can be called using an API token to authenticate. The API Token takes precedence over any other method of authentication. Here is an example of using an API token to authenticate::

	``http://<host:port>/api/system/status?apiToken=API-TOKEN-HERE``

Example REST API Methods
^^^^^^^^^^^^^^^^^^^^^^^^

**Ping**

 ``http://<host:port>/api/ping``

A ping request shows that the Koverse HTTP REST API is available, and responsive. Use the ping response method to monitor basic system availability.


Example Ping Request

The following URL shows a ping request, for a Koverse server running on localhost.

 ``http://localhost:8080/api/ping``

Example Ping Response

 ``{"recordCountEstimate":0,"responseTime":0,"success":true,"recordsWritten":0,"bytesWritten":0,"importSampleReady":false}``

**Session Authentication (Login)**

 ``http://<host:port>/api/login``

 POST data:

 ``{"email":"username@example.com","password":"password"}``

Example login failure response::

   {"success":false,"failureMessage":"Login denied. Check username and password"}


Example login success response::

   {"success":true,"user":{"id":1,"emailAddress":"admin","groups":
   [{"id":1,"name":"Administrators","staticPermissions":["manageUsersAndGroups","manageDataCollections"
   ,"manageSystemSettings","audit","manageSources","manageLockDown","manageMapReduceJobs"]}]}}


Before using other REST API methods, an HTTP session must be established. Below is the URL and an example for login. The HTTP response to the login will include a JSESSIONID cookie that must be included in all future REST API calls.

**Example Login URL**

The following cURL command would retrieve an HTTP response with a JSESSIONID token for the default administrative user and password.

 ``curl 'http://localhost:8080/api/login' -i -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*'  --data-binary '{"email":"admin","password":"admin"}'``

Example login response::

   HTTP/1.1 200 OK
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
   Set-Cookie: JSESSIONID=1e0absgbti8151fn0ip59b3kj4;Path=/
   Expires: Thu, 01 Jan 1970 00:00:00 GMT
   Content-Type: application/json
   Transfer-Encoding: chunked
   Server: Jetty(8.1.18.v20150929)

   {"id":4,"firstName":"admiral","lastName":"admin","email":"admin","groups":[],"externalGroups":[],
   "groupIds":[],"tokens":[],"disabled":false,"creationDate":null,"passwordResetHash":null,
   "authenticatorUserId":"koverseDefault_admin","authenticatorTypeId":"koverseDefault",
   "newPassword":null,"newPasswordConfirm":null}

**Querying for data**

The most basic feature of the Koverse REST API is to provide query/search access to data collections. Below is an example of querying all data collections for a logged-in user.

 ``http://<host:port>/api/search/results?query=<queryHere>``

**Example Query**

The following would query a Koverse instance running on localhost, port 8080, for the term test.

 ``http://localhost:8080/api/search/results?query=test``

 **Additional Methods**

 See the `Koverse REST API Generated Docs </api-docs>`_ for details about the many other methods available.
