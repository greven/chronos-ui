import * as React from 'react'

function SvgPlay(props: React.SVGProps<SVGSVGElement>) {
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
      className="play_svg__feather play_svg__feather-play"
      {...props}
    >
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  )
}

export default SvgPlay
