import React from 'react'
import { FunctionInterpolation } from '@emotion/core'
import { Dict, StringOrNumber, isString, isNumber, UnionStringArray } from '../util'

/** Returns the corresponding argument depending
 * on the current color mode.
 * Example: mode('green.500', 'red.500')
 * */
export function mode(light: any, dark: any) {
  return (props: Dict) => (props.colorMode === 'light' ? light : dark)
}

const startsWith = (string: string, target: string) => string.slice(0, 0 + target.length) == target

export function positiveOrNegative(value: StringOrNumber, scale: any) {
  if (!scale) return value

  let result: any

  const valueString = value.toString()

  if (startsWith(valueString, '-')) {
    const raw = scale[valueString.slice(1)]
    if (isString(raw)) {
      result = '-' + raw
    } else if (isNumber(raw)) {
      result = raw * -1
    } else {
      result = value
    }
  } else {
    result = scale[value] ?? value
  }
  return result || value
}

export function truncateProp({ isTruncated, noOfLines }: any) {
  if (isNumber(noOfLines)) {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: noOfLines,
    }
  }

  if (isTruncated) {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }
  }
}

export const cast = <P = { theme: {} }>(arg: any) => arg as FunctionInterpolation<P>

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
export const domElements = [
  'a',
  'article',
  'aside',
  'blockquote',
  'button',
  'caption',
  'cite',
  'circle',
  'code',
  'dd',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'img',
  'input',
  'kbd',
  'label',
  'li',
  'mark',
  'nav',
  'ol',
  'p',
  'path',
  'pre',
  'q',
  'rect',
  's',
  'svg',
  'section',
  'select',
  'small',
  'span',
  'sub',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul',
] as const

export type DOMElements = UnionStringArray<typeof domElements>

// ForwardRef

export type AssignableRef<T> =
  | {
      bivarianceHack(instance: T | null): void
    }['bivarianceHack']
  | React.MutableRefObject<T | null>
  | null

type As<P = any> = React.ElementType<P>

export type PropsWithAs<T extends As, P> = P &
  Omit<React.ComponentPropsWithRef<T>, 'as' | 'color' | keyof P> & {
    as?: T
  }

export type PropsFromAs<T extends As, P> = (PropsWithAs<T, P> & { as: T }) & PropsWithAs<T, P>

export type ComponentWithForwardedRef<
  T extends React.ElementType,
  P
> = React.ForwardRefExoticComponent<
  P & React.HTMLProps<React.ElementType<T>> & React.ComponentPropsWithRef<T>
>

export interface ComponentWithAs<T extends As, P> {
  <TT extends As>(props: PropsWithAs<TT, P>): React.ReactElement | null
  (props: PropsWithAs<T, P>): React.ReactElement | null
  displayName?: string
  propTypes?: React.WeakValidationMap<PropsWithAs<T, P>>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<PropsWithAs<T, P>>
  /**
   * @private
   */
  id?: string
}

export function forwardRef<P, T extends As>(
  comp: (
    props: PropsFromAs<T, Omit<P, 'children' | 'as'>>,
    ref: React.RefObject<any>
  ) => React.ReactElement | null
) {
  return (React.forwardRef(comp as any) as unknown) as ComponentWithAs<
    T,
    Omit<P, 'children' | 'as'>
  >
}
