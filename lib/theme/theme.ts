import { tokens, breakpoints } from '../tokens'
import { ColorModeOptions } from '../system'
import { createMediaQueries } from './helpers'
import * as animations from './animations'
import styles from './styles'

const mediaQueries = createMediaQueries(breakpoints)

const config: ColorModeOptions = {
  useSystemColorMode: false,
  initialColorMode: 'light',
}

export const theme = {
  ...tokens,
  animations,
  mediaQueries,
  styles,
  config,
}

export type Theme = typeof theme
