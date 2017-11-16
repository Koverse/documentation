import React from 'react'
import { getRouteProps, Link } from 'react-static'
import Typography from 'material-ui/Typography'

export default getRouteProps(({ post }) => (
  <div>
    <Link to="/blog/">
      <Typography type="body2">{'<'} Back</Typography>
    </Link>
    <br />
    <Typography type="title">{post.title}</Typography>
    <Typography type="body1">{post.body}</Typography>
  </div>
))
