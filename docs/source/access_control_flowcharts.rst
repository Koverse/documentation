.. _Access Control Flowcharts:

:tocdepth: 2

=========================
Access Control Flowcharts
=========================
.. contents:: :depth: 2

Introduction
------------
Included below are some logical flow charts that visually display the rules
that were described in previous sections.  The terminal actions that are shown
as permitted assume that no other permissions are held by the user other than
the ones that have been accumulated by following a specific path in the flow,
and given those permissions, no other actions will be permitted other than the
ones listed.  If multiple permissions are sought, a user would traverse
multiple paths in the flow(s) and accumulate additive permissions.

Users
-----

.. graphviz::

   digraph {
      "From" -> "To";
   }
