import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData } from 'react-static'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ApiNavigation from '../components/ApiNavigation'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: `calc(100vh - ${theme.app.header.height}px)`,
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing.unit * 3,
  },
  navigation: {
    marginRight: theme.spacing.unit * 3,
  },
  bold: {
    fontWeight: 500,
  },
})

const ApiReference = ({ api, classes }) => (
  <div className={classes.root}>
    <ApiNavigation api={api} className={classes.navigation} />
    <div className={classes.content}>
      <Typography variant="h4" gutterBottom>{api.info.title}</Typography>
      <Typography variant="body1" gutterBottom>{api.info.description}</Typography>
      <Typography variant="body2" >
        <span className={classes.bold}>Request Content-Types:&nbsp;</span>{api.consumes}
      </Typography>
      <Typography variant="body2">
        <span className={classes.bold}>Response Content-Types:&nbsp;</span>{api.produces}
      </Typography>
      <Typography variant="body2">
        <span className={classes.bold}>Version:&nbsp;</span>{api.info.version}
      </Typography>
    </div>
  </div>
)

ApiReference.propTypes = {
  api: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default compose(withRouteData, withStyles(styles))(ApiReference)
