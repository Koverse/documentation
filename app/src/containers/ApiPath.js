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
  },
  navigation: {
    marginRight: theme.spacing.unit * 3,
  },
})

const ApiReference = ({
  api, classes, path, methods,
}) => (
  <div className={classes.root}>
    <ApiNavigation api={api} className={classes.navigation} />
    <div className={classes.root}>
      <Typography variant="h4">{path}</Typography>
    </div>
  </div>
)


ApiReference.propTypes = {
  api: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  methods: PropTypes.object.isRequired,
}

export default compose(withRouteData, withStyles(styles))(ApiReference)
