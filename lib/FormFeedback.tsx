import React from 'react'
import { elm, forwardRef, PropsOf, useColorModeValue } from './system'
import { cx } from './util'
import { useSafeLayoutEffect } from './hooks'
import { useFormControlContext } from './FormControl'
import { Icon, IconProps } from './Icon'

export type FormHelpTextProps = PropsOf<typeof elm.div>

/**
 * FormHelperText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided
 */
export const FormHelperText = forwardRef<FormHelpTextProps, 'div'>(
  (props: FormHelpTextProps, ref) => {
    const field = useFormControlContext()

    /**
     * Notify the field context when the help text is rendered on
     * screen, so we can apply the correct `aria-describedby` to the field (e.g. input, textarea)
     */
    useSafeLayoutEffect(() => {
      field?.setHasHelpText.on()
      return () => field?.setHasHelpText.off()
    }, [])

    const _className = cx('FormHelperText', props?.className)

    return (
      <elm.div
        ref={ref}
        className={_className}
        id={props.id ?? field?.helpTextId}
        __css={{
          display: 'flex',
          fontSize: 'sm',
          color: 'gray.500',
          alignItems: 'center',
          marginTop: '2',
        }}
        {...props}
      />
    )
  }
)

export type FormErrorMessageProps = PropsOf<typeof elm.div>

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instrctions on how to fix it.
 */
export const FormErrorMessage = forwardRef<FormErrorMessageProps, 'div'>(
  (props: FormErrorMessageProps, ref) => {
    const field = useFormControlContext()

    const _className = cx('FormErrorMessage', props?.className)

    const errorColor = useColorModeValue('red.600', 'red.500')

    if (!field?.isInvalid) return null

    return (
      <elm.div
        {...props}
        ref={ref}
        className={_className}
        id={props.id ?? field?.helpTextId}
        __css={{
          display: 'flex',
          fontSize: 'sm',
          color: errorColor,
          alignItems: 'center',
          marginTop: '2',
        }}
      />
    )
  }
)

/**
 * Used as the visual indicator that a field is invalid or
 * a field has incorrect values.
 */
export const FormErrorIcon = React.forwardRef<IconProps>(
  ({ icon = 'AlertCircle', className, ...rest }: IconProps, ref: any) => (
    <Icon
      {...rest}
      ref={ref}
      aria-hidden
      className={cx('Input', className)}
      icon={icon}
      sx={{
        svg: {
          color: 'red.600',
          fill: 'red.600',
          path: {
            color: 'white',
            stroke: 'white',
            strokeWidth: 3,
          },
        },
      }}
    />
  )
)
