import React from 'react'
import PropTypes from 'prop-types'
import slugify from 'slugify'
import { withRouteData, NavLink, Link } from 'react-static'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: 320,
    zIndex: theme.zIndex.appBar - 1,
  },
  active: {
    background: theme.palette.grey[100],
    '& .tag': {
      color: theme.palette.text.primary,
    },
  },
})

const UserGuideNavigation = ({
  userGuide, api, classes, className,
}) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      className={className}
    >
      <List>
        <ListItem
          button
          component={Link}
          to="/user-guide"
        >
          <ListItemText
            primary="User Guide"
            secondary={api.info.version}
          />
        </ListItem>
      </List>
      <Divider />
      <List dense>
        {Object.keys(userGuide).map(key => (
          <ListItem
            key={key}
            button
            component={NavLink}
            to={`/user-guide/${userGuide[key].slug}`}
            activeClassName={classes.active}
          >
            <ListItemText
              primary={userGuide[key].title}
              primaryTypographyProps={{
                classes: { root: 'tag' },
                color: 'textSecondary',
                variant: 'h6',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

UserGuideNavigation.propTypes = {
  api: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  userGuide: PropTypes.object.isRequired,
}

export default compose(withRouteData, withStyles(styles))(UserGuideNavigation)
