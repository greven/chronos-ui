import * as React from 'react'
import ReachAlert from '@reach/alert'
import { useRect } from '@reach/rect'
import { Intent } from './theme'
import { useTimeout } from './hooks'
import { objectKeys, isFunction } from './util'
import { Transition } from './transitions'

/**
 * List of available toast positions
 */
export type ToastPosition =
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'bottom'
  | 'bottom-right'
  | 'bottom-left'

export interface RenderProps {
  /**
   * The auto-generated or passed `id` of the toast
   */
  id: ToastId
  /**
   * Function to close the toast
   */
  onClose(): void
}

export type ToastMessage = (props: RenderProps) => React.ReactNode

export type ToastId = string | number

export interface ToastOptions {
  /**
   * The element or component type to render.
   * The component will be passed `id` and `onClose`
   */
  message: ToastMessage
  /**
   * The toast's id
   */
  id: ToastId
  /**
   * The duration of the toast
   */
  duration: number | null
  /**
   * The intent / status of the toast's alert component.
   */
  intent: Intent
  /**
   * Function that removes the toast from manager's state.
   */
  onRequestRemove(): void
  /**
   * Whether a toast is currently in view or not
   */
  showing: boolean
  /**
   * The position of the toast
   */
  position: ToastPosition
  /**
   * Callback function to run side effects after the toast has closed.
   */
  onCloseComplete?(): void
}

export type ToastState = { [K in ToastPosition]: ToastOptions[] }

export type UpdateFn = (val: ToastState) => void

/**
 * Given an array of toasts for a specific position.
 * It returns the toast that matches the `id` passed
 */
export function findById(arr: ToastOptions[], id: ToastId) {
  return arr.find((toast) => toast.id === id)
}

/**
 * Given the toast manager state, finds the toast that matches
 * the id and return it's position and index
 */
export function findToast(toasts: ToastState, id: ToastId) {
  const position = getToastPosition(toasts, id)

  const index = position ? toasts[position].findIndex((toast) => toast.id == id) : -1

  return {
    position,
    index,
  }
}

export interface ToastProps extends ToastOptions {
  requestClose?: boolean
}

export const Toast: React.FC<ToastProps> = (props) => {
  const {
    id,
    message,
    onCloseComplete,
    onRequestRemove,
    requestClose = false,
    position = 'bottom',
    duration = 5000,
  } = props

  const ref = React.useRef<HTMLDivElement>(null)
  const [delay, setDelay] = React.useState(duration)
  const [show, setShow] = React.useState(true)

  React.useEffect(() => {
    setDelay(duration)
  }, [duration])

  const onMouseEnter = () => {
    setDelay(null)
  }

  const onMouseLeave = () => {
    setDelay(duration)
  }

  const onExited = () => {
    if (!show) {
      onRequestRemove()
    }
    onCloseComplete?.()
  }

  const close = () => {
    setShow(false)
  }

  React.useEffect(() => {
    if (requestClose) {
      setShow(false)
    }
  }, [requestClose])

  useTimeout(close, delay)

  const style = React.useMemo(() => getToastStyle(position), [position])

  const rect = useRect(ref)
  const height = rect?.height ?? 0

  const isTop = position.includes('top')

  /**
   * @todo
   *
   * Make it possible to configure this toast transition
   * from `theme.transitions.toast`
   */
  const y = isTop ? `-${height}px` : 0

  const styles = {
    init: {
      opacity: 0,
      height: 0,
      transform: `translateY(${y}) scale(1)`,
    },
    entered: {
      opacity: 1,
      height,
      transform: `translateY(0) scale(1)`,
    },
    exiting: {
      opacity: 0,
      height: 0,
      transform: `translateY(0) scale(0.9)`,
    },
  }

  return (
    <Transition
      styles={styles}
      /**
       * We use the `easeInOutQuint` from https://easings.net/en#
       */
      transition="all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
      in={show}
      timeout={{ enter: 0, exit: 150 }}
      onExited={onExited}
    >
      {(styles) => (
        <div
          data-toast=""
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            willChange: 'transform, height, opacity',
            ...style,
            ...styles,
          }}
        >
          <div
            ref={ref}
            data-toast-inner=""
            style={{ pointerEvents: 'auto', maxWidth: 560, minWidth: 300 }}
          >
            <ReachAlert>
              {isFunction(message) ? message({ id, onClose: close }) : message}
            </ReachAlert>
          </div>
        </div>
      )}
    </Transition>
  )
}

// Utils

/**
 * Given the toast manager state, finds the position of the toast that
 * matches the `id`
 */
export function getToastPosition(toasts: ToastState, id: ToastId) {
  let position: ToastPosition | undefined

  objectKeys(toasts).forEach((pos) => {
    const found = findById(toasts[pos], id)
    if (found) position = pos
  })

  return position
}

/**
 * Given the toast manager state, checks if a specific toast is
 * still in the state, which means it's still visible on screen.
 */
export function isVisible(toasts: ToastState, id: ToastId) {
  let found: any

  Object.values(toasts).forEach((toasts) => {
    found = toasts.find((toast) => toast.id === id)
  })

  return !!found
}

/**
 * Get's the styles to be applied to a toast's container
 * based on it's position in the manager
 */
export function getToastStyle(position: ToastPosition) {
  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  if (position.includes('right')) {
    style.alignItems = 'flex-end'
  } else if (position.includes('left')) {
    style.alignItems = 'flex-start'
  }

  return style
}
