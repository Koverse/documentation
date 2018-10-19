import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Markdown from './Markdown'

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: 320,
    zIndex: theme.zIndex.appBar - 1,
  },
  active: {
    background: theme.palette.grey[100],
    '& .tag': {
      color: theme.palette.text.primary,
    },
  },
})

const extractExample = (schema) => {
  let example
  if (schema.type === 'object') {
    example = {}
    Object.keys(schema.properties).forEach((prop) => {
      if (schema.properties[prop].example) {
        example[prop] = schema.properties[prop].example
      }
    })
  }
  if (schema.type === 'array') {
    if (get(schema, 'items.example')) {
      example = [schema.items.example]
    } else {
      const item = {}
      const itemProperties = get(schema, 'items.properties', {})
      Object.keys(itemProperties).forEach((prop) => {
        if (itemProperties[prop].example) {
          item[prop] = itemProperties[prop].example
        }
      })
      example = [item]
    }
  }
  return example
}

const ExampleSchema = ({
  schema,
}) => {
  return (
    <Markdown
      text={`\`\`\`javascript
${JSON.stringify(extractExample(schema), null, '\t')}
\`\`\``}
    />
  )
}

ExampleSchema.propTypes = {
  classes: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
}

export default compose(withStyles(styles))(ExampleSchema)
