const translate = {
  '0': '0',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '32': '8rem',
  '40': '10rem',
  '48': '12rem',
  '56': '14rem',
  '64': '16rem',
  px: '1px',
  '-full': '-100%',
  '-1/2': '-50%',
  '1/2': '50%',
  full: '100%',
}

const scale = {
  '0': '0',
  '50': '.5',
  '75': '.75',
  '90': '.9',
  '95': '.95',
  '100': '1',
  '105': '1.05',
  '110': '1.1',
  '125': '1.25',
  '150': '1.5',
}

const rotate = {
  '0': '0',
  '45': '45deg',
  '90': '90deg',
  '180': '180deg',
  '-180': '-180deg',
  '-90': '-90deg',
  '-45': '-45deg',
}

const skew = {
  '0': '0',
  '3': '3deg',
  '6': '6deg',
  '12': '12deg',
  '-12': '-12deg',
  '-6': '-6deg',
  '-3': '-3deg',
}

const transformOrigin = {
  center: 'center',
  top: 'top',
  'top-right': 'top right',
  right: 'right',
  'bottom-right': 'bottom right',
  bottom: 'bottom',
  'bottom-left': 'bottom left',
  left: 'left',
  'top-left': 'top left',
}

export const transforms = {
  translate,
  scale,
  rotate,
  skew,
  transformOrigin,
}

export type Transforms = typeof transforms
