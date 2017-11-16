import React from 'react'
import { getRouteProps } from 'react-static'
import Typography from 'material-ui/Typography'
import SplitLayout, { SplitContent } from 'layouts/Split'
import { darkTheme } from 'theme'

export default getRouteProps(({ tag, paths }) => (
  <SplitLayout>
    {console.log(paths)}
    <SplitContent>
      <Typography type="title">{tag}</Typography>
      <Typography type="body1">React, static sites, performance, speed. It's the stuff that makes us tick.</Typography>
    </SplitContent>
    <SplitContent theme={darkTheme}>
      <Typography type="title">{tag}</Typography>
      <Typography type="body1">React, static sites, performance, speed. It's the stuff that makes us tick.</Typography>
    </SplitContent>
  </SplitLayout>
))
