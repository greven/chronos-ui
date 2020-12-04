import { Breakpoints } from '../../tokens'
import { isNumber } from '../../util'

export interface MediaQueries {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

/** Create a media query object with query and breakpoint
 * based on the argument breakpoints object */
export const createMediaQueries = (breakpoints: Breakpoints): MediaQueries => ({
  xs: '@media (min-width: 0px)',
  sm: `@media (min-width: ${toMediaString(breakpoints[0])})`,
  md: `@media (min-width: ${toMediaString(breakpoints[1])})`,
  lg: `@media (min-width: ${toMediaString(breakpoints[2])})`,
  xl: `@media (min-width: ${toMediaString(breakpoints[3])})`,
})

/**
 * Convert media query value to string
 */
function toMediaString(value: any) {
  return isNumber(value) ? `${value}px` : value
}
