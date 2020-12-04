import React from 'react'
import { ThemeUIProvider, theme } from '../lib'

export default function CustomApp({ Component, pageProps, router }) {
  return (
    <ThemeUIProvider theme={theme}>
      <Component {...pageProps} key={router.route} />
    </ThemeUIProvider>
  )
}
