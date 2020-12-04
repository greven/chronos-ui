import React from 'react'
import { useColorModeValue, useToken } from './system'
import { useBoolean, useDisclosure, useIds, useUpdateEffect, useEventListener } from './hooks'
import { Dict, mergeRefs, callAllHandlers, focus, getFirstTabbableIn, isFocusable } from './util'
import { Placement, usePopper, UsePopperProps } from './Popper'

export interface UsePopoverProps {
  /**
   * The html `id` attribute of the popover.
   * If not provided, we generate a unique id.
   *
   * This `id` is also used to auto-generate the `aria-labelledby`
   * and `aria-decribedby` attributes that points to the `PopoverHeader` and `PopoverBody`
   */
  id?: string
  /**
   * If `true`, the popover will be opened in controlled mode.
   */
  isOpen?: boolean
  /**
   * If `true`, the popover will be initially opened.
   */
  defaultIsOpen?: boolean
  /**
   * The `ref` of the element that should receive focus when the popover opens.
   */
  initialFocusRef?: React.RefObject<any>
  /**
   * If `true`, focus will be returned to the element that triggers the popover
   * when it closes
   */
  returnFocus?: boolean
  /**
   * If `true`, focus will be transferred to the first interactive element
   * when the popover opens
   */
  autoFocus?: boolean
  /**
   * The gap (in pixels) to apply between the popover and the target.
   * Used by `popper.js`
   */
  gutter?: number
  /**
   * The placment of the popover
   */
  placement?: Placement
  /**
   * If `true`, the popover will close when you blur out it by
   * clicking outside or tabbing out
   */
  closeOnBlur?: boolean
  /**
   * If `true`, the popover will close when you hit the `Esc` key
   */
  closeOnEsc?: boolean
  /**
   * Callback fired when the popover opens
   */
  onOpen?: () => void
  /**
   * Callback fired when the popover closes
   */
  onClose?: () => void
  /**
   * The size of the popover arrow
   */
  arrowSize?: number
  /**
   * The `box-shadow` of the popover arrow
   */
  arrowShadowColor?: string
  /**
   * The Popper.js modifiers to use.
   */
  modifiers?: UsePopperProps['modifiers']
}

export function usePopover(props: UsePopoverProps = {}) {
  const {
    closeOnBlur = true,
    closeOnEsc = true,
    initialFocusRef,
    placement,
    gutter,
    id,
    arrowSize,
    returnFocus = true,
    autoFocus = true,
    arrowShadowColor,
    modifiers,
  } = props

  const { isOpen, onClose, onToggle } = useDisclosure(props)

  const triggerRef = React.useRef<any>(null)
  const popoverRef = React.useRef<any>(null)

  const [hasHeader, setHasHeader] = useBoolean()
  const [hasBody, setHasBody] = useBoolean()

  const [triggerId, popoverId, headerId, bodyId] = useIds(
    id,
    'popover-trigger',
    'popover-content',
    'popover-header',
    'popover-body'
  )

  const fallbackShadowColor = useColorModeValue('gray.200', 'whiteAlpha.300')
  const shadowColor = arrowShadowColor ?? fallbackShadowColor
  const arrowColor = useToken('colors', shadowColor, arrowShadowColor)

  const { popper, reference, arrow } = usePopper({
    placement,
    gutter,
    forceUpdate: isOpen,
    arrowSize,
    arrowShadowColor: arrowColor,
    modifiers,
  })

  useFocusOnHide(popoverRef, {
    autoFocus: returnFocus,
    visible: isOpen,
    focusRef: triggerRef,
  })

  useFocusOnShow(popoverRef, {
    autoFocus: autoFocus,
    visible: isOpen,
    focusRef: initialFocusRef,
  })

  const onBlur = useBlurOutside(triggerRef, popoverRef, {
    visible: Boolean(closeOnBlur && isOpen),
    action: onClose,
  })

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose()
      }
    },
    [closeOnEsc, onClose]
  )

  return {
    isOpen,
    onClose,
    headerId,
    hasHeader,
    setHasHeader,
    bodyId,
    hasBody,
    setHasBody,
    getArrowProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(arrow.ref, props.ref),
      style: { ...props.style, ...arrow.style },
    }),
    getTriggerProps: (props: Dict = {}) => ({
      ...props,
      'id': triggerId,
      'ref': mergeRefs(triggerRef, reference.ref, props.ref),
      'aria-haspopup': 'dialog' as React.AriaAttributes['aria-haspopup'],
      'aria-expanded': isOpen,
      'aria-controls': popoverId,
      'onClick': callAllHandlers(props.onClick, onToggle),
    }),
    getPopoverProps: (props: Dict = {}) => ({
      ...props,
      'id': popoverId,
      'tabIndex': -1,
      'hidden': !isOpen,
      'ref': mergeRefs(popoverRef, popper.ref, props.ref),
      'style': { ...props.style, ...popper.style },
      'aria-hidden': isOpen ? undefined : true,
      'role': 'dialog',
      'onBlur': callAllHandlers(props.onBlur, onBlur),
      'onKeyDown': callAllHandlers(props.onKeyDown, onKeyDown),
      'aria-labelledby': hasHeader ? headerId : undefined,
      'aria-describedby': hasBody ? bodyId : undefined,
    }),
  }
}

export type UsePopoverReturn = ReturnType<typeof usePopover>

// Utils

/**
 * Check if the event target is within the popover ref.
 *
 * @param ref the popover ref
 * @param event the blur event
 */
function hasFocusWithin(popoverRef: React.RefObject<HTMLElement>, event: React.FocusEvent) {
  if (!document.activeElement || !popoverRef.current) {
    return false
  }

  const target = (event.relatedTarget || document.activeElement) as HTMLElement

  return popoverRef.current.contains(target)
}

/**
 * Popover hook to manage outside click or blur detection.
 * It listens for outside click and notifies us so we can
 * close the popover
 *
 * @param triggerRef - popover trigger ref
 * @param popoverRef - popover content ref
 * @param options popover options (visible and action)
 */
export function useBlurOutside(
  triggerRef: React.RefObject<HTMLButtonElement>,
  popoverRef: React.RefObject<HTMLElement>,
  options: {
    action: () => void
    visible: boolean
  }
) {
  const onMouseDown = (event: MouseEvent) => {
    if (options.visible && event.target === triggerRef.current) {
      event.preventDefault()
    }
  }

  useEventListener('mousedown', onMouseDown)
  useEventListener('touchstart', onMouseDown)

  return (event: React.FocusEvent) => {
    const shouldClose = options.visible && !hasFocusWithin(popoverRef, event)
    if (shouldClose) {
      options.action()
    }
  }
}

export interface UseFocusOnHideOptions {
  focusRef: React.RefObject<HTMLElement>
  autoFocus?: boolean
  visible?: boolean
}

/**
 * Popover hook to manage the focus when the popover closes or hides.
 *
 * We either want to return focus back to the popover trigger or
 * let focus proceed normally if user moved to another interactive
 * element in the viewport.
 */
export function useFocusOnHide(
  popoverRef: React.RefObject<HTMLElement>,
  options: UseFocusOnHideOptions
) {
  const isFocusableRef = React.useRef(false)
  const { focusRef, autoFocus, visible } = options

  const shouldFocus = autoFocus && !visible

  const onMouseDown = (event: MouseEvent) => {
    if (!options.visible) return
    const target = event.target as HTMLElement

    const prevent =
      isFocusable(target) &&
      target !== focusRef.current &&
      !(popoverRef.current as HTMLElement).contains(target)

    if (prevent) {
      isFocusableRef.current = true
    }
  }

  useEventListener('mousedown', onMouseDown)

  useUpdateEffect(() => {
    return () => {
      if (!visible) {
        isFocusableRef.current = false
      }
    }
  }, [visible])

  /**
   * Using updateEffect here to allow effect to run only when
   * `options.visible` changes, not on mount
   */
  useUpdateEffect(() => {
    if (!shouldFocus || !popoverRef.current) return

    if (isFocusableRef.current) return

    if (focusRef.current) {
      focus(focusRef.current)
    }
  }, [autoFocus, focusRef, visible, popoverRef, shouldFocus])
}

export interface UseFocusOnShowOptions {
  autoFocus?: boolean
  visible?: boolean
  focusRef?: React.RefObject<HTMLElement>
}

/**
 * Popover hook to manage the focus when the popover opens.
 *
 * We either want to focus the popover content itself since it
 * has `tabIndex = -1`, or focus the first interactive element
 * within the popover content.
 */
export function useFocusOnShow(
  popoverRef: React.RefObject<HTMLElement>,
  options: UseFocusOnShowOptions
) {
  const { visible, autoFocus, focusRef } = options

  /**
   * Using updateEffect here to allow effect to run only when
   * `options.visible` changes, not on mount
   */
  useUpdateEffect(() => {
    // if `autoFocus` is false, move focus to the `PopoverContent`
    if (!autoFocus && popoverRef.current) {
      focus(popoverRef.current)
      return
    }

    const shouldFocus = visible && autoFocus

    if (!shouldFocus) return

    if (focusRef?.current) {
      focus(focusRef.current)
      return
    }

    if (popoverRef.current) {
      const firstTabbable = getFirstTabbableIn(popoverRef.current, true)
      focus(firstTabbable ?? popoverRef.current)
    }
  }, [visible, autoFocus, popoverRef, focusRef])
}
