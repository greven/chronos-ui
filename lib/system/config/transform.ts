import * as CSS from 'csstype'
import { createParser, Config, system } from '@styled-system/core'
import { ResponsiveValue, Length } from '../types'

const config: Config = {
  transform: true,
  transformOrigin: {
    property: 'transformOrigin',
    scale: 'transforms.transformOrigin',
  },
}

export interface TransformProps {
  /**
   * The CSS `transform` property
   */
  transform?: ResponsiveValue<CSS.TransformProperty>
  /**
   * The CSS `transform-origin` property
   */
  transformOrigin?: ResponsiveValue<CSS.TransformOriginProperty<Length>>
}

export const transform = system(config)
export const transformParser = createParser(config)
