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
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing.unit * 3,
  },
  navigation: {
    marginRight: theme.spacing.unit * 3,
  },
})

const ApiOperation = ({
  api, classes, operation,
}) => (
  <div className={classes.root}>
    <ApiNavigation api={api} className={classes.navigation} />
    <div className={classes.content}>
      {console.log(operation)}
      <Typography variant="h4">{operation.summary}</Typography>
      <Typography variant="subtitle1">{operation.method.toUpperCase()}: {operation.path}</Typography>
    </div>
  </div>
)


ApiOperation.propTypes = {
  api: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  tag: PropTypes.string.isRequired,
  operation: PropTypes.object.isRequired,
}

export default compose(withRouteData, withStyles(styles))(ApiOperation)
