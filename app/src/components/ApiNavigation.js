import React from 'react'
import PropTypes from 'prop-types'
import slugify from 'slugify'
import { withRouteData, Link } from 'react-static'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: 320,
    zIndex: theme.zIndex.appBar - 1,
  },
})

const ApiNavigation = ({
  api, classes, className,
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
      <List dense>
        {api.tags.map(tag => (
          <ListItem
            key={tag.name}
            button
            component={Link}
            to={`/api-reference/${slugify(tag.name)}`}
          >
            <ListItemText
              primary={tag.name}
              primaryTypographyProps={{ variant: 'h6' }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

ApiNavigation.propTypes = {
  api: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(withRouteData, withStyles(styles))(ApiNavigation)
