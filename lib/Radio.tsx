import React from 'react'
import {
  elm,
  css,
  layoutPropNames,
  PropsOf,
  SystemProps,
  forwardRef,
  useColorModeValue,
  useTheme,
} from './system'
import { transparentize, getShadowOutline } from './theme'
import { cx, split, mapResponsive } from './util'
import { useRadioGroupContext } from './RadioGroup'
import { useRadio, UseRadioProps } from './useRadio'
import { InputSize } from './InputBase'

export function useRadioStyle(props: Partial<RadioProps>) {
  const theme = useTheme()

  const iconColor = mapResponsive(props?.iconColor ?? 'primary.500', (value) => {
    const { color } = css({ color: value })(theme)
    return color
  })

  const outlineOpacity = useColorModeValue(0.4, 0.2)
  const shadowOutline = (color: string) => getShadowOutline(theme, color, outlineOpacity)

  return {
    control: {
      color: iconColor,
      border: '1px solid',
      borderColor: useColorModeValue('inherit', 'whiteAlpha.300'),

      _checked: {
        borderColor: iconColor,
        backgroundColor: 'currentColor',
        backgroundSize: '100% 100%',
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(
          "data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E"
        )`,

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

        _focus: {
          boxShadow: shadowOutline('red.500'),

          _checked: {
            borderColor: transparentize('red.500', 0.4)(theme),
          },
        },
      },

      _disabled: {
        opacity: 4,
      },
    },

    label: {
      fontWeight: 'medium',
      userSelect: 'none',
      marginLeft: props?.spacing,

      _disabled: { opacity: 4 },
    },

    sizes: {
      xs: {
        control: { height: 2, width: 2 },
        label: { fontSize: 'xs', lineHeight: 'none' },
      },
      sm: {
        control: { height: 3, width: 3 },
        label: { fontSize: 'xs', lineHeight: 'none' },
      },
      md: {
        control: { height: 4, width: 4 },
        label: { fontSize: 'sm', lineHeight: 'none' },
      },
      lg: {
        control: { height: 5, width: 5 },
        label: { fontSize: 'base', lineHeight: 'none' },
      },
      xl: {
        control: { height: 6, width: 6 },
        label: { fontSize: 'lg', lineHeight: 'none' },
      },
    },
  }
}

const StyledContainer = elm('label', {
  baseStyle: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    verticalAlign: 'top',
    position: 'relative',
  },
})

const StyledControl = elm('div', {
  baseStyle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    verticalAlign: 'top',
    borderRadius: 'full',
    transitionProperty: 'default',
    transitionDuration: 'fast',
    transitionTimingFunction: 'in-out',
  },
})

type BaseControlProps = Omit<PropsOf<typeof elm.div>, 'onChange' | 'defaultChecked' | 'checked'>

export interface RadioProps extends UseRadioProps, BaseControlProps {
  /**
   * The color of the radio button.
   */
  iconColor?: SystemProps['color']
  /**
   * The size of the radio button.
   */
  inputSize?: InputSize
  /**
   * The spacing between the checkbox and it's label text
   * @default 0.75rem
   */
  spacing?: SystemProps['marginLeft']
}

/**
 * Radio component is used in forms when a user needs to select a single value from
 * several options.
 */
export const Radio = forwardRef<RadioProps, 'input'>(function Radio(props, ref) {
  const group = useRadioGroupContext()

  const ownProps = { ...group, ...props }

  const {
    children,
    className,
    inputSize = 'md',
    spacing = '0.75rem',
    iconColor,
    ...rest
  } = ownProps

  let isChecked = ownProps.isChecked || false
  if (group?.value && ownProps.value) {
    isChecked = group.value === ownProps.value
  }

  let onChange = ownProps.onChange
  if (group?.onChange && ownProps.value) {
    onChange = group.onChange
  }

  const name = props?.name ?? group?.name

  const { getInputProps, getCheckboxProps, getLabelProps, htmlProps } = useRadio({
    ...rest,
    isChecked,
    onChange,
    name,
  })

  const [layoutProps, otherProps] = split(htmlProps, layoutPropNames as any)
  const checkboxProps = getCheckboxProps(otherProps)
  const inputProps = getInputProps({}, ref)
  const labelProps = getLabelProps()

  const styles = useRadioStyle({ iconColor })

  const _className = cx('Radio', className)

  return (
    <StyledContainer className={_className} {...layoutProps}>
      <input className="RadioInput" {...inputProps} />
      <StyledControl
        className="RadioControl"
        __css={{ ...styles.control, ...styles.sizes[inputSize].control }}
        {...checkboxProps}
      />
      {children && (
        <elm.div
          className="RadioLabel"
          __css={{
            ml: spacing,
            ...styles.label,
            ...styles.sizes[inputSize].label,
          }}
          {...labelProps}
        >
          {children}
        </elm.div>
      )}
    </StyledContainer>
  )
})
