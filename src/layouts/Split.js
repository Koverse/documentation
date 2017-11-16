import React from 'react'
import { MuiThemeProvider, withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import theme from 'theme'


const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: 12,
  },
  grid: {
    display: 'flex',
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
})

export default withStyles(styles)(({ children, classes }) => (
  <div className={classes.root}>
    <Grid container spacing={24} className={classes.grid}>
      {children}
    </Grid>
  </div>
))

export const SplitContent = withStyles(styles)(({ children, classes, theme }) => (
  <MuiThemeProvider theme={theme}>
    <Grid item xs={12} md={6} className={classes.grid}>
      <Paper elevation={0} classes={{ root: classes.paper }}>
        {children}
      </Paper>
    </Grid>
  </MuiThemeProvider>
))

SplitContent.defaultProps = {
  theme,
}
