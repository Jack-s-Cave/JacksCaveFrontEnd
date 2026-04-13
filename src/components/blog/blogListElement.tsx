import './blogListElement.css'
import { Link } from "react-router-dom";
import { Blog } from "types/blog"
import { BlogImage } from './blogCard';

type BlogListElementProps = {
  blog: Blog
}

const BlogListElement = ({ blog }: BlogListElementProps) => {
  return (
    <Link to={`/blogpost/`}> 
      <main className='blog-list-element'>
        <BlogImage className="blog-image" src={blog.image} alt={blog.title} />
        <article className="blog-details">
          <h3 className='blogL-title'>{blog.title}</h3>
          <p>{blog.date}</p>
          <div className='blogL-tags'>
            {blog.tags.slice(0, 3).map((tag, index) => (
              <p key={index}>#{tag.label}</p>
            ))}
            {blog.tags.length > 3 && <p>+{blog.tags.length - 3}</p>}
          </div>
        </article>
      </main>
    </Link>
  );
};

export default BlogListElement;
