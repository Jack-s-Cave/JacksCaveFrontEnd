import React from 'react';
import './recentCard.css';
import { Link } from 'react-router-dom';

type RecentCardProps = {
  date: string;
  author: string;
  title: string;
  imageSrc: string;
  tags: string[];
};


const RecentCard: React.FC<RecentCardProps> = ({ date, author, title, imageSrc, tags }) => {
    return (
        <Link to={`/blogpost/`}> 
          <div className='recent-card'>
            <div className='recentC-header'>
              <p>{date}</p>
              <p>{author}</p>
            </div>
            <img
              className='recent-image'
              src={imageSrc}
              alt={title}
            />
            <h3 className='recentC-title'>{title}</h3>
            <div className='recentC-tags'>
              {tags.slice(0, 3).map((tag, index) => (
                <p key={index}>#{tag}</p>
              ))}
              {tags.length > 3 && <p>+{tags.length - 3}</p>}
            </div>
          </div>
        </Link>
  );
};

export default RecentCard;

