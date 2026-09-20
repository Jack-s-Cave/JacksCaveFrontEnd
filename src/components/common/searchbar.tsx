import './searchbar.css'
import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="search-container">
      <Search size={18} className="search-icon" />

      <input
        type="text"
        placeholder="Buscar..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar
