import { Info } from 'lucide-react'

export function InfoTooltip({ text, size = 14 }: { text: string; size?: number }) {
  return (
    <span className="relative group inline-flex">
      <Info size={size} className="text-gray-400 cursor-help" />
      <span className="pointer-events-none absolute left-0 top-full mt-2 w-max max-w-xs rounded-lg bg-gray-900 px-3 py-2 text-xs leading-relaxed text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 z-50">
        {text}
        <span className="absolute left-3 bottom-full border-4 border-transparent border-b-gray-900" />
      </span>
    </span>
  )
}
