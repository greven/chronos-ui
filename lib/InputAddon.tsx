import React from 'react'
import { elm, forwardRef, PropsOf, useColorModeValue } from './system'
import { cx, omit } from './util'
import { useSafeLayoutEffect } from './hooks'
import { InputBaseOptions, useBaseInputStyle } from './InputBase'
import { useInputGroup } from './InputGroup'
import { useFormControlContext } from './FormControl'

type Placement = 'left' | 'right'

const placements = {
  left: {
    marginRight: '-1px',
    borderRightRadius: 0,
    borderRightColor: 'transparent',
    order: -1,
  },
  right: {
    marginLeft: '-1px',
    borderLeftRadius: 0,
    borderLeftColor: 'transparent',
    order: 99,
  },
}

const StyledAddon = elm('div', {
  baseStyle: {
    flex: '0 0 auto',
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
})

export type InputAddonProps = PropsOf<typeof StyledAddon> &
  InputBaseOptions & {
    placement?: Placement
  }

/**
 * InputAddon
 *
 * Element to append or prepend to an input
 */
export const InputAddon = forwardRef<InputAddonProps, 'div'>(function InputAddon(props, ref) {
  const { placement = 'left', ...rest } = props
  const { inputSize } = useInputGroup()
  const { size: sizeStyle } = useBaseInputStyle()
  const field = useFormControlContext()

  const placementStyles = placements[placement] ?? {}

  const addonProps = omit(rest, ['inputSize', 'errorBorderColor', 'focusBorderColor'])

  const style = {
    ...{
      border: '1px solid',
      borderRadius: 'md',
      borderColor: useColorModeValue('inherit', 'whiteAlpha.50'),
      bg: useColorModeValue('gray.200', 'whiteAlpha.200'),
    },
    ...(field?.isDisabled && { opacity: 4 }),
    ...placementStyles,
    ...sizeStyle[inputSize],
  }

  return <StyledAddon ref={ref} __css={style} {...addonProps} />
})

/**
 * InputLeftAddon
 *
 * Element to append to the left of an input
 */
export const InputLeftAddon = forwardRef<InputAddonProps, 'div'>(function InputLeftAddon(
  props,
  ref
) {
  const { leftAddon } = useInputGroup()

  useSafeLayoutEffect(() => {
    leftAddon?.mount()
    return () => leftAddon?.unmount()
  }, [])

  return (
    <InputAddon
      ref={ref}
      className={cx('InputLeftAddon', props.className)}
      placement="left"
      {...props}
    />
  )
})

/**
 * InputRightAddon
 *
 * Element to append to the right of an input
 */
export const InputRightAddon = forwardRef<InputAddonProps, 'div'>(function InputRightAddon(
  props,
  ref
) {
  const { rightAddon } = useInputGroup()

  useSafeLayoutEffect(() => {
    rightAddon?.mount()
    return () => rightAddon?.unmount()
  }, [])

  return (
    <InputAddon
      ref={ref}
      className={cx('InputRightAddon', props.className)}
      placement="right"
      {...props}
    />
  )
})
