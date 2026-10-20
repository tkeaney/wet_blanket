interface LogoProps {
  size?: number
  className?: string
}

/** The mascot: a sick little gremlin with a purple blanket wrapped around its head. */
export function Logo({ size = 32, className }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* blanket: hood + drape */}
      <circle cx="32" cy="28" r="22" fill="#8b70cc" />
      <path d="M16.5 42.5 Q32 40 47.5 41.5 L49.5 64 H15.5 Z" fill="#8b70cc" />
      <path d="M24 46 Q30 52 29 64" stroke="#7459b6" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <circle cx="21" cy="53" r="1.1" fill="#c7b8ec" />
      <circle cx="39" cy="50" r="1.1" fill="#c7b8ec" />
      <circle cx="42" cy="58" r="1.1" fill="#c7b8ec" />
      {/* droopy ears poking out of the hood */}
      <path d="M12.5 23.5 Q5 27 1.5 34 Q8 33.5 13.5 31 Z" fill="#9fc39a" />
      <path d="M51.5 23.5 Q59 27 62.5 34 Q56 33.5 50.5 31 Z" fill="#9fc39a" />
      <path d="M11 27 Q7 29.5 5 32 M53 27 Q57 29.5 59 32" stroke="#e8a59c" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      {/* hood opening, face, and the rim folded over the forehead */}
      <circle cx="32" cy="29" r="15.5" fill="#6a51a8" />
      <ellipse cx="32" cy="30" rx="13" ry="12.5" fill="#a9cba0" />
      <path d="M16.5 27 Q18 13.5 32 13 Q46 13.5 47.5 27 Q40 19.5 32 19.5 Q24 19.5 16.5 27 Z" fill="#a68fdc" />
      {/* tired eyes */}
      <path d="M23.2 28 a3.3 3.3 0 0 0 6.6 0 Z M34.2 28 a3.3 3.3 0 0 0 6.6 0 Z" fill="#33392f" />
      <path d="M22.6 28 H30.4 M33.6 28 H41.4" stroke="#7da176" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M24 32.6 q2.5 1.2 5 0 M35 32.6 q2.5 1.2 5 0" stroke="#86a97e" strokeWidth="0.9" strokeLinecap="round" />
      {/* fever cheeks + sniffly nose */}
      <ellipse cx="21.5" cy="33.5" rx="2.6" ry="1.6" fill="#ec9c92" opacity="0.55" />
      <ellipse cx="42.5" cy="33.5" rx="2.6" ry="1.6" fill="#ec9c92" opacity="0.55" />
      <ellipse cx="32" cy="32.6" rx="1.9" ry="1.5" fill="#e3877c" />
      {/* wobbly mouth + thermometer */}
      <path d="M27.5 37.5 q1.5 -1 3 0 q1.5 1 3 0" stroke="#33392f" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M33 37.3 L43 41.5" stroke="#f4f1ea" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M41.2 40.7 L43 41.5" stroke="#e3877c" strokeWidth="2.2" strokeLinecap="round" />
      {/* sweat drop */}
      <path d="M44.5 17.5 q-2 3 0 4.2 q2 -1.2 0 -4.2 Z" fill="#a9cfe6" />
    </svg>
  )
}
