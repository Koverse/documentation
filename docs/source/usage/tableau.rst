.. _tableau:

Connecting Data to Tableau via the Web Data Connector
=====================================================

Koverse can easily send data to the Tableau Desktop Application via the Koverse Web Data Connector.

Follow the steps below to connect Koverse to Tableau

- Open the Tablau Desktop Application
- Under the Connect Pane on the left, select the Web Data Connector option
- Enter http://<hostname>:8080/#/tableau-connector as the url when prompted
- Tableau will launch a web browser showing the Web Data Connector interface

.. image:: /_static/UsageGuide/tableauLogin.png

- After logging in you will be able to choose a data set and select a subset of records from that data set via an SQL select statement

.. image:: /_static/UsageGuide/tableauSelect.png

- Once you've selected and previewed the records, click "Send to Tableau" to import the data into Tableau

.. image:: /_static/UsageGuide/tableauPreview.png
