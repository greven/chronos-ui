import React, { Fragment } from 'react'
import { elm, css, forwardRef, ResponsiveValue, SystemProps } from './system'
import { cx, getValidChildren, mapResponsive } from './util'
import { Flex, FlexProps } from './Flex'

export interface StackProps extends Omit<FlexProps, 'direction'> {
  /**
   * The space between each stack item.
   */
  spacing?: SystemProps['margin']
  /**
   * The direction to stack the items.
   */
  direction?: ResponsiveValue<'column' | 'row'>
  /**
   * If `true`, each stack item will show a divider.
   */
  divider?: React.ReactElement
  /**
   * If `true`, the children will be wrapped in a `Box` with
   * `display: inline-block`, and the `Box` will take the spacing props.
   */
  shouldWrapChildren?: boolean
}

/**
 * Stacks help you easily create flexible and automatically distributed layouts
 *
 * You can stack elements in the horizontal or vertical direction,
 * and apply a space or/and divider between each element.
 *
 * It uses `display: flex` internally and renders a `div`.
 *
 */
export const Stack = forwardRef<StackProps, 'div'>((props: StackProps, ref: any) => {
  const {
    children,
    className,
    direction = 'column',
    align = 'flex-start',
    spacing = '0.5rem',
    divider,
    shouldWrapChildren,
    ...rest
  } = props

  const selector = '> * + *'

  const styles = {
    base: {
      [selector]: mapResponsive(direction, (value) => ({
        [value === 'column' ? 'marginTop' : 'marginLeft']: spacing,
        [value === 'column' ? 'marginLeft' : 'marginTop']: 0,
      })),
    },

    divider: mapResponsive(direction, (value) => {
      if (value === 'row') {
        return {
          marginX: spacing,
          marginY: 0,
        }
      }
      return {
        marginX: 0,
        marginY: spacing,
      }
    }),
  }

  const validChildren = getValidChildren(children)
  const hasDivider = !!divider

  const clones = validChildren.map((child, index) => {
    const isLast = index + 1 === validChildren.length
    const _child = shouldWrapChildren ? <elm.div>{child}</elm.div> : child

    if (!hasDivider) return _child

    if (!isLast) {
      return (
        <Fragment key={index}>
          {_child}
          {React.cloneElement(divider as any, {
            css: css({
              '&': styles.divider,
            }),
          })}
        </Fragment>
      )
    }

    return _child
  })

  const _className = cx('Stack', className)

  return (
    <Flex
      ref={ref}
      className={_className}
      direction={direction}
      align={align}
      css={!hasDivider && css({ [selector]: styles.base[selector] })}
      {...rest}
    >
      {clones}
    </Flex>
  )
})
