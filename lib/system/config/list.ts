import * as CSS from 'csstype'
import { createParser, Config, system } from '@styled-system/core'
import { ResponsiveValue } from '../types'

const config: Config = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: {
    property: 'listStylePosition',
  },
  listStyleImage: true,
  listStyleImg: {
    property: 'listStyleImage',
  },
}

export interface ListProps {
  listStyleType?: ResponsiveValue<CSS.ListStyleTypeProperty>
  /**
   * The CSS `list-style-position` property
   */
  listStylePosition?: ResponsiveValue<CSS.ListStylePositionProperty>
  /**
   * The CSS `list-style-position` property
   */
  listStylePos?: ResponsiveValue<CSS.ListStylePositionProperty>
  /**
   * The CSS `list-style-image` property
   */
  listStyleImage?: ResponsiveValue<CSS.ListStyleImageProperty>
  /**
   * The CSS `list-style-image` property
   */
  listStyleImg?: ResponsiveValue<CSS.ListStyleImageProperty>
}

export const list = system(config)
export const listParser = createParser(config)
