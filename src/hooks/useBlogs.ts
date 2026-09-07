import { useEffect, useMemo, useState } from 'react'
import { blogsService } from 'services/blogsService'
import { Blog } from 'types/blog'
import { BlogFilters } from 'types/filters'

function matchesFilters(blog: Blog, filters?: BlogFilters): boolean {
  if (!filters) return true
  const { from, to, tagLabels, query, authorName } = filters

  if (authorName && blog.author !== authorName) return false

  if (query) {
    const q = query.toLowerCase()
    const hit = blog.title.toLowerCase().includes(q) || blog.author.toLowerCase().includes(q)
    if (!hit) return false
  }

  if (tagLabels && tagLabels.length > 0) {
    const blogTagLabels = blog.tags.map(t => t.label)
    if (!tagLabels.some(label => blogTagLabels.includes(label))) return false
  }

  if (from && blog.date < from) return false
  if (to && blog.date > to) return false

  return true
}

export function useBlogs(filters?: BlogFilters) {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([])
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    blogsService.getAll()
      .then(all => {
        setAllBlogs(all)
        const recent = [...all]
          .sort((a, b) => (a.date < b.date ? 1 : -1))
          .slice(0, 6)
        setRecentBlogs(recent)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const blogs = useMemo(
    () => allBlogs.filter(blog => matchesFilters(blog, filters)),
    [allBlogs, filters?.from, filters?.to, filters?.tagLabels?.join(','), filters?.query, filters?.authorName]
  )

  return { blogs, recentBlogs, loading, error }
}

export function useBlogById(id: number) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    blogsService.getBlogByID(id)
      .then(setBlog)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  return { blog, loading, error }
}
