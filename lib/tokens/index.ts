import { borderWidths, borders } from './borders'
import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { opacities } from './opacities'
import { radii } from './radii'
import { shadows } from './shadows'
import { sizes, space } from './spacing'
import { transforms } from './transforms'
import { transitions } from './transitions'
import { typography } from './typography'
import { zIndices } from './z-index'

export * from './borders'
export * from './breakpoints'
export * from './colors'
export * from './opacities'
export * from './radii'
export * from './shadows'
export * from './spacing'
export * from './transforms'
export * from './transitions'
export * from './typography'
export * from './z-index'

export const tokens = {
  ...typography,
  borderWidths,
  borders,
  breakpoints,
  colors,
  opacities,
  radii,
  shadows,
  sizes,
  space,
  zIndices,
  transforms,
  transitions,
}
