import React from 'react'
import { getSiteProps } from 'react-static'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import logoImg from '../logo.png'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
})

export default withStyles(styles)(getSiteProps(({ classes }) => (
  <div className={classes.root}>
    <Typography type="title">Welcome to</Typography>
    <img src={logoImg} alt="" />
  </div>
)))
