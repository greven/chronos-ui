const baseFonts = {
  sans:
    '"Inter var", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
}

const fonts = {
  ...baseFonts,
  body: baseFonts.sans,
  heading: 'inherit',
  monospace: baseFonts.mono,
}

export const baseFontSizes = {
  0: '0.75rem',
  1: '0.875rem',
  2: '1rem',
  3: '1.125rem',
  4: '1.25rem',
  5: '1.5rem',
  6: '1.875rem',
  7: '2.25rem',
  8: '3rem',
  9: '4rem',
}

// Base Font Sizes with aliases
const fontSizes = {
  ...baseFontSizes,
  'xs': '0.75rem',
  'sm': '0.875rem',
  'base': '1rem',
  'lg': '1.125rem',
  'xl': '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '4rem',
  '7xl': '5rem',
  '8xl': '6rem',
  '9xl': '8rem',
}

const baseLineHeight = {
  'none': 1,
  'tight': 1.25,
  'snug': 1.375,
  'normal': 1.5,
  'relaxed': 1.625,
  'loose': 2,
  '2': 0.5,
  '3': 0.75,
  '4': 1,
  '5': 1.25,
  '6': 1.5,
  '7': 1.75,
  '8': 2,
  '9': 2.25,
  '10': 2.5,
}

const lineHeights = {
  ...baseLineHeight,
  sm: 1.25,
  base: 1.5,
  lg: 1.75,
}

const baseFontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

const fontWeights = {
  ...baseFontWeights,
  body: baseFontWeights.normal,
  heading: baseFontWeights.bold,
}

const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}

export const typography = {
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  responsiveFontSize: [14, 16, 16, 18],
  responsiveLineHeight: [lineHeights.sm, lineHeights.base, lineHeights.base, lineHeights.lg],
}

export type Typography = typeof typography
