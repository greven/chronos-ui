import { SystemStyleObject } from '../system'
import { Dict } from '../util'

export interface ThemeProviderProps {
  children: React.ReactNode
  theme?: Dict
}

export interface GlobalStyleProps {
  colorScheme: string
  colorMode: 'light' | 'dark'
  theme: Dict
}

export type GlobalStyles = {
  global?: SystemStyleObject | ((props: GlobalStyleProps) => SystemStyleObject)
}

export type JSXElementStyles = {
  [K in keyof JSX.IntrinsicElements]?: SystemStyleObject
}

export type Styles = GlobalStyles & JSXElementStyles

export type Intent =
  | 'primary'
  | 'secondary'
  | 'light'
  | 'dark'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
