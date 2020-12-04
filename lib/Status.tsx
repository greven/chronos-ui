import React from 'react'
import { elm, PropsOf, SystemProps } from './system'
import { cx } from './util'
import { lighten, ping, pingAnimation } from './theme'

export interface StatusOptions {
  /** Size of the status dot element. */
  size?: SystemProps['width']
  /** Animation speed. */
  speed?: string
}

export type StatusProps = StatusOptions & PropsOf<typeof elm.span>

export const Status: React.FC<StatusProps> = (props) => {
  const { className, size = 2.5, color = 'blue.600', speed, ...rest } = props

  const styles = {
    base: {
      width: size,
      height: size,
      display: 'flex',
      position: 'relative',
    },

    inner: {
      width: 'full',
      height: 'full',
      position: 'absolute',
      display: 'inline-flex',
      borderRadius: 'full',
      bg: lighten(color, 5),
      opacity: 0.75,
      animation: speed ? `${ping} ${speed} infinite` : pingAnimation,
    },

    bg: {
      width: size,
      height: size,
      positions: 'relative',
      display: 'inline-flex',
      borderRadius: 'full',
      bg: color,
    },
  }

  return (
    <elm.span className={cx('Status', className)} __css={styles.base} {...rest}>
      <elm.span __css={styles.inner} />
      <elm.span __css={styles.bg} />
    </elm.span>
  )
}
