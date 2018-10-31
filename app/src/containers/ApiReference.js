import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { withRouteData } from 'react-static'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ApiNavigation from '../components/ApiNavigation'
import ApiOperationPanel from '../components/ApiOperationPanel'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: `calc(100vh - ${theme.app.header.height}px)`,
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    padding: theme.spacing.unit * 3,
    overflow: 'scroll',
  },
  bold: {
    fontWeight: 500,
  },
  tagHeader: {
    marginBottom: theme.spacing.unit * 3,
  }
})

const ApiReference = ({ api, classes, tag, operations }) => (
  <div className={classes.root}>
    <Helmet>
      <title>Api Reference</title>
    </Helmet>
    <ApiNavigation api={api} />
    <div className={classes.content}>
      {!tag && (
        <section>
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
        </section>
      )}
      {tag && (
        <section className={classes.tagHeader}>
          <Typography variant="h4" gutterBottom>
            {tag.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {tag.description}
          </Typography>
        </section>
      )}
      {operations.map(operation => (
        <ApiOperationPanel key={operation.operationId} api={api} operation={operation} />
      ))}
    </div>
  </div>
)

ApiReference.propTypes = {
  api: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  operations: PropTypes.array.isRequired,
}

ApiReference.defaultProps = {
  operations: [],
}

export default compose(withRouteData, withStyles(styles))(ApiReference)
