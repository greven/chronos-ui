/**
 * Sources: ChakraUI
 */

import * as React from 'react'

export type Merge<T1, T2> = Omit<T1, Extract<keyof T1, keyof T2>> & T2

export type SafeMerge<T, P> = P & Omit<T, keyof P>

export type UnionStringArray<T extends Readonly<string[]>> = T[number]

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type AnyFunction<T = any> = (...args: T[]) => any

export type FunctionArguments<T extends Function> = T extends (...args: infer R) => any ? R : never // eslint-disable-line

export type Dict<T = any> = Record<string, T>

export type ReactNodeOrRenderProp<P> = React.ReactNode | ((props: P) => React.ReactNode)

export type Booleanish = boolean | 'true' | 'false'

export type ObjectOrArray<T, K extends keyof any = keyof any> = T[] | Record<K, T>

export type StringOrNumber = string | number

export type Assign<T, U> = {
  [P in keyof (T & U)]: P extends keyof T ? T[P] : P extends keyof U ? U[P] : never
}

export type HTMLProps<T = any> = Omit<React.HTMLAttributes<T>, 'color' | 'width' | 'height'> &
  React.RefAttributes<T>

export type PropGetter<T extends HTMLElement = any, P = {}> = (
  props?: SafeMerge<HTMLProps<T>, P>,
  ref?: React.Ref<any> | React.RefObject<any>
) => SafeMerge<HTMLProps<T>, P>
