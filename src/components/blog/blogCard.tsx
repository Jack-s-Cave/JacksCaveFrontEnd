import './blogCard.css';
import { Link } from 'react-router-dom';
import { Blog } from 'types/blog';

type BlogCardProps = {
  blog: Blog
};

const BlogCard = ({ blog }: BlogCardProps) => {
  console.log(blog.image)
  return (
    <Link to={`/blogpost/`}> 
      <div className='blog-card'>
        <div className='blogC-header'>
          <p>{blog.date}</p>
          <p>{blog.author}</p>
        </div>
        <img
          className='blog-image'
          src={blog.image}
          alt={blog.title}
        />
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
