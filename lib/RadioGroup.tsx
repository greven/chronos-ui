import React from 'react'
import { elm, PropsOf, forwardRef, SystemProps } from './system'
import { cx, createContext } from './util'
import { useRadioGroup, UseRadioGroupProps, UseRadioGroupReturn } from './useRadioGroup'
import { InputSize } from './InputBase'

export type RadioGroupContext = Pick<UseRadioGroupReturn, 'onChange' | 'value' | 'name'>

const [RadioGroupProvider, useRadioGroupContext] = createContext<RadioGroupContext>({
  name: 'RadioGroupContext',
  strict: false,
})

export { useRadioGroupContext }

export interface RadioGroupProps
  extends UseRadioGroupProps,
    Omit<PropsOf<typeof elm.div>, 'onChange' | 'value' | 'defaultValue' | 'children'> {
  children: React.ReactNode
  iconColor?: SystemProps['color']
  inputSize?: InputSize
}

/**
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 */
export const RadioGroup = forwardRef<RadioGroupProps, 'div'>(function RadioGroup(props, ref) {
  const { children, className, inputSize, iconColor, ...rest } = props

  const { value, onChange, getRootProps, name, htmlProps } = useRadioGroup(rest)

  const group = React.useMemo(
    () => ({
      name,
      inputSize,
      iconColor,
      onChange,
      value,
    }),
    [inputSize, iconColor, name, onChange, value]
  )

  const groupProps = getRootProps(htmlProps, ref)
  const _className = cx('RadioGroup', className)

  return (
    <RadioGroupProvider value={group}>
      <elm.div {...groupProps} className={_className}>
        {children}
      </elm.div>
    </RadioGroupProvider>
  )
})
