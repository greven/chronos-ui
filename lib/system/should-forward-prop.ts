import { propNames } from './styled-system'
import { memoize } from '../util'

// Props for emotion to omit from the DOM.
const allPropNames = [
  ...propNames,
  'textStyle',
  'layerStyle',
  'apply',
  'isTruncated',
  'noOfLines',
  'focusBorderColor',
  'errorBorderColor',
  'as',
  '__css',
  'css',
  'sx',
]

const validHTMLProps = ['htmlWidth', 'htmlHeight', 'htmlSize']

function createShouldForwardProp(props: any) {
  const regex = new RegExp(`^(${props.join('|')})$`)
  return memoize((prop: string) => {
    if (validHTMLProps.includes(prop)) return true
    return !regex.test(prop)
  })
}

export const shouldForwardProp = createShouldForwardProp(allPropNames)
