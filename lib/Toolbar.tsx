import React from 'react'
import { elm, forwardRef, PropsOf } from './system'
import { cx } from './util'

export type ToolbarProps = PropsOf<typeof elm.div> & {
  /** Reduce the height of the toolbar */
  compressed?: boolean
}

const MOBILE_HEIGHT = '56px'
const DESKTOP_HEIGHT = '64px'
const COMPRESSED_HEIGHT = '48px'

/**
 * A Toolbar is typically used in something like the Navbar component.
 * It provides some basic horizontal padding and maintains responsive height.
 */
export const Toolbar = forwardRef<ToolbarProps, 'div'>((props, ref) => {
  const { className, compressed, ...rest } = props

  const _className = cx('Toolbar', className)

  return (
    <elm.div
      ref={ref}
      className={_className}
      __css={{
        width: '100%',
        minHeight: compressed ? COMPRESSED_HEIGHT : { xs: MOBILE_HEIGHT, md: DESKTOP_HEIGHT },
        mx: 'auto',
        px: [2, 6],
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
      }}
      {...rest}
    />
  )
})
