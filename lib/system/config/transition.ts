import * as CSS from 'csstype'
import { createParser, Config, system } from '@styled-system/core'
import { ResponsiveValue } from '../types'

const config: Config = {
  transition: true,
  transitionDuration: {
    property: 'transitionDuration',
    scale: 'transitions.duration',
  },
  transitionProperty: {
    property: 'transitionProperty',
    scale: 'transitions.property',
  },
  transitionTimingFunction: {
    property: 'transitionTimingFunction',
    scale: 'transitions.timingFunction',
  },
}

export interface TransitionProps {
  /**
   * The CSS `transition` property
   */
  transition?: ResponsiveValue<CSS.TransitionProperty>
  /**
   * The CSS `transition-property` property
   */
  transitionProperty?: ResponsiveValue<CSS.TransitionPropertyProperty>
  /**
   * The CSS `transition-timing-function` property
   */
  transitionTimingFunction?: ResponsiveValue<CSS.TransitionTimingFunctionProperty>
  /**
   * The CSS `transition-duration` property
   */
  transitionDuration?: ResponsiveValue<string>
}

export const transition = system(config)
export const transitionParser = createParser(config)
