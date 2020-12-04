import React, { useState, useEffect, useMemo, useContext } from 'react'
import { ThemeContext } from '@emotion/core'
import { Theme } from '../theme'
import {
  isArray,
  arrayToObjectNotation,
  getBreakpoints,
  breakpoints,
  get,
  createContext,
  Dict,
  StringOrNumber,
} from '../util'
import { useColorMode } from './colorMode'
import { StyleObjectOrFn, SystemStyleObject } from './css.types'
import { css } from './css'

export function useTheme<T extends {} = Theme>() {
  const theme = useContext((ThemeContext as unknown) as React.Context<T | undefined>)
  if (!theme) {
    throw Error(
      'useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ThemeProvider />`'
    )
  }

  return theme
}

// Equivalent to useChakraUI
export function useThemeUI<T extends Dict = Dict>() {
  const { colorMode, toggleColorMode } = useColorMode()
  const theme = useTheme() as T
  return { colorMode, toggleColorMode, theme }
}

/** Gets a token from the theme.
 *
 * @example
 *  useToken('colors', 'green.500', 'red.500')
 */
export const useToken = (scale: string, token: StringOrNumber, fallback?: StringOrNumber) => {
  const theme = useTheme()
  const path = `${scale}.${token}`
  return get(theme, path, fallback ?? token)
}

export function useCss(styles: StyleObjectOrFn) {
  const theme = useTheme()
  return css(styles)(theme)
}

/**
 * Hook to track the current breakpoint of the screen.
 *
 *  @example
 *  const Demo = () => {
 *    const breakpoint = useBreakpoint();
 *    if (breakpoint === "xl") return <div> This is very big screen! </div>;
 *    else return <div> Too small!</div>;
 *  }
 */
export const useBreakpoint = () => {
  const [screen, setScreen] = useState(0)

  const { breakpoints } = useTheme()
  const screens = getBreakpoints(breakpoints as any)

  useEffect(() => {
    const setSideScreen = (): void => {
      setScreen(window.innerWidth)
    }
    setSideScreen()
    window.addEventListener('resize', setSideScreen)
    return () => {
      window.removeEventListener('resize', setSideScreen)
    }
  })

  const sortedBreakpoints = useMemo(
    () => Object.entries(screens).sort((a, b) => (a[1] >= b[1] ? 1 : -1)),
    [breakpoints] // eslint-disable-line
  )

  const result = sortedBreakpoints.reduce((acc, [name, width]) => {
    if (screen >= width) {
      return name
    } else {
      return acc
    }
  }, sortedBreakpoints[0][0])
  return result
}

/**
 * React hook for getting the value for the current breakpoint from the
 * provided responsive values object.
 *
 * @example
 * const width = useBreakpointValue({ xs: '150px', md: '250px' })
 */
export function useBreakpointValue<T = any>(values: Record<string, T> | T[]) {
  const breakpoint = useBreakpoint()

  if (!breakpoint) return
  const obj = isArray(values) ? arrayToObjectNotation(values) : values
  return getClosestValue(obj, breakpoint)
}

function getClosestValue(values: any, breakpoint: string) {
  let index = Object.keys(values).indexOf(breakpoint)

  if (index !== -1) return values[breakpoint]

  let stopIndex = breakpoints.indexOf(breakpoint)
  let hasFound = false

  while (stopIndex >= 0 && !hasFound) {
    const key = breakpoints[stopIndex]
    if (values[key] != null) {
      index = stopIndex
      hasFound = true
    }
    stopIndex--
  }

  if (index !== -1) {
    const key = breakpoints[index]
    return values[key]
  }

  return undefined
}

const [StylesProvider, useStyles] = createContext<Dict<SystemStyleObject>>({
  name: 'StylesContext',
  errorMessage:
    'useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` ',
})

export { StylesProvider, useStyles }
