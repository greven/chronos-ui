import * as React from 'react'

function SvgAnchor(props: React.SVGProps<SVGSVGElement>) {
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
      className="anchor_svg__feather anchor_svg__feather-anchor"
      {...props}
    >
      <circle cx={12} cy={5} r={3} />
      <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3" />
    </svg>
  )
}

export default SvgAnchor
