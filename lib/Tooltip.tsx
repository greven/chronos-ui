import * as React from 'react'
import { elm, PropsOf, forwardRef } from './system'
import { Portal } from './Portal'
import { isString, omit, pick } from './util'
import { VisuallyHidden } from './VisuallyHidden'
import { useTooltip, UseTooltipProps } from './useTooltip'
import { Fade } from './transitions'

const useTooltipStyle = () => {
  return {
    base: {
      color: 'white',
      bg: 'dark.800',
      fontSize: 'sm',
      rounded: 'md',
      shadow: 'md',
      opacity: '0.95',
      px: '3',
      py: '1',
    },
  }
}

export type TooltipProps = PropsOf<typeof elm.div> &
  UseTooltipProps & {
    /**
     * The react component to use as the
     * trigger for the tooltip
     */
    'children': React.ReactNode
    /**
     * The label of the tooltip
     */
    'label'?: string
    /**
     * If the tooltip needs to display more than a text label,
     * use the content prop instead
     */
    'content'?: React.ReactNode
    /**
     * The accessible, human friendly label to use for
     * screen readers.
     *
     * If passed, tooltip will show the content `label`
     * but expose only `aria-label` to assistive technologies
     */
    'aria-label'?: string
    /**
     * If `true`, the tooltip will wrap it's children
     * in a `<span/>` with `tabIndex=0`
     */
    'shouldWrapChildren'?: boolean
    /**
     * If `true`, the tooltip will show an arrow tip
     */
    'hasArrow'?: boolean
  }

/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 */
export const Tooltip = forwardRef<TooltipProps, 'div'>(function Tooltip(props, ref) {
  const {
    children,
    label,
    content,
    shouldWrapChildren,
    'aria-label': ariaLabel,
    hasArrow,
    ...rest
  } = props

  const { isOpen, getTriggerProps, getTooltipProps, getArrowProps } = useTooltip(rest)

  const styles = useTooltipStyle()

  const shouldWrap = isString(children) || shouldWrapChildren

  let trigger: React.ReactElement

  if (shouldWrap) {
    trigger = (
      <elm.span tabIndex={0} {...getTriggerProps()}>
        {children}
      </elm.span>
    )
  } else {
    /**
     * Ensure tooltip has only one child node
     */
    const child = React.Children.only(children) as React.ReactElement
    trigger = React.cloneElement(child, getTriggerProps(child.props))
  }

  const hasAriaLabel = !!ariaLabel

  const _tooltipProps = getTooltipProps({}, ref)
  const arrowProps = getArrowProps()

  const tooltipProps = hasAriaLabel ? omit(_tooltipProps, ['role', 'id']) : _tooltipProps

  const hiddenProps = pick(_tooltipProps, ['role', 'id'])

  /**
   * If the `label` or `content` are empty, there's no
   * point showing the tooltip. Let's simply return back the children
   */
  if (!label && !content) {
    return <>{children}</>
  }

  return (
    <>
      {trigger}
      {isOpen && (
        <Portal>
          <Fade timeout={200} in={isOpen}>
            {(fadeStyles) => (
              <elm.div style={fadeStyles}>
                <elm.div className="Tooltip" {...tooltipProps} __css={styles.base}>
                  {!content && label}
                  {content}
                  {hasAriaLabel && <VisuallyHidden {...hiddenProps}>{ariaLabel}</VisuallyHidden>}
                  {hasArrow && (
                    <elm.div className="TooltipArrow" {...arrowProps} __css={{ bg: 'inherit' }} />
                  )}
                </elm.div>
              </elm.div>
            )}
          </Fade>
        </Portal>
      )}
    </>
  )
})
