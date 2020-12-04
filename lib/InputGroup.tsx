import React, { useState, useCallback, cloneElement } from 'react'
import { elm, forwardRef, PropsOf } from './system'
import { cx, createContext } from './util'
import { InputBaseProps } from './InputBase'

type GroupContext = Omit<ReturnType<typeof useInputGroupProvider>, 'htmlProps'>

const [InputGroupProvider, useInputGroup] = createContext<GroupContext>({
  strict: false,
  name: 'InputGroupContext',
})

export { useInputGroup }

function useMounted() {
  const [isMounted, setMounted] = useState(false)
  const mount = useCallback(() => setMounted(true), [])
  const unmount = useCallback(() => setMounted(false), [])
  return { isMounted, mount, unmount }
}

type UseMountedReturn = ReturnType<typeof useMounted>

export const useInputGroupProvider = (props: InputGroupProps) => {
  const {
    inputSize = 'md',
    variant = 'standard',
    focusBorderColor,
    errorBorderColor,
    ...htmlProps
  } = props

  const leftElement = useMounted() as UseMountedReturn | undefined
  const rightElement = useMounted() as UseMountedReturn | undefined
  const leftAddon = useMounted() as UseMountedReturn | undefined
  const rightAddon = useMounted() as UseMountedReturn | undefined

  return {
    leftElement,
    rightElement,
    leftAddon,
    rightAddon,
    inputSize,
    variant,
    focusBorderColor,
    errorBorderColor,
    htmlProps,
  }
}

type BaseInputProps = Pick<
  InputBaseProps,
  'inputSize' | 'variant' | 'focusBorderColor' | 'errorBorderColor'
>

export type InputGroupProps = BaseInputProps & PropsOf<typeof elm.div>

export const InputGroup = forwardRef<InputGroupProps, 'div'>((props: InputGroupProps, ref) => {
  const { children, className, ...rest } = props
  const { htmlProps, ...context } = useInputGroupProvider(rest)

  const content = React.Children.map(children, (child: React.ReactNode) => {
    if (!React.isValidElement(child)) {
      return null
    }

    return cloneElement(child, {
      inputSize: child.props.inputSize || context.inputSize,
      variant: child.props.variant || context.variant,
      focusBorderColor: child.props.focusBorderColor || context.focusBorderColor,
      errorBorderColor: child.props.errorBorderColor || context.errorBorderColor,
    })
  })

  return (
    <elm.div
      ref={ref}
      className={cx('InputGroup', className)}
      width="100%"
      display="flex"
      position="relative"
      alignItems="center"
      {...htmlProps}
    >
      <InputGroupProvider value={context}>{content}</InputGroupProvider>
    </elm.div>
  )
})
