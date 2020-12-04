import React from 'react'
import { useTheme, PropsOf, elm } from './system'
import { getBreakpoints } from './util'

export type ContainerProps = PropsOf<typeof elm.div> & {
  /** If `true`, the left and right padding is removed. */
  noGutter?: boolean
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   */
  maxContainerWidth?: 'sm' | 'md' | 'lg' | 'xl' | false
}

export const Container: React.FC<ContainerProps> = ({
  maxContainerWidth = 'xl',
  noGutter = false,
  ...rest
}: ContainerProps) => {
  const theme = useTheme()
  const breakpoints = getBreakpoints(theme)

  return (
    <elm.div
      className="Container"
      __css={{
        width: '100%',
        maxWidth: maxContainerWidth ? breakpoints[maxContainerWidth] : breakpoints['xl'],
        mx: 'auto',
        my: 0,
        px: noGutter ? 0 : [4, 4, 6],
        py: 0,
      }}
      {...rest}
    />
  )
}
