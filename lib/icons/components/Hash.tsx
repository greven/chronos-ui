import * as React from 'react'

function SvgHash(props: React.SVGProps<SVGSVGElement>) {
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
      className="hash_svg__feather hash_svg__feather-hash"
      {...props}
    >
      <path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18" />
    </svg>
  )
}

export default SvgHash
