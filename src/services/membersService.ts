import { Member } from "types/members";
import { api } from "./api";

const mapMember = (item: any): Member => {
  return {
    id: item.id,
    name: item.nombre,
    image: item.foto?.url,
    description: item.curriculum
  }
}

export const membersService = {
  getMembersByYear: async(year: string): Promise<Member[]> => {
    const data = await api.get(`asociaciones?filters[year][$eq]=${year}&populate[Miembro][populate][foto][fields][0]=url`);
    return data.data[0].Miembro.map((item: any) => mapMember(item))
  }
}
