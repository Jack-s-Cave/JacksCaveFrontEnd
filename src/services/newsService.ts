import { mockNews } from "mocks/newsMock";
import { News } from "types/news";

export const newsService = {
  getAll: async (): Promise<News[]> => {
    return mockNews
  }
}
