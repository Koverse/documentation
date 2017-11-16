import React from 'react'
import { getRouteProps, Link } from 'react-static'
import Typography from 'material-ui/Typography'

export default getRouteProps(({ posts }) => (
  <div>
    <Typography type="title">It's blog time.</Typography>
    <br />
    <Typography type="subheading">All Posts:</Typography>
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`/blog/post/${post.id}/`}>
            <Typography type="body1">
              {post.title}
            </Typography>
          </Link>
        </li>
      ))}
    </ul>
  </div>
))
