/* eslint react/no-danger: 0 */
import React from 'react'

export default ({ Html, Head, Body, children, renderMeta }) => (
  <Html>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style
        id="jss-server-side"
        dangerouslySetInnerHTML={{ __html: renderMeta.jss }}
      />
    </Head>
    <Body>
      {children}
    </Body>
  </Html>
)
