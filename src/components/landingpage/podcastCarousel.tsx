import React, { useEffect, useRef, useState } from 'react';
import './podcastCarousel.css';

type VideoItem = {
  thumbnail: string;
  title: string;
  date: string;
};

type PodcastCarouselProps = {
  videos: VideoItem[];
};

const PodcastCarousel: React.FC<PodcastCarouselProps> = ({ videos }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearAutoSwitch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startAutoSwitch = () => {
    clearAutoSwitch();
    intervalRef.current = setInterval(() => {
      goNext();
    }, 6000);
  };

  useEffect(() => {
    if (!isHovered) startAutoSwitch();
    return clearAutoSwitch;
  }, [isHovered, videos.length]);

  const goNext = () => {
    setFade(false);
    setTimeout(() => {
      setStartIndex((prev) => (prev + 2) % videos.length);
      setFade(true);
    }, 400);
  };

  const goPrev = () => {
    setFade(false);
    setTimeout(() => {
      setStartIndex((prev) =>
        (prev - 2 + videos.length) % videos.length
      );
      setFade(true);
    }, 400);
  };

  const goToPage = (pageIndex: number) => {
    setFade(false);
    setTimeout(() => {
      setStartIndex(pageIndex * 2);
      setFade(true);
    }, 400);
    clearAutoSwitch();
    if (!isHovered) startAutoSwitch();
  };

  const handleManualNav = (direction: 'prev' | 'next') => {
    clearAutoSwitch();
    direction === 'next' ? goNext() : goPrev();
    if (!isHovered) startAutoSwitch();
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const visibleVideos = [
    videos[startIndex],
    videos[(startIndex + 1) % videos.length],
  ];

  const totalPages = Math.ceil(videos.length / 2);
  const currentPage = Math.floor(startIndex / 2);

  return (
    <>
    <div
      className={`podcast-carousel-wrapper`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="carousel-arrow left" onClick={() => handleManualNav('prev')}>
        ‹
      </button>

      <div className={`podcast-carousel ${fade ? 'fade-in' : 'fade-out'}`}>
        {visibleVideos.map((video, idx) => (
          <div className="podcast-card" key={idx}>
            <img src={video.thumbnail} alt={video.title} />
            <div className='bottom-podast-card'>
                <div className='videoInfo'>
                    <h3>{video.title}</h3>
                    <p className="video-date">{video.date}</p>
                </div>
                <div className='play-circle'>
                    <i className="ri-play-circle-line ri-4x"></i>
                </div>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-arrow right" onClick={() => handleManualNav('next')}>
        ›
      </button>
    </div>
    <div className="carousel-dots">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentPage ? '' : 'active-dot'}`}
            onClick={() => goToPage(i)}
          ></span>
        ))}
      </div>
    </>
  );
};

export default PodcastCarousel;
