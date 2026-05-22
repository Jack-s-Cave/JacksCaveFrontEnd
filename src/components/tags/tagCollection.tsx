import './tagCollection.css'
import { FaFolder } from "react-icons/fa"
import { Tag } from "types/filters"
import { IoFolderOutline } from 'react-icons/io5'

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
          className='tag-label-checkbox'
          type="checkbox"
          checked={allSelected}
          onChange={handleToggleAll}
        /> 
        <IoFolderOutline className='folder-icon'/>
        <label className='tag-label'>{name}</label>
      </div>
      <div className='collection'>
        <div className='tag-list'>
          {tags.map(tag => (
            <div key={tag.label} className="tag-item">
              <input 
                className='tag-label-checkbox'
                type="checkbox"
                id={tag.label}
                checked={selectedSlugs.includes(tag.label)}
                onChange={() => onToggle(tag.label)}
              />
              <label className='tag-label'>{tag.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TagCollection
