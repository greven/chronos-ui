/**
 * Sources: ChakraUI
 */

import { isFunction } from './assertion'
import { FunctionArguments } from './types'
import memoize from 'memoize-one'

export function noOp() {} // eslint-disable-line

export function runIfFn<T, U>(valueOrFn: T | ((...args: U[]) => T), ...args: U[]): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}

export function callAllHandlers<T extends (event: any) => void>(...fns: (T | undefined)[]) {
  return function (event: FunctionArguments<T>[0]) {
    fns.some((fn) => {
      fn && fn(event)
      return event && event.defaultPrevented
    })
  }
}

export { memoize }

// eslint-disable-next-line
export function once(fn?: Function | null) {
  let result: any

  return function (this: any, ...args: any[]) {
    if (fn) {
      result = fn.apply(this, args)
      fn = null
    }

    return result
  }
}
