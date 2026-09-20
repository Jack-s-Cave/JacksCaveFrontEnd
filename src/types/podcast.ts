export interface PodcastEpisode {
  id: number
  title: string
  description: string
  embedId: string
  category: string
  date: string
  thumbnail: string
  spotifyLink: string | null
  youtubeLink: string | null
}
