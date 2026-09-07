import { PodcastCrew } from "types/podcastCrew";
import { api, BASE_URL } from "./api";

export const podcastCrewService = {
  get: async (): Promise<PodcastCrew | null> => {
    const data = await api.get('podcast-crew?populate=*');
    const item = data.data;
    if (!item) return null;
    return {
      nombre: item.nombre,
      proposito: item.proposito,
      heroImage: item.hero_image?.url ? `${BASE_URL}${item.hero_image.url}` : null
    };
  }
}
