import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData, NavLink, Link } from 'react-static'
import { compose, withStateHandlers } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
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
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  active: {
    '& .pageTitle': {
      color: theme.palette.primary[500],
    },
  },
})
const withToggle = withStateHandlers(
  ({ expandedSection }) => ({
    expanded: expandedSection ? {
      [expandedSection]: true,
    } : {},
  }),
  {
    toggle: ({ expanded }) => section => ({
      expanded: {
        ...expanded,
        [section]: !expanded[section],
      },
    }),
  }
)
const UserGuideNavigation = ({
  sections, api, classes, className, toggle, expanded,
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
          to={`/user-guide${sections[0].pages[0].slug}`}
        >
          <ListItemText
            primary="User Guide"
            secondary={api.info.version}
          />
        </ListItem>
      </List>
      <Divider />
      <List dense>
        {sections.map(section => (
          <React.Fragment key={section.title}>
            <ListItem button onClick={() => toggle(section.title)}>
              <ListItemText
                primary={section.title}
                primaryTypographyProps={{
                  variant: 'h6',
                }}
              />
            </ListItem>
            <Collapse in={expanded[section.title]} timeout="auto" unmountOnExit>
              <List dense>
                {section.pages.map(page => (
                  <ListItem
                    button
                    component={NavLink}
                    key={page.slug}
                    to={`/user-guide${page.slug}`}
                    activeClassName={classes.active}
                    className={classes.nested}
                  >
                    <ListItemText
                      primary={page.title}
                      primaryTypographyProps={{
                        classes: { root: 'pageTitle' },
                        color: 'textSecondary',
                        variant: 'subtitle2',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  )
}

UserGuideNavigation.propTypes = {
  api: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  sections: PropTypes.array.isRequired,
  expanded: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default compose(withRouteData, withStyles(styles), withToggle)(UserGuideNavigation)
