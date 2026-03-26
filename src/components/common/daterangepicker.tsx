import { Calendar } from 'lucide-react'
import './daterangepicker.css'
import { DateRange } from 'types/filters'

interface DateRangePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
  label?: string
}

export default function DateRangePicker({value, onChange, label = 'Fechas'}: DateRangePickerProps) {
  const { from, to } = value

  const handleChange =  (key: keyof DateRange, date: string): void => {
    const next: DateRange = { ...value, [key]: date }
    if (key === 'from' && next.to && date > next.to) next.to = date
    if (key === 'to' && next.from && date < next.from) next.from = date
    onChange(next)
  }

  return (
    <div className="date-picker">
      <h3>{label}<Calendar /></h3>
      <div className="fields">
        <label>
          <span>Desde</span>
          <input type="date" value={from}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('from', e.target.value)} />
        </label>
        <label>
          <span>Hasta</span>
          <input type="date" value={to} min={from}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('to', e.target.value)} />
        </label>
      </div>
    </div>
  )
}
