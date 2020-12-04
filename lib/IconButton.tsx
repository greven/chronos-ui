import React from 'react'
import { elm, forwardRef, PropsOf } from './system'
import { cx, Omit } from './util'
import { IconBackdropShape, IconName } from './Icon'
import { useButtonGroup } from './ButtonGroup'
import {
  Button,
  ButtonIcon,
  ButtonSize,
  ButtonVariant,
  ButtonIntent,
  useButtonStyle,
} from './Button'
import { VisuallyHidden } from './VisuallyHidden'

export type IconButtonShape = IconBackdropShape

export interface IconButtonOptions {
  /** The size of the button. */
  size?: ButtonSize
  /** The icon to show */
  icon: IconName
  /** A label required for accessibility.  */
  label?: string
  /** Controls the basic button style. */
  variant?: ButtonVariant
  /** Controls the colour of the button. */
  intent?: ButtonIntent
  /** The shape of the Icon Button. */
  shape?: IconButtonShape
  /** Sets the button as disabled. */
  isDisabled?: boolean
  /** Show a loading indicator. */
  isLoading?: boolean
  /** If true, the button will be displayed as a block element instead of inline. */
  isWide?: boolean
}

export type IconButtonProps = IconButtonOptions & PropsOf<typeof elm.button>

export const IconButton = forwardRef<IconButtonProps, 'button'>(
  (props: IconButtonProps, ref: any) => {
    const group = useButtonGroup()

    const {
      className,
      icon,
      label,
      shape = 'square',
      size = group?.size ?? 'md',
      variant = group?.variant ?? 'ghost',
      intent = group?.intent ?? 'dark',
      isWide = group?.isWide ?? false,
      ...buttonProps
    } = props

    // const styleProps = { size, variant, intent, isWide }
    // const baseStyles = useButtonStyle({ ...props, ...styleProps })
    // const styleProps = { isWide }
    const baseStyles = useButtonStyle()

    const styles = {
      button: {
        width: isWide ? '100%' : baseStyles.size.button[size].height,
        height: baseStyles.size.button[size].height,
        borderRadius: shape === 'circle' ? 'full' : 'md',
        padding: 0,
      },
    }

    return (
      <Button
        ref={ref}
        className={cx('IconButton', className)}
        aria-label={label}
        variant={variant}
        intent={intent}
        sx={styles.button}
        {...buttonProps}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        <ButtonIcon icon={icon} size={baseStyles.size.icon[size]} />
      </Button>
    )
  }
)

// Close Button

export type CloseButtonProps = Omit<IconButtonProps, 'icon'> & {
  icon?: IconName
}

export const CloseButton = forwardRef<CloseButtonProps, 'button'>(
  (
    { size = 'sm', icon = 'X', shape = 'circle', variant = 'unstyled', ...rest }: CloseButtonProps,
    ref: any
  ) => {
    return (
      <IconButton
        ref={ref}
        icon={icon}
        size={size}
        shape={shape}
        variant={variant}
        intent="dark"
        {...rest}
      />
    )
  }
)
