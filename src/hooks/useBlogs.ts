import { useEffect, useState } from "react"
import { blogsService } from "services/blogsService"
import { Blog } from "types/blog"

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    blogsService.getAll()
      .then(setBlogs)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { blogs, loading, error }
}
