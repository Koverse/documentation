import axios from 'axios'
import renderToHtml from 'renderToHtml'
import Document from 'Document'
import { getSpecification, getTags, getPathsByTag } from 'services/api'
import { getNavItems } from 'services/navigation'

export default {
  Document,
  getSiteProps: () => ({
    title: 'React Static',
    navItems: getNavItems(),
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const apiTags = getTags()
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/api',
        component: 'src/containers/Api',
        getProps: () => ({
          spec: getSpecification(),
          tags: apiTags,
        }),
        children: apiTags.map(tag => ({
          path: `/${tag}`,
          component: 'src/containers/ApiTag',
          getProps: () => ({
            tag,
            paths: getPathsByTag(tag),
          }),
        })),
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getProps: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getProps: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml,
}
