import { useEffect, useState } from "react"
import { blogsService } from "services/blogsService"
import { Blog } from "types/blog"

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      blogsService.getAll(),
      blogsService.getRecentBlogs()
    ])
      .then(([blogs, recent]) => {
        setBlogs(blogs)
        setRecentBlogs(recent)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { blogs, recentBlogs, loading, error }
}
