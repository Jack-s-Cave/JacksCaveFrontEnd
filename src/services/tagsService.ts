import { Tag } from "types/filters"
import { api } from "./api";

export const mapTag = (raw: string, index: number): Tag => ({
  id:       index,
  label:     raw,
  featured: false
})

export const tagsService = {
  getAllTags: async (): Promise<Tag[]> => {
    const data = await api.get('article-mds/unique-tags');
    return data.data.map((label: string, index: number) => mapTag(label, index));
  }
}
