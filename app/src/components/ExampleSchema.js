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
    example = get(schema, 'example', {})
    Object.keys(schema.properties).forEach((prop) => {
      if (schema.properties[prop].example) {
        example[prop] = schema.properties[prop].example
      }
    })
  }
  if (schema.type === 'array') {
    const item = get(schema, 'items.example', {})
    const itemProperties = get(schema, 'items.properties', {})
    Object.keys(itemProperties).forEach((prop) => {
      if (itemProperties[prop].example) {
        item[prop] = itemProperties[prop].example
      }
    })
    example = [item]
  }
  return example
}

const ExampleSchema = ({
  schema, example,
}) => {
  const text = JSON.stringify(example || extractExample(schema), null, '\t')
  return !!text && (
    <Markdown
      text={`\`\`\`javascript
${text}
\`\`\``}
    />
  )
}

ExampleSchema.propTypes = {
  classes: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  example: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
}

export default compose(withStyles(styles))(ExampleSchema)
