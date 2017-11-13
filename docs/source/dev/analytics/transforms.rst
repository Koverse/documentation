Transforms API
--------------

Koverse Transforms can operate over one or more data collections to perform advanced algorithmic processing or create analytic summaries.  Koverse tracks all transform relationships between input and output Data Sets so the provenance of any given Data Set is traceable to its derivative Data Sets or Sources.

Koverse uses frameworks like Apache Hadoop MapReduce and Apache Spark to execute Transforms over data collections and handles all the details of scheduling, running, stopping, and monitoring the individual jobs. To transform a data set, users implement a simplified MapReduce API that allows for reading records from one or more input Data Sets, potentially filtered according to user authorizations and writes output to a new Data Set, applying security labels appropriately.

Using the Koverse Transform API his has several advantages over using open source frameworks alone:

* Developers can focus on the details of their algorithm, rather than worrying about the details of handling many different input and output data formats and managing multiple jobs.

* Transforms are parameterized so that, once a Transform is written, it can be configured and run by non-developers on the Data Sets they are authorized to read.

* The details of how a transformed result data set is stored and labeled are handled by the Transform framework.  This ensures that result sets will be automatically queryable and  that access control policies are maintained.


Complete code examples from this section can be found at `Koverse SDK Project <https://github.com/Koverse/koverse-sdk-project/tree/2.4/>`_ section .
