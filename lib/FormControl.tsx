import React from 'react'
import { elm, forwardRef, PropsOf } from './system'
import { cx, createContext, callAllHandlers, ariaAttr, omit } from './util'
import { useId, useBoolean } from './hooks'

export interface FormControlOptions {
  /**
   * If `true` set the form control to the invalid state.
   */
  isInvalid?: boolean
  /**
   * If `true` set the form control to be required.
   */
  isRequired?: boolean
  /**
   * If `true` set the form control to the disabled state.
   */
  isDisabled?: boolean
  /**
   * If `true` set the form control to the read only state.
   */
  isReadOnly?: boolean
  /**
   * If `true` the form control will be in it's `loading` state.
   */
  isLoading?: boolean
}

interface FormControlContext extends FormControlOptions {
  /**
   * The label text used to inform users as to what information is
   * requested for a text field.
   */
  label?: string
  /**
   * The error message to be displayed when `isInvalid` is set to `true`
   */
  errorText?: string
  /**
   * The assistive text to be displayed that provides additional guidance to users
   */
  helperText?: string
  /**
   * The custom `id` to use for the form control. This is passed directly to the form element (e.g, Input).
   * - The form element (e.g Input) gets the `id`
   * - The form label id: `form-label-${id}`
   * - The form error text id: `form-error-text-${id}`
   * - The form helper text id: `form-helper-text-${id}`
   */
  id?: string
}

type FieldContext = Omit<ReturnType<typeof useFormControlProvider>, 'htmlProps'>

const [FormControlContextProvider, useFormControlContext] = createContext<FieldContext>({
  strict: false,
  name: 'FormControlContext',
})

export { useFormControlContext }

export const useFormControlProvider = (props: FormControlContext) => {
  const {
    id: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isLoading,
    isReadOnly,
    ...htmlProps
  } = props

  // Generate all the required ids
  const uuid = useId()
  const id = idProp || uuid ? `field-${uuid}` : undefined

  const labelId = `${id}-label`
  const feedbackId = `${id}-feedback`
  const helpTextId = `${id}-helptext`

  // Track of when the `FormHelperText` has been rendered.
  const [hasHelpText, setHasHelpText] = useBoolean()

  // Let's keep track of when we focus the form element (e.g, `input`)
  const [isFocused, setFocus] = useBoolean()

  const context = {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isLoading: !!isLoading,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: setFocus.on,
    onBlur: setFocus.off,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
    htmlProps,
  }

  return context
}

export type FormControlProps = FormControlContext & PropsOf<typeof elm.div>

export const FormControl = forwardRef<FormControlProps, 'div'>(
  (props: FormControlProps, ref: any) => {
    const { htmlProps, ...context } = useFormControlProvider(props)

    const _className = cx('FormControl', props.className)

    return (
      <FormControlContextProvider value={context}>
        <elm.div
          role="group"
          ref={ref}
          className={_className}
          __css={{
            width: '100%',
            position: 'relative',
          }}
          {...htmlProps}
        />
      </FormControlContextProvider>
    )
  }
)

export interface UseFormControlProps<T extends HTMLElement> extends FormControlOptions {
  id?: string
  onFocus?: React.FocusEventHandler<T>
  onBlur?: React.FocusEventHandler<T>
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  inputSize?: string
}

/**
 * React hook that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 */
export function useFormControl<T extends HTMLElement>(props: UseFormControlProps<T>) {
  const field = useFormControlContext()
  const describedBy: string[] = []

  if (field?.isInvalid) {
    /**
     * Error message must be described first
     * in all scenarios
     */
    if (describedBy.length > 0) {
      describedBy.unshift(field.feedbackId)
    } else {
      describedBy.push(field.feedbackId)
    }
  }

  if (field?.hasHelpText) describedBy.push(field.helpTextId)
  const ariaDescribedBy = describedBy.join(' ')

  const cleanProps = omit(props, [
    'isInvalid',
    'isDisabled',
    'isReadOnly',
    'isRequired',
    'inputSize',
  ])

  return {
    ...cleanProps,
    'id': props.id ?? field?.id,
    'disabled': props.disabled || props.isDisabled || field?.isDisabled,
    'readOnly': props.readOnly || props.isReadOnly || field?.isReadOnly,
    'required': props.required || props.isRequired || field?.isRequired,
    'aria-invalid': ariaAttr(props.isInvalid || field?.isInvalid),
    'aria-required': ariaAttr(props.isRequired || field?.isRequired),
    'aria-readonly': ariaAttr(props.isReadOnly || field?.isReadOnly),
    'aria-describedby': ariaDescribedBy || undefined,
    'onFocus': callAllHandlers(field?.onFocus, props.onFocus),
    'onBlur': callAllHandlers(field?.onBlur, props.onBlur),
  }
}
