import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData, Redirect } from 'react-static'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import UserGuideNavigation from '../components/UserGuideNavigation'
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

const UserGuide = ({ api, classes, page, userGuide }) => (
  <div className={classes.root}>
    <UserGuideNavigation api={api} userGuide={userGuide} />
    <div className={classes.content}>
      {!page && (
        <Redirect to="user-guide/introduction" />
      )}
      {page && (
        <section className={classes.tagHeader}>
          <Typography variant="h4" gutterBottom>
            {page.title}
          </Typography>
          <Markdown text={page.contents} />
        </section>
      )}
    </div>
  </div>
)

UserGuide.propTypes = {
  api: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  page: PropTypes.object,
  userGuide: PropTypes.object.isRequired,
}

export default compose(withRouteData, withStyles(styles))(UserGuide)
