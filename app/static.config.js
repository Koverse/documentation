import axios from 'axios'
import React, { Component } from 'react'
import { flatten } from 'lodash'
import { SheetsRegistry } from 'react-jss/lib/jss'
import slugify from 'slugify'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import { getApiNavigation } from './src/utils'
import api from './public/api.json'
import theme from './src/theme'

const apiNavigation = getApiNavigation(api)

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
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
        children: flatten(Object.keys(apiNavigation).map(tag => apiNavigation[tag].map(operation => ({
          path: `/${slugify(tag)}/${slugify(operation.operationId)}`,
          component: 'src/containers/ApiOperation',
          getData: () => ({
            operation,
            tag,
            api,
          })
        }))))
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
