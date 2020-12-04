/** Responsive typography */
import { mode } from '../system'
import { rem } from './helpers'

export const typography = (props: any) => {
  const { responsiveFontSize, responsiveLineHeight } = props.theme
  const fontSize = responsiveFontSize.map((size: number) => rem(size))
  const lineHeight = responsiveLineHeight

  return {
    'fontFamily': 'body',
    'fontSize': fontSize,
    'lineHeight': 'base',
    'fontFeatureSettings': `"pnum"`,
    'fontVariantNumeric': 'proportional-nums',

    'h1, h2, h3, h4, h5, h6': {
      color: mode('heading', 'whiteAlpha.800')(props),
    },

    'h1': {
      fontWeight: 'extrabold',
      fontSize: ['4xl', '5xl', '5xl', '6xl'],
      lineHeight: ['snug', 'tight', 'tight', 'none'],
      marginTop: 0,
      marginBottom: [9, 11, 11, 12],
    },
    'h2': {
      fontWeight: 'bold',
      fontSize: ['3xl', '4xl', '4xl', '5xl'],
      lineHeight: ['snug', 'tight', 'tight', 'none'],
      marginTop: [14, 15, 15, 16],
      marginBottom: [8, 9, 9, 10],
    },
    'h3': {
      fontWeight: 'semibold',
      fontSize: ['2xl', '3xl', '3xl', '4xl'],
      lineHeight: ['snug', 'tight', 'tight', 'none'],
      marginTop: [12, 13, 13, 14],
      marginBottom: [6, 7, 7, 8],
    },
    'h4': {
      fontWeight: 'semibold',
      fontSize: ['xl', '2xl', '2xl', '3xl'],
      lineHeight: ['snug', 'tight', 'tight', 'none'],
      marginTop: [8, 9, 9, 10],
      marginBottom: [2, 3, 3, 4],
    },
    'h5': {
      fontWeight: 'semibold',
      fontSize: ['lg', 'xl', 'xl', '2xl'],
      lineHeight: ['snug', 'tight', 'tight', 'none'],
      marginTop: [6, 7, 7, 8],
      marginBottom: [0.5, 1, 1, 2],
    },
    'h6': {
      fontWeight: 'semibold',
      fontSize: ['base', 'lg', 'lg', 'xl'],
      lineHeight: ['snug', 'tight', 'tight', 'none'],
      marginTop: [4, 5, 5, 6],
      marginBottom: [0.5, 1, 1, 1.5],
    },
    'p': {
      fontSize,
      lineHeight,
      marginTop: [4, 5, 5, 6],
      marginBottom: [4, 5, 5, 6],
    },
    'a': {
      fontSize,
      lineHeight,
      color: 'gray.900',
      textDecoration: 'underline',
    },
    'strong': {
      color: 'gray.900',
      fontWeight: 'semibold',
    },
    'hr': {
      borderColor: mode('gray.300', 'whiteAlpha.300')(props),
      borderTopWidth: 1,
      marginTop: [12, 14, 14, 16],
      marginBottom: [12, 14, 14, 16],
    },
    'p + *': {
      marginTop: '0',
    },
    'hr + *': {
      marginTop: '0',
    },
    'h2 + *': {
      marginTop: '0',
    },
    'h3 + *': {
      marginTop: '0',
    },
    'h4 + *': {
      marginTop: '0',
    },
    'h5 + *': {
      marginTop: '0',
    },
    'h6 + *': {
      marginTop: '0',
    },
    'blockquote': {
      fontSize,
      lineHeight,
      fontWeight: 'medium',
      fontStyle: 'italic',
      color: mode('gray.900', 'whiteAlpha.900')(props),
      borderLeftWidth: '0.25rem',
      borderLeftColor: mode('gray.300', 'whiteAlpha.300')(props),
      quotes: '"\\201C""\\201D""\\2018""\\2019"',
      marginTop: [8, 9, 9, 10],
      marginBottom: [8, 9, 9, 10],
      paddingLeft: 7,
    },
    'blockquote p:first-of-type::before': {
      content: 'open-quote',
    },
    'blockquote p:last-of-type::after': {
      content: 'close-quote',
    },
    'figure figcaption': {
      color: 'gray.600',
      fontSize: ['sm', 'sm', 'base', 'base'],
      lineHeight: 6,
      marginTop: [2, 2.5, 2.5, 3],
    },
    'code': {
      color: 'gray.900',
      fontWeight: 'semibold',
      fontSize: ['sm', 'sm', 'base', 'base'],
    },
    'code::before': {
      content: '"`"',
    },
    'code::after': {
      content: '"`"',
    },
    'pre': {
      color: 'gray.300',
      backgroundColor: 'gray.800',
      overflowX: 'auto',
      fontSize: ['sm', 'sm', 'base', 'base'],
      lineHeight,
    },
    'pre code': {
      backgroundColor: 'transparent',
      borderWidth: '0',
      borderRadius: '0',
      padding: '0',
      fontWeight: 'normal',
      color: 'inherit',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      lineHeight: 'inherit',
    },
    'pre code::before': {
      content: '""',
    },
    'pre code::after': {
      content: '""',
    },
    'figure': {
      marginTop: [6, 8, 8, 10],
      marginBottom: [6, 8, 8, 10],
    },
    'figure > *': {
      marginTop: '0',
      marginBottom: '0',
    },
  }
}
