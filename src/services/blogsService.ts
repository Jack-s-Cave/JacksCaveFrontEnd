import { mockBlogs } from "mocks/blogMock"
import { Blog } from "types/blog"
import { api } from "./api"

const mapBlog = (item: any): Blog => ({
  id: item.id,
  title: item.Titulo,
  date: item.fecha_de_publicacion,
  author: item.author_profile?.nombre ?? 'Anónimo',
  image: item.imagenes?.[0]?.url 
    ? `${process.env.REACT_APP_STRAPI_URL}${item.imagenes[0].url}` 
    : 'https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg',
  tags: item.tags ? [item.tags] : [],
})

export const blogsService = {
  getRecentBlogs: async (): Promise<Blog[]> => {
    const data = await api.get('article-mds?sort[0]=fecha_de_publicacion:desc&pagination[page]=1&pagination[pageSize]=6&populate=*')
    return data.data.map(mapBlog)
  },
  getAll: async (): Promise<Blog[]> => {
    return mockBlogs
  }
}
