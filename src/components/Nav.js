import React, { Component } from 'react'
import { getSiteProps, Link } from 'react-static'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'

const drawerWidth = 240
const styles = () => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
})

class Nav extends Component {
  state = {
    expanded: {},
  }

  handleClick = item => {
    if (item.children) {
      const expanded = this.state.expanded
      expanded[item.label] = !expanded[item.label]
      this.setState({ expanded })
    }
  }

  render () {
    const { classes, navItems } = this.props
    return (
      <Drawer
        type="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <ListItem
            button
            to="/"
            component={Link}
          >
            <ListItemText primary="Home" />
          </ListItem>
          {navItems.map(item => (
            <li key={item.label}>
              <ListItem
                button
                to={item.to}
                component={Link}
                onClick={() => this.handleClick(item)}
              >
                <ListItemText primary={item.label} />
              </ListItem>
              {item.children && (
                <Collapse
                  in={this.state.expanded[item.label]}
                  transitionDuration="auto"
                  unmountOnExit
                >
                  <List disablePadding>
                    {item.children.map(child => (
                      <ListItem
                        key={child.label}
                        button
                        to={child.to}
                        component={Link}
                      >
                        <ListItemText secondary={child.label} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </li>
          ))}
        </List>
        <Divider />
      </Drawer>
    )
  }
}

export default getSiteProps(withStyles(styles)(Nav))
