import * as React from 'react'

function SvgPauseCircle(props: React.SVGProps<SVGSVGElement>) {
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
      className="pause-circle_svg__feather pause-circle_svg__feather-pause-circle"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M10 15V9M14 15V9" />
    </svg>
  )
}

export default SvgPauseCircle
