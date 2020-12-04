import React from 'react'
import { elm, forwardRef, PropsOf, SystemProps } from './system'

export interface GridOptions {
  /**
   * Short hand prop for `gridTemplateColumns`
   */
  templateColumns?: SystemProps['gridTemplateColumns']
  /**
   * Short hand prop for `gridGap`
   */
  gap?: SystemProps['gridGap']
  /**
   * Short hand prop for `gridRowGap`
   */
  rowGap?: SystemProps['gridRowGap']
  /**
   * Short hand prop for `gridColumnGap`
   */
  columnGap?: SystemProps['gridColumnGap']
  /**
   * Short hand prop for `gridAutoFlow`
   */
  autoFlow?: SystemProps['gridAutoFlow']
  /**
   * Short hand prop for `gridAutoRows`
   */
  autoRows?: SystemProps['gridAutoRows']
  /**
   * Short hand prop for `gridAutoColumns`
   */
  autoColumns?: SystemProps['gridAutoColumns']
  /**
   * Short hand prop for `gridTemplateRows`
   */
  templateRows?: SystemProps['gridTemplateRows']
  /**
   * Short hand prop for `gridTemplateAreas`
   */
  templateAreas?: SystemProps['gridTemplateAreas']
  /**
   * Short hand prop for `gridArea`
   */
  area?: SystemProps['gridArea']
  /**
   * Short hand prop for `gridColumn`
   */
  column?: SystemProps['gridColumn']
  /**
   * Short hand prop for `gridRow`
   */
  row?: SystemProps['gridRow']
}

export type GridLayoutProps = GridOptions & PropsOf<typeof elm.div>

/**
 * React component used to create grid layouts.
 *
 * It renders a `div` with `display: grid` and
 * comes with helpful style shorthand.
 *
 * Example:
 *
 *    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
 *      <Box width="100%" height="10" bg="blue.5" />
 *      <Box width="100%" height="10" bg="blue.5" />
 *      <Box width="100%" height="10" bg="blue.5" />
 *    </Grid>
 *
 */
export const Grid = forwardRef<GridLayoutProps, 'div'>(function Grid(
  props: GridLayoutProps,
  ref: any
) {
  const {
    area,
    templateAreas,
    gap,
    rowGap,
    columnGap,
    column,
    row,
    autoFlow,
    autoRows,
    templateRows,
    autoColumns,
    templateColumns,
    ...rest
  } = props

  return (
    <elm.div
      ref={ref}
      display="grid"
      gridArea={area}
      gridTemplateAreas={templateAreas}
      gridGap={gap}
      gridRowGap={rowGap}
      gridColumnGap={columnGap}
      gridAutoColumns={autoColumns}
      gridColumn={column}
      gridRow={row}
      gridAutoFlow={autoFlow}
      gridAutoRows={autoRows}
      gridTemplateRows={templateRows}
      gridTemplateColumns={templateColumns}
      {...rest}
    />
  )
})
