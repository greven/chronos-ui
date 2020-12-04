import { Dict } from '../util'
import {
  SpaceProps,
  ColorProps,
  TypographyProps,
  LayoutProps,
  FlexboxProps,
  GridProps,
  BorderProps,
  PositionProps,
  OtherProps,
  BackgroundProps,
  ShadowProps,
  OutlineProps,
  ListProps,
  TransitionProps,
} from './config'
import { SystemStyleObject } from './css.types'
import { PseudoProps } from './pseudo'

export interface SystemProps extends AllProps, PseudoProps<AllProps> {}

export interface UIProps extends SystemProps, ValidHTMLProps {
  children?: React.ReactNode
  /**
   * if `true`, it'll render an ellipsis when the text exceeds the width of the viewport or maxWidth set.
   */
  isTruncated?: boolean
  /**
   * Used to truncate text at a specific number of lines
   */
  noOfLines?: number
  /**
   * Used for internal css management
   * @private
   */
  __css?: SystemStyleObject
}

export type ResponsiveArray<T> = Array<T | null>

export type ResponsiveObject<T> = { [breakpoint: string]: T }

export type ResponsiveValue<T> = T | ResponsiveArray<T> | ResponsiveObject<T>

export type Length = string | 0 | number

export type As = React.ElementType<any>

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>

export type WithAs<P, T extends As> = P &
  Omit<PropsOf<T>, 'as' | keyof P> & {
    as?: T
  }

/** UI Element size, typically ranging from xs to xl. */
export type ElementSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Integrating with `framer-motion` makes transition prop throw
 * an TS error, since `transition` is part of the system props.
 *
 * To support `framer-motion`, we'll omit transition props from the
 * system props if you do this `elm(motion.div)`
 */
export type WithUI<P> = P extends { transition?: any }
  ? P & Omit<UIProps, 'transition'>
  : P & UIProps

type Merge<T extends As, P> = P & Omit<PropsOf<T>, keyof P>

type Exotic<P> =
  | (<T>(props: { as?: T } & (T extends As ? Merge<T, P> : P)) => JSX.Element)
  | ((props: P & { as?: As }) => JSX.Element)

export type ForwardRefComponent<P> = Exotic<P> & {
  displayName?: string
  propTypes?: React.WeakValidationMap<P>
  defaultProps?: Partial<P>
  contextTypes?: React.ValidationMap<any>
  id?: string
}

interface ValidHTMLProps {
  htmlWidth?: string | number
  htmlHeight?: string | number
  htmlSize?: string | number
}

export interface AllProps
  extends SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps,
    FlexboxProps,
    GridProps,
    BorderProps,
    PositionProps,
    OtherProps,
    BackgroundProps,
    ShadowProps,
    OutlineProps,
    ListProps,
    TransitionProps {}

/**
 * Regular component means:
 *
 * - Read the props of the component using the `PropsOf` utility
 * - Add UI props to it using `withUI`
 * - Add the `as` prop. in this case, it doesn't do anything special.
 * - Return a JSX Element
 */
type RegularComponent<T extends As, P> = (
  props: WithUI<Omit<PropsOf<T>, 'size' | 'as' | keyof P>> & P & { as?: As }
) => JSX.Element

/**
 * Extensible component means:
 *
 * - Read the props of the component using the `PropsOf` utility
 * - Use a typescript generic `TT` to store the component passed in the `as` prop
 * - Use the `WithAs` to merge the base component prop with `as` component prop
 * - Add UI props to the resulting types.
 */
type ExtensibleComponent<T extends As, P> = <TT extends As = T>(
  props: WithUI<WithAs<PropsOf<T>, TT>> & P
) => JSX.Element

type Comp<T extends As, P> = RegularComponent<T, P> | ExtensibleComponent<T, P>

export type UIComponent<T extends As, P extends Dict = {}> = Comp<T, P> & {
  displayName?: string
  propTypes?: React.WeakValidationMap<Omit<PropsOf<T>, 'size'> & P>
  defaultProps?: Partial<Omit<PropsOf<T>, 'size'> & P & UIProps>
}
