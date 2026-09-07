import { Blog } from "types/blog"
import { api } from "./api"
import { mapTag } from "./tagsService"

const mapBlog = (item: any): Blog => {
  const imagenUrl = item.imagenes?.[0]?.url;

  return {
    id: item.id,
    title: item.Titulo,
    content: item.Article_core,
    date: item.fecha_de_publicacion,
    author: item.author_profile?.nombre ?? 'Anónimo',
    image: imagenUrl
      ? `${imagenUrl}`
      : undefined,
    tags: item.tags ? [mapTag(item.tags, 0)] : []
  }
}

export const blogsService = {
  getAll: async (): Promise<Blog[]> => {
    const data = await api.get('article-mds?populate=*')
    return data.data.map(mapBlog)
  },
  getNews: async (): Promise<Blog[]> => {
    const data = await api.get('article-mds/news?populate=*')
    return data.data.map(mapBlog)
  },
  getBlogByID: async (id: number): Promise<Blog> => {
    const blogs = await blogsService.getAll()
    const blog = blogs.find(b => b.id === id)
    if (!blog) throw new Error(`Blog con id ${id} no encontrado`)
    return blog
  }
}
