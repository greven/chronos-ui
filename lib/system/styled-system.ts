import { compose } from '@styled-system/core'
import { pseudoPropNames } from './pseudo-selector'
import {
  background,
  border,
  color,
  flexbox,
  grid,
  others,
  position,
  shadow,
  space,
  typography,
  layout,
  outline,
  list,
  transition,
} from './config'

export {
  border as BorderSystem,
  background as BackgroundSystem,
  color as ColorSystem,
  flexbox as FlexboxSystem,
  grid as GridSystem,
  layout as LayoutSystem,
  position as PositionSystem,
  shadow as ShadowSystem,
  space as SpaceSystem,
  typography as TypographySystem,
  others as OthersSystem,
  outline as OutlineSystem,
  list as ListSystem,
  transition as TransitionSystem,
}

export const systemProps = compose(
  background,
  border,
  color,
  flexbox,
  grid,
  others,
  position,
  shadow,
  space,
  typography,
  layout,
  outline,
  list,
  transition
)

// @ts-ignore
export const propNames = [...systemProps.propNames, ...pseudoPropNames]

export const layoutSystemProps = compose(space, layout, flexbox, grid, position)

// @ts-ignore
export const layoutPropNames = [...layoutSystemProps.propNames]
