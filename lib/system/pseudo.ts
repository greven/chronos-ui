import { Dict, memoize, isObject, isFunction } from '../util'
import { Pseudos, pseudoSelectors } from './pseudo-selector'
import { css } from './css'

const isPseudoProp = (prop: string): prop is keyof Pseudos => prop in pseudoSelectors

const getPropName = memoize((prop: string) => (isPseudoProp(prop) ? pseudoSelectors[prop] : prop))

export function parsePseudo(props: Dict) {
  const next: Dict = {}

  for (const prop in props) {
    const propValue = props[prop]
    const propName = getPropName(prop)

    if (isObject(propValue) && !isFunction(propValue)) {
      next[propName] = parsePseudo(propValue)
    } else {
      next[propName] = propValue
    }
  }

  return next
}

export function pseudoProps({ theme, ...props }: any) {
  let result = {}
  for (const prop in props) {
    if (prop in pseudoSelectors) {
      const style = css({ [prop]: props[prop] })(theme)
      result = { ...result, ...style }
    }
  }
  return result
}

// Types

export interface ContentProp {
  /**
   * The CSS `content` property.
   *
   * NB: Remember to wrap it's value in backticks
   * for it to work correctly.
   *
   * @example
   * content: `"/"`
   */
  content?: string
}

export type PseudoProps<P> = {
  [K in keyof Pseudos]?: K extends '_before' | '_after'
    ? (P & ContentProp) | PseudoProps<P>
    : P | PseudoProps<P>
}
