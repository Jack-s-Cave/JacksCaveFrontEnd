import { Tag } from "types/filters"

interface TagFilterProps {
  tags:         Tag[]
  selectedSlugs: string[]
  onToggle:     (slug: string) => void
}

export function TagFilter({ tags, selectedSlugs, onToggle }: TagFilterProps) {
  return (
    <div className="tags-list">
      {tags.map(tag => (
        <label key={tag.label} className="tag-checkbox">
          <input
            type="checkbox"
            checked={selectedSlugs.includes(tag.label)}
            onChange={() => onToggle(tag.label)}
          />
          <span>{tag.label}</span>
        </label>
      ))}
    </div>
  )
}
