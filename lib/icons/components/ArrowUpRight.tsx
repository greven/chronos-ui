import * as React from 'react'

function SvgArrowUpRight(props: React.SVGProps<SVGSVGElement>) {
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
      className="arrow-up-right_svg__feather arrow-up-right_svg__feather-arrow-up-right"
      {...props}
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  )
}

export default SvgArrowUpRight
