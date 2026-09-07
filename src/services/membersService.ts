import { Member } from "types/members";
import { api } from "./api";

export interface AsociacionYear {
  year: number;
  members: Member[];
}

const mapMember = (item: any): Member => {
  return {
    id: item.id,
    name: item.nombre,
    image: item.foto?.url,
    description: item.curriculum
  }
}

export const membersService = {
  getAll: async (): Promise<AsociacionYear[]> => {
    const data = await api.get('asociaciones?populate[Miembro][populate][foto][fields][0]=url');
    return data.data.map((item: any) => ({
      year: item.year,
      members: (item.Miembro ?? []).map(mapMember)
    }));
  }
}
