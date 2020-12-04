import React from 'react'
import { elm, forwardRef, PropsOf } from './system'
import { cx } from './util'

const useComponentStyle = () => {
  return {
    base: {
      width: '100%',
    },
  }
}

export interface ComponentOptions {
  children?: React.ReactNode
}

export type ComponentWithRefProps = ComponentOptions & PropsOf<typeof elm.div>

export const ComponentWithRef = forwardRef<ComponentWithRefProps, 'div'>(
  (props: ComponentWithRefProps, ref: any) => {
    const { children, className, ...rest } = props

    const styles = useComponentStyle()

    return (
      <elm.div ref={ref} className={cx('ComponentName', className)} __css={styles.base} {...rest}>
        {children}
      </elm.div>
    )
  }
)

export type ComponentProps = ComponentOptions & PropsOf<typeof elm.div>

export const Component: React.FC<ComponentProps> = (props) => {
  const { children, className, ...rest } = props

  const styles = {
    base: {
      width: '100%',
    },
  }

  return (
    <elm.div className={cx('ComponentName', className)} __css={styles.base} {...rest}>
      {children}
    </elm.div>
  )
}
