import * as React from 'react'

function SvgMinus(props: React.SVGProps<SVGSVGElement>) {
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
      className="minus_svg__feather minus_svg__feather-minus"
      {...props}
    >
      <path d="M5 12h14" />
    </svg>
  )
}

export default SvgMinus
