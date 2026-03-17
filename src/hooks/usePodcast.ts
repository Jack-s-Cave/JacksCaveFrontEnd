import { useEffect, useState } from "react"
import { podcastService } from "services/pocastSerive"
import { PodcastEpisode } from "types/podcastEpisode"

export function usePodcast() {
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setTimeout(() => {
      podcastService.getAllEpisodes()
        .then(setPodcastEpisodes)
        .catch(e => setError(e.message))
        .finally(() => setLoading(false))
    }, 1500)
  }, [])

  return { podcastEpisodes, loading, error }
}
