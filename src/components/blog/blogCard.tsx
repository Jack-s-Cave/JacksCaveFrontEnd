import './blogCard.css'
import { BlogPost } from "@/pages/blog/blog"

interface BlogCardProps {
  post: BlogPost
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article
      className="post-card"
      role="article"
      aria-labelledby={`post-title-${post.id}`}
    >
      <div className="post-header">
        <span className="post-date" aria-label="Fecha de publicación">
          {post.date}
        </span>
        <span className="post-author" aria-label="Autor">
          {post.author}
        </span>
      </div>

      <div className="post-image-container">
        <img
          src={post.image}
          alt={post.title}
          className="post-image"
          loading="lazy"
        />
      </div>

      <div className="post-content">
        <h2
          id={`post-title-${post.id}`}
          className="post-title"
        >
          {post.title}
        </h2>

        <div
          className="post-tags"
          role="list"
          aria-label="Etiquetas del post"
        >
          {post.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="post-tag"
              role="listitem"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default BlogCard
