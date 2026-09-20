import { AsociacionInfo } from "types/asociacionInfo";
import { api, BASE_URL } from "./api";

export const asociacionInfoService = {
  get: async (): Promise<AsociacionInfo | null> => {
    const data = await api.get('asociacion-infos?populate=*&pagination[pageSize]=1');
    const item = data.data[0];
    if (!item) return null;
    return {
      descripcion: item.descripcion,
      foto: item.foto?.url ? `${BASE_URL}${item.foto.url}` : null
    };
  }
}
