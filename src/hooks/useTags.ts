import { useEffect, useState } from 'react'
import { tagsService } from 'services/tagsService'
import { Tag } from 'types/filters'

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
