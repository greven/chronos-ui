import * as React from 'react'

function SvgFile(props: React.SVGProps<SVGSVGElement>) {
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
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <line x1="4" y1="6" x2="11" y2="6" />
      <line x1="4" y1="12" x2="11" y2="12" />
      <line x1="4" y1="18" x2="13" y2="18" />
      <polyline points="15 9 18 6 21 9" />
      <line x1="18" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export default SvgFile
