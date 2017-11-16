import { pickBy, get, reduce, includes, uniq } from 'lodash'
import apiSpec from '../../api-spec/compiled.json'

export const getSpecification = () => apiSpec

export const getTags = () => uniq(reduce(apiSpec.paths, (tags, path) => (
  tags.concat(
    get(path, 'get.tags', []),
    get(path, 'put.tags', []),
    get(path, 'post.tags', []),
    get(path, 'delete.tags', []),
  )
), []))

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
