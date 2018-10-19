import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData } from 'react-static'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { blue, green, orange, red } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Markdown from '../components/Markdown'

const styles = theme => ({
  root: {},
  summaryContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  location: {
    display: 'flex',
    marginBottom: 4,
    '& p': {
      margin: 0,
      marginRight: theme.spacing.unit,
    },
    '& code': {
      background: theme.palette.background.default,
      border: `1px solid ${theme.palette.divider}`,
    },
    '& .get code': {
      background: blue[100],
      border: `1px solid ${blue[100]}`,
    },
    '& .put code': {
      background: orange[100],
      border: `1px solid ${orange[100]}`,
    },
    '& .post code': {
      background: green[100],
      border: `1px solid ${green[100]}`,
    },
    '& .delete code': {
      background: red[100],
      border: `1px solid ${red[100]}`,
    },
  },
})

const ApiOperationPanel = ({
  classes, operation,
}) => (
  <ExpansionPanel>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      classes={{ content: classes.summaryContent }}
    >
      <div className={classes.location}>
        <Markdown
          text={`\`${operation.method.toUpperCase()}\``}
          className={operation.method}
        />
        <Markdown
          text={`\`${operation.path}\``}
        />
      </div>
      <Typography
        variant="body1"
        color="textSecondary"
      >
        {operation.summary}
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <section className={classes.section}>
        <Typography variant="button" color="textSecondary">Description</Typography>
        <Markdown
          text={operation.description || '--'}
        />
      </section>
    </ExpansionPanelDetails>
  </ExpansionPanel>

)

ApiOperationPanel.propTypes = {
  api: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired,
  operation: PropTypes.object.isRequired,
}

export default compose(
  withRouteData,
  withStyles(styles),
)(ApiOperationPanel)
