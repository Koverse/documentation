.. _Access Control Flowcharts:


=========================
Access Control Flowcharts
=========================
.. contents:: :depth: 3

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
Can Create, Modify, or Delete
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Users and Groups"?
      >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can View Partial User Information
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Can view only the following attributes of a user:

 * ID
 * First name
 * Last name
 * Email address

.. graphviz::

  digraph {
    layout="dot";
    Start -> Allowed;

    Allowed [shape=box; style=rounded];
  }

Can View Full User Information
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Can view the following attributes of a user:

 * ID
 * First name
 * Last name
 * Email address
 * Group memebership
 * Access tokens
 * Enabled/Disabled state
 * Creation date

.. graphviz::

  digraph {
    layout="dot";
    Start -> IsMyself;
    IsMyself -> Allowed[label="yes"];
    IsMyself -> DoesHaveSystemPermission[label="no"];
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    IsMyself [shape=diamond; label=<
      Am I viewing my own<BR/>
      User information?
    >];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Users and Groups"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Groups
------
Can Create, Modify, or Delete
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Users and Groups"?
      >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can View Partial Group Information
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Can view all of a group's attributes except for user group membership.

.. graphviz::

  digraph {
    layout="dot";
    Start -> Allowed;

    Allowed [shape=box; style=rounded];
  }

Can View Full Group Information
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Can view all of a group's attributes.

.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Users and Groups"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Collections
-----------
Can Create
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];

    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "Manage Data Collections"?
    >];

    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Delete
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> DoesHaveCollectionPermission[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];
    DoesHaveCollectionPermission -> Allowed[label="yes"];
    DoesHaveCollectionPermission -> IsResponsibleUser[label="no"];
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Data Collections"?
    >];
    DoesHaveCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the collection permission<BR/>
      "Write and Delete"<BR/>
      on this collection?
    >];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this collection?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> IsResponsibleUser;
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> DoesHaveReadPermission[label="no"];
    DoesHaveReadPermission -> Allowed[label="yes"];
    DoesHaveReadPermission -> DoesHaveDownloadPermission[label="no"];
    DoesHaveDownloadPermission -> Allowed[label="yes"];
    DoesHaveDownloadPermission -> DoesHaveWriteDeletePermission[label="no"];
    DoesHaveWriteDeletePermission -> Allowed[label="yes"];
    DoesHaveWriteDeletePermission -> DoesHaveManagePermissionsPermission[label="no"];
    DoesHaveManagePermissionsPermission -> Allowed[label="yes"];
    DoesHaveManagePermissionsPermission -> DoesHaveManageConfigurationPermission[label="no"];
    DoesHaveManageConfigurationPermission -> Allowed[label="yes"];
    DoesHaveManageConfigurationPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this collection?
    >];
    DoesHaveReadPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the collection permission<BR/>
      "Read"<BR/>
      on this collection?
    >];
    DoesHaveDownloadPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the collection permission<BR/>
      "Download"<BR/>
      on this collection?
    >];
    DoesHaveWriteDeletePermission [shape=diamond; label=<
      Does the current user<BR/>
      have the collection permission<BR/>
      "Write and Delete"<BR/>
      on this collection?
    >];
    DoesHaveManagePermissionsPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the collection permission<BR/>
      "Manage Permissions"<BR/>
      on this collection?
    >];
    DoesHaveManageConfigurationPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the collection permission<BR/>
      "Manage Configuration"<BR/>
      on this collection?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Read
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> IsResponsibleUser;
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> DoesHaveCollectionPermission[label="no"];
    DoesHaveCollectionPermission -> Allowed[label="yes"];
    DoesHaveCollectionPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this collection?
    >];
    DoesHaveCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the collection permission<BR/>
      "Read"<BR/>
      on this collection?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Download
^^^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> IsResponsibleUser;
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> DoesHaveCollectionPermission[label="no"];
    DoesHaveCollectionPermission -> Allowed[label="yes"];
    DoesHaveCollectionPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this collection?
    >];
    DoesHaveCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the collection permission<BR/>
      "Download"<BR/>
      on this collection?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Write
^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> IsResponsibleUser;
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> DoesHaveCollectionPermission[label="no"];
    DoesHaveCollectionPermission -> Allowed[label="yes"];
    DoesHaveCollectionPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this collection?
    >];
    DoesHaveCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the collection permission<BR/>
      "Write"<BR/>
      for this collection?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Manage Permissions
^^^^^^^^^^^^^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> IsResponsibleUser;
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> DoesHaveCollectionPermission[label="no"];
    DoesHaveCollectionPermission -> Allowed[label="yes"];
    DoesHaveCollectionPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this collection?
    >];
    DoesHaveCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the collection permission<BR/>
      "Manage Permissions"<BR/>
      for this collection?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Manage Configuration
^^^^^^^^^^^^^^^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> IsResponsibleUser;
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> DoesHaveCollectionPermission[label="no"];
    DoesHaveCollectionPermission -> Allowed[label="yes"];
    DoesHaveCollectionPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this collection?
    >];
    DoesHaveCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the collection permission<BR/>
      "Manage Configuration"<BR/>
      for this collection?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Records
-------
Access
^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> IsResponsibleUser;
    IsResponsibleUser -> DoesHaveAccessTokens[label="yes"];
    IsResponsibleUser -> DoesHaveCollectionPermission[label="no"];
    DoesHaveCollectionPermission -> DoesHaveAccessTokens[label="yes"];
    DoesHaveCollectionPermission -> NotAllowed[label="no"];
    DoesHaveAccessTokens -> Allowed[label="yes"];
    DoesHaveAccessTokens -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this collection?
    >];
    DoesHaveCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the collection permission<BR/>
      "Read"<BR/>
      for this collection?
    >];
    DoesHaveAccessTokens [shape=diamond; label=<
      Does the current user<BR/>
      Have the access tokens<BR/>
      for this record?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Catalog
-------
Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];

    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "View Catalog"?
    >];

    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

System Settings
---------------
Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "Manage System Configuration"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Modify
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "Manage System Configuration"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Audit Logs
----------
Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "View Audit Logs"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Addons
------
Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "Manage Addons"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Add
^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "Manage Addons"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Remove
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "Manage Addons"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

API Tokens
----------
Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "Manage API Tokens"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Create
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "Manage API Tokens"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Delete
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "Manage API Tokens"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

System Reset
------------
Can Invoke
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "Manage System Reset"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

System Status
-------------
Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"];
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      Have the system permission<BR/>
      "Manage System Status"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }



Sources
-------
Can Create
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Sources"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Delete
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> DoesHaveSourcePermission[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];
    DoesHaveSourcePermission -> Allowed[label="yes"];
    DoesHaveSourcePermission -> IsResponsibleUser[label="no"];
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Sources"?
    >];
    DoesHaveSourcePermission [shape=diamond; label=<
      Does the current user<BR/>
      have the source permission<BR/>
      "Delete"<BR/>
      on this source?
    >];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this source?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Edit
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> DoesHaveSourcePermission[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];
    DoesHaveSourcePermission -> Allowed[label="yes"];
    DoesHaveSourcePermission -> IsResponsibleUser[label="no"];
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Sources"?
    >];
    DoesHaveSourcePermission [shape=diamond; label=<
      Does the current user<BR/>
      have the source permission<BR/>
      "Delete"<BR/>
      on this source?
    >];
    IsResponsibleUser [shape=diamond, label=<
        Is the current user the<BR/>
        responsbile user for<BR/>
        this source?
      >];
      Allowed [shape=box; style=rounded];
      NotAllowed [shape=box; style=rounded; label="Not Allowed"];
    }

Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> IsResponsibleUser;
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> DoesHaveSourceImportPermission[label="no"];
    DoesHaveSourceImportPermission -> Allowed[label="yes"];
    DoesHaveSourceImportPermission -> DoesHaveSourceEditPermission[label="no"];
    DoesHaveSourceEditPermission -> DoesHaveSystemPermission[label="yes"];
    DoesHaveSourceEditPermission -> DoesHaveSourceDeletePermission[label="no"];
    DoesHaveSourceDeletePermission -> DoesHaveSystemPermission[label="yes"];
    DoesHaveSourceDeletePermission -> NotAllowed[label="no"];
    DoesHaveSystemPermission -> Allowed[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this source?
    >];
    DoesHaveSourceImportPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the source permission<BR/>
      "Import"<BR/>
      on this source?
    >];
    DoesHaveSourceEditPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the source permission<BR/>
      "Edit"<BR/>
      on this source?
    >];
    DoesHaveSourceDeletePermission [shape=diamond; label=<
      Does the current user<BR/>
      have the source permission<BR/>
      "Delete"<BR/>
      on this source?
    >];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Sources"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Execute
^^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> IsResponsibleUser;
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> DoesHaveSourceImportPermission[label="no"];
    DoesHaveSourceImportPermission -> Allowed[label="yes"];
    DoesHaveSourceImportPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this source?
    >];
    DoesHaveSourceImportPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the source permission<BR/>
      "Import"<BR/>
      on this source?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }


Sinks
-----
Can Create
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> Allowed[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Sinks"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Delete
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> DoesHaveSinkPermission[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];
    DoesHaveSinkPermission -> Allowed[label="yes"];
    DoesHaveSinkPermission -> IsResponsibleUser[label="no"];
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Sinks"?
    >];
    DoesHaveSinkPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the sink permission<BR/>
      "Delete"<BR/>
      on this sink?
    >];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this sink?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Edit
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> DoesHaveSinkPermission[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];
    DoesHaveSinkPermission -> Allowed[label="yes"];
    DoesHaveSinkPermission -> IsResponsibleUser[label="no"];
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Sinks"?
    >];
    DoesHaveSinkPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the sink permission<BR/>
      "Edit"<BR/>
      on this sink?
    >];
    IsResponsibleUser [shape=diamond, label=<
        Is the current user the<BR/>
        responsbile user for<BR/>
        this sink?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> IsResponsibleUser;
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> DoesHaveSinkExportPermission[label="no"];
    DoesHaveSinkExportPermission -> Allowed[label="yes"];
    DoesHaveSinkExportPermission -> DoesHaveSinkEditPermission[label="no"];
    DoesHaveSinkEditPermission -> Allowed[label="yes"]
    DoesHaveSinkEditPermission -> DoesHaveSinkDeletePermission[label="no"];
    DoesHaveSinkDeletePermission -> Allowed[label="yes"]
    DoesHaveSinkDeletePermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this sink?
    >];
    DoesHaveSinkExportPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the sink permission<BR/>
      "Export"<BR/>
      on this sink?
    >];
    DoesHaveSinkEditPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the sink permission<BR/>
      "Edit"<BR/>
      on this sink?
    >];
    DoesHaveSinkDeletePermission [shape=diamond; label=<
      Does the current user<BR/>
      have the sink permission<BR/>
      "Delete"<BR/>
      on this sink?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Execute
^^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> IsResponsibleUser;
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> DoesHaveSinkExportPermission[label="no"];
    DoesHaveSinkExportPermission -> DoesHaveInputCollectionReadPermission[label="yes"];
    DoesHaveSinkExportPermission -> NotAllowed[label="no"];
    DoesHaveInputCollectionReadPermission -> Allowed[label="yes"];
    DoesHaveInputCollectionReadPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this sink?
    >];
    DoesHaveSinkExportPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the sink permission<BR/>
      "Export"<BR/>
      on this sink?
    >];
    DoesHaveInputCollectionReadPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the collection permission<BR/>
      "Read"<BR/>
      on this sink's input collection?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Transforms
----------
Can Create
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> DoesHaveReadInputCollectionPermission[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];
    DoesHaveReadInputCollectionPermission -> DoesHaveWriteOutputCollectionPermission[label="yes"]
    DoesHaveReadInputCollectionPermission -> NotAllowed[label="no"]
    DoesHaveWriteOutputCollectionPermission -> Allowed[label="yes"]
    DoesHaveWriteOutputCollectionPermission -> NotAllowed[label="no"]

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Transforms"?
    >];
    DoesHaveReadInputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Read" on all input collections<BR/>
      of the transform?
    >];
    DoesHaveWriteOutputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Write and Delete" on the output collection<BR/>
      of the transform?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Delete
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> DoesHaveReadInputCollectionPermission[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];
    DoesHaveReadInputCollectionPermission -> DoesHaveWriteOutputCollectionPermission[label="yes"]
    DoesHaveReadInputCollectionPermission -> NotAllowed[label="no"]
    DoesHaveWriteOutputCollectionPermission -> Allowed[label="yes"]
    DoesHaveWriteOutputCollectionPermission -> NotAllowed[label="no"]

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Transforms"?
    >];
    DoesHaveReadInputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Read" on all input collections<BR/>
      of the transform?
    >];
    DoesHaveWriteOutputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Write and Delete" on the output collection<BR/>
      of the transform?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Modify
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> DoesHaveReadInputCollectionPermission[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];
    DoesHaveReadInputCollectionPermission -> DoesHaveWriteOutputCollectionPermission[label="yes"]
    DoesHaveReadInputCollectionPermission -> NotAllowed[label="no"]
    DoesHaveWriteOutputCollectionPermission -> Allowed[label="yes"]
    DoesHaveWriteOutputCollectionPermission -> NotAllowed[label="no"]

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Transforms"?
    >];
    DoesHaveReadInputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Read" on all input collections<BR/>
      of the transform?
    >];
    DoesHaveWriteOutputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Write and Delete" on the output collection<BR/>
      of the transform?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Execute
^^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveReadInputCollectionPermission;
    DoesHaveReadInputCollectionPermission -> DoesHaveWriteOutputCollectionPermission[label="yes"]
    DoesHaveReadInputCollectionPermission -> NotAllowed[label="no"]
    DoesHaveWriteOutputCollectionPermission -> Allowed[label="yes"]
    DoesHaveWriteOutputCollectionPermission -> NotAllowed[label="no"]

    Start [shape=box; style=rounded];
    DoesHaveReadInputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Read" on all input collections<BR/>
      of the transform?
    >];
    DoesHaveWriteOutputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Write and Delete" on the output collection<BR/>
      of the transform?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveReadInputCollectionPermission;
    DoesHaveReadInputCollectionPermission -> DoesHaveWriteOutputCollectionPermission[label="yes"];
    DoesHaveReadInputCollectionPermission -> DoesHaveOtherInputCollectionPermissions[label="no"];
    DoesHaveWriteOutputCollectionPermission -> Allowed[label="yes"];
    DoesHaveWriteOutputCollectionPermission -> DoesHaveOtherOutputCollectionPermissions[label="no"];
    DoesHaveOtherInputCollectionPermissions -> DoesHaveOtherOutputCollectionPermissions[label="yes"];
    DoesHaveOtherInputCollectionPermissions -> NotAllowed[label="no"];
    DoesHaveOtherOutputCollectionPermissions -> Allowed[label="yes"];
    DoesHaveOtherOutputCollectionPermissions -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveReadInputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Read" on all input collections<BR/>
      of the transform?
    >];
    DoesHaveWriteOutputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Write and Delete" on all output collections<BR/>
      of the transform?
    >];
    DoesHaveOtherInputCollectionPermissions [shape=diamond; label=<
      Does the current user<BR/>
      have at least one of the permissions<BR/>
      on all input collections<BR/>
      of the transform:<BR/>
      "Read", "Download", "Manage Permissions",or<BR/>
      "Manage Configuration"?
    >];
    DoesHaveOtherOutputCollectionPermissions [shape=diamond; label=<
      Does the current user<BR/>
      have at least one of the permissions<BR/>
      on the output collection<BR/>
      of the transform:<BR/>
      "Read", "Download", "Manage Permissions",or<BR/>
      "Manage Configuration"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Source Import Schedules
-----------------------
Can Create
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> DoesHaveWriteOutputCollectionPermission[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];
    DoesHaveWriteOutputCollectionPermission -> Allowed[label="yes"]
    DoesHaveWriteOutputCollectionPermission -> NotAllowed[label="no"]

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Sources"?
    >];
    DoesHaveWriteOutputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Write and Delete" on the output collection<BR/>
      of the source?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can Delete
^^^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> DoesHaveWriteOutputCollectionPermission[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];
    DoesHaveWriteOutputCollectionPermission -> DoesHaveSourcePermission[label="yes"]
    DoesHaveWriteOutputCollectionPermission -> NotAllowed[label="no"]
    DoesHaveSourcePermission -> Allowed[label="yes"]
    DoesHaveSourcePermission -> IsResponsibleUser[label="no"];
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Sources"?
    >];
    DoesHaveWriteOutputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Write and Delete" on the output collection<BR/>
      of the source?
    >];
    DoesHaveSourcePermission [shape=diamond; label=<
      Does the current user<BR/>
      have the source permission<BR/>
      "Edit" on the source?
    >];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this source?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveSystemPermission;
    DoesHaveSystemPermission -> DoesHaveWriteOutputCollectionPermission[label="yes"]
    DoesHaveSystemPermission -> NotAllowed[label="no"];
    DoesHaveWriteOutputCollectionPermission -> DoesHaveSourceEditPermission[label="yes"]
    DoesHaveWriteOutputCollectionPermission -> DoesHaveOtherOutputCollectionPermissions[label="no"]
    DoesHaveOtherOutputCollectionPermissions -> DoesHaveOtherSourcePermissions[label="yes"]
    DoesHaveOtherOutputCollectionPermissions -> NotAllowed[label="no"]
    DoesHaveSourceEditPermission -> Allowed[label="yes"]
    DoesHaveSourceEditPermission -> IsResponsibleUser[label="no"];
    DoesHaveOtherSourcePermissions -> Allowed[label="yes"]
    DoesHaveOtherSourcePermissions -> IsResponsibleUser[label="no"];
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveSystemPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the system permission<BR/>
      "Manage Sources"?
    >];
    DoesHaveWriteOutputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Write and Delete" on the output collection<BR/>
      of the source?
    >];
    DoesHaveOtherOutputCollectionPermissions [shape=diamond; label=<
      Does the current user<BR/>
      have any of the following<BR/>
      permissions on the output collection<BR/>
      of the source:<BR/>
      "Download", "Manage Permissions", or<BR/>
      "Manage Configuration"?
    >];
    DoesHaveSourceEditPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the source permission<BR/>
      "Edit" on the source?
    >];
    DoesHaveOtherSourcePermissions [shape=diamond; label=<
      Does the current user<BR/>
      have any of the following source<BR/>
      permissions on the source:<BR/>
      "Import", "Edit", or "Delete"?
    >];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this source?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Import Jobs
-----------
Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveWriteOutputCollectionPermission;
    DoesHaveWriteOutputCollectionPermission -> DoesHaveSourcePermissions[label="yes"]
    DoesHaveWriteOutputCollectionPermission -> NotAllowed[label="no"];
    DoesHaveSourcePermissions -> Allowed[label="yes"]
    DoesHaveSourcePermissions -> IsResponsibleUser[label="no"];
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveWriteOutputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Write and Delete" on the output collection<BR/>
      of the source?
    >];
    DoesHaveSourcePermissions [shape=diamond; label=<
      Does the current user<BR/>
      have any of the following source<BR/>
      permissions on the source:<BR/>
      "Import", "Edit", or "Delete"?
    >];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this source?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }

Transform Jobs
--------------
Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveInputCollectionPermission;
    DoesHaveInputCollectionPermission -> DoesHaveOutputCollectionPermission[label="yes"]
    DoesHaveInputCollectionPermission -> NotAllowed[label="no"];
    DoesHaveOutputCollectionPermission -> Allowed[label="yes"]
    DoesHaveOutputCollectionPermission -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveInputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have any of the following permissions<BR/>
      on all of the transform's input collections:<BR/>
      "Read", "Download", "Write and Delete",<BR/>
      "Manage Permissions", or "Manage Configuration"?
    >];
    DoesHaveOutputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have any of the following permissions<BR/>
      on the transform's output collection:<BR/>
      "Read", "Download", "Write and Delete",<BR/>
      "Manage Permissions", or "Manage Configuration"?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }


Export Jobs
-----------
Can View
^^^^^^^^
.. graphviz::

  digraph {
    layout="dot";
    Start -> DoesHaveReadInputCollectionPermission;
    DoesHaveReadInputCollectionPermission -> DoesHaveSinkPermissions[label="yes"]
    DoesHaveReadInputCollectionPermission -> NotAllowed[label="no"];
    DoesHaveSinkPermissions -> Allowed[label="yes"]
    DoesHaveSinkPermissions -> IsResponsibleUser[label="no"];
    IsResponsibleUser -> Allowed[label="yes"];
    IsResponsibleUser -> NotAllowed[label="no"];

    Start [shape=box; style=rounded];
    DoesHaveReadInputCollectionPermission [shape=diamond; label=<
      Does the current user<BR/>
      have the permission<BR/>
      "Read" on the input collection<BR/>
      of the sink?
    >];
    DoesHaveSinkPermissions [shape=diamond; label=<
      Does the current user<BR/>
      have any of the following sink<BR/>
      permissions on the sink:<BR/>
      "Export", "Edit", or "Delete"?
    >];
    IsResponsibleUser [shape=diamond, label=<
      Is the current user the<BR/>
      responsbile user for<BR/>
      this source?
    >];
    Allowed [shape=box; style=rounded];
    NotAllowed [shape=box; style=rounded; label="Not Allowed"];
  }
