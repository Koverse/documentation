import React, { Component } from 'react'
import { getSiteProps, Link } from 'react-static'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import logoImg from '../logo.png'

const drawerWidth = 240
const styles = theme => ({
  drawerPaper: {
    background: theme.palette.background.contentFrame,
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  home: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit,
  },
  logo: {
    width: '80%',
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
            className={classes.home}
          >
            <img className={classes.logo} src={logoImg} alt="Koverse" />
          </ListItem>
          {navItems.map(item => (
            <li key={item.label}>
              <Divider />
              <ListItem
                button
                to={item.to}
                component={Link}
              >
                <ListItemText primary={item.label} />
                {item.children && (
                  <ListItemIcon onClick={() => this.handleClick(item)}>
                    {this.state.expanded[item.label] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemIcon>
                )}
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
      </Drawer>
    )
  }
}

export default getSiteProps(withStyles(styles)(Nav))
