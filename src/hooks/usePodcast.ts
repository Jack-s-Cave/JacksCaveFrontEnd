import { useEffect, useState } from "react"
import { podcastService } from "services/podcastService"
import { PodcastEpisode } from "types/podcast"

export function useAllPodcastEpisodes() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    podcastService.getAllEpisodes()
      .then(setEpisodes)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { episodes, loading, error }
}
