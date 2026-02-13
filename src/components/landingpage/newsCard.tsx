import React, { useEffect, useState } from 'react';
import './newsCard.css';

type NewsItem = {
  title: string;
  author: string;
  date: string;
  imageSrc: string;
  imageDescription: string;
};

type NewsCardProps = {
  newsList: NewsItem[];
};

const NewsCard: React.FC<NewsCardProps> = ({ newsList }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (index: number) => {
    setIsHovered(true);
    setSelectedIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSelectedIndex((prev) => (prev + 1) % newsList.length);
        setFade(true);
      }, 400); 
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, newsList.length]);

  const selectedNews = newsList[selectedIndex];

  return (
    <div className='news-card'>
      <div className='news-info-section'>
        {newsList.map((news, index) => (
          <div
            key={index}
            className={`new ${index === selectedIndex && !isHovered ? 'active-news' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <h2>{news.title}</h2>
            <div className='new-footer'>
              <p>{news.author}</p>
              <p>{news.date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='news-image-section'>
        <div className='news-image-header'>
          <i className="ri-subtract-fill"></i>
          <i className="ri-square-line"></i>
        </div>
        <div className={`image-container ${fade ? 'fade-in' : 'fade-out'}`}>
          <img src={selectedNews.imageSrc} alt={selectedNews.imageDescription} />
          <p>{selectedNews.imageDescription}</p>
        </div>
      </div>
    </div>
  );
};


export default NewsCard;
