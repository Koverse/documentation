import React from 'react'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import ApiMethod from 'components/ApiMethod'

const styles = theme => ({
  root: {
    background: theme.palette.background.contentFrame,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  header: {
    marginBottom: theme.spacing.unit,
  },
})

export default withStyles(styles)(({ classes, path, route }) => (
  <div className={classes.root}>
    {path.get && (
      <Paper>
        <ApiMethod route={`GET: ${route}`} method={path.get} />
      </Paper>
    )}
  </div>
))
