import { mode } from '../system'
import { Styles } from './types'
import { typography } from './typography'

const styles: Styles = {
  global: (props: any) => ({
    'color': mode('text.light', 'text.dark')(props),
    'bg': mode('body.light', 'body.dark')(props),
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.400')(props),
    },
    '*, *::before, &::after': {
      borderColor: mode('border.light', 'border.dark')(props),
      wordWrap: 'break-word',
    },
    ...typography(props),
  }),
}

export default styles
