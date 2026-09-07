import { PodcastEpisode } from "types/podcast"
import { api } from "./api"

const getYoutubeEmbedId = (url: string): string => {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : ''
}

const mapPodcastEpisode = (item: any): PodcastEpisode => {
  const embedId = item.youtube_link ? getYoutubeEmbedId(item.youtube_link) : ''
  return {
    id: item.id,
    title: item.title,
    description: item.description ?? '',
    embedId,
    category: item.category ?? '',
    date: item.date_publication,
    thumbnail: `https://img.youtube.com/vi/${embedId}/hqdefault.jpg`,
    spotifyLink: item.link ?? null,
    youtubeLink: item.youtube_link ?? null
  }
}

export const podcastService = {
  getAllEpisodes: async (): Promise<PodcastEpisode[]> => {
    const data = await api.get('podcasts?populate[image][fields][0]=url')
    return data.data.map((item: any) => mapPodcastEpisode(item))
  }
}
