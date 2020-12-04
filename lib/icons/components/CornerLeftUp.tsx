import * as React from 'react'

function SvgCornerLeftUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="corner-left-up_svg__feather corner-left-up_svg__feather-corner-left-up"
      {...props}
    >
      <path d="M14 9L9 4 4 9" />
      <path d="M20 20h-7a4 4 0 01-4-4V4" />
    </svg>
  )
}

export default SvgCornerLeftUp
