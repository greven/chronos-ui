import * as React from 'react'

function SvgServer(props: React.SVGProps<SVGSVGElement>) {
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
      className="server_svg__feather server_svg__feather-server"
      {...props}
    >
      <rect x={2} y={2} width={20} height={8} rx={2} ry={2} />
      <rect x={2} y={14} width={20} height={8} rx={2} ry={2} />
      <path d="M6 6h.01M6 18h.01" />
    </svg>
  )
}

export default SvgServer
