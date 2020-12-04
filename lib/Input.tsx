import React from 'react'
import { forwardRef } from './system'
import { InputBaseProps, InputBase } from './InputBase'

export type InputProps = InputBaseProps

export const Input = forwardRef<InputProps, 'input'>((props: InputProps, ref) => {
  return <InputBase ref={ref} {...props} />
})
