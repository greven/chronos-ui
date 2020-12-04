import React from 'react'
import { elm, forwardRef, PropsOf } from './system'
import { cx, dataAttr } from './util'
import { useFormControlContext } from './FormControl'
import { VisuallyHidden } from './VisuallyHidden'

export type FormLabelProps = PropsOf<typeof elm.label> & {
  children?: React.ReactNode
  hide?: boolean
}

export const FormLabel = forwardRef<FormLabelProps, 'label'>(
  ({ children, hide, ...props }: FormLabelProps, ref: any) => {
    const field = useFormControlContext()

    const child = (
      <elm.label
        ref={ref}
        className={cx('Label', props.className)}
        data-focus={dataAttr(field?.isFocused)}
        data-disabled={dataAttr(field?.isDisabled)}
        data-invalid={dataAttr(field?.isInvalid)}
        data-loading={dataAttr(field?.isLoading)}
        data-readonly={dataAttr(field?.isReadOnly)}
        id={props.id ?? field?.labelId}
        htmlFor={props.htmlFor ?? field?.id}
        __css={{
          display: 'inline-block',
          fontSize: 'sm',
          fontWeight: 'medium',
          lineHeight: 5,
          color: field?.isDisabled ? 'muted' : 'inherit',
        }}
        {...props}
      >
        {children}
        <RequiredIndicator />
      </elm.label>
    )

    return hide ? <VisuallyHidden>{child}</VisuallyHidden> : child
  }
)

export const RequiredIndicator = (props: PropsOf<typeof elm.span>) => {
  const { isRequired, isDisabled } = useFormControlContext()

  const _className = cx('RequiredIndicator', props.className)

  if (!isRequired) return null

  return (
    <elm.span
      {...props}
      as="span"
      className={_className}
      role="presentation"
      aria-hidden="true"
      title="Required"
      __css={{
        marginLeft: 1,
        color: isDisabled ? 'red.300' : 'red.500',
      }}
    >
      {props.children || '*'}
    </elm.span>
  )
}
