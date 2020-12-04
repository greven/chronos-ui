import React from 'react'
import { elm, forwardRef, PropsOf, SystemProps } from './system'

export interface FlexOptions {
  /**
   * Shorthand for `alignItems` style prop
   */
  align?: SystemProps['alignItems']
  /**
   * Shorthand for `justifyContent` style prop
   */
  justify?: SystemProps['justifyContent']
  /**
   * Shorthand for `flexWrap` style prop
   */
  wrap?: SystemProps['flexWrap']
  /**
   * Shorthand for `flexDirection` style prop
   */
  direction?: SystemProps['flexDirection']
  /**
   * Shorthand for `flexBasis` style prop
   */
  basis?: SystemProps['flexBasis']
  /**
   * Shorthand for `flexGrow` style prop
   */
  grow?: SystemProps['flexGrow']
  /**
   * Shorthand for `flexShrink` style prop
   */
  shrink?: SystemProps['flexShrink']
}

export type FlexProps = FlexOptions & PropsOf<typeof elm.div>

export const Flex = forwardRef<FlexProps, 'div'>(
  ({ align, justify, wrap, direction, basis, grow, shrink, ...props }: FlexProps, ref: any) => {
    return (
      <elm.div
        ref={ref}
        flexDirection={direction}
        alignItems={align}
        justifyContent={justify}
        flexWrap={wrap}
        flexBasis={basis}
        flexGrow={grow}
        flexShrink={shrink}
        __css={{ display: 'flex' }}
        {...props}
      />
    )
  }
)
