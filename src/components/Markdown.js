import React from 'react'
import remark from 'remark'
import reactRenderer from 'remark-react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Highlight from 'react-highlight'


const remarkReactComponents = {
  // a: MyLink,
  h1: ({ children }) => <Typography type="headline">{ children }</Typography>,
  h2: ({ children }) => <Typography type="title">{ children }</Typography>,
  h3: ({ children }) => <Typography type="subheading">{ children }</Typography>,
  aside: ({ children }) => <Typography type="body2">{ children }</Typography>,
  p: ({ children }) => <Typography type="body1">{ children }</Typography>,
  code: Highlight,
}

const r = remark().use(reactRenderer, {
  remarkReactComponents,
})

const style = theme => ({
  root: {
    '& h1, h2, h3, p': {
      marginBottom: theme.spacing.unit,
    },
  },
})

export default withStyles(style)(({ children, classes }) => (
  <div className={classes.root}>
    {console.log('hey')}
    {r.processSync(children).contents}
  </div>
))
