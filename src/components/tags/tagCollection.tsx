import './tagCollection.css'
import { FaFolder } from "react-icons/fa"
import { Tag } from "types/filters"

interface TagCollectionProps {
  name: string
  tags: Tag[]
}

const TagCollection = ({name, tags}: TagCollectionProps) => {
  return (
    <div className="tag-collection">
      <div className='tag-collection-header'>
        <input type="checkbox"/> 
        <FaFolder />
        <h3 className='collection-name'>{name}</h3>
      </div>
      <div className='collection'>
        <div className='tag-list'>
          {tags.map(tag => (
            <div key={tag.label} className="tag-item">
              <input type="checkbox" id={tag.label} />
              <span>{tag.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TagCollection
