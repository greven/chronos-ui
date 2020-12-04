import React from 'react'
import { elm, PropsOf, SystemProps } from './system'
import { spin, transparentize } from './theme'
import { cx } from './util'
import { VisuallyHidden } from './VisuallyHidden'

export interface SpinnerOptions {
  /** The delay (in ms) before the spinner will appear. */
  delay?: number
  /** Size of the spinner element. */
  size?: SystemProps['width']
  /** Animation speed. */
  speed?: SystemProps['transitionDuration']
  /** Attempt to center the spinner in the parent element. */
  center?: boolean
  /** Thickness of the spinner. */
  thickness?: string
  /** The color of the spinning portion. */
  color?: string
  /** The backdrop color. */
  emptyColor?: string
  /** Inverted the default colors. */
  inverted?: boolean
  /** Use an optional label. */
  label?: string
}

export type SpinnerProps = SpinnerOptions & PropsOf<typeof elm.div>

export const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
  const {
    className,
    size = 5,
    delay = 400,
    speed = '500ms',
    thickness = '2px',
    center,
    inverted = false,
    color = inverted ? 'gray.600' : 'gray.50',
    emptyColor = transparentize(color, 0.1),
    label,
    ...rest
  } = props

  const [show, setShow] = React.useState(delay === 0 ? true : false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [delay])

  const styles = {
    base: {
      display: 'flex',
      opacity: show ? 1 : 0,
      transitionProperty: 'opacity',
      transitionDuration: 'slower',
      transitionTimingFunction: 'in-out',
    },

    centered: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },

    container: {
      textAlign: 'center',
    },

    spinner: {
      ...{
        width: size,
        height: size,
        display: 'inline-block',
        borderRadius: 'full',
        borderStyle: 'solid',
        borderWidth: thickness,
        borderColor: color,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        verticalAlign: 'text-bottom',
        animation: `${spin} ${speed} linear infinite`,
      },

      ...(emptyColor && {
        borderLeftColor: emptyColor,
        borderRightColor: emptyColor,
        borderBottomColor: emptyColor,
      }),
    },

    label: {
      display: 'block',
      marginTop: 2,
      color: inverted ? 'text' : 'light',
      fontSize: 'xs',
      fontWeight: 'medium',
      lineHeight: 'normal',
      letterSpacing: 'wide',
    },
  }

  return (
    <elm.div
      className={cx('Spinner', className)}
      __css={{ ...styles.base, ...(center && styles.centered) }}
      {...rest}
    >
      <elm.div role="status" className="Spinner__container" __css={styles.container}>
        <elm.div className="Spinner__spinner'" __css={styles.spinner} />
        {label ? (
          <elm.span className="Spinner__label" __css={styles.label}>
            {label}
          </elm.span>
        ) : (
          <VisuallyHidden>Loading</VisuallyHidden>
        )}
      </elm.div>
    </elm.div>
  )
}
