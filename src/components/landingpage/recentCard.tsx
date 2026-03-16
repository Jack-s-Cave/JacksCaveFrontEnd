import React from 'react';
import './recentCard.css';
import { Link } from 'react-router-dom';
import { Blog } from 'types/blog';

type RecentCardProps = {
  blog: Blog
};

const RecentCard: React.FC<RecentCardProps> = ({ blog }) => {
    return (
        <Link to={`/blogpost/`}> 
          <div className='recent-card'>
            <div className='recentC-header'>
              <p>{blog.date}</p>
              <p>{blog.author}</p>
            </div>
            <img
              className='recent-image'
              src={blog.image}
              alt={blog.title}
            />
            <h3 className='recentC-title'>{blog.title}</h3>
            <div className='recentC-tags'>
              {blog.tags.slice(0, 3).map((tag, index) => (
                <p key={index}>#{tag}</p>
              ))}
              {blog.tags.length > 3 && <p>+{blog.tags.length - 3}</p>}
            </div>
          </div>
        </Link>
  );
};

export default RecentCard;

