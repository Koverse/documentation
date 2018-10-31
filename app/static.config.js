import axios from 'axios'
import React, { Component } from 'react'
import { SheetsRegistry } from 'react-jss/lib/jss'
import { reloadRoutes } from 'react-static/node'
import { flatten, sortBy, startCase } from 'lodash'
import slugify from 'slugify'
import jdown from 'jdown'
import chokidar from 'chokidar'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import { getApiOperationsByTagName } from './src/utils'
import api from './public/api.json'
import theme from './src/theme'

const apiOperationsByTagName = getApiOperationsByTagName(api)

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const userGuide = await jdown('../user-guide', { parseMd: false })
    const userGuideSections = Object.keys(userGuide).sort().map(key => {
      const section = userGuide[key]
      const sectionTitle = startCase(key.replace(/^[1-9]*\./gi, ''))
      const pages = Object.keys(section).sort().map(page => ({
        slug: `/${slugify(sectionTitle)}/${slugify(section[page].title)}`,
        sectionTitle,
        ...section[page]
      }))
      return {
        title: sectionTitle,
        pages,
      }
    })
    const userGuidePages = flatten(userGuideSections.map(section => section.pages))
    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: () => ({
          userGuidePages,
        }),
      },
      {
        path: '/api-reference',
        component: 'src/containers/ApiReference',
        getData: () => ({
          api,
        }),
        children: api.tags.map(tag => ({
          path: `/${slugify(tag.name)}`,
          component: 'src/containers/ApiReference',
          getData: () => ({
            tag,
            operations: apiOperationsByTagName[tag.name],
            api,
          })
        }))
      },
      {
        path: '/user-guide',
        getData: () => ({
          api,
          userGuide,
        }),
        children: userGuidePages.map(page => ({
          path: page.slug,
          component: 'src/containers/UserGuide',
          getData: () => ({
            api,
            page,
            userGuideSections,
          })
        }))
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry()

    // Create a MUI theme instance.
    const muiTheme = createMuiTheme(theme)

    const generateClassName = createGenerateClassName()

    const html = render(
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={muiTheme} sheetsManager={new Map()}>
          <Comp />
        </MuiThemeProvider>
      </JssProvider>
    )

    meta.jssStyles = sheetsRegistry.toString()

    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="description" content="Koverse Documentation" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
              rel="stylesheet"
            />
          </Head>
          <Body>
            {children}
            <style id="jss-server-side">{renderMeta.jssStyles}</style>
          </Body>
        </Html>
      )
    }
  },
}
