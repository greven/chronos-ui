const property = {
  none: 'none',
  all: 'all',
  default: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
  colors: 'background-color, border-color, color, fill, stroke',
  opacity: 'opacity',
  shadow: 'box-shadow',
  transform: 'transform',
  dimensions: 'width, height',
  position: 'left, right, top, bottom',
  background: 'background-color, background-image, background-position',
}

const timingFunction = {
  'linear': 'linear',
  'in': 'cubic-bezier(0.4, 0, 1, 1)',
  'out': 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
}

const duration = {
  'ultra-fast': '50ms',
  'faster': '100ms',
  'fast': '150ms',
  'normal': '200ms',
  'slow': '300ms',
  'slower': '400ms',
  'ultra-slow': '500ms',
  50: '50ms',
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
}

export const transitions = {
  property,
  timingFunction,
  duration,
}

export type Transitions = typeof transitions
