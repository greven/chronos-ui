import React from 'react'
import { elm, css, forwardRef, useTheme, SystemProps, PropsOf } from './system'
import { getValidChildren, mapResponsive } from './util'

export type WrapProps = PropsOf<typeof elm.div> & {
  /**
   * The space between the each child (even if it wraps)
   */
  spacing?: SystemProps['margin']
  /**
   * The `justify-content` value (for cross-axis alignment)
   */
  justify?: SystemProps['justifyContent']
  /**
   * The `align-items` value (for main axis alignment)
   */
  align?: SystemProps['alignItems']
  /**
   * The `flex-direction` value
   */
  direction?: SystemProps['flexDirection']
}

/**
 * Layout component used to stack elements that differ in length
 * and are liable to wrap.
 *
 * Common use cases:
 * - Buttons that appear together at the end of forms
 * - Lists of tags and chips
 *
 */
export const Wrap = forwardRef<WrapProps, 'div'>((props: WrapProps, ref: any) => {
  const { spacing = '0.5rem', children, justify, direction, align, ...rest } = props

  const theme = useTheme()

  const itemSpacing = mapResponsive(spacing, (value) => {
    const { margin } = css({ margin: value })(theme)
    return `calc(${margin} / 2)`
  })

  const groupSpacing = mapResponsive(spacing, (value) => {
    const { margin } = css({ margin: value })(theme)
    return `calc(${margin} / 2 * -1)`
  })

  const validChildren = getValidChildren(children)

  const clones = validChildren.map((child, index) => (
    <elm.li key={index} margin={itemSpacing} display="inline-flex">
      {child}
    </elm.li>
  ))

  return (
    <elm.div ref={ref} {...rest}>
      <elm.ul
        __css={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: justify,
          alignItems: align,
          flexDirection: direction,
          listStyleType: 'none',
          margin: groupSpacing,
          padding: 0,
        }}
      >
        {clones}
      </elm.ul>
    </elm.div>
  )
})
