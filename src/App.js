import React, { PureComponent } from 'react'
import { Router } from 'react-static'
import Routes from 'react-static-routes'
import { MuiThemeProvider, withStyles } from 'material-ui/styles'
import theme from 'theme'
import Helmet from 'react-helmet'
import 'normalize.css'
import 'highlight.js/styles/gruvbox-dark.css'
import Nav from 'components/Nav'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexGrow: 1,
  },
})

class App extends PureComponent {
  render () {
    const { classes } = this.props
    return (
      <Router className={classes.root}>
        <MuiThemeProvider theme={theme} >
          <Helmet
            title="Koverse - Documentation"
            meta={[
              { name: 'description', content: 'Koverse - Documentation' },
              { name: 'keywords', content: 'Koverse - Documentation' },
            ]}
            style={[{
              cssText: `
                  html, body, #root {
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    margin: 0;
                    height: 100%;
                  }
              `,
            }]}
          />
          <div className={classes.appFrame}>
            <Nav />
            <main className={classes.content}>
              <Routes />
            </main>
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default withStyles(styles)(App)
