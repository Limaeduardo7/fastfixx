export function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl ${hover ? 'hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ children, className = '', ...props }) {
  return <div className={`p-6 ${className}`} {...props}>{children}</div>
}
