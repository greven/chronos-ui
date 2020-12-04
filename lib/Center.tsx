import React from 'react'
import { Box, BoxProps } from './Box'

export type CenterProps = BoxProps

/**
 * React component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 */
export const Center = (props: CenterProps) => (
  <Box display="flex" alignItems="center" justifyContent="center" {...props} />
)
