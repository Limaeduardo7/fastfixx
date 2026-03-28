export function Badge({ children, variant = 'default', className = '', ...props }) {
  const variants = {
    default: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-white/5 text-gray-300 border-white/10',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    destructive: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider border rounded-full ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
