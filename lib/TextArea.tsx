import React from 'react'
import { elm, forwardRef, PropsOf, SystemStyleObject } from './system'
import { cx, omit } from './util'
import { InputBaseOptions, InputBase } from './InputBase'
import { FormControlOptions, useFormControl } from './FormControl'

const useTextAreaStyles = () => ({
  base: {
    minHeight: '80px',
    lineHeight: 'tight',
  },
})

export type TextAreaOptions = InputBaseOptions

export type TextAreaProps = TextAreaOptions &
  FormControlOptions &
  Omit<PropsOf<typeof elm.textarea>, 'disabled' | 'required' | 'readOnly'>

export const TextArea = forwardRef<TextAreaProps, 'textarea'>((props, ref) => {
  const { className, rows, ...rest } = props
  const inputProps = useFormControl<HTMLTextAreaElement>(rest)

  const textAreaStyles = useTextAreaStyles()
  const omitted = ['h', 'minH', 'height', 'minHeight'] as (keyof SystemStyleObject)[]
  const baseStyle = rows ? omit(textAreaStyles.base, omitted) : textAreaStyles.base

  return (
    <InputBase
      as="textarea"
      ref={ref}
      className={cx('Textarea', className)}
      rows={rows}
      sx={{
        ...baseStyle,
      }}
      {...inputProps}
    />
  )
})
