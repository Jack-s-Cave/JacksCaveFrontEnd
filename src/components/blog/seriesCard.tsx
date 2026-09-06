import React from 'react';
import './seriesCard.css';

type SeriesCardProps = {
  date: string;
  author: string;
  title: string;
  imageSrc: string;
  tags: string[];
};


const SeriesCard: React.FC<SeriesCardProps> = ({ date, author, title, imageSrc, tags }) => {
    return (
        <div className='series-card'>
            <img
                className='series-image'
                src={imageSrc}
                alt={title}
            />

            <div className='series-infosection'>
                <h3 className='series-title'>{title}</h3>
                <p>{author}</p>
                <div className='series-tags'>
                    {tags.slice(0, 3).map((tag, index) => (
                        <p key={index}>#{tag}</p>
                    ))}
                    {tags.length > 3 && <p>+{tags.length - 3}</p>}
                </div>
            </div>   
            
            <div className='series-leftsection'>
                <p>{date}</p>
            </div>
        </div>
  );
};

export default SeriesCard;

