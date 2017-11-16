import React from 'react'
import { getRouteProps } from 'react-static'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
// import SplitLayout, { SplitContent } from 'layouts/Split'
// import { darkTheme } from 'theme'
import ApiPath from 'components/ApiPath'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  header: {
    background: theme.palette.background.contentFrame,
    padding: theme.spacing.unit * 3,
  },
})

export default withStyles(styles)(getRouteProps(({ classes, tag, paths }) => (
  <div className={classes.root}>
    <div className={classes.header}>
      <Typography type="display1">{tag.name}</Typography>
      <Typography type="body1">{tag.description}</Typography>
    </div>
    {Object.keys(paths).map(route => (
      <ApiPath key={route} route={route} path={paths[route]} />
    ))}
  </div>
)))
