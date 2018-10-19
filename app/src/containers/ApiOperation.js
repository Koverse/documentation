import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData } from 'react-static'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ApiNavigation from '../components/ApiNavigation'
import Markdown from '../components/Markdown'

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
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 3,
    overflow: 'scroll',
  },
  navigation: {
    marginRight: theme.spacing.unit * 3,
  },
  title: {
    marginBottom: theme.spacing.unit * 3,
  },
  section: {
    marginBottom: theme.spacing.unit,
  }
})

const ApiOperation = ({
  api, classes, operation,
}) => (
  <div className={classes.root}>
    <ApiNavigation api={api} className={classes.navigation} />
    <div className={classes.content}>
      {console.log(api)}
      {console.log(operation)}
      <Typography variant="h4" className={classes.title}>
        {operation.summary}
      </Typography>
      <section className={classes.section}>
        <Typography variant="button" color="textSecondary">Description</Typography>
        <Typography variant="subtitle1" gutterBottom>{operation.description || '--'}</Typography>
      </section>
      <section className={classes.section}>
        <Typography variant="button" color="textSecondary">Path</Typography>
        <Markdown
          text={`<code>${operation.path}</code>`}
        />
      </section>
      <section className={classes.section}>
        <Typography variant="button" color="textSecondary">HTTP Method</Typography>
        <Markdown
          text={`<code>${operation.method.toUpperCase()}</code>`}
        />
      </section>

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
