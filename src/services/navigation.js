import { getTags } from 'services/api'

const apiTags = getTags()

export const getNavItems = () => ([
  {
    label: 'API',
    to: '/api',
    children: apiTags.map(tag => ({
      label: tag.name,
      to: `/api/${tag.name}`,
    })),
  },
  {
    label: 'SDK',
    to: '/sdk',
  },
])
