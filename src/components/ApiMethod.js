import React from 'react'
import Typography from 'material-ui/Typography'
import Highlight from 'react-highlight'
import SplitLayout, { SplitContent } from 'layouts/Split'
import { darkTheme } from 'theme'
import Markdown from 'components/Markdown'


export default ({ route, method }) => (
  <SplitLayout>
    <SplitContent>
      <Typography type="title">{method.summary}</Typography>
      <Markdown>{method.description}</Markdown>
    </SplitContent>
    <SplitContent theme={darkTheme}>
      <Highlight>
        {route}
      </Highlight>
      {Object.keys(method.responses).map(key => (
        <div key={key}>
          <Typography type="title">{key}</Typography>
          <Typography type="body1">{method.responses[key].description}</Typography>
          <Highlight>
            <code>
              {JSON.stringify(method.responses[key].schema.items, null, '  ')}
            </code>
          </Highlight>
        </div>
      ))}
      <Typography type="title">React, static sites, performance, speed. It's the stuff that makes us tick.</Typography>
    </SplitContent>
  </SplitLayout>
)
