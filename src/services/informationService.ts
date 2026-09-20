import { Information } from "types/information";
import { api, BASE_URL } from "./api";

const mapInformation = (item: any): Information => ({
  id: item.id,
  title: item.title,
  author: item.author ?? '',
  date: item.date,
  image: item.photo?.url ? `${BASE_URL}${item.photo.url}` : null
})

export const informationService = {
  getAll: async (): Promise<Information[]> => {
    const data = await api.get('informations?populate=*&sort[0]=date:desc');
    return data.data.map(mapInformation);
  }
}
