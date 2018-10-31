import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData, withSiteData, Link } from 'react-static'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import cubes from '../assets/cubes2.svg'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 40,
    background: `url(${cubes}) top ${-theme.spacing.unit * 8}px center no-repeat`,
    backgroundSize: 'auto 550px',
  },
})

const Home = ({ classes, userGuidePages }) => (
  <div className={classes.root}>
    <Grid
      container
      spacing={16}
      alignItems="flex-start"
      justify="flex-start"
      wrap="wrap"
    >
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader title="User Guide" />
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Aliquet porttitor lacus luctus accumsan tortor posuere ac.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              component={Link}
              to={`/user-guide${userGuidePages[0].slug}`}
            >
              View User Guide
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardHeader title="API Reference" />
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Aliquet porttitor lacus luctus accumsan tortor posuere ac.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              component={Link}
              to="/api-reference"
            >
              View API Reference
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardHeader title="Developer Resources" />
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Aliquet porttitor lacus luctus accumsan tortor posuere ac.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">View Developer Rersources</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </div>
)

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  userGuidePages: PropTypes.array.isRequired,
}

export default compose(
  withStyles(styles),
  withSiteData,
  withRouteData,
)(Home)
