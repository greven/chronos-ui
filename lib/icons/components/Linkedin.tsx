import * as React from 'react'

function SvgLinkedin(props: React.SVGProps<SVGSVGElement>) {
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
      className="linkedin_svg__feather linkedin_svg__feather-linkedin"
      {...props}
    >
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx={4} cy={4} r={2} />
    </svg>
  )
}

export default SvgLinkedin
