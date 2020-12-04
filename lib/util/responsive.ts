// Sources: ChakraUI
import { breakpoints as defaultBreakpoints } from '..//tokens'
import { isArray, isObject } from './assertion'
import { Dict } from './types'
import { objectKeys } from './object'
import { getLastItem } from './array'

export const breakpoints = Object.freeze(['xs', 'sm', 'md', 'lg', 'xl'])

/** Returns an object with the breakpoints and corresponding width */
export const getBreakpoints = (theme: Dict) => {
  const breakpoints = (theme?.breakpoints ?? defaultBreakpoints) as string[]
  return {
    xs: 0,
    sm: parseInt(breakpoints[0]),
    md: parseInt(breakpoints[1]),
    lg: parseInt(breakpoints[2]),
    xl: parseInt(breakpoints[3]),
  }
}

export function mapResponsive(prop: any, mapper: (val: any) => any) {
  if (isArray(prop)) {
    return prop.map((item) => {
      if (item === null) {
        return null
      }
      return mapper(item)
    })
  }

  if (isObject(prop)) {
    return objectKeys(prop).reduce((result: Dict, key) => {
      result[key] = mapper(prop[key])
      return result
    }, {})
  }

  if (prop != null) {
    return mapper(prop)
  }

  return null
}

export function objectToArrayNotation(obj: Dict, bps = breakpoints) {
  const result = bps.map((br) => obj[br] ?? null)
  while (getLastItem(result) === null) {
    result.pop()
  }
  return result
}

export function arrayToObjectNotation(values: any[], bps = breakpoints) {
  const result = {} as Dict
  values.forEach((value, index) => {
    const key = bps[index]
    if (value == null) return
    result[key] = value
  })
  return result
}

export function isResponsiveObjectLike(obj: Dict, bps = breakpoints) {
  const keys = Object.keys(obj)
  return keys.length > 0 && keys.every((key) => bps.includes(key))
}
