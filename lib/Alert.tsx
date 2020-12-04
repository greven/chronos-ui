import React from 'react'
import { elm, forwardRef, useTheme, PropsOf } from './system'
import { cx, createContext, omit, Dict } from './util'
import {
  Intent,
  Elevation,
  getIntentColorShade,
  isAccessible,
  getIntentColorName,
  transparentize,
} from './theme'
import { ButtonSize } from './Button'
import { Icon, IconName } from './Icon'
import { CloseButton, CloseButtonProps } from './IconButton'

function useAlertStyle(props: AlertProps) {
  const theme = useTheme()

  const color = props?.color
  const intent = props?.intent ?? 'dark'
  const intentColor = getIntentColorName(intent)
  const backgroundColor = intent === 'dark' ? `${intentColor}.200` : `${intentColor}.50`
  const borderColor = `${intentColor}.600`
  const textColor = isAccessible(`${intentColor}.900`, backgroundColor)(theme)
    ? `${intentColor}.900`
    : 'text'
  const mainIntentColor = getIntentColorShade(theme, intent, `${intentColor}.600`)
  const mainIntentTextColor = isAccessible('white', mainIntentColor)(theme)
    ? 'white'
    : `${intentColor}.900`

  return {
    base: {
      position: 'relative',
      display: 'flex',
      fontSize: 'sm',
      lineHeight: 1.4,
      borderStyle: 'solid',
      borderColor: borderColor,
      borderTopWidth: props?.accent === 'top' ? '4px' : 0,
      borderRightWidth: props?.accent === 'right' ? '4px' : 0,
      borderBottomWidth: props?.accent === 'bottom' ? '4px' : 0,
      borderLeftWidth: props?.accent === 'left' ? '4px' : 0,
      borderRadius: props?.accent ? 'sm' : 'md',
      shadow: props?.elevation ?? 'none',
      py: 1.5,
      px: 4,
    },

    message: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      py: 2,
    },

    title: {
      fontSize: 'base',
      lineHeight: 'base',
      fontWeight: 'medium',
      mt: -1,
      mb: 0.5,
    },

    action: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: 1,
      marginRight: -2,
    },

    closeButton: {
      color: 'inherit',
      _hover: {
        bg: transparentize(`${intentColor}.900`, 0.1)(theme),
      },
      _focus: {
        bg: transparentize(`${intentColor}.900`, 0.2)(theme),
      },
      _active: {
        bg: transparentize(`${intentColor}.900`, 0.2)(theme),
      },
    },

    variants: {
      simple: {
        color: textColor,
        bg: backgroundColor,

        icon: {
          color: props?.iconColor ?? color ?? borderColor,
        },
      },

      solid: {
        color: mainIntentTextColor,
        background: mainIntentColor,
        fontWeight: 'medium',

        icon: {
          color: props?.iconColor ?? color ?? mainIntentTextColor,
        },
      },

      outlined: {
        color: textColor,
        background: 'transparent',
        borderWidth: 1,

        icon: {
          color: props?.iconColor ?? color ?? borderColor,
        },
      },
    },

    modern: {
      position: 'relative',
      display: 'flex',
      fontSize: 'sm',
      lineHeight: 1.4,
      borderStyle: 'solid',
      borderColor: borderColor,
      borderLeftWidth: 4,
      borderRadius: 'default',
      shadow: props?.elevation ?? 'default',

      message: {
        display: 'flex',
        flexDirection: 'column',
      },

      title: {
        display: 'flex',
        bg: backgroundColor,
      },

      icon: {
        color: props?.iconColor ?? color ?? borderColor,
      },
    },
  }
}

export type AlertVariant = 'simple' | 'solid' | 'outlined'

export type AlertAccent = 'top' | 'right' | 'bottom' | 'left'

export type AlertIntent = Intent

export interface AlertOptions {
  /** The intent (status) of the alert */
  intent?: Intent
  /** The variant of the alert style to use. */
  variant?: AlertVariant
  /** The alert accent border. Defaults to none. */
  accent?: AlertAccent
  /** The alert elevation (shadow). */
  elevation?: Elevation
  /** Alert icon */
  icon?: IconName
  /** Alert icon custom color */
  iconColor?: string
  /** The action to display. It renders after the message, at
   * the end of the alert. */
  action?: React.ReactNode
  /** Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed
   * that triggers the callback when clicked. */
  onClose?: () => void
}

export type AlertProps = PropsOf<typeof elm.div> & AlertOptions

const [AlertContextProvider, useAlertContext] = createContext<AlertOptions & { styles: Dict }>({
  name: 'AlertContext',
})

export const Alert = forwardRef<AlertProps, 'div'>(function Alert(props, ref) {
  const {
    children,
    variant = 'simple',
    intent = 'dark',
    icon: _icon,
    action,
    onClose,
    ...rest
  } = props

  const alertProps = omit(rest, ['iconColor'])

  const styles = useAlertStyle(props)

  const icon = _icon ?? getIntentIconName(intent)

  const context = { intent, variant, onClose, styles }

  return (
    <elm.div
      ref={ref}
      className={cx('Alert', props.className)}
      __css={{ ...styles.base, ...styles.variants[variant] }}
      {...alertProps}
    >
      <AlertContextProvider value={context}>
        <elm.div className="AlertIcon" __css={styles.variants[variant].icon} mr="4" pt="2">
          <Icon icon={icon} size="5" />
        </elm.div>

        <elm.div className="AlertMessage" __css={styles.message}>
          {children}
        </elm.div>

        {action != null ? <elm.div __css={styles.action}>{action}</elm.div> : null}

        {action == null && onClose ? (
          <elm.div __css={styles.action}>
            <AlertCloseButton />
          </elm.div>
        ) : null}
      </AlertContextProvider>
    </elm.div>
  )
})

/** A modern looking Alert, for posh users! */
// type FancyAlertProps = Omit<AlertProps, 'variant' | 'accent'> & {
//   /** The title text of the alert */
//   title?: string
// }

// export const FancyAlert = forwardRef<FancyAlertProps, 'div'>(function Alert(props, ref) {
//   const { children, intent = 'dark', title, icon: _icon, action, onClose, ...rest } = props

//   const styles = useAlertStyle(props)

//   const icon = _icon ?? getIntentIconName(intent)

//   const context = { intent, onClose, styles }

//   return (
//     <elm.div
//       ref={ref}
//       className={cx('Alert', props.className)}
//       __css={{ ...styles.modern }}
//       {...rest}
//     >
//       <AlertContextProvider value={context}>
//         <elm.div className="AlertMessage" __css={styles.modern.message}>
//           {title && (
//             <elm.div __css={styles.modern.title}>
//               <elm.div className="AlertIcon" __css={styles.modern.icon} mr="4" pt="2">
//                 <Icon icon={icon} size="5" />
//               </elm.div>
//               <elm.div>{title}</elm.div>
//             </elm.div>
//           )}
//           <elm.div>{children}</elm.div>
//         </elm.div>

//         {/* {action != null ? <elm.div __css={styles.action}>{action}</elm.div> : null}

//         {action == null && onClose ? (
//           <elm.div __css={styles.action}>
//             <AlertCloseButton />
//           </elm.div>
//         ) : null} */}
//       </AlertContextProvider>
//     </elm.div>
//   )
// })

type AlertTitleProps = PropsOf<typeof elm.div>

export const AlertTitle: React.FC<AlertTitleProps> = (props) => {
  const { styles } = useAlertContext()

  return <elm.div __css={styles.title} {...props}></elm.div>
}

type AlertCloseButtonProps = Omit<CloseButtonProps, 'size' | 'label' | 'icon'> & {
  size?: ButtonSize
}

export const AlertCloseButton: React.FC<AlertCloseButtonProps> = ({
  size = 'sm',
  shape = 'square',
  ...rest
}) => {
  const { intent, onClose, styles } = useAlertContext()

  return (
    <CloseButton
      tabIndex={-1}
      label="Close"
      size={size}
      shape={shape}
      onClick={onClose}
      intent={intent}
      variant="unstyled"
      sx={styles.closeButton}
      {...rest}
    />
  )
}

// Helpers

const getIntentIconName = (intent: Intent): IconName => {
  switch (intent) {
    case 'danger':
      return 'AlertCircle'
    case 'warning':
      return 'AlertTriangle'
    case 'info':
      return 'Info'
    case 'success':
      return 'CheckCircle'
    default:
      return 'Info'
  }
}
