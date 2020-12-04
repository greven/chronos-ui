import React from 'react'
import { Interpolation } from '@emotion/core'
import { css, useColorMode, Global, ColorModeProvider, ThemeContext } from '../system'
import { runIfFn, get } from '../util'
import { ThemeProviderProps } from './types'
import { theme as defaultTheme } from './theme'
import { CSSReset } from './reset'

export type ThemeUIProviderProps = ThemeProviderProps

export function ThemeUIProvider(props: ThemeUIProviderProps) {
  const { theme, children } = props

  if (!theme) {
    throw Error('ThemeUIProvider: the `theme` prop is required')
  }

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider
        defaultValue={theme?.config?.initialColorMode}
        useSystemColorMode={theme?.config?.useInitialColorMode}
      >
        <CSSReset />
        <GlobalStyle />
        {children}
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { children, theme = defaultTheme } = props

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export function GlobalStyle() {
  const { colorMode } = useColorMode()
  return (
    <Global
      styles={(theme) => {
        const styleObjectOrFn = get(theme, 'styles.global')
        const bodyStyles = runIfFn(styleObjectOrFn, { theme, colorMode })
        if (!bodyStyles) return
        const styles = css({ body: bodyStyles })(theme)
        return styles as Interpolation
      }}
    />
  )
}
