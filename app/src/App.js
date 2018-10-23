import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { Logo } from '@koverse/components'
import baseTheme from './theme'

const muiTheme = createMuiTheme(baseTheme)
const muiDarkTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    type: 'dark',
  },
})

const styles = {
  '@global': {
    img: {
      maxWidth: '100%',
    },
    body: {
      ...muiTheme.typography.body2,
    },
  },
  appBar: {
    background: muiTheme.palette.grey[900],
    display: 'flex',
    flexDirection: 'row',
    height: muiTheme.app.header.height,
    alignItems: 'center',
    padding: muiTheme.spacing.unit * 2,
    paddingLeft: muiTheme.spacing.unit * 4,
    paddingRight: muiTheme.spacing.unit * 4,
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: muiTheme.spacing.unit * 2,
  },
  logo: {
    width: 150,
  },
  tabs: {
    width: '100%',
  },
  content: {
    marginTop: muiTheme.app.header.height,
  },
}

class App extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={muiTheme}>
        <Router>
          <div>
            <CssBaseline />
            <MuiThemeProvider theme={muiDarkTheme}>
              <AppBar className={classes.appBar} position="fixed" color="default">
                <Link to="/" className={classes.logoLink}>
                  <Logo className={classes.logo} />
                </Link>
                <Typography variant="h6" color="textSecondary">
                  Documentation
                </Typography>
              </AppBar>
            </MuiThemeProvider>
            <div className={classes.content}>
              <Routes />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

const AppWithStyles = withStyles(styles)(App)

export default hot(module)(AppWithStyles)
