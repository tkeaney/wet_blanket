interface LogoProps {
  size?: number
  className?: string
}

/** A little green blob, cozy in a purple blanket. */
export function Logo({ size = 32, className }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* body */}
      <path d="M32 7c12 0 21 9.5 21 23.5S45 55 32 55 11 44.5 11 30.5 20 7 32 7Z" fill="#86bb8c" />
      <path d="M22 13c3-3 7-4.5 10-4.5" stroke="#b6d9ba" strokeWidth="3" strokeLinecap="round" />
      {/* face */}
      <ellipse cx="25.5" cy="26" rx="2.3" ry="2.8" fill="#2f3a31" />
      <ellipse cx="38.5" cy="26" rx="2.3" ry="2.8" fill="#2f3a31" />
      <circle cx="26.3" cy="25" r="0.8" fill="#fff" />
      <circle cx="39.3" cy="25" r="0.8" fill="#fff" />
      <ellipse cx="21" cy="31" rx="3" ry="1.8" fill="#f0a3a0" opacity="0.7" />
      <ellipse cx="43" cy="31" rx="3" ry="1.8" fill="#f0a3a0" opacity="0.7" />
      <path d="M29 30.5c1.6 1.6 4.4 1.6 6 0" stroke="#2f3a31" strokeWidth="1.8" strokeLinecap="round" />
      {/* blanket */}
      <path d="M6 38c8-4 17-3 26-3s18-1 26 3l-2.5 15c-6 6-15 8-23.5 8s-17.5-2-23.5-8L6 38Z" fill="#8b70cc" />
      <path d="M6 38c8-4 17-3 26-3s18-1 26 3" stroke="#a68fdc" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 36c3 8 10 13 21 15" stroke="#5a4392" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <circle cx="18" cy="47" r="1.4" fill="#d9cdf1" />
      <circle cx="25" cy="53" r="1.4" fill="#d9cdf1" />
      <circle cx="13" cy="54" r="1.4" fill="#d9cdf1" />
      {/* little hands holding the blanket */}
      <ellipse cx="22" cy="36.5" rx="3.6" ry="2.6" fill="#86bb8c" />
      <ellipse cx="42" cy="36.5" rx="3.6" ry="2.6" fill="#86bb8c" />
    </svg>
  )
}
