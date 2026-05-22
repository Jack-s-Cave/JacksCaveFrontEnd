import './tagCollection.css'
import { FaFolder } from "react-icons/fa"
import { Tag } from "types/filters"

interface TagCollectionProps {
  name: string
  tags: Tag[]
  selectedSlugs: string[]
  onToggle: (slug: string) => void
}

const TagCollection = ({ name, tags, selectedSlugs, onToggle }: TagCollectionProps) => {
  const allSelected = tags.every(tag => selectedSlugs.includes(tag.label))

  const handleToggleAll = () => {
    if (allSelected) {
      tags.forEach(tag => onToggle(tag.label))
    } else {
      tags.filter(tag => !selectedSlugs.includes(tag.label))
          .forEach(tag => onToggle(tag.label))
    }
  }

  return (
    <div className="tag-collection">
      <div className='tag-collection-header'>
        <input 
          type="checkbox"
          checked={allSelected}
          onChange={handleToggleAll}
        /> 
        <FaFolder />
        <h3 className='collection-name'>{name}</h3>
      </div>
      <div className='collection'>
        <div className='tag-list'>
          {tags.map(tag => (
            <div key={tag.label} className="tag-item">
              <input 
                type="checkbox"
                id={tag.label}
                checked={selectedSlugs.includes(tag.label)}
                onChange={() => onToggle(tag.label)}
              />
              <span>{tag.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TagCollection
