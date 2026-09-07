import { informationService } from "services/informationService";
import { Information } from "types/information";
import { useEffect, useState } from "react";

export function useNews() {
  const [news, setNews] = useState<Information[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    informationService.getAll()
      .then(setNews)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { news, loading, error }
}
