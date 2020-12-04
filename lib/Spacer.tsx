import React from 'react'
import { Box, BoxProps } from './Box'

export type SpacerProps = BoxProps

/**
 * A flexible flex spacer that expands along the major axis of its
 * containing flex layout. It renders a `div` by default, and takes up
 * any available space.
 */
export const Spacer = (props: SpacerProps) => (
  <Box flex={1} justifySelf="stretch" alignSelf="stretch" {...props} />
)
