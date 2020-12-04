import React from 'react'
import { elm, forwardRef, PropsOf, ElementSize } from './system'
import { cx } from './util'
import { Hues, lighten } from './theme'
import { Icon, IconName } from './Icon'
import { VisuallyHidden } from './VisuallyHidden'

const useTagStyle = (props?: TagOptions) => {
  const variantColor = props?.variantColor ?? 'primary'
  const color = props?.variant === 'solid' ? `${variantColor}.50` : `${variantColor}.800`
  const bg = props?.variant === 'solid' ? `${variantColor}.500` : `${variantColor}.100`

  return {
    base: {
      display: 'inline-flex',
      flexShrink: 0,
      alignItems: 'center',
      borderRadius: 'default',
      fontWeight: 'medium',
      opacity: props?.disabled ? 0.5 : 1,
      transitionProperty: 'default',
      transitionDuration: 'fast',
      transitionTimingFunction: 'in-out',
    },

    button: {
      _focus: {
        outline: 'none',
      },

      _hover: {
        backgroundColor: lighten(bg, 5),
      },

      _active: {
        backgroundColor: lighten(bg, 10),
        boxShadow: 'default',
      },
    },

    size: {
      tag: {
        xs: {
          height: '16px',
          fontSize: 'xs',
          lineHeight: 4,
          px: 1.5,
        },
        sm: {
          height: '20px',
          fontSize: 'xs',
          lineHeight: 4,
          px: 1.5,
        },
        md: {
          height: '22px',
          fontSize: 'xs',
          lineHeight: 4,
          px: 2,
        },
        lg: {
          height: '24px',
          fontSize: 'sm',
          lineHeight: 4,
          px: 2,
        },
        xl: {
          height: '32px',
          fontSize: 'sm',
          lineHeight: 4,
          px: 2.5,
        },
      },

      icon: {
        xs: 3,
        sm: 3,
        md: 3,
        lg: 3.5,
        xl: 4,
      },
    },

    variants: {
      simple: {
        border: 'none',
        backgroundColor: bg,
        color: color,
      },

      solid: {
        border: 'none',
        backgroundColor: bg,
        color: color,
      },

      outlined: {
        border: '1px solid',
        backgroundColor: bg,
        color: color,
      },
    },
  }
}

export type TagVariant = 'simple' | 'solid' | 'outlined'

export type TagSize = ElementSize

export type TagVariantColor = keyof Hues

export interface TagOptions {
  variant?: TagVariant
  variantColor?: TagVariantColor
  /** The tag size. Default is small (sm). */
  size?: TagSize
  /** The icon to display before the tag children content. */
  leftIcon?: IconName
  /** The icon to display after the tag children content. */
  rightIcon?: IconName
  /** Sets the tag as disabled. */
  disabled?: boolean
  /** If an onClick handler is provided the tag will be rendered
   * as a button.
   */
  onClick?: () => void
  /** If an onClose handler is provided the tag close button will
   * be displayed. Usually used to remove the tag as part of
   * another container, like an input of tags / tags. */
  onClose?: () => void
}

export type TagProps = TagOptions & PropsOf<typeof elm.span>

export const Tag = forwardRef<TagProps, 'span'>((props: TagProps, ref: any) => {
  const {
    children,
    className,
    as: Component = 'span',
    size = 'md',
    variant = 'simple',
    variantColor = 'primary',
    leftIcon,
    rightIcon,
    onClick,
    onClose,
    ...rest
  } = props

  const component = onClick ? 'button' : Component

  const styles = useTagStyle(props)
  const tagStyle = {
    ...styles.base,
    ...styles.size.tag[size],
    ...styles.variants[variant],
    ...(component === 'button' && styles.button),
  }

  return (
    <elm.span
      as={component}
      ref={ref}
      className={cx('Tag', className)}
      onClick={onClick}
      __css={tagStyle}
      {...rest}
    >
      {leftIcon && <Icon icon={leftIcon} mr="1.5" size={styles.size.icon[size]} />}
      {children}
      {rightIcon && <Icon icon={rightIcon} ml="1.5" size={styles.size.icon[size]} />}
      {onClose && (
        <TagCloseButton
          size={size}
          variant={variant}
          variantColor={variantColor}
          disabled={props.disabled}
          rounded={props.rounded}
          onClose={onClose}
        />
      )}
    </elm.span>
  )
})

// Tag Close Button

export type TagCloseButtonProps = Pick<
  TagOptions,
  'variant' | 'variantColor' | 'size' | 'disabled' | 'onClose'
> &
  PropsOf<typeof elm.button>

export const TagCloseButton: React.FC<TagCloseButtonProps> = ({
  size = 'md',
  variant = 'simple',
  variantColor,
  disabled,
  onClose,
  ...rest
}) => {
  const styles = {
    base: {
      color: 'inherit',
      fontSize: 'base',
      borderRadius: 'sm',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      opacity: 0.6,
      transitionProperty: 'default',
      transitionDuration: 'fast',
      transitionTimingFunction: 'in-out',

      _hover: {
        opacity: 1,
      },

      _focus: {
        outline: 'none',
      },

      _disabled: {
        cursor: 'default',
      },
    },

    size: {
      button: {
        xs: {
          width: 3,
          height: 3,
          marginLeft: 1.5,
          marginRight: 0,
        },

        sm: {
          width: 3,
          height: 3,
          marginLeft: 1.5,
          marginRight: 0,
        },

        md: {
          width: 4,
          height: 4,
          marginLeft: 1.5,
          marginRight: -0.5,
        },

        lg: {
          width: 4,
          height: 4,
          marginLeft: 1.5,
          marginRight: -0.5,
        },

        xl: {
          width: 4,
          height: 4,
          marginLeft: 1.5,
          marginRight: -0.5,
        },
      },

      icon: {
        xs: {
          width: '0.45rem',
          height: '0.45rem',
        },

        sm: {
          width: '0.45rem',
          height: '0.45rem',
        },

        md: {
          width: '0.5rem',
          height: '0.5rem',
        },

        lg: {
          width: '0.5rem',
          height: '0.5rem',
        },

        xl: {
          width: '0.5rem',
          height: '0.5rem',
        },
      },
    },

    variants: {
      simple: {
        color: `${variantColor}.800`,

        _hover: {
          backgroundColor: `${variantColor}.300`,
        },
      },

      solid: {
        color: `${variantColor}.500`,
        backgroundColor: `${variantColor}.200`,
      },

      outlined: {
        color: `${variantColor}.800`,
        backgroundColor: `${variantColor}.200`,
      },
    },
  }

  return (
    <elm.button
      className="TagCloseButton"
      __css={{ ...styles.base, ...styles.size.button[size], ...styles.variants[variant] }}
      disabled={disabled}
      onClick={onClose}
      {...rest}
    >
      <VisuallyHidden>Tag Close Button</VisuallyHidden>
      <svg stroke="currentColor" fill="none" viewBox="0 0 8 8" style={styles.size.icon[size]}>
        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </elm.button>
  )
}
