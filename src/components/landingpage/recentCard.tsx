import React from 'react';
import './recentCard.css';

type RecentCardProps = {
  date: string;
  author: string;
  title: string;
  imageSrc: string;
  tags: string[];
};


const RecentCard: React.FC<RecentCardProps> = ({ date, author, title, imageSrc, tags }) => {
    return (
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
  );
};

export default RecentCard;

