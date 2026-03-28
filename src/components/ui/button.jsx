export function Button({ children, variant = 'default', size = 'default', className = '', ...props }) {
  const variants = {
    default: 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20',
    outline: 'border border-white/15 hover:bg-white/5 text-white',
    ghost: 'hover:bg-white/5 text-gray-300',
    secondary: 'bg-white/5 hover:bg-white/10 text-white border border-white/10',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
