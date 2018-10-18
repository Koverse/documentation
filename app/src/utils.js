import arrify from 'arrify'
import { get } from 'lodash'

export const getApiNavigation = (api) => {
  const navigation = {}
  Object.keys(api.paths).forEach((path) => {
    Object.keys(api.paths[path]).forEach((method) => {
      arrify(api.paths[path][method].tags).forEach((tag) => {
        navigation[tag] = arrify(navigation[tag]).concat({
          ...get(api.paths, `${path}.${method}`),
          path,
          method,
        })
      })
    })
  })
  return navigation
}
