import { mockTags } from "mocks/tagMock"
import { Tag } from "types/filters"

export const mapTag = (raw: string, index: number): Tag => ({
  id:       index,
  label:     raw,
  featured: false
})

export const tagsService = {
  getAllTags: async (): Promise<Tag[]> => {
    return mockTags
  }
}
