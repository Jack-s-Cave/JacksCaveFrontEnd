import { newsService } from "services/newsService";
import { News } from "types/news";
import { useEffect, useState } from "react";

export function useNews() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    newsService.getAll()
      .then(setNews)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { news, loading, error }
}
