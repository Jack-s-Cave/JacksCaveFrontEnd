import { mockBlogs } from "mocks/blogMock"
import { Blog } from "types/blog"

export const blogsService = {
  getAll: async (): Promise<Blog[]> => {
    return mockBlogs
  }
}
