import React, { useMemo, ReactNode } from 'react'
import { SystemProps } from './system'
import { createContext } from './util'
import { useCheckboxGroup, UseCheckboxGroupProps, UseCheckboxGroupReturn } from './useCheckboxGroup'
import { CheckboxProps } from './Checkbox'
import { InputSize } from './InputBase'

export interface CheckboxGroupProps extends UseCheckboxGroupProps {
  children?: ReactNode
  iconColor?: SystemProps['color']
  inputSize?: InputSize
}

export type CheckboxGroupContext = Pick<UseCheckboxGroupReturn, 'onChange' | 'value'> &
  Omit<CheckboxProps, 'helperText'>

const [CheckboxGroupProvider, useCheckboxGroupContext] = createContext<CheckboxGroupContext>({
  name: 'CheckboxGroupContext',
  strict: false,
})

export { useCheckboxGroupContext }

/**
 * Used for multiple checkboxes which are bound in one group,
 * and it indicates whether one or more options are selected.
 *
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const { children, inputSize, iconColor } = props
  const { value, onChange } = useCheckboxGroup(props)

  const group = useMemo(
    () => ({
      inputSize,
      iconColor,
      onChange,
      value,
    }),
    [inputSize, iconColor, onChange, value]
  )

  // @ts-ignore
  return <CheckboxGroupProvider value={group}>{children}</CheckboxGroupProvider>
}
