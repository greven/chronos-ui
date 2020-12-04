import React from 'react'
import {
  styled,
  forwardRef,
  PropsOf,
  SystemStyleObject,
  useTheme,
  useColorModeValue,
} from './system'
import { cx, omit } from './util'
import { getShadowOutline, getColor, getThemeColorName, transparentize } from './theme'
import { FormControlOptions, useFormControl } from './FormControl'
import { useInputGroup } from './InputGroup'

export function useBaseInputStyle(props?: InputBaseOptions) {
  const theme = useTheme()
  const outlineOpacity = useColorModeValue(0.2, 0.2)

  const focusBorderColor = props?.focusBorderColor ?? 'blue.500'
  const errorBorderColor = props?.errorBorderColor ?? 'red.500'
  const focusColor = getThemeColorName(focusBorderColor)
  const errorColor = getThemeColorName(errorBorderColor)

  const shadowOutline = (color: string) => getShadowOutline(theme, color, outlineOpacity, 2, 4)

  return {
    base: {
      width: '100%',
      position: 'relative',
      display: 'block',
      border: '1px solid',
      borderColor: 'inherit',
      backgroundColor: useColorModeValue('surface.light', 'whiteAlpha.300'),
      lineHeight: 'base',
      paddingY: 2,
      paddingX: 3,

      _placeholder: {
        color: 'gray.500',
        opacity: 8,
      },

      _hover: {
        borderColor: 'gray.800',
        transitionProperty: 'default',
        transitionDuration: 'normal',
        transitionTimingFunction: 'in-out',
      },

      _focus: {
        'outline': 'none',
        'borderColor': focusBorderColor,
        'boxShadow': shadowOutline(focusBorderColor),
        '::placeholder': {
          opacity: 4,
        },
        'transitionProperty': 'default',
        'transitionDuration': 'normal',
        'transitionTimingFunction': 'in-out',
      },

      _active: {
        background: useColorModeValue(
          getColor(theme, `${focusColor}.50`, 'blue.50'),
          'whiteAlpha.200'
        ),
        transitionProperty: 'default',
        transitionDuration: 'normal',
        transitionTimingFunction: 'in-out',
      },

      _disabled: {
        opacity: 4,
        background: 'gray.100',
        cursor: 'not-allowed',
      },
    },

    size: {
      xs: {
        height: 6,
        fontSize: 'xs',
        paddingX: 2.5,
      },
      sm: {
        height: 8,
        fontSize: 'sm',
        paddingX: 3,
      },
      md: {
        height: 10,
        fontSize: 'base',
        paddingX: 3,
      },
      lg: {
        height: 12,
        fontSize: 'lg',
        paddingX: 3.5,
      },
      xl: {
        height: 14,
        fontSize: 'xl',
        paddingX: 4,
      },
    },

    error: {
      _invalid: {
        color: useColorModeValue(
          getColor(theme, `${errorColor}.800`, 'red.800'),
          getColor(theme, `${errorColor}.300`, 'red.300')
        ),
        borderColor: errorBorderColor,

        _placeholder: {
          color: errorBorderColor,
        },

        _hover: {
          borderColor: errorBorderColor,
        },

        _focus: {
          borderColor: errorBorderColor,
          boxShadow: shadowOutline(errorBorderColor),
        },

        _active: {
          background: useColorModeValue(
            getColor(theme, `${errorColor}.50`, 'red.50'),
            transparentize(getColor(theme, `${errorColor}.900`, 'red.900'), 0.25)(theme)
          ),
        },
      },
    },

    readOnly: {
      _readOnly: {
        borderColor: 'inherit',
        boxShadow: 'none !important',
        userSelect: 'all',

        _active: {
          background: 'none',
        },
      },
    },

    variants: {
      standard: {
        borderRadius: 'md',
        boxShadow: 'sm',

        _focus: {
          'outline': 'none',
          'borderColor': focusBorderColor,
          'boxShadow': shadowOutline(focusBorderColor),
          '::placeholder': {
            opacity: 4,
          },
          'transitionProperty': 'default',
          'transitionDuration': 'normal',
          'transitionTimingFunction': 'in-out',
        },
      },

      modern: {
        // TODO: Finish modern input variant
        borderRadius: 'lg',
        boxShadow: 'sm',

        _focus: {
          'outline': 'none',
          'borderColor': focusBorderColor,
          'boxShadow': shadowOutline(focusBorderColor),
          '::placeholder': {
            opacity: 4,
          },
          'transitionProperty': 'default',
          'transitionDuration': 'normal',
          'transitionTimingFunction': 'in-out',
        },
      },

      flushed: {
        height: 'auto',
        paddingX: 1,
        paddingY: 1.5,
        lineHeight: 'tight',
        background: 'none',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottomWidth: '2px',

        _focus: {
          'outline': 'none',
          'boxShadow': 'none',
          '::placeholder': {
            opacity: 4,
          },
          'borderColor': focusBorderColor,
          'transitionProperty': 'default',
          'transitionDuration': 'normal',
          'transitionTimingFunction': 'in-out',
        },

        _active: {
          background: 'none',
        },
      },

      unstyled: {
        background: 'none',
        border: 'none',
        boxShadow: 'none',
        padding: 0,

        _hover: {
          borderColor: 'none',
        },

        _focus: {
          'outline': 'none',
          'boxShadow': 'none',
          '::placeholder': {
            opacity: 4,
          },
        },

        _active: {
          background: 'none',
        },
      },
    },

    leftElement: {
      xs: { paddingLeft: 8 },
      sm: { paddingLeft: 9 },
      md: { paddingLeft: 10 },
      lg: { paddingLeft: 11 },
      xl: { paddingLeft: 12 },
    },

    rightElement: {
      xs: { paddingRight: 8 },
      sm: { paddingRight: 9 },
      md: { paddingRight: 10 },
      lg: { paddingRight: 11 },
      xl: { paddingRight: 12 },
    },

    leftAddon: {
      borderLeftRadius: 0,
    },

    rightAddon: {
      borderRightRadius: 0,
    },
  }
}

const Input = styled('input', {
  baseStyle: {
    boxSizing: 'border-box',
    WebkitAppearance: 'none',
    WebkitFontSmoothing: 'antialiased',
    WebkitTapHighlightColor: 'transparent',
    appearance: 'none',
    backgroundClip: 'padding-box',
    touchAction: 'manipulation',
    transitionDuration: 'fast',
    transitionProperty: 'default',
    transitionTimingFunction: 'in-out',
  },
})

export type InputVariant = 'standard' | 'modern' | 'flushed' | 'unstyled'

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type InputBaseOptions = {
  /** The variant of the input: standard, modern, flushed or unstyled. */
  variant?: InputVariant
  /**
   * The border color when the input is focused. Use color keys in `theme.colors`.
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the input is invalid. Use color keys in `theme.colors`.
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
  /** The size of the input element. */
  inputSize?: InputSize
}

type Omitted = 'disabled' | 'required' | 'readOnly' | 'size'

export type InputBaseProps = InputBaseOptions &
  FormControlOptions &
  Omit<PropsOf<typeof Input>, Omitted>

export const InputBase = forwardRef<InputBaseProps, 'input'>((props: InputBaseProps, ref) => {
  const { inputSize } = props

  const inputProps = useFormControl<HTMLInputElement>(props)
  const group = useInputGroup()

  const styles = useBaseInputStyle(props)

  const size = inputSize ?? group?.inputSize ?? 'md'
  const textAreaOmitted = ['h', 'minH', 'height', 'minHeight'] as (keyof SystemStyleObject)[]
  const sizeStyles =
    props?.as === 'textarea' ? omit(styles.size[size], textAreaOmitted) : styles.size[size]

  const variant = props.variant ?? group?.variant ?? 'standard'

  const inputStyle = {
    ...styles.base,
    ...styles.readOnly,
    ...styles.error,
    ...sizeStyles,
    ...styles.variants[variant],
    ...(group?.leftElement?.isMounted && styles.leftElement[size]),
    ...(group?.rightElement?.isMounted && styles.rightElement[size]),
    ...(group?.leftAddon?.isMounted && styles.leftAddon),
    ...(group?.rightAddon?.isMounted && styles.rightAddon),
  }

  const _className = cx('Input', props.className)

  return <Input ref={ref} className={_className} __css={inputStyle} {...inputProps} />
})
