import React, { useMemo } from 'react'
import { elm, forwardRef, PropsOf, SystemProps, SystemStyleObject } from './system'
import { cx, createContext } from './util'
import { ButtonSize, ButtonVariant, ButtonIntent, ButtonElevation } from './Button'
// import { useTheme, useColorModeValue } from './system'

export interface ButtonGroupOptions {
  component?: React.ElementType<any>
  /** The size of the buttons. */
  size?: ButtonSize
  /** Controls the basic buttons style. */
  variant?: ButtonVariant
  /** Controls the colour of the buttons. */
  intent?: ButtonIntent
  /** Sets the button group and children as disabled. */
  isDisabled?: boolean
  /** If true, the button group will take the full with of the parent. */
  isWide?: boolean
  /** The group orientation (layout flow direction). */
  orientation?: 'horizontal' | 'vertical'
  /** The button group elevation (shadow). */
  elevation?: ButtonElevation
  /** If `true`, the borderRadius of button that are direct children
   * will be altered to look flushed together */
  isAttached?: boolean
  /** The spacing between the buttons
   * @default '0.5rem' */
  spacing?: SystemProps['marginRight']
}

type ButtonGroupContext = {
  size?: ButtonSize
  variant?: ButtonVariant
  intent?: ButtonIntent
  elevation?: ButtonElevation
  isDisabled?: boolean
  isWide?: boolean
}

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupContext>({
  strict: false,
  name: 'ButtonGroupContext',
})

export { useButtonGroup }

export type ButtonGroupProps = ButtonGroupOptions & PropsOf<typeof elm.div>

export const ButtonGroup = forwardRef<ButtonGroupProps, 'div'>(
  (props: ButtonGroupProps, ref: any) => {
    const {
      component: Component = 'div',
      className,
      size = 'md',
      variant = 'solid',
      intent,
      spacing = 2,
      isDisabled = false,
      isAttached,
      isWide = false,
      elevation = 'none',
      orientation = 'horizontal',
      ...rest
    } = props

    const context = useMemo(() => ({ size, variant, intent, elevation, isDisabled, isWide }), [
      size,
      variant,
      intent,
      elevation,
      isDisabled,
      isWide,
    ])

    let groupStyles: SystemStyleObject = {
      width: isWide ? 'full' : undefined,
      display: 'inline-flex',
      boxShadow: isAttached ? elevation : 'none',
      flexDirection: 'row',
      borderRadius: 'md',
    }

    if (isAttached) {
      groupStyles = {
        ...groupStyles,
        '> *:first-of-type:not(:last-of-type)': { borderRightRadius: 0 },
        '> *:not(:first-of-type):not(:last-of-type)': { borderRadius: 0 },
        '> *:not(:first-of-type):last-of-type': { borderLeftRadius: 0 },
      }
    } else {
      groupStyles = {
        ...groupStyles,
        '& > *:not(style) ~ *:not(style)': { marginLeft: spacing },
      }
    }

    if (isAttached && orientation === 'horizontal') {
      groupStyles = {
        ...groupStyles,
        '> *:not(:first-child)': { marginLeft: '-1px' },
      }
    }

    return (
      <ButtonGroupProvider value={context}>
        <elm.div
          as={Component}
          ref={ref}
          role="group"
          className={cx('Button__group', className)}
          __css={groupStyles}
          {...rest}
        />
      </ButtonGroupProvider>
    )
  }
)
