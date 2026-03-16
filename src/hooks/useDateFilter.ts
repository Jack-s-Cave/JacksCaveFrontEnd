import { DateRange } from 'components/common/daterangepicker'
import { useState, useMemo } from 'react'

interface UseDateFilterReturn<T> {
  range:    DateRange
  setRange: (r: DateRange) => void
  filtered: T[]
}

  export default function formatDate(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric', 
      year: 'numeric'
    })
  }


export function useDateFilter<
T extends Record<string, unknown>
>(
  items: 
T[]
,
  dateField: 
keyof T
 = 'date' as keyof T
)
: UseDateFilterReturn<T>
 {

  const [range, setRange] = useState<
DateRange
>({ from: '', to: '' })

  const filtered = useMemo(() => {
    if (!range.from && !range.to) return items
    return items.filter(item => {
      const d = new Date(item[dateField] as string)
      if (range.from && d < new Date(range.from)) return false
      if (range.to   && d > new Date(range.to))   return false
      return true
    })
  }, [items, range, dateField])

  return { range, setRange, filtered }
}
