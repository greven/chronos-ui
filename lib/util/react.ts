/**
 * Sources: ChakraUI
 */

import React, { Ref } from 'react'

interface FunctionsType {
  [key: string]: any
}

interface GroupedFunctionsType {
  [key: string]: Array<Function> // eslint-disable-line
}

export const mergeRefs = <T>(...refs: Array<Ref<T> | undefined>) => (ref: T) => {
  refs.forEach((resolvableRef) => {
    if (typeof resolvableRef === 'function') {
      resolvableRef(ref)
    } else if (resolvableRef) {
      ;(resolvableRef as any).current = ref
    }
  })
}

export const safeBind = (...bindGroups: Array<any>) => {
  const groupedFns: GroupedFunctionsType = {}
  const fns: FunctionsType = {}
  const refs: Array<Ref<any>> = []

  function propFnFactory(name: string) {
    return (e: Event, ...args: any) => {
      const callbacks = groupedFns[name]
      if (!e.defaultPrevented) {
        callbacks.forEach((cb) => cb(e, ...args))
      }
    }
  }

  bindGroups.forEach((bind) => {
    Object.entries(bind).forEach(([key, value]) => {
      if (key === 'ref') {
        refs.push(value as Ref<any>)
        return
      }

      if (typeof value !== 'function') {
        fns[key] = value
        return
      }

      if (!groupedFns[key]) {
        groupedFns[key] = []
      }

      groupedFns[key].push(value as Function) // eslint-disable-line
      fns[key] = propFnFactory(key)
    })
  })

  if (refs.length > 0) {
    fns.ref = mergeRefs(...refs)
  }

  return fns
}

export interface CreateContextOptions {
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: boolean
  /**
   * Error message to throw if the context is `undefined`
   */
  errorMessage?: string
  /**
   * The display name of the context
   */
  name?: string
}

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>]

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
export function createContext<ContextType>(options: CreateContextOptions = {}) {
  const {
    strict = true,
    errorMessage = 'useContext must be inside a Provider with a value',
    name,
  } = options

  const Context = React.createContext<ContextType | undefined>(undefined)

  Context.displayName = name

  function useContext() {
    const context = React.useContext(Context)
    if (!context && strict) throw new Error(errorMessage)
    return context
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<ContextType>
}

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[]
}
