import React from 'react'
import { elm, css, forwardRef, PropsOf, SystemProps, useTheme, useColorModeValue } from './system'
import { cx, mapResponsive, Omit } from './util'
import { transparentize, getShadowOutline } from './theme'
import { useCheckboxGroupContext } from './CheckboxGroup'
import { useCheckbox, UseCheckboxProps } from './useCheckbox'
import { InputSize } from './InputBase'

export function useCheckboxStyle(props: Partial<CheckboxProps>) {
  const theme = useTheme()

  const iconColor = mapResponsive(props?.iconColor ?? 'primary.500', (value) => {
    const { color } = css({ color: value })(theme)
    return color
  })

  const outlineOpacity = useColorModeValue(0.4, 0.2)
  const shadowOutline = (color: string) => getShadowOutline(theme, color, outlineOpacity)

  return {
    control: {
      color: 'white',
      border: '1px solid',
      borderColor: useColorModeValue('inherit', 'whiteAlpha.300'),
      borderRadius: 'default',

      _checked: {
        backgroundColor: iconColor,
        borderColor: iconColor,

        _hover: {
          backgroundColor: transparentize(iconColor, 0.8)(theme),
        },
      },

      _focus: {
        borderColor: iconColor,
        boxShadow: shadowOutline(iconColor),
      },

      _invalid: {
        borderColor: 'red.500',

        _checked: {
          backgroundColor: 'red.500',
        },

        _hover: {
          backgroundColor: transparentize('red.500', 0.8)(theme),
        },

        _focus: {
          boxShadow: shadowOutline('red.500'),

          _checked: {
            borderColor: transparentize('red.500', 0.4)(theme),
          },
        },
      },

      _indeterminate: {
        backgroundColor: iconColor,
        borderColor: iconColor,

        _hover: {
          backgroundColor: transparentize(iconColor, 0.8)(theme),
        },
      },

      _disabled: {
        opacity: 4,
        cursor: 'not-allowed',
      },
    },

    container: {
      alignItems: props?.helperText ? 'flex-start' : 'center',
    },

    label: {
      fontWeight: 'medium',
      touchAction: 'none',
      userSelect: 'none',
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'flex-start',

      _disabled: { opacity: 4 },
    },

    sizes: {
      xs: {
        control: { height: 2, width: 2 },
        label: { fontSize: 'xs', lineHeight: 'none' },
        icon: { width: '0.75rem', height: '0.75rem' },
      },
      sm: {
        control: { height: 3, width: 3 },
        label: { fontSize: 'xs', lineHeight: 'none' },
        icon: { width: '0.875rem', height: '0.875rem' },
      },
      md: {
        control: { height: 4, width: 4 },
        label: { fontSize: 'sm', lineHeight: 'none' },
        icon: { width: '1rem', height: '1rem' },
      },
      lg: {
        control: { height: 5, width: 5 },
        label: { fontSize: 'base', lineHeight: 'none' },
        icon: { width: '1.25rem', height: '1.25rem' },
      },
      xl: {
        control: { height: 6, width: 6 },
        label: { fontSize: 'lg', lineHeight: 'none' },
        icon: { width: '1.5rem', height: '1.5rem' },
      },
    },
  }
}

const StyledContainer = elm('label', {
  baseStyle: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'flex-start',
    verticalAlign: 'top',
    position: 'relative',
    _disabled: {
      cursor: 'not-allowed',
    },
  },
})

const StyledControl = elm('div', {
  baseStyle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'top',
    userSelect: 'none',
    touchAction: 'none',
    flexShrink: 0,
    transitionProperty: 'default',
    transitionDuration: 'fast',
    transitionTimingFunction: 'in-out',
  },
})

type Omitted = 'size' | 'checked' | 'defaultChecked' | 'onChange' | 'onBlur' | 'value'

type StyledControlProps = Omit<PropsOf<typeof StyledControl>, Omitted>

type BaseCheckboxProps = Pick<PropsOf<'input'>, 'onBlur' | 'checked' | 'defaultChecked'>

export interface CheckboxProps extends StyledControlProps, BaseCheckboxProps, UseCheckboxProps {
  /**
   * The assistive text to be displayed that provides additional guidance to users
   */
  helperText?: string
  /**
   * The color of the check icon.
   */
  iconColor?: SystemProps['color']
  /**
   * The size of the check icon.
   */
  inputSize?: InputSize
  /**
   * The spacing between the checkbox and it's label text
   * @default 0.75rem
   */
  spacing?: SystemProps['marginLeft']
}

/**
 * Checkbox
 *
 * React component used in forms when a user needs to select
 * multiple values from several options.
 *
 */
export const Checkbox = forwardRef<CheckboxProps, 'input'>(function Checkbox(props, ref: any) {
  const group = useCheckboxGroupContext()

  const ownProps = { ...group, ...props }

  const {
    children,
    className,
    inputSize = 'md',
    iconColor = 'primary.500',
    spacing = '0.75rem',
    helperText,
    ...rest
  } = ownProps

  let isChecked = ownProps.isChecked
  if (group?.value && ownProps.value) {
    isChecked = group.value.includes(ownProps.value)
  }

  let onChange = ownProps.onChange
  if (group?.onChange && ownProps.value) {
    onChange = group.onChange
  }

  // @ts-ignore
  const { state, getInputProps, getCheckboxProps, getLabelProps, htmlProps } = useCheckbox({
    ...rest,
    isChecked,
    onChange,
  })

  const inputProps = getInputProps({}, ref)
  const labelProps = getLabelProps()
  const checkboxProps = getCheckboxProps()

  const styles = useCheckboxStyle({ inputSize, iconColor, spacing })

  const iconStyles = {
    ...styles.sizes[inputSize].icon,
    opacity: state.isChecked || state.isIndeterminate ? 1 : 0,
    transform: state.isChecked || state.isIndeterminate ? 'scale(1)' : 'scale(0.85)',
    transitionProperty: 'transform',
    transitionDuration: 'fast',
  }

  const _className = cx('Checkbox', className)

  return (
    <StyledContainer
      data-disabled={state.isDisabled}
      className={_className}
      __css={styles.container}
      {...htmlProps}
    >
      <input className="CheckboxInput" {...inputProps} />
      <StyledControl
        className="CheckboxControl"
        __css={{ ...styles.control, ...styles.sizes[inputSize].control }}
        {...checkboxProps}
      >
        <CheckboxIcon
          isChecked={state.isChecked}
          isIndeterminate={state.isIndeterminate}
          __css={iconStyles}
        />
      </StyledControl>
      {children && (
        <elm.div
          className="CheckboxLabel"
          {...labelProps}
          __css={{
            ml: spacing,
            ...styles.label,
            ...styles.sizes[inputSize].label,
          }}
        >
          {children}
          {helperText && (
            <elm.div
              className="CheckboxLabelHelperText"
              __css={{
                color: 'gray.500',
                fontWeight: 'normal',
                pointerEvents: 'none',
                marginTop: 2,
              }}
            >
              {helperText}
            </elm.div>
          )}
        </elm.div>
      )}
    </StyledContainer>
  )
})

export type CheckboxIconProps = Omit<PropsOf<typeof elm.svg>, 'fill'> & {
  isChecked?: boolean
  isIndeterminate?: boolean
}

/**
 * Used as the visual indicator for the checkbox.
 */
export const CheckboxIcon = (props: CheckboxIconProps) => {
  const { isIndeterminate, isChecked, ...rest } = props
  return (
    <>
      {isIndeterminate && <MinusIcon {...rest} />}
      {isChecked && <CheckIcon {...rest} />}
    </>
  )
}

const CheckIcon = (props: CheckboxIconProps) => (
  <elm.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    focusable="false"
    {...props}
  >
    <path d="M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z" />
  </elm.svg>
)

const MinusIcon = (props: CheckboxIconProps) => (
  <elm.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    focusable="false"
    {...props}
  >
    <line x1="5" y1="8" x2="11" y2="8"></line>
  </elm.svg>
)
