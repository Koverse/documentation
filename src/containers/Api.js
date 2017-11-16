import React from 'react'
import { getRouteProps } from 'react-static'
import Typography from 'material-ui/Typography'
import Highlight from 'react-highlight'
import SplitLayout, { SplitContent } from 'layouts/Split'
import { darkTheme } from 'theme'

export default getRouteProps(({ spec }) => (
  <SplitLayout>
    {console.log(spec)}
    <SplitContent>
      <Typography type="display1">{spec.info.title}</Typography>
      <Typography type="subheading">{spec.info.description}</Typography>
    </SplitContent>
    <SplitContent theme={darkTheme}>
      <Typography type="subheading">
        API Endpoint
      </Typography>
      <Highlight>
        {spec.host}
      </Highlight>
      <Typography type="body1">
        Request Content-Types: {spec.consumes.join(', ')}
      </Typography>
      <Typography type="body1">
        Response Content-Types: {spec.produces.join(', ')}
      </Typography>
      <Typography type="body1">Version: {spec.info.version}</Typography>
    </SplitContent>
  </SplitLayout>
))
