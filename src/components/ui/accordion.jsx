import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function Accordion({ children, className = '' }) {
  return <div className={`space-y-3 ${className}`}>{children}</div>
}

export function AccordionItem({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden transition-colors hover:border-white/[0.15]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
      >
        <span className="font-semibold text-white pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 animate-[faqOpen_0.3s_ease-out]">
          <p className="text-gray-400 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}
