import React from 'react'
import { elm, forwardRef, PropsOf } from './system'
import { cx } from './util'

export type TextVariant =
  | 'body'
  | 'caption'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'subtitle1'
  | 'subtitle2'
  | 'display1'
  | 'display2'
  | 'display3'

const element: { [key in TextVariant]: React.ElementType } = {
  body: 'p',
  caption: 'div',
  title1: 'h2',
  title2: 'h3',
  title3: 'h4',
  subtitle1: 'h5',
  subtitle2: 'h6',
  display1: 'h1',
  display2: 'h2',
  display3: 'h3',
}

export interface TextOptions {
  children?: React.ReactNode
  /** The text variant style */
  variant?: TextVariant
  /** Use muted colors */
  isMuted?: boolean
  /** Use uppercase */
  isUppercase?: boolean
  /** Text is striked */
  isStriked?: boolean
}

export type TextProps = TextOptions & PropsOf<typeof elm.div>

/** Text component to render styled text (renders a <p> tag by default).
 * Most standard typography html elements/tags are styled globally by
 * default. If you want to use an Heading 1 for example, just use set
 * the as prop as "h1".
 * For non standard html elements styles, like subtitle or
 * display<1,2,3> the variant prop is provided.
 *
 * The As prop has precedence over variant but the variant styling will
 * override the global typography styles.
 *
 * Pass the isTruncated prop to render an ellipsis when the text exceeds
 * the width of the viewport or maxWidth prop.
 */
export const Text = forwardRef<TextProps, 'p'>((props: TextProps, ref: any) => {
  const {
    as,
    children,
    className,
    variant = 'body',
    isMuted,
    color = 'inherit',
    isUppercase,
    isStriked,
    ...rest
  } = props

  const styles = {
    base: {
      color: isMuted ? 'muted' : color,
      textTransform: isUppercase ? 'uppercase' : undefined,
    },

    body: {
      margin: 0,
    },
    caption: {
      fontSize: 'xs',
      lineHeight: 'sm',
      letterSpacing: 'wide',
      margin: 0,
    },
    title1: {
      fontSize: '2xl',
      lineHeight: 'normal',
      fontWeight: 'medium',
      letterSpacing: 'normal',
      margin: 0,
    },
    title2: {
      fontSize: 'xl',
      lineHeight: 'normal',
      fontWeight: 'medium',
      letterSpacing: 'normal',
      margin: 0,
    },
    title3: {
      fontSize: 'lg',
      lineHeight: 'normal',
      fontWeight: 'medium',
      letterSpacing: 'normal',
      margin: 0,
    },
    subtitle1: {
      color: 'gray.500',
      fontSize: 'base',
      lineHeight: 'tight',
      fontWeight: 'normal',
      letterSpacing: 'wide',
      margin: 0,
      marginTop: 1,
    },
    subtitle2: {
      color: 'gray.500',
      fontSize: 'sm',
      lineHeight: 'snug',
      fontWeight: 'medium',
      letterSpacing: 'wide',
      margin: 0,
      marginTop: 1,
    },
    display1: {
      fontSize: '5xl',
      fontWeight: 'light',
      margin: 0,
    },
    display2: {
      fontSize: '4xl',
      fontWeight: 'light',
      margin: 0,
    },
    display3: {
      fontSize: '3xl',
      fontWeight: 'light',
      margin: 0,
    },

    strikethrough: {
      'display': 'inline-block',
      'position': 'relative',

      ':after': {
        content: '" "',
        position: 'absolute',
        display: 'block',
        width: isStriked ? '100%' : 0,
        height: '5%',
        top: '55%',
        left: isStriked ? 0 : undefined,
        right: isStriked ? undefined : 0,
        background: 'currentColor',
        transform: 'translateY(-50%)',
        transitionProperty: 'dimensions',
        transitionDuration: 'slow',
        transitionTimingFunction: 'in-out',
      },
    },
  }

  const Component = as || element[variant]

  return (
    <elm.p
      as={Component}
      ref={ref}
      className={cx('Text', className)}
      __css={{ ...styles.base, ...styles[variant] }}
      {...rest}
    >
      <elm.span __css={{ ...styles.strikethrough }}>{children}</elm.span>
    </elm.p>
  )
})
