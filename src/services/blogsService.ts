import { Blog } from "types/blog"
import { api } from "./api"
import { mapTag } from "./tagsService"
import { BlogFilters } from "types/filters"

const mapBlog = (item: any): Blog => {
  const imagenUrl = item.imagenes?.[0]?.url;

  return {
    id: item.id,
    title: item.Titulo,
    content: item.Article_core,
    date: item.fecha_de_publicacion,
    author: item.author_profile?.nombre ?? 'Anónimo',
    image: imagenUrl
      ? `${process.env.REACT_APP_STRAPI_URL}${imagenUrl}`
      : undefined,
    tags: item.tags ? [mapTag(item.tags, 0)] : []
  }
}

function buildQuery(filters: BlogFilters): string {
  const params = new URLSearchParams()
  params.set('populate', '*')

  const { from, to, tagLabels, query, authorName } = filters
  const hasDates = from || to
  const hasTags  = tagLabels && tagLabels.length > 0
  const hasSearch = query && query.length > 0
  const hasAuthor = !!authorName

  if (hasAuthor) {
    params.set('filters[author_profile][nombre][$eq]', authorName!)
  }

  if (hasSearch) {
    params.set('filters[$or][0][Titulo][$containsi]', query)
    params.set('filters[$or][1][author_profile][nombre][$containsi]', query)
  }

  if (hasDates && !hasTags) {
    if (from) params.set('filters[fecha_de_publicacion][$gte]', from)
    if (to)   params.set('filters[fecha_de_publicacion][$lte]', to)
  }

  if (hasTags && !hasDates) {
    tagLabels.forEach((label, i) =>
      params.set(`filters[$or][${i}][tags][$eq]`, label)
    )
  }

  if (hasDates && hasTags) {
    tagLabels.forEach((label, i) =>
      params.set(`filters[$and][0][$or][${i}][tags][$eq]`, label)
    )
    if (from) params.set('filters[$and][1][fecha_de_publicacion][$gte]', from)
    if (to)   params.set('filters[$and][1][fecha_de_publicacion][$lte]', to)
  }

  if ((hasDates || hasTags) && hasSearch) {
    params.set('filters[$and][0][$or][0][Titulo][$containsi]', query)
    params.set('filters[$and][0][$or][1][author_profile][nombre][$containsi]', query)

    let andIndex = 1

    if (hasTags) {
      tagLabels.forEach((tag, i) =>
        params.set(`filters[$and][${andIndex}][$or][${i}][tagLabels][$eq]`, tag)
      )
      andIndex++
    }

    if (hasDates) {
      if (from) params.set(`filters[$and][${andIndex}][fecha_de_publicacion][$gte]`, from)
      if (to)   params.set(`filters[$and][${andIndex}][fecha_de_publicacion][$lte]`, to)
    }
  }

  if (hasDates && hasTags && !hasSearch) {
    tagLabels.forEach((tag, i) =>
      params.set(`filters[$and][0][$or][${i}][tagLabels][$eq]`, tag)
    )
    if (from) params.set('filters[$and][1][fecha_de_publicacion][$gte]', from)
    if (to)   params.set('filters[$and][1][fecha_de_publicacion][$lte]', to)
  }

  return params.toString()
}

export const blogsService = {
  getAll: async (): Promise<Blog[]> => {
    const data = await api.get('article-mds?populate=*')
    return data.data.map(mapBlog)
  },
  getRecentBlogs: async (): Promise<Blog[]> => {
    const data = await api.get('article-mds?sort[0]=fecha_de_publicacion:desc&pagination[page]=1&pagination[pageSize]=6&populate=*')
    return data.data.map(mapBlog)
  },
  getFiltered: async (filters: BlogFilters): Promise<Blog[]> => {
    const qs = buildQuery(filters)
    const data = await api.get(`article-mds?${qs}`)
    return data.data.map(mapBlog)
  },
  getBlogByID: async (id: number): Promise<Blog> => {
    const blogs = await blogsService.getAll()
    const blog = blogs.find(b => b.id === id)
    if (!blog) throw new Error(`Blog con id ${id} no encontrado`)
    return blog
  }
}
