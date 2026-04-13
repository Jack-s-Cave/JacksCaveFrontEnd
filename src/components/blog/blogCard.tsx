import './blogCard.css';
import { Link, useNavigate } from 'react-router-dom';
import { Blog } from 'types/blog';

type BlogCardProps = {
  blog: Blog
};

export const BlogImage = ({ src, alt, className }: { src?: string, alt: string, className: string }) => {
  const isDark = document.documentElement.classList.contains('dark');

  if (src) return <img className={className} src={src} alt={alt} />;

  return (
    <div className={`${className} blog-image--placeholder`}>
      <img 
        src={isDark ? '/logos/jacks-icon-dark.svg' : '/logos/jacks-icon-light.svg'} 
        alt="Jack's Cave"
      />
    </div>
  );
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const navigate = useNavigate()

  return (
    <Link to={`/blogpost/`}> 
      <div className='blog-card'>
        <div className='blogC-header'>
          <p>{blog.date}</p>
          <p onClick={(e) => {
            e.preventDefault();
            navigate(`/author/${blog.author}`);
          }}>
            {blog.author}
          </p>
        </div>
        <BlogImage className="blog-image" src={blog.image} alt={blog.title} />
        <h3 className='blogC-title'>{blog.title}</h3>
        <div className='blogC-tags'>
          {blog.tags.slice(0, 3).map((tag, index) => (
            <p key={index}>#{tag.label}</p>
          ))}
          {blog.tags.length > 3 && <p>+{blog.tags.length - 3}</p>}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
