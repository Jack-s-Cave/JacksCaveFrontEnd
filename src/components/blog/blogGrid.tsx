import LoadingCard from "components/landingpage/loadingCard";
import { Blog } from "types/blog";
import BlogCard from "./blogCard";

type BlogGridProps = {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

const BlogGrid = ({ blogs, loading, error }: BlogGridProps) => {
  const max_visible_blogs = 6
  if (error) return <div>error</div>
  if (loading) return (
    <>
      {[...Array(max_visible_blogs)].map((_, i) => (
        <LoadingCard key={i} className='blog-card' />
      ))}
    </>
  )
  return blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
}

export default BlogGrid
