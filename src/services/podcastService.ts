import { PodcastEpisode } from "types/podcast"
import { api } from "./api"

const getYoutubeEmbedId = (url: string): string => {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : ''
}

const mapPodcastEpisode = (item: any): PodcastEpisode => {
  return {
    id: item.id,
    title: item.title,
    description: item.description ?? '',
    embedId: getYoutubeEmbedId(item.link),
    category: item.category ?? ''
  }
}

export const podcastService = {
  getAllEpisodes: async (): Promise<PodcastEpisode[]> => {
    const data = await api.get('podcasts?populate[image][fields][0]=url')
    return data.data.map((item: any) => mapPodcastEpisode(item))
  }
}
