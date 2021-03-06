// Credits: Chakra UI
import Color from 'tinycolor2'
import { Dict, get, isEmptyObject } from '../../util'
import { Intent } from '../types'

export { Color }

/**
 * Get the color raw value from theme
 * @param theme - the theme object
 * @param color - the color path ("green.200")
 * @param fallback - the fallback color
 */
export const getColor = (theme: Dict, color: string, fallback?: string) => {
  const hex = get(theme, `colors.${color}`, color)
  const isValid = Color(hex).isValid()
  return isValid ? hex : fallback
}

/**
 * Determines if the tone of given color is "light" or "dark"
 * @param color - the color in hex, rgb, or hsl
 */
export const tone = (color: string) => (theme: Dict) => {
  const hex = getColor(theme, color)
  const isDark = Color(hex).isDark()
  return isDark ? 'dark' : 'light'
}

/**
 * Determines if a color tone is "dark"
 * @param color - the color in hex, rgb, or hsl
 */
export const isDark = (color: string) => (theme: Dict) => tone(color)(theme) === 'dark'

/**
 * Determines if a color tone is "light"
 * @param color - the color in hex, rgb, or hsl
 */
export const isLight = (color: string) => (theme: Dict) => tone(color)(theme) === 'light'

/**
 * Make a color transparent
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the opacity amount
 */
export const transparentize = (color: string, opacity: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return Color(raw).setAlpha(opacity).toRgbString()
}

/**
 * Add white to a color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount white to add (0-1)
 */
export const whiten = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return Color.mix(raw, '#fff', amount).toHexString()
}

/**
 * Add black to a color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount of black to add (0-1)
 */
export const blacken = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return Color.mix(raw, '#000', amount).toHexString()
}

/**
 * Darken a specified color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount to darken (0-100)
 */
export const darken = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return Color(raw).darken(amount).toHexString()
}

/**
 * Lighten a specified color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount to lighten (0-100)
 */
export const lighten = (color: string, amount: number) => (theme: Dict) =>
  Color(getColor(theme, color)).lighten(amount).toHexString()

/**
 * Checks the contract ratio of between 2 colors,
 * based on the Web Content Accessibility Guidelines (Version 2.0).
 *
 * @param fg - the foreground or text color
 * @param bg - the background color
 */
export const contrast = (fg: string, bg: string) => (theme: Dict) =>
  Color.readability(getColor(theme, bg), getColor(theme, fg))

/**
 * Checks if a color meets the Web Content Accessibility
 * Guidelines (Version 2.0) for constract ratio.
 *
 * @param fg - the foreground or text color
 * @param bg - the background color
 */
export const isAccessible = (textColor: string, bgColor: string, options?: Color.WCAG2Options) => (
  theme: Dict
) => Color.isReadable(getColor(theme, bgColor), getColor(theme, textColor), options)

export const complementary = (color: string) => (theme: Dict) =>
  Color(getColor(theme, color)).complement().toHexString()

/** Try to extract the theme color name from the color string.
 * If no color name can be extracted, false will be returned.
 *
 * @para color - the theme color
 *
 *  @example
 *  getThemeColorName('red.600') --> 'red'
 *
 */
export const getThemeColorName = (color: string) => {
  if (!color) return false
  const parts = color.split('.')
  return parts.length > 0 ? parts[0] : false
}

/** Get the intent color palette name (example: 'dark' => 'gray') */
export const getIntentColorName = (intent: Intent) => {
  if (intent === 'primary') return 'primary'
  if (intent === 'secondary') return 'secondary'
  if (intent === 'dark') return 'dark'
  if (intent === 'light') return 'gray'
  if (intent === 'info') return 'blue'
  if (intent === 'warning') return 'yellow'
  if (intent === 'success') return 'green'
  if (intent === 'danger') return 'red'
  return 'dark'
}

/** Get the intent color default shade (example: 'primary' => 'primary.600') */
export const getIntentColorShade = (theme: Dict, intent: Intent, fallback?: string) => {
  if (intent === 'primary') return getColor(theme, 'primary.600', fallback)
  if (intent === 'secondary') return getColor(theme, 'secondary.600', fallback)
  if (intent === 'dark') return getColor(theme, 'dark.800', fallback)
  if (intent === 'light') return getColor(theme, 'gray.50', fallback)
  if (intent === 'info') return getColor(theme, 'info', fallback)
  if (intent === 'warning') return getColor(theme, 'warning', fallback)
  if (intent === 'success') return getColor(theme, 'success', fallback)
  if (intent === 'danger') return getColor(theme, 'danger', fallback)
}

/**  Shadow outline is the focus / hover outline around UI elements */
export const getShadowOutline = (
  theme: Dict,
  color: string,
  opacity = 0.4,
  spread = 2,
  blur = 0
) => {
  return `0 0 ${blur}px ${spread}px ${transparentize(color, opacity)(theme)}`
}

export function generateStripe(size = '1rem', color = 'rgba(255, 255, 255, 0.15)') {
  return {
    backgroundImage: `linear-gradient(
    45deg,
    ${color} 25%,
    transparent 25%,
    transparent 50%,
    ${color} 50%,
    ${color} 75%,
    transparent 75%,
    transparent
  )`,
    backgroundSize: `${size} ${size}`,
  }
}

interface RandomColorOptions {
  /**
   * If passed, string will be used to generate
   * random color
   */
  string?: string
  /**
   * List of colors to pick from at random
   */
  colors?: string[]
}

export function randomColor(opts?: RandomColorOptions) {
  const fallback = Color.random().toHexString()

  if (!opts || isEmptyObject(opts)) {
    return fallback
  }

  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors)
  }

  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string)
  }

  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors)
  }

  return fallback
}

function randomColorFromString(str: string) {
  let hash = 0
  if (str.length === 0) return hash.toString()
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  let color = '#'
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 255
    color += ('00' + value.toString(16)).substr(-2)
  }
  return color
}

function randomColorFromList(str: string, list: string[]) {
  let index = 0
  if (str.length === 0) return list[0]
  for (let i = 0; i < str.length; i++) {
    index = str.charCodeAt(i) + ((index << 5) - index)
    index = index & index
  }
  index = ((index % list.length) + list.length) % list.length
  return list[index]
}

function randomFromList(list: string[]) {
  return list[Math.floor(Math.random() * list.length)]
}
