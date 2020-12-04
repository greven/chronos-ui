import React from 'react'
import { elm, forwardRef, PropsOf } from './system'
import { cx, omit } from './util'
import { useSafeLayoutEffect } from './hooks'
import { InputBaseOptions, useBaseInputStyle } from './InputBase'
import { useInputGroup } from './InputGroup'
import { IconButton, IconButtonProps } from './IconButton'
import { useFormControlContext } from './FormControl'

export type InputElementProps = PropsOf<typeof elm.div> &
  InputBaseOptions & {
    placement?: 'left' | 'right'
  }

const StyledElement = elm('div', {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
})

const InputElement = forwardRef<InputElementProps, 'div'>((props: InputElementProps, ref: any) => {
  const { placement = 'left', ...rest } = props
  const { inputSize, errorBorderColor } = useInputGroup()
  const field = useFormControlContext()

  const { size: sizeStyle } = useBaseInputStyle()

  const elementProps = omit(rest, ['inputSize', 'errorBorderColor', 'focusBorderColor'])

  const style = {
    ...{
      [placement]: '0',
      color: 'gray.500',
    },
    ...(field?.isDisabled && { opacity: 4 }),
    ...(field?.isInvalid && {
      color: errorBorderColor ?? 'red.500',
    }),
    ...sizeStyle[inputSize],
  }

  return <StyledElement ref={ref} __css={style} {...elementProps} />
})

export const InputLeftElement = forwardRef<InputElementProps, 'div'>(
  (props: InputElementProps, ref: any) => {
    const { leftElement } = useInputGroup()

    useSafeLayoutEffect(() => {
      leftElement?.mount()
      return () => leftElement?.unmount()
    }, [])

    return (
      <InputElement
        ref={ref}
        className={cx('InputLeftElement', props.className)}
        placement="left"
        {...props}
      />
    )
  }
)

export const InputRightElement = forwardRef<InputElementProps, 'div'>(
  (props: InputElementProps, ref: any) => {
    const { rightElement } = useInputGroup()

    useSafeLayoutEffect(() => {
      rightElement?.mount()
      return () => rightElement?.unmount()
    }, [])

    return (
      <InputElement
        ref={ref}
        className={cx('InputRightElement', props.className)}
        placement="right"
        {...props}
      />
    )
  }
)

export type InputButtonProps = IconButtonProps

export const InputButton = forwardRef<InputButtonProps, 'button'>(
  ({ size = 'md', ...rest }: InputButtonProps, ref: any) => {
    const { inputSize } = useInputGroup()
    const field = useFormControlContext()

    return (
      <IconButton
        ref={ref}
        variant="unstyled"
        isDisabled={field?.isDisabled}
        size={inputSize ?? size}
        mr={-2}
        {...rest}
      />
    )
  }
)
