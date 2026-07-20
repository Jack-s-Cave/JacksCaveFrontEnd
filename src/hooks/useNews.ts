import { blogsService } from "services/blogsService";
import { Blog } from "types/blog";
import { useEffect, useState } from "react";

export function useNews() {
  const [news, setNews] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    blogsService.getNews()
      .then(setNews)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { news, loading, error }
}
