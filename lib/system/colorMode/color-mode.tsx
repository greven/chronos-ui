import * as React from 'react'
import { noOp } from '../../util'
import type { ColorMode } from './utils'
import useColorModeState from './use-color-mode-state'

export type { ColorMode }

interface ColorModeContextType {
  colorMode: ColorMode
  toggleColorMode: () => void
}

export const ColorModeContext = React.createContext<ColorModeContextType>({
  colorMode: 'light',
  toggleColorMode: noOp,
})

/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */
export function useColorMode() {
  return React.useContext(ColorModeContext)
}

export interface ColorModeProviderProps {
  value?: ColorMode
  children?: React.ReactNode
  useSystemColorMode?: boolean
  defaultValue?: ColorMode
}

/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */
export function ColorModeProvider(props: ColorModeProviderProps) {
  const { value, children, useSystemColorMode = false, defaultValue = 'light' } = props

  const config = {
    useSystemColorMode,
    initialColorMode: defaultValue,
  }

  const [colorMode, setColorMode] = useColorModeState(config)
  const toggleColorMode = () => setColorMode(colorMode === 'light' ? 'dark' : 'light')

  const context = { colorMode, toggleColorMode }

  const controlledContext = {
    colorMode: value as ColorMode,
    toggleColorMode: noOp,
  }

  return (
    <ColorModeContext.Provider value={value ? controlledContext : context}>
      {children}
    </ColorModeContext.Provider>
  )
}

/**
 * Locks the color mode to `dark`, without any way to change it.
 */
export const DarkMode: React.FC = (props) => (
  <ColorModeContext.Provider value={{ colorMode: 'dark', toggleColorMode: noOp }} {...props} />
)

/**
 * Locks the color mode to `light` without any way to change it.
 */
export const LightMode: React.FC = (props) => (
  <ColorModeContext.Provider value={{ colorMode: 'light', toggleColorMode: noOp }} {...props} />
)

/**
 * Change value based on color mode
 *
 * @param light the light mode value
 * @param dark the dark mode value
 */
export function getColorModeValue(light: any, dark: any) {
  return (colorMode: ColorMode) => (colorMode === 'light' ? light : dark)
}

/**
 * Change value based on color mode.
 *
 * @param light the light mode value
 * @param dark the dark mode value
 *
 * @example
 *
 * ```js
 * const Icon = useColorModeValue(MoonIcon, SunIcon)
 * ```
 */
export function useColorModeValue(light: any, dark: any) {
  const { colorMode } = useColorMode()
  return getColorModeValue(light, dark)(colorMode)
}

const noFlash = `(function() { try {
  var mode = localStorage.getItem('ui-color-mode');
  if (!mode) return
  document.body.classList.add('ui-' + mode);
} catch (e) {} })();`

/**
 * Script to add to the root of your application to help prevent
 * flash of color mode that can happen during page load.
 *
 * This is particular useful for SSR in Gatsby or Next.js
 */
export const InitializeColorMode = () => <script dangerouslySetInnerHTML={{ __html: noFlash }} />
