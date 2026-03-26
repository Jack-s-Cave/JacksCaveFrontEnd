import { useEffect, useState } from 'react'
import { blogsService } from 'services/blogsService'
import { Blog } from 'types/blog'
import { BlogFilters } from 'types/filters'

export function useBlogs(filters?: BlogFilters) {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const hasFilters = filters && (
    filters.tagLabels?.length ||
    filters?.from ||
    filters?.to ||
    filters?.query
  )

  useEffect(() => {
    if (!hasFilters) {
      Promise.all([blogsService.getAll(), blogsService.getRecentBlogs()])
        .then(([all, recent]) => {
          setBlogs(all)
          setRecentBlogs(recent)
        })
        .catch(e => setError(e.message))
        .finally(() => setLoading(false))
      return
    }

    setLoading(true)
    blogsService
      .getFiltered({
        from: filters.from || undefined,
        to:   filters.to   || undefined,
        tagLabels: filters.tagLabels?.length ? filters.tagLabels : undefined,
        query: filters.query || undefined
      })
      .then(setBlogs)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))

  }, [filters?.from, filters?.to, filters?.tagLabels?.join(','), filters?.query])

  return { blogs, recentBlogs, loading, error }
}
