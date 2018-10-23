.. _indexqueryguide:

:tocdepth: 2

=====================
Index and Query Guide
=====================
.. contents:: :depth: 3

Lucene Query Syntax
-------------------

Overview
^^^^^^^^

Koverse supports the most important subset of Lucene query features.
The syntax allows for rich querying by using Boolean logic, term grouping, ranges, and wildcard matching.
This section will explain the extent of Lucene syntax support and call out the small amount of unsupported features.


Terms
^^^^^

Terms are what values to search for in the records.
They can be specified as either a string of text or a number.
When searching for a single word, it is not necessary to use quotes.
When searching for a phrase, quotes can be used, such "yellow submarine".

It is not necessary to specify which field(s) to search under.
The default is to search all fields.

To search for a term, simply use it, like: ``cat`` or ``123``.
Phrases just need double quotes, such as: ``"cat food"``.

Terms that in the ISO 8601 format will be interpreted as dates.
This is an international format that takes the form of ``2018-10-30T12:48:29Z``.
A completed description of this format can be found at
https://en.wikipedia.org/wiki/ISO_8601.



Fields
^^^^^^

It is possible to limit what fields to search within.
To do so, simply specify the field name followed by a color, such as:
``animal:cat``, ``size:123``, or ``eats:"cat food"``.


Wildcards
^^^^^^^^^

Wild cards are supported for string terms, but only at the end of the term.
For example: ``animal:cat*``.
Wildcards are not supported in the beginning or middle of a term,
which is different than what Lucene normally supports.


Ranges
^^^^^^

It is possible to search within a range of terms.
Simply surround the two terms with square brackets,
separated by ``TO``.
For example, ``size:[2 TO 10]`` will search for all sizes with a number
from 2 to 10, inclusive.
Exclusive searches can be specified by using curly braces,
such as: ``size:{1 TO 11}``.
Additionally, it is possible to perform an inclusive search on text terms,
such as: ``name:[chad TO sigrid]``.


Boolean Operators
^^^^^^^^^^^^^^^^^

The following operators are supported: ``AND``, ``OR``, and ``NOT``.
The default operator is ``OR``.
For example, the query ``chad sigrid`` is equivalent to ``chad OR sigrid``.
An example ``AND`` query would be: ``animal:cat AND owner:sigrid``.
An example ``NOT`` query is: ``NOT animal:cat`` or ``NOT size:12``.

``AND``, ``OR``, and ``NOT`` can also be specified using
``&&``, ``||``, and ``!``, respectively.


Grouping
^^^^^^^^

A search be be logically grouped by using parenthesis.
For example, the queries
``(animal:cat OR animal:dog) AND owner:chad``
and
``animal:cat OR (animal:dog AND owner:chad)``
are not the same.
The first query searches all cats and dogs owned by chad.
The second query searches for all cats, or all dogs owned by chad.


Escaping Special Characters
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Characters that are search keywords such as ``:``, ``(``, and ``)`` can be
escaped with a forward slash.
For example, to search for a term that includes a parenthesis,
the parenthesis can be escaped with ``\``:
``animal:\(four legs\)``.
Here are all of the reserved search keywords:
``+ - && || ! ( ) { } [ ] ^ " ~ * ? : \``.


Unsupported Lucene Syntax
^^^^^^^^^^^^^^^^^^^^^^^^^

The full Lucene syntax can be read online at
https://lucene.apache.org/core/2_9_4/queryparsersyntax.htm .

However, note that the following features are not supported in Koverse:

 * Any wildcard searches other than suffix-based.
 * Single character wildcard searches.
 * Fuzzy searches.
 * Proximity searches.
 * Term boosting.
 * The "required" operator ``+``.
 * Field grouping.
