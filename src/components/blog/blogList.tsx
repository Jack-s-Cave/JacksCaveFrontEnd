import LoadingCard from "components/landingpage/loadingCard"
import { Blog } from "types/blog"
import BlogListElement from "./blogListElement"

type BlogListProps = {
  blogs: Blog[]
  loading: boolean
  error: string | null
}

const BlogList = ({ blogs, loading, error }: BlogListProps) => {
  const max_visible_blogs = 6
  if (error) return <div>error</div>
  if (loading) return (
    <>
      {[...Array(max_visible_blogs)].map((_, i) => (
        <LoadingCard key={i} className='blog-card' />
      ))}
    </>
  )
  return blogs.map(blog => <BlogListElement key={blog.id} blog={blog} />)
}

export default BlogList
