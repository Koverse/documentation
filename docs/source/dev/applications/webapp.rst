.. _ExampleWebApp:

Example Web Application
-----------------------

In this example we'll build a web application designed to allow users to explore the results of the example Sentiment Analysis analytic described in :ref:`SparkJavaDataFrameTransform`.
We'll use some common technologies including `React <https://reactjs.org>`_ and `Node.js <https://nodejs.org>`_, but applications can be written using any technology that allows web applications to talk to the `Koverse REST API <https://speaker-diagnostics-47224.netlify.com>`_.

Initial Setup
^^^^^^^^^^^^^

Make sure you're using a recent version of Node installed, such as later than 6. You can use `nvm <https://github.com/creationix/nvm>`_ or nvm-windows to switch node versions::

  node -v

First, we'll create a starting point for our application using `create-react-app <https://github.com/facebookincubator/create-react-app>`_::

  npm install -g create-react-app

  create-react-app example-webapp
  cd example-webapp

Install some additional modules we'll need::

  npm install --save material-ui@next
  npm install --save material-ui-icons
  npm install --save typeface-roboto

Start npm and go to localhost:3000 to verify the app is running::

  npm start

Overall Design
^^^^^^^^^^^^^^

Most Koverse apps consist of enabling users to query records in one or more data sets and displaying the results. Koverse queries are designed to return fast enough to support multiple users interacting with a single Koverse instance.
In our example we'll create an app that allows users to interactively explore and visualize the results of a sentiment analysis algorithm.

Koverse provides the ability for apps to quickly fetch records based on a query using indexes that Koverse maintains.
All our app needs to do is to present users with a user interface that supports issuing queries, fetching the query results, and displaying them in a way that best supports the decisions users are trying to make.

In our case, our users are interested in seeing how the sentiment of social media, or other types of messages that mention a specific search term, changes over time.

This means our app will need a search form, a table for seeing the text and sentiment score of messages, and a chart for visualizing the changes in sentiment over time. We'll use material-ui and react-vis to make the components of our application.

In this example we'll look at some typical tasks involved in building an app on Koverse, and we'll build it up in stages, testing as we go.

Authorizing our App to talk to Koverse
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Before we begin development, we'll want to enable our app to interact with a Koverse instance.

To authorize our app to query records in Koverse, we have several options.
The simplest scenario is where all users of our application are allowed to see the same data.
We can restrict what records our application sees, but we won't distinguish users of our application from each other. Other scenarios will be addressed in following tutorials.

In our security scenario we just need an API token to authenticate to Koverse and query records.
See the documentation on :ref:`ApiTokens` for steps to create an API token for this example and return here once you have your API token.


Querying using the Koverse REST API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Koverse provides a REST API that allows web apps to interact with original data sets and analytical results.

We'll use axios to talk to the Koverse REST API and query-string to help us construct queries::

  npm install --save axios
  npm install --save query-string


Next we'll write the code for issuing queries against Koverse's REST API to fetch records containing sentiment information.
Create a file in src/ called 'koverse.js' and add the following lines::

  import axios from 'axios'
  import queryString from 'query-string'

Next we'll need the ID of the Data Set containing Sentiment Analysis results.
To obtain this, simply click on the name of the Data Set in the Koverse UI.
The URL will display the Data Set ID.
For example if the URL shows::

  http://localhost:8080/#/data-sets/message_sentiment_20180109_235958_313

We'll want to copy the ID *message_sentiment_20180109_235958_313*

Paste that ID into koverse.js as::

  const datasetId = 'message_sentiment_20180109_235958_313'

Next paste in the API token we obtained via the instructions in :ref:`ApiTokens`::

  const apiToken = 'your-api-token-here'


Next is the basic function for allowing a user to query Koverse using Lucene syntax.
We will pass in our API token, the user-provided query string, the ID of the data set we will query, and one additional parameter specifying what format Koverse should use for records returned::

  export const query = async (query) => {
    const url = `https://localhost:8080/api/query`
    const params = queryString.stringify({
      apiToken,
      query,
      dataSets: datasetId,
      recordStyle: '2.2',
    })
    const allResults = await axios.get(`${url}?${params}`)

    // for now just log results to the console
    console.log(allResults)
    return allResults
  }

Now just just need a way of getting queries from users that we can send to the Koverse REST API query method to fetch results.


Create a Search Form Component
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We'll create a search form component to allow users to search for specific records.
Create a new folder in src/ called 'components' and a new file in src/components/ called 'SearchForm.js' and add the following code::

  import React, { Component } from 'react'
  import PropTypes from 'prop-types'
  import { withStyles } from 'material-ui/styles'
  import Button from 'material-ui/Button'
  import TextField from 'material-ui/TextField'

  const styles = theme => ({
   input: {
     marginRight: theme.spacing.unit,
   }
  })

  class SearchForm extends Component {
   static props = {
     onSubmit: PropTypes.func.isRequired,
   }

   constructor(props) {
     super(props);
     this.state = {
       query: ''
     };

     // todo
   }

   render () {
     // todo
   }
  }

  export default withStyles(styles)(SearchForm)

We'll add some handlers in our constructor and define our handler methods as follows::

   constructor(props) {
     super(props);
     this.state = {
       query: ''
     };

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
     this.setState({query: event.target.value});
   }

   handleSubmit(event) {
     event.preventDefault();
     this.props.onSubmit({ query: this.state.query })
   }

Then we'll define our render() method to draw a TextField and call our handler::

   render () {
     const { classes } = this.props
     return (
       <form className={classes.root} onSubmit={this.handleSubmit}>
         <TextField
           className={classes.input}
           name="query"
           placeholder="Search..."
           onChange={this.handleChange}
         />
         <Button raised type="submit">Search</Button>
       </form>
     )
   }

This causes the Search form to be drawn, using a TextField.
We can use this component wherever we want a Search form to appear.


We'll add our SearchForm component to our web app by editing our App.js file.
First we'll import the 'query' method we wrote in koverse.js and our SearchForm component::

  import React, { Component } from 'react';
  import { withStyles } from 'material-ui/styles'
  import 'typeface-roboto'
  import { query } from './koverse'
  import SearchForm from './components/SearchForm'

..

  import SearchResults from './components/SearchResults'
  import SentimentChart from './components/SentimentChart'

Remove the boiler plate and replace it with::

  const styles = theme => ({
    root: {
      padding: theme.spacing.unit * 4,
    },
  })

  class App extends Component {
    constructor(props) {
      super(props);
      // todo
    }


    render() {
      const { classes } = this.props
      return (
        <div className={classes.root}>
          // todo
        </div>
      );
    }
  }

  export default withStyles(styles)(App);

Write handler for when this page receives a Submit event and add it to our constructor.
Also add a 'state' variable to which we can assign results from our query method::

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    results: {},
  }

  async handleSubmit(values) {
    const results = await query(values.query)
    this.setState({ results })
  }

Let's modify the render() method to draw a simple title and our SearchForm component.
We'll tell the SearchForm to call our handleSubmit() method::

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Typography type="title" gutterBottom>
          Koverse Sentiment Analysis Example
        </Typography>
        <SearchForm onSubmit={this.handleSubmit}/>
        {this.state.results.records ? (
          <div>
            // todo
          </div>
        ) : null}
      </div>
    );
  }

Testing the SearchForm
^^^^^^^^^^^^^^^^^^^^^^

At this point we have enough to test our SearchForm and see if we get any results in the developer console of our browser.
Navigate to your app at http://localhost:3000.
Open the developer console of your browser.
You should see a screen similar to this.

If we've copied in the API token and Data Set ID properly we should be able to type in a search term and see results in the developer console below.
For example, searching for the word 'good' should show some results like the following.


Displaying Results in a Table
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Now that we're getting results back from our queries we can format them into a nice readable table for users.
First we'll do a little formatting of the query results to make them more amenable to what a table component might expect.
We're only interested in querying one data set at a time so we'll simply return the records contained in the first data set result, along with the extracted schema so the table knows what columns to draw.
Modify koverse.js, replacing the code::

  const allResults = await axios.get(`${url}?${params}`)
  console.log(allResults)
  return allResults

with the following::

  const allResults = await axios.get(`${url}?${params}`)
  const sentimentResults = allResults.data.find(r => r.id === datasetId) || {}

Because our app is designed to work with the output of the example Sentiment Analysis Transform described in :ref:`SparkJavaDataFrameTransform`, we'll create a simple list of Javascript objects from each record returned.
We'll also generate Javascript Date objects for date values, which will help us sort the data and plot these data points on a chart later::

  const records = (sentimentResults.records || [])
    .map(r => ({
      timestamp: Date.parse(r.value['date']),
      date: r.value['date'],
      score: r.value['score'],
      text: r.value['text'],
      recordId: r.recordId
    }))
    .sort((a,b) => (a['timestamp'] - b['timestamp']))
  return {
    schema: ['date','score','text'],
    records
  }

Now we'll create a table component for displaying query results.
This way, users can see the original text of each message, the date the message was created, and the associated sentiment score.

To do this we'll create a SearchResults component.
Create a new file called SearchResults.js under src/components and add the code::

  import React, { Component } from 'react'
  import PropTypes from 'prop-types'
  import { withStyles } from 'material-ui/styles'
  import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
  import Paper from 'material-ui/Paper'

  const styles = theme => ({
  	root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  })

  class SearchForm extends Component {
  	static props = {
  		results: PropTypes.array.isRequired,
  	}

  	render () {
  		const { classes, results } = this.props
  		return (
  			<Paper className={classes.root}>
  	     // todo
  	    </Paper>
  		)
  	}
  }

  export default withStyles(styles)(SearchForm)

In the render() method we'll draw a table::

..

  import React, { Component } from 'react'
  import PropTypes from 'prop-types'
  import { withStyles } from 'material-ui/styles'
  import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
  import Paper from 'material-ui/Paper'

  const styles = theme => ({
  	root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  })

  class SearchForm extends Component {
  	static props = {
  		results: PropTypes.array.isRequired,
  	}

  	render () {
  		const { classes, results } = this.props
  		return (
  			<Paper className={classes.root}>
  	      <Table className={classes.table}>
  	        <TableHead>
  	          <TableRow>
  							{results.schema.map(s => (
  								<TableCell key={s}>{s}</TableCell>
  							))}
  	          </TableRow>
  	        </TableHead>
  	        <TableBody>
  	          {results.records.map(rec => {
  	            return (
  	              <TableRow key={rec.recordId}>
  									{results.schema.map(s => (
  										<TableCell key={s}>{rec[s]}</TableCell>
  									))}
  	              </TableRow>
  	            );
  	          })}
  	        </TableBody>
  	      </Table>
  	    </Paper>
  		)
  	}
  }

  export default withStyles(styles)(SearchForm)
  //  <SentimentChart records={this.state.results.records}/>
    					//  <SearchResults results={this.state.results} />

Displaying Results in a Graph
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To help users understand changes in sentiment over time, we'll display the same query results in a line chart. We'll need to install react-vis to draw a simple scatter plot of sentiment scores over time::

  npm install --save react-vis

To start, here is the skeleton of the chart code::

  import React, { Component } from 'react'
  import PropTypes from 'prop-types'
  import { withStyles } from 'material-ui/styles'
  import {XYPlot, MarkSeries, HorizontalGridLines, XAxis, YAxis} from 'react-vis'
  import "../../node_modules/react-vis/dist/style.css";
  import Paper from 'material-ui/Paper'

  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    }
  })

  class SentimentChart extends Component {
    static props = {
      records: PropTypes.array.isRequired,
    }

    render () {
      const { classes, records } = this.props
      return (
        <Paper className={classes.root}>
          <XYPlot width={1000} height={300}>
            <HorizontalGridLines />
            <MarkSeries data={[]]} />
            <XAxis />
            <YAxis />
          </XYPlot>
        </Paper>
      )
    }
  }

  export default withStyles(styles)(SentimentChart)

We'll write a function for converting our records into the X-Y coordinates our chart expects, and we'll output our score for use in coloring the data points at the same time::

  const extractXY = (records = []) => {
    return records.map(r => ({
      x: r['timestamp'],
      y: r['score'],
      color: (r['score'])
    }))
  }

Now we'll call our function to supply data to the chart::

  <XYPlot width={1000} height={300}>
    <HorizontalGridLines />
    <MarkSeries
      data={extractXY(records)}
      />
    <XAxis />
    <YAxis />
  </XYPlot>

In order to color each data point according to the sentiment score, we'll tell our chart to use a range of color and how our domain of scores relates to that range::

  <MarkSeries
    data={extractXY(records)}
    animation="true"
    colorDomain={[-3, 0, 3]}
    colorRange={['red','white','green']}/>

We'll also tell our chart to format our X-axis to display dates in a readable way::

  <XAxis
    tickTotal={5}
    tickFormat={d => new Date(d).toLocaleString('en-US')}/>


Tying It Together
^^^^^^^^^^^^^^^^^

Now we're ready to tie these components together in an application. Edit the App.js file in src/ to add a reference to our typeface and components::

  import React, { Component } from 'react';
  import { withStyles } from 'material-ui/styles'
  import 'typeface-roboto'
  import { query } from './koverse'
  import SearchForm from './components/SearchForm'
  import SearchResults from './components/SearchResults'
  import SentimentChart from './components/SentimentChart'

Remove the boiler plate and replace it with::


  const styles = theme => ({
  	root: {
  		padding: theme.spacing.unit * 4,
  	},
  })

  class App extends Component {
  	constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  	state = {
  		results: {},
  	}

  	async handleSubmit(values) {
  		const results = await query(values.query)
  		this.setState({ results })
  	}

    render() {
  		const { classes } = this.props
      return (
        <div className={classes.root}>
          <SearchForm onSubmit={this.handleSubmit}/>
  				{this.state.results.records ? (
            <div>
              <SentimentChart records={this.state.results.records}/>
  					  <SearchResults results={this.state.results} />
            </div>
  				) : null}
        </div>
      );
    }
  }

  export default withStyles(styles)(App);
