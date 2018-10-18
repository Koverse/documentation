import React from 'react'
import PropTypes from 'prop-types'
import slugify from 'slugify'
import { withRouteData, Link } from 'react-static'
import { withStateHandlers, compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { getApiNavigation } from '../utils'

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: 320,
    zIndex: theme.zIndex.appBar - 1,
  },
})

const withToggle = withStateHandlers(
  {
    expanded: {},
  },
  {
    toggle: ({ expanded }) => tag => ({
      expanded: {
        ...expanded,
        [tag]: !expanded[tag],
      },
    }),
  }
)

const ApiReference = ({
  api, classes, className, toggle, expanded,
}) => {
  const navigation = getApiNavigation(api)
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      className={className}
    >

      <List dense>
        {Object.keys(navigation).map(tag => (
          <div key={tag}>
            <ListItem button onClick={() => toggle(tag)}>
              <ListItemText
                primary={tag}
              />
              {expanded[tag] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expanded[tag]} timeout="auto" unmountOnExit>
              {navigation[tag].map(method => (
                <ListItem
                  key={method.operationId}
                  button
                  component={Link}
                  to={`/api-reference/${slugify(tag)}/${slugify(method.operationId)}`}
                >
                  <ListItemText
                    secondary={method.summary}
                  />
                </ListItem>
              ))}
            </Collapse>
          </div>
        ))}
      </List>
    </Drawer>
  )
}


ApiReference.propTypes = {
  api: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  expanded: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default compose(withRouteData, withStyles(styles), withToggle)(ApiReference)
