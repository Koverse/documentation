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
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExampleSchema from './ExampleSchema'
import Markdown from './Markdown'

const styles = theme => ({
  root: {},
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    marginBottom: theme.spacing.unit * 3,
  },
})

const ApiOperationPanel = ({
  classes, operation,
}) => (
  <ExpansionPanel>
    {(operation.operationId === 'findDataSetById') && console.log(operation)}
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
    <ExpansionPanelDetails className={classes.details}>
      <section className={classes.section}>
        <Typography variant="button" color="textSecondary">Description</Typography>
        <Markdown
          text={operation.description || '--'}
        />
      </section>
      {!!operation.parameters.length && (
        <section className={classes.section}>
          <Typography variant="button" color="textSecondary">Parameters</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {operation.parameters.map(param => (
                <TableRow key={param.name}>
                  <TableCell>
                    <Typography variant="body2">
                      {param.name}
                    </Typography>
                    {param.required && (
                      <Typography variant="caption" color="error">
                        Required
                      </Typography>
                    )}
                    <Typography variant="caption">
                      {param.type}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      ({param.in})
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {param.description}
                    {param.schema && <ExampleSchema schema={param.schema} />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
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
