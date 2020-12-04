import * as React from 'react'
import { RenderProps, ToastId, ToastOptions } from './Toast'
import { Intent, ThemeProvider } from './theme'
import { ColorModeContext, useThemeUI } from './system'
import { isFunction } from './util'
import { toast } from './Toast.class'
import { Alert, AlertTitle, AlertVariant } from './Alert'

export interface UseToastOptions {
  /**
   * The placement of the toast
   *
   * @default "bottom"
   */
  position?: ToastOptions['position']
  /**
   * The delay before the toast hides (in milliseconds)
   * If set to `null`, toast will never dismiss.
   *
   * @default 5000 ( = 5000ms )
   */
  duration?: ToastOptions['duration']
  /**
   * Render a component toast component.
   * Any component passed will receive 2 props: `id` and `onClose`.
   */
  render?(props: RenderProps): React.ReactNode
  /**
   * The title of the toast
   */
  title?: string
  /**
   * The description of the toast
   */
  description?: string
  /**
   * If `true`, toast will show a close button
   */
  isClosable?: boolean
  /**
   * The alert component `variant` to use
   */
  variant?: AlertVariant
  /**
   * The intent / status of the toast.
   */
  intent?: Intent
  /**
   * The `id` of the toast.
   *
   * Mostly used when you need to prevent duplicate.
   * By default, we generate a unique `id` for each toast
   */
  id?: ToastId
  /**
   * Callback function to run side effects after the toast has closed.
   */
  onCloseComplete?: () => void
}

export type IToast = UseToastOptions

const Toast: React.FC<any> = (props) => {
  const { intent, variant, id, title, onClose, description } = props

  return (
    <Alert
      id={id}
      intent={intent}
      variant={variant}
      onClose={onClose}
      margin={2}
      width="auto"
      textAlign="left"
      alignItems="start"
      borderRadius="md"
      boxShadow="lg"
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {description}
    </Alert>
  )
}

const defaults = {
  duration: 5000,
  position: 'bottom',
  variant: 'solid',
  intent: 'dark',
} as const

/**
 * React hook used to create a function that can be used
 * to show toasts in an application.
 */
export function useToast() {
  const { theme, ...colorMode } = useThemeUI()

  return React.useMemo(() => {
    const toastImpl = function (options: UseToastOptions) {
      const { render } = options

      const Message: React.FC<RenderProps> = (props) => (
        <ThemeProvider theme={theme}>
          <ColorModeContext.Provider value={colorMode}>
            {isFunction(render) ? render(props) : <Toast {...{ ...props, ...opts }} />}
          </ColorModeContext.Provider>
        </ThemeProvider>
      )

      const opts = { ...defaults, ...options }

      return toast.notify(Message, opts)
    }

    toastImpl.close = toast.close
    toastImpl.closeAll = toast.closeAll

    // toasts can only be updated if they have a valid id
    toastImpl.update = (id: ToastId, options: Omit<UseToastOptions, 'id'>) => {
      const { render, ...rest } = options

      if (!id) return

      const opts = { ...defaults, ...rest }

      toast.update(id, {
        ...opts,
        message: (props) => (
          <ThemeProvider theme={theme}>
            {isFunction(render) ? render(props) : <Toast {...{ ...props, ...opts }} />}
          </ThemeProvider>
        ),
      })
    }

    toastImpl.isActive = toast.isActive

    return toastImpl
  }, [colorMode, theme])
}

export default useToast
