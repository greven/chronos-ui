import * as React from 'react'
import { useSafeLayoutEffect } from './hooks'
import { elm, PropsOf, useColorModeValue } from './system'
import { createContext, runIfFn, ReactNodeOrRenderProp } from './util'
import { usePopover, UsePopoverProps, UsePopoverReturn } from './usePopover'
import { CloseButton, CloseButtonProps } from './IconButton'

const [PopoverContextProvider, usePopoverContext] = createContext<UsePopoverReturn>({
  name: 'PopoverContext',
})

export type PopoverProps = UsePopoverProps & {
  /**
   * The content of the popover. It's usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children?: ReactNodeOrRenderProp<{ isOpen: boolean; onClose(): void }>
}

/**
 * Popover
 *
 * React component used to Popovers are used to bring attention
 * to specific user interface elements, typically to suggest an
 * action or to guide users through a new experience.
 *
 * Example:
 *  <Popover closeOnBlur={false} placement="right">
 *    <PopoverTrigger>
 *      <Button intent="info">Trigger</Button>
 *    </PopoverTrigger>
 *    <PopoverContent zIndex={4}>
 *      <PopoverArrow />
 *      <PopoverCloseButton />
 *      <PopoverHeader>Confirmation!</PopoverHeader>
 *        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
 *    </PopoverContent>
 *  </Popover>
 */
export function Popover(props: PopoverProps) {
  const { children, ...hookProps } = props
  const context = usePopover(hookProps)

  return (
    <PopoverContextProvider value={context}>
      {runIfFn(children, {
        isOpen: context.isOpen,
        onClose: context.onClose,
      })}
    </PopoverContextProvider>
  )
}

/**
 * PopoverTrigger
 *
 * The trigger for the popover. It must be an interactive element
 * such as `button` or `a`.
 */
export const PopoverTrigger: React.FC = (props) => {
  // enforce a single child
  const child = React.Children.only(props.children) as React.ReactElement<any>
  const { getTriggerProps } = usePopoverContext()

  return React.cloneElement(child, getTriggerProps(child.props))
}

/**
 * Theming
 *
 * To change the global styles of Popover Content,
 * go to `theme.components.Popover` under the `Content` key
 */
const StyledContent = elm('section', {
  baseStyle: {
    w: '100%',
    maxW: 'xs',
    position: 'relative',
    borderRadius: 'md',
    boxShadow: 'md',
    outline: 'none',
    fontSize: 'sm',
    zIndex: 1,
  },
})

export type PopoverContentProps = PropsOf<typeof StyledContent>

/**
 * PopoverContent
 *
 * The popover's content wrapper that includes all
 * accessibility requirements for a popover
 */
export const PopoverContent = React.forwardRef(function PopoverContent(
  props: PopoverContentProps,
  ref: React.Ref<any>
) {
  const { getPopoverProps } = usePopoverContext()
  const bg = useColorModeValue('surface.light', 'surface.dark')
  const color = useColorModeValue('text.light', 'text.dark')

  return (
    <StyledContent
      className="Popover__content"
      __css={{
        bg,
        color,
      }}
      {...getPopoverProps({ ...props, ref })}
    />
  )
})

/**
 * Theming
 *
 * To change the global styles of Popover Header,
 * go to `theme.components.Popover` under the `Header` key
 */
const StyledHeader = elm('header', {
  baseStyle: {
    fontWeight: 'medium',
    pt: 4,
    px: 4,
    mb: -1,
  },
})

export type PopoverHeaderProps = PropsOf<typeof StyledHeader>

/**
 * Popover Header
 *
 * This servers as the accessible header or label
 * for the popover's content and it's first announced by
 * screenreaders.
 */
export const PopoverHeader = React.forwardRef(function PopoverHeader(
  props: PopoverHeaderProps,
  ref: React.Ref<any>
) {
  const { headerId, setHasHeader } = usePopoverContext()

  useSafeLayoutEffect(() => {
    setHasHeader.on()
    return () => setHasHeader.off()
  }, [])

  const color = useColorModeValue('gray.900', 'gray.100')

  return <StyledHeader className="Popover__header" {...props}
  __css={{
    color,
  }}
  id={headerId} ref={ref} />
})

export type PopoverBodyProps = PropsOf<typeof StyledBody>

/**
 * Theming
 *
 * To change the global styles of Popover Body,
 * go to `theme.components.Popover` under the `Body` key
 */
const StyledBody = elm('div', {
  baseStyle: {
    my: '4',
    px: '4',
  },
})

/**
 * PopoverBody
 *
 * Serves as the main content area for the popover. Should contain
 * at least one interactive element.
 */
export const PopoverBody = React.forwardRef(function PopoverBody(
  props: PopoverBodyProps,
  ref: React.Ref<any>
) {
  const { bodyId, setHasBody } = usePopoverContext()

  useSafeLayoutEffect(() => {
    setHasBody.on()
    return () => setHasBody.off()
  }, [])

  return <StyledBody className="Popover__body" {...props} id={bodyId} ref={ref} />
})

export const StyledFooter = elm('footer', {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    borderBottomLeftRadius: 'md',
    borderBottomRightRadius: 'md',
    py: 3,
    px: 4,
  },
})

export type PopoverFooterProps = PropsOf<typeof StyledFooter>

/**
 * PopoverFooter
 *
 * The popover footer content.
 */
export const PopoverFooter = React.forwardRef(function PopoverFooter(
  props: PopoverFooterProps,
  ref: React.Ref<any>
) {
  return <StyledFooter className="Popover_footer" ref={ref} {...props} />
})

export type PopoverCloseButtonProps = CloseButtonProps

/**
 * PopoverCloseButton
 *
 * The button to close the popover
 */
export function PopoverCloseButton({ size = 'sm', ...rest }: CloseButtonProps) {
  const { onClose } = usePopoverContext()
  return (
    <CloseButton
      size={size}
      onClick={onClose}
      position="absolute"
      borderRadius="md"
      top={1}
      right={2}
      padding={2}
      {...rest}
    />
  )
}

const StyledArrow = elm('div', {
  baseStyle: {},
})

export type PopoverArrowProps = PropsOf<typeof StyledArrow>

export function PopoverArrow(props: PopoverArrowProps) {
  const { getArrowProps } = usePopoverContext()
  return <StyledArrow className="Popover__arrow" bg="inherit" {...getArrowProps(props)} />
}
