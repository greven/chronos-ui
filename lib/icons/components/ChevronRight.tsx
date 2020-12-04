import * as React from 'react'

function SvgChevronRight(props: React.SVGProps<SVGSVGElement>) {
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
      className="chevron-right_svg__feather chevron-right_svg__feather-chevron-right"
      {...props}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export default SvgChevronRight
