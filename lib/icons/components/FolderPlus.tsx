import * as React from 'react'

function SvgFolderPlus(props: React.SVGProps<SVGSVGElement>) {
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
      className="folder-plus_svg__feather folder-plus_svg__feather-folder-plus"
      {...props}
    >
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2zM12 11v6M9 14h6" />
    </svg>
  )
}

export default SvgFolderPlus
