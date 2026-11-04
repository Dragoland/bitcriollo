export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-lg font-bold ${className}`}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-primary">
        <path
          d="M11 2C9.5 5 7 8.5 7 12c0 2.5 1.5 4.5 4 6.5C13.5 16.5 15 14.5 15 12c0-3.5-2.5-7-4-10z"
          fill="currentColor"
        />
        <path d="M8.5 12.5c.3 1.2 1.2 2.8 2.5 4.5 1.3-1.7 2.2-3.3 2.5-4.5H8.5z" className="fill-background" />
      </svg>
      <span className="text-primary">
        Bit<span className="text-hardware">Criollo</span>
      </span>
    </span>
  )
}
