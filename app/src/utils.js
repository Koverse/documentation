import arrify from 'arrify'
import { get } from 'lodash'

export const getApiOperationsByTagName = (api) => {
  const navigation = {}
  Object.keys(api.paths).forEach((path) => {
    Object.keys(api.paths[path]).forEach((method) => {
      arrify(api.paths[path][method].tags).forEach((tag) => {
        const operation = get(api.paths, `${path}.${method}`)
        navigation[tag] = arrify(navigation[tag]).concat({
          ...operation,
          parameters: get(
            api.paths,
            `${path}.parameters`,
            []
          ).concat(get(operation, 'parameters', [])),
          path,
          method,
        })
      })
    })
  })
  return navigation
}
