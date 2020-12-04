import React from 'react'
import { css, elm, useTheme, SystemProps, PropsOf } from './system'
import { cx, mapResponsive } from './util'
import { IconName as Name } from './icons'
import * as Icons from './icons'

export type IconName = Name

export type IconBackdropShape = 'none' | 'circle' | 'square'

export interface IconOptions {
  /** The name of the icon you wish to render */
  icon?: IconName
  /** Icon size */
  size?: SystemProps['width']
  /** Sets the background shape of the icon */
  bgShape?: IconBackdropShape
}

export type IconProps = IconOptions & PropsOf<typeof elm.div>

export const Icon: React.FC<IconProps> = ({
  className,
  icon = 'HelpCircle',
  bgShape = 'none',
  size = '1rem',
  ...rest
}: IconProps) => {
  const theme = useTheme()

  const styles = {
    base: {
      'display': 'inline-flex',
      'color': 'inherit',
      'flexShrink': 0,
      'backfaceVisibility': 'hidden',

      '&:not(:root)': {
        overflow: 'hidden',
      },
    },

    wrapper: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    backdrop() {
      if (bgShape === 'none') return

      const backdropSize = mapResponsive(size, (value) => {
        const { width } = css({ width: value })(theme)
        return `calc(${width} * 2)`
      })

      const borderRadiusStyle = {
        none: 'none',
        circle: theme.radii.full,
        square: theme.radii.md,
      }

      return {
        width: backdropSize,
        height: backdropSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: borderRadiusStyle[bgShape],
      }
    },
  }

  const Icon = Icons[icon] ? Icons[icon] : Icons.HelpCircle
  const StyledIcon = elm(Icon)

  const iconSize = mapResponsive(size, (value) => {
    const { width } = css({ width: value })(theme)
    return width
  })

  return (
    <elm.div
      role="presentation"
      className={cx('Icon', className)}
      __css={{ ...styles.wrapper, ...styles.backdrop() }}
      {...rest}
    >
      <StyledIcon width={iconSize} height={iconSize} __css={styles.base} />
    </elm.div>
  )
}
