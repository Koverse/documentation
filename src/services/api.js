import { pickBy, get, includes } from 'lodash'
import apiSpec from '../../api-spec/compiled.json'

export const getSpecification = () => apiSpec
console.log(apiSpec)
export const getTags = () => apiSpec.tags

export const getPathsByTag = tag => (
  pickBy(apiSpec.paths, path => {
    const tags = [].concat(
      get(path, 'get.tags', []),
      get(path, 'put.tags', []),
      get(path, 'post.tags', []),
      get(path, 'delete.tags', []),
    )
    return includes(tags, tag)
  })
)
