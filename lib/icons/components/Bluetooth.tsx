import * as React from 'react'

function SvgBluetooth(props: React.SVGProps<SVGSVGElement>) {
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
      className="bluetooth_svg__feather bluetooth_svg__feather-bluetooth"
      {...props}
    >
      <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" />
    </svg>
  )
}

export default SvgBluetooth
