import React from 'react'
import { elm, forwardRef, PropsOf, useColorModeValue } from './system'
import { cx } from './util'

const styles = {
  fixed: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 'fixed',
  },

  static: {
    position: 'static',
    boxShadow: 'none',
  },

  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },

  sticky: {
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: 'sticky',
  },
}

type Positions = 'fixed' | 'static' | 'absolute' | 'sticky'

export type NavbarProps = Omit<PropsOf<typeof elm.div>, 'position' | 'pos'> & {
  /** The position of the Navbar */
  position?: Positions
}

/**
 * A Navbar is used to provide app based navigation.
 * You'll typically use the Navbar in combination with a Toolbar.
 *
 * @example
 * <Navbar>
 *  <Toolbar>
 *    <Content />
 *  </Toolbar>
 * </Navbar>
 *
 */
export const Navbar = forwardRef<NavbarProps, 'nav'>((props, ref) => {
  const { className, position = 'fixed', ...rest } = props

  const _className = cx('Navbar', className)

  return (
    <elm.nav
      ref={ref}
      className={_className}
      __css={{
        bg: useColorModeValue('surface.light', 'surface.dark'),
        boxShadow: 'md',
        position: styles[position],
      }}
      {...rest}
    />
  )
})
