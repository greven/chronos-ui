import React, { Fragment } from 'react'
import { elm, forwardRef, PropsOf, SystemProps, SystemStyleObject } from './system'
import { Intent, Elevation, getIntentColorName, getShadowOutline, darken, lighten } from './theme'
import { cx, dataAttr } from './util'
import { useTheme, useColorModeValue } from './system'
import { useButtonGroup } from './ButtonGroup'
import { Icon, IconName } from './Icon'
import { Spinner } from './Spinner'

export function useButtonStyle(props?: ButtonOptions) {
  const theme = useTheme()

  const intent = props?.intent ?? 'dark'
  const isWide = props?.isWide ?? false
  const isUppercase = props?.isUppercase ?? false
  const elevation = props?.elevation ?? 'none'

  const intentColor = getIntentColorName(intent)
  const outlineOpacity = useColorModeValue(0.4, 0.1)
  const shadowOutline = (color: string) => getShadowOutline(theme, color, outlineOpacity)

  return {
    intentColor,

    button: {
      'display': 'inline-flex',
      'userSelect': 'none',
      'alignItems': 'center',
      'color': 'white',
      'border': '1px solid transparent',
      'justifyContent': 'center',
      'borderRadius': 'default',
      'letterSpacing': 'wide',
      'fontWeight': 'medium',
      'transitionProperty': 'colors',
      'transitionDuration': 'fast',
      'transitionTimingFunction': 'in-out',
      'width': isWide ? 'full' : undefined,
      'textTransform': isUppercase ? 'uppercase' : 'none',

      '_disabled': {
        opacity: 4,
        cursor: 'default',
        pointerEvents: 'none',
      },

      '& > *': {
        pointerEvents: 'none',
      },
    },

    size: {
      button: {
        xs: {
          height: 7,
          lineHeight: 4,
          py: 1.5,
          px: 2.5,
          fontSize: 'xs',
        },
        sm: {
          height: 8,
          lineHeight: 4,
          py: 2,
          px: 3,
          fontSize: 'sm',
        },
        md: {
          height: 9,
          lineHeight: 5,
          py: 2,
          px: 4,
          fontSize: 'sm',
        },
        lg: {
          height: 10,
          lineHeight: 6,
          py: 2,
          px: 4,
          fontSize: 'base',
        },
        xl: {
          height: 12,
          lineHeight: 6,
          py: 3,
          px: 6,
          fontSize: 'lg',
        },
      },

      icon: {
        xs: 3,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 5,
      },
    },

    variants: {
      solid: {
        boxShadow: !elevation ? 'sm' : elevation,
      },

      secondary: {
        color: `${intentColor}.700`,
        backgroundColor: `${intentColor}.100`,
        borderColor: 'transparent',

        _focus: {
          outline: 0,
          borderColor: `${intentColor}.300`,
          boxShadow: shadowOutline(`${intentColor}.300`),
        },

        _hover: {
          backgroundColor: `${intentColor}.50`,
        },

        _active: {
          backgroundColor: `${intentColor}.200`,
        },
      },

      outline: {
        color: `${intentColor}.700`,
        backgroundColor: 'transparent',
        border: '1px solid',
        borderColor: `${intentColor}.500`,

        _focus: {
          outline: 0,
          borderColor: `${intentColor}.300`,
          boxShadow: shadowOutline(`${intentColor}.300`),
        },

        _hover: {
          backgroundColor: `${intentColor}.50`,
        },

        _active: {
          backgroundColor: `${intentColor}.200`,
        },
      },

      ghost: {
        color: `${intentColor}.700`,
        backgroundColor: 'transparent',
        border: '1px solid',
        borderColor: `transparent`,

        _focus: {
          outline: 0,
          borderColor: `${intentColor}.300`,
          boxShadow: shadowOutline(`${intentColor}.300`),
        },

        _hover: {
          backgroundColor: `${intentColor}.100`,
        },

        _active: {
          backgroundColor: `${intentColor}.200`,
        },
      },

      link: {
        color: `${intentColor}.700`,
        backgroundColor: 'transparent',
        border: 'none',

        _focus: {
          outline: 0,
          boxShadow: shadowOutline(`${intentColor}.300`),
        },

        _hover: {
          color: `${intentColor}.900`,
          textDecoration: 'underline',
        },

        _active: {
          color: `${intentColor}.900`,
          textDecoration: 'underline',
        },
      },

      unstyled: {
        color: 'gray.400',
        border: 'none',
        boxShadow: 'none',
        background: 'none',

        _focus: {
          outline: 0,
          color: 'inherit',
          border: 'none',
          boxShadow: 'none',
        },

        _hover: {
          color: 'none',
          background: 'none',
        },

        _active: {
          color: 'none',
        },
      },
    },

    intents: {
      primary: {
        backgroundColor: 'primary.600',

        _focus: {
          outline: 0,
          borderColor: 'primary.700',
          boxShadow: shadowOutline('primary.300'),
          zIndex: 1,
        },

        _hover: {
          backgroundColor: 'primary.500',
        },

        _active: {
          backgroundColor: 'primary.700',
        },
      },

      secondary: {
        backgroundColor: 'secondary.600',

        _focus: {
          outline: 0,
          borderColor: 'secondary.700',
          boxShadow: shadowOutline('secondary.300'),
          zIndex: 1,
        },

        _hover: {
          backgroundColor: 'secondary.500',
        },

        _active: {
          backgroundColor: 'secondary.700',
        },
      },

      dark: {
        backgroundColor: 'dark.800',

        _focus: {
          outline: 0,
          borderColor: 'dark.900',
          boxShadow: shadowOutline('dark.400'),
          zIndex: 1,
        },

        _hover: {
          backgroundColor: 'dark.600',
        },

        _active: {
          backgroundColor: 'dark.700',
        },
      },

      light: {
        color: 'gray.700',
        backgroundColor: 'white',
        border: '1px solid',
        borderColor: 'gray.300',

        _focus: {
          outline: 0,
          borderColor: 'gray.300',
          boxShadow: shadowOutline('gray.300'),
          zIndex: 1,
        },

        _hover: {
          color: 'gray.500',
          backgroundColor: 'gray.50',
        },

        _active: {
          color: 'gray.800',
          backgroundColor: 'gray.50',
        },
      },

      info: {
        backgroundColor: 'info',

        _focus: {
          outline: 0,
          borderColor: darken('info', 7)(theme),
          boxShadow: shadowOutline('info'),
          zIndex: 1,
        },

        _hover: {
          backgroundColor: lighten('info', 7)(theme),
        },

        _active: {
          backgroundColor: darken('info', 7)(theme),
        },
      },

      warning: {
        backgroundColor: 'warning',

        _focus: {
          outline: 0,
          borderColor: darken('warning', 7)(theme),
          boxShadow: shadowOutline('warning'),
          zIndex: 1,
        },

        _hover: {
          backgroundColor: lighten('warning', 7)(theme),
        },

        _active: {
          backgroundColor: darken('warning', 7)(theme),
        },
      },

      success: {
        backgroundColor: 'success',

        _focus: {
          outline: 0,
          borderColor: darken('success', 7)(theme),
          boxShadow: shadowOutline('success'),
          zIndex: 1,
        },

        _hover: {
          backgroundColor: lighten('success', 7)(theme),
        },

        _active: {
          backgroundColor: darken('success', 7)(theme),
        },
      },

      danger: {
        backgroundColor: 'danger',

        _focus: {
          outline: 0,
          borderColor: darken('danger', 7)(theme),
          boxShadow: shadowOutline('danger'),
          zIndex: 1,
        },

        _hover: {
          backgroundColor: lighten('danger', 7)(theme),
        },

        _active: {
          backgroundColor: darken('danger', 7)(theme),
        },
      },
    },
  }
}

export type ButtonVariant = 'solid' | 'secondary' | 'outline' | 'ghost' | 'link' | 'unstyled'

export type ButtonIntent = Intent

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonElevation = Elevation

export interface ButtonOptions {
  /** The html button type to use. */
  type?: 'button' | 'reset' | 'submit'
  /** The size of the button. */
  size?: ButtonSize
  /** Controls the basic button style. */
  variant?: ButtonVariant
  /** Controls the colour of the button. */
  intent?: ButtonIntent
  /** The name of the icon to appear to the left of the button text. */
  leftIcon?: IconName
  /** The name of the icon to appear to the right of the button text. */
  rightIcon?: IconName
  /** Override the default icon size. */
  iconSize?: SystemProps['width']
  /** The space between the button icon and label. */
  iconSpacing?: SystemProps['marginRight']
  /** Style object for the button icons. */
  iconStyle?: SystemStyleObject
  /** If `true` it floats the icon to the left/right. */
  floatIcon?: boolean
  /** If `true`, the button will be styled in it's active state. */
  isActive?: boolean
  /** Sets the button as disabled. */
  isDisabled?: boolean
  /** Show a loading indicator. */
  isLoading?: boolean
  /** Set a custom spinner element */
  spinner?: React.ReactElement
  /** Shows a loading text when isLoading is true. */
  loadingText?: string
  /** The button elevation (shadow). */
  elevation?: ButtonElevation
  /** If true, the button will be displayed as a block element instead of inline. */
  isWide?: boolean
  /** If true, the button text will be in all caps. */
  isUppercase?: boolean
  /** Hyperlink for when button is rendered as an anchor link */
  href?: string
}

export type ButtonProps = ButtonOptions & PropsOf<typeof elm.button>

export const Button = forwardRef<ButtonProps, 'button'>((props: ButtonProps, ref: any) => {
  const group = useButtonGroup()

  const {
    children,
    className,
    as = 'button',
    type = 'button',
    size = group?.size ? group?.size : 'md',
    variant = group?.variant ? group?.variant : 'solid',
    intent = group?.intent ? group?.intent : 'dark',
    elevation,
    isActive,
    isWide = group?.isWide ? group?.isWide : false,
    isLoading,
    isUppercase,
    isDisabled = group?.isDisabled,
    leftIcon,
    rightIcon,
    iconSize,
    iconSpacing = '2.5',
    iconStyle,
    floatIcon,
    spinner,
    loadingText,
    href,
    onClick,
    ...rest
  } = props

  const styleProps = { size, variant, intent, elevation, isWide, isUppercase }
  const styles = useButtonStyle({ ...props, ...styleProps })
  const intentColor = styles.intentColor

  const buttonStyle = {
    ...styles.button,
    ...styles.intents[intent],
    ...styles.variants[variant],
    ...styles.size.button[size],
  }

  return (
    <elm.button
      as={as}
      ref={ref}
      role="button"
      type={type}
      href={as === 'a' && isDisabled ? undefined : href}
      className={cx('Button', className)}
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled}
      data-active={dataAttr(isActive)}
      data-loading={dataAttr(isLoading)}
      tabIndex={isDisabled ? undefined : 0}
      onClick={onClick}
      __css={buttonStyle}
      {...rest}
    >
      {isLoading && (
        <Fragment>
          {spinner ? (
            spinner
          ) : (
            <Spinner
              delay={50}
              size={styles.size.icon[size]}
              color={variant === 'solid' ? `${intentColor}.100` : `${intentColor}.600`}
              emptyColor={variant === 'solid' ? `${intentColor}.700` : `${intentColor}.300`}
            />
          )}
          {loadingText && <elm.span ml={3}>{loadingText}</elm.span>}
        </Fragment>
      )}

      {!isLoading && (
        <Fragment>
          {leftIcon && (
            <ButtonIcon
              icon={leftIcon}
              size={iconSize ?? styles.size.icon[size]}
              mr={floatIcon ? 0 : iconSpacing}
              sx={iconStyle}
            />
          )}
          <elm.div
            __css={{
              display: floatIcon ? 'inline-block' : 'flex',
              alignItems: 'center',
              flex: floatIcon ? 1 : undefined,
              ml: floatIcon && leftIcon ? -styles.size.icon[size] : 0,
              mr: floatIcon && rightIcon ? -styles.size.icon[size] : 0,
            }}
          >
            {children}
          </elm.div>
          {rightIcon && (
            <ButtonIcon
              icon={rightIcon}
              size={iconSize ?? styles.size.icon[size]}
              ml={floatIcon ? 0 : iconSpacing}
              sx={iconStyle}
            />
          )}
        </Fragment>
      )}
    </elm.button>
  )
})

export type ButtonIconProps = PropsOf<typeof elm.div> & {
  icon: IconName
  size: SystemProps['width']
}

export function ButtonIcon({ icon, size, ...rest }: ButtonIconProps) {
  return <Icon icon={icon} size={size} {...rest}></Icon>
}
