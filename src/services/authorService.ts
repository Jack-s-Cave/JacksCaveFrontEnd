import { api } from './api';
import { Author } from '../types/author';

const mapAuthor = (item: any): Author => ({
  id: item.id,
  name: item.nombre,
  bio: item.bio,
  createdAt: item.createdAt,
  socialMedia: item.social_media ?? null,
})

export const authorService = {
  getAll: async (): Promise<Author[]> => {
    const data = await api.get('author-profiles');
    return data.data.map(mapAuthor);
  },

  getByName: async (name: string): Promise<Author | undefined> => {
    const authors = await authorService.getAll();
    return authors.find(a => a.name === name);
  }
};
