import { useEffect, useState } from 'react'
import { tagsService } from 'services/tagsService'
import { Tag } from 'types/filters'

const STORAGE_KEY = 'blog_selected_tags'

export function useTags() {
  const [tags, setTags]     = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState<string | null>(null)

  useEffect(() => {
    tagsService.getAllTags()
      .then(setTags)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { tags, loading, error }
}

export function useSelectedTags(availableTags: Tag[]) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (availableTags.length === 0) return
    const availableSlugs = availableTags.map(t => t.label)
    setSelectedSlugs(prev => prev.filter(slug => availableSlugs.includes(slug)))
  }, [availableTags])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSlugs))
  }, [selectedSlugs])

  const toggleTag = (slug: string) => {
    setSelectedSlugs(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    )
  }

  const removeTag = (slug: string) => {
    setSelectedSlugs(prev => prev.filter(s => s !== slug))
  }

  const clearTags = () => setSelectedSlugs([])

  return { selectedSlugs, toggleTag, removeTag, clearTags }
}
