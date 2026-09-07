import { useEffect, useState } from "react";
import { podcastCrewService } from "services/podcastCrewService";
import { PodcastCrew } from "types/podcastCrew";

export function usePodcastCrew() {
  const [crew, setCrew] = useState<PodcastCrew | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    podcastCrewService.get()
      .then(setCrew)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { crew, loading, error }
}
