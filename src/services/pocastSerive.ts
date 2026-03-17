import { MockPodcastEpisodes } from "mocks/podcstMock"
import { PodcastEpisode } from "types/podcastEpisode"

export const podcastService = {
  getAllEpisodes: async (): Promise<PodcastEpisode[]> => {
    return MockPodcastEpisodes
  }
}
