import { Tag } from "types/filters"
import { api } from "./api";

export const mapTag = (raw: string, index: number): Tag => ({
  id: index,
  label: raw,
  featured: false
})

export const tagsService = {
  getAllTags: async (): Promise<Tag[]> => {
    // article-mds/unique-tags isn't merged on the backend yet, so derive the
    // distinct tags in use from a lightweight fetch (tags field only)
    // instead of depending on it.
    const data = await api.get('article-mds?fields[0]=tags&pagination[pageSize]=100');
    const labels = Array.from(
      new Set(data.data.map((item: any) => item.tags).filter((t: string | null) => !!t))
    ) as string[];
    return labels.map((label, index) => mapTag(label, index));
  }
}
