import * as React from 'react'

function SvgArrowLeftCircle(props: React.SVGProps<SVGSVGElement>) {
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
      className="arrow-left-circle_svg__feather arrow-left-circle_svg__feather-arrow-left-circle"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M12 8l-4 4 4 4M16 12H8" />
    </svg>
  )
}

export default SvgArrowLeftCircle
