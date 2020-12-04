import React from 'react'
import { elm, forwardRef, PropsOf } from './system'
import { cx } from './util'

const useSliderStyle = () => {
  return {
    base: {
      width: '100%',
    },
  }
}

export interface SliderOptions {
  children?: React.ReactNode
}

export type SliderProps = SliderOptions & PropsOf<typeof elm.div>

export const Slider = forwardRef<SliderProps, 'div'>((props: SliderProps, ref: any) => {
  const { children, className, ...rest } = props

  const styles = useSliderStyle()

  return (
    <elm.div ref={ref} className={cx('Slider', className)} __css={styles.base} {...rest}>
      {children}
    </elm.div>
  )
})
