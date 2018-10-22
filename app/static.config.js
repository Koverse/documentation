import axios from 'axios'
import React, { Component } from 'react'
import { SheetsRegistry } from 'react-jss/lib/jss'
import { reloadRoutes } from 'react-static/node'
import slugify from 'slugify'
import jdown from 'jdown'
import chokidar from 'chokidar'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import { getApiOperationsByTagName } from './src/utils'
import api from './public/api.json'
import theme from './src/theme'

const markdownDir = '../markdown'
const apiDir = '../api-docs'

// chokidar.watch([markdownDir, apiDir]).on('all', () => reloadRoutes())

const apiOperationsByTagName = getApiOperationsByTagName(api)

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const content = await jdown(markdownDir, { parseMd: false })
    console.log(content)
    const userGuide = content['user-guide']
    return [
      {
        path: '/',
        component: 'src/containers/Home',
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
        component: 'src/containers/UserGuide',
        getData: () => ({
          api,
          userGuide,
        }),
        children: Object.keys(userGuide).map(key => ({
          path: `/${slugify(userGuide[key].slug)}`,
          component: 'src/containers/UserGuide',
          getData: () => ({
            api,
            page: userGuide[key],
            userGuide,
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
            <meta name="viewport" content="width=device-width, initial-scale=1" />
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
