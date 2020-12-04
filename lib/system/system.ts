// Credits: ChakraUI: This styled system is adapated from ChakraUI v1 custom Styled-System.

import createStyled, { StyledComponent } from '@emotion/styled'
import { Theme } from '../theme'
import { Dict } from '../util'
import { systemProps } from './styled-system'
import { shouldForwardProp } from './should-forward-prop'
import { As, UIComponent } from './types'
import { DOMElements, cast, truncateProp, domElements } from './utils'
import { pseudoProps } from './pseudo'
import { css } from './css'

export interface Options {
  shouldForwardProp?(prop: string): boolean
  baseStyle?: any
  label?: string
}

const sxProp = cast((props: any) => css(props.sx)(props.theme))
const cssProp = (props: any) => props.css

const __css = cast((props: Dict) => {
  const result = {} as Dict
  for (const key in props.__css) {
    const exists = key in props
    if (!exists || props[key] == null) {
      result[key] = props.__css[key]
    }
  }
  return css(result)(props.theme)
})

const base = cast((baseStyle: any) => (props: any) => css(baseStyle)(props.theme))

export function styled<T extends As, P = {}>(component: any, options?: Options) {
  const { baseStyle, ...styledOptions } = options || {}
  return createStyled(component as any, {
    ...styledOptions,
    shouldForwardProp,
  })(
    __css,
    base(baseStyle),
    cast(systemProps),
    cast(pseudoProps),
    cast(truncateProp),
    sxProp,
    cast(cssProp)
  ) as StyledComponent<React.ComponentProps<T> & P, Options, Theme>
}

type JSXElements = {
  [Tag in DOMElements]: UIComponent<Tag, {}>
}

type CreateUIComponent = {
  <T extends As, P = {}>(component: T, options?: Options): UIComponent<T, P>
}

/** Creates a StyledComponent element */
export const elm = (styled as unknown) as CreateUIComponent & JSXElements

domElements.forEach((tag) => {
  //@ts-ignore
  elm[tag] = elm(tag)
})
