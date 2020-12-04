import React from 'react'
import { elm, forwardRef, useTheme, PropsOf } from './system'
import { cx, omit } from './util'
import { Intent, getColor, getIntentColorShade, isAccessible } from './theme'

function useBadgeStyle(props: BadgeProps) {
  const theme = useTheme()

  let invisible = props?.isInvisible
  const overlap = props?.overlap ?? 'rectangle'
  const anchorVertical = props?.anchorVertical ?? 'top'
  const anchorHorizontal = props?.anchorHorizontal ?? 'right'
  const showZero = props?.showZero ?? false
  const count = props?.count ?? 0
  const intent = props?.intent ?? 'dark'
  const outlined = props?.outlined ?? false
  const outlineColor = props?.outlineColor ?? 'white'

  if (!invisible && ((count === 0 && !showZero) || (count == null && props?.variant !== 'dot'))) {
    invisible = true
  }

  const shadowColor = getColor(theme, outlineColor, 'black')
  const backgroundColor = getIntentColorShade(theme, intent, 'dark')
  const textColor = isAccessible('white', backgroundColor)(theme) ? 'white' : 'text'

  return {
    base: {
      position: 'relative',
      verticalAlign: 'middle',
      display: 'inline-flex',
      flexShrink: 0,
    },

    badge: {
      height: 5,
      minWidth: 5,
      paddingY: 0,
      paddingX: 1,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      boxSizing: 'border-box',
      fontWeight: 'semibold',
      fontSize: 'xs',
      lineHeight: 1,
      borderRadius: 'full',
      userSelect: 'none',
      zIndex: 'overlay',
      color: textColor,
      backgroundColor: backgroundColor,
      boxShadow: outlined && !invisible ? `0 0 0 2px ${shadowColor}` : 'none',
      transitionDuration: 'normal',
      transitionProperty: 'default',
      transitionTimingFunction: 'in-out',
    },

    dot() {
      if (props?.variant !== 'dot') return
      return {
        borderRadius: 'full',
        height: 3,
        minWidth: 3,
        padding: 0,
      }
    },

    anchors() {
      if (overlap === 'rectangle') {
        if (anchorVertical === 'top' && anchorHorizontal === 'right') {
          return {
            top: 0,
            right: 0,
            transform: invisible
              ? 'scale(0) translate(50%, -50%)'
              : 'scale(1) translate(50%, -50%)',
            transformOrigin: '100% 0%',
          }
        }

        if (anchorVertical === 'top' && anchorHorizontal === 'left') {
          return {
            top: 0,
            left: 0,
            transform: invisible
              ? 'scale(0) translate(-50%, -50%)'
              : 'scale(1) translate(-50%, -50%)',
            transformOrigin: '0% 0%',
          }
        }

        if (anchorVertical === 'bottom' && anchorHorizontal === 'right') {
          return {
            bottom: 0,
            right: 0,
            transform: invisible ? 'scale(0) translate(50%, 50%)' : 'scale(1) translate(50%, 50%)',
            transformOrigin: '100% 100%',
          }
        }

        if (anchorVertical === 'bottom' && anchorHorizontal === 'left') {
          return {
            bottom: 0,
            left: 0,
            transform: invisible
              ? 'scale(0) translate(-50%, 50%)'
              : 'scale(1) translate(-50%, 50%)',
            transformOrigin: '0% 100%',
          }
        }
      } else if (overlap === 'circle') {
        if (anchorVertical === 'top' && anchorHorizontal === 'right') {
          return {
            top: '14%',
            right: '14%',
            transform: invisible
              ? 'scale(0) translate(50%, -50%)'
              : 'scale(1) translate(50%, -50%)',
            transformOrigin: '100% 0%',
          }
        }

        if (anchorVertical === 'top' && anchorHorizontal === 'left') {
          return {
            top: '14%',
            left: '14%',
            transform: invisible
              ? 'scale(0) translate(-50%, -50%)'
              : 'scale(1) translate(-50%, -50%)',
            transformOrigin: '0% 0%',
          }
        }

        if (anchorVertical === 'bottom' && anchorHorizontal === 'right') {
          return {
            bottom: '14%',
            right: '14%',
            transform: invisible ? 'scale(0) translate(50%, 50%)' : 'scale(1) translate(50%, 50%)',
            transformOrigin: '100% 100%',
          }
        }

        if (anchorVertical === 'bottom' && anchorHorizontal === 'left') {
          return {
            bottom: '14%',
            left: '14%',
            transform: invisible
              ? 'scale(0) translate(-50%, 50%)'
              : 'scale(1) translate(-50%, 50%)',
            transformOrigin: '0% 100%',
          }
        }
      }
    },
  }
}

export type BadgeVariant = 'dot' | 'standard'

export type BadgeIntent = Intent

export type BadgeProps = PropsOf<typeof elm.div> & {
  /** The value to render in the badge. */
  count?: number
  /** Max count to show. */
  max?: number
  /** If `true`, the badge will be invisible. */
  isInvisible?: boolean
  /** Controls whether the badge is hidden when `badgeContent` is zero. */
  showZero?: boolean
  /** The variant to use. */
  variant?: BadgeVariant
  /** The color of the badge. */
  intent?: BadgeIntent
  /** The vertical anchor position. */
  anchorVertical?: 'top' | 'bottom'
  /** The horizontal anchor position. */
  anchorHorizontal?: 'left' | 'right'
  /** Wrapped shape the badge should overlap. */
  overlap?: 'circle' | 'rectangle'
  /** Outline the badge. */
  outlined?: boolean
  /** Outline color. */
  outlineColor?: string
}

export const Badge = forwardRef<BadgeProps, 'span'>((props: BadgeProps, ref: any) => {
  const { children, className, variant = 'standard', count = 0, max = 99, ...rest } = props

  let displayValue = ''
  if (variant !== 'dot') {
    displayValue = count > max ? `${max}+` : count.toString()
  }

  const badgeProps = omit(rest, [
    'overlap',
    'anchorVertical',
    'anchorHorizontal',
    'isInvisible',
    'showZero',
    'outlined',
    'outlineColor',
    'intent',
  ])

  const styles = useBadgeStyle(props)

  return (
    <elm.span
      ref={ref}
      className={cx('Badge', className)}
      __css={{ ...styles.base }}
      {...badgeProps}
    >
      {children}
      <elm.span __css={{ ...styles.badge, ...styles.dot(), ...styles.anchors() }}>
        {displayValue}
      </elm.span>
    </elm.span>
  )
})
