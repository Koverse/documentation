import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData, withSiteData } from 'react-static'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const styles = {
  root: {
    marginTop: 100,
  },
  card: {
    minWidth: 275,
  },
}

const Home = ({ classes }) => (
  <Grid container spacing={16} justify="center" className={classes.root}>
    <Grid item xs={12} md={3}>
      <Card className={classes.card}>
        <CardHeader title="Documentation" />
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Aliquet porttitor lacus luctus accumsan tortor posuere ac.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">View Documentation</Button>
        </CardActions>
      </Card>
    </Grid>
    <Grid item xs={12} md={3}>
      <Card className={classes.card}>
        <CardHeader title="API Reference" />
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Aliquet porttitor lacus luctus accumsan tortor posuere ac.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">View API Reference</Button>
        </CardActions>
      </Card>
    </Grid>
    <Grid item xs={12} md={3}>
      <Card className={classes.card} xs={12} md={3}>
        <CardHeader title="Tutorials" />
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Aliquet porttitor lacus luctus accumsan tortor posuere ac.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">View Tutorials</Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
)

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  withSiteData,
  withRouteData,
)(Home)
