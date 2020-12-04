export const breakpoints: any = ['640px', '768px', '1024px', '1280px']
// export const breakpoints: any = [640, 768, 1024, 1280]

/**
 * Breakpoint aliases
 *
 * This is needed for object responsive
 * breakpoints to work.
 */
breakpoints.xs = 0
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

export type Breakpoints = typeof breakpoints
