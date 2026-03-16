import { useEffect, useState } from 'react';
import './landing.css';
import RecentCard from '../../components/landingpage/recentCard';
import NewsCard from '../../components/landingpage/newsCard';
import PodcastCarousel from '../../components/landingpage/podcastCarousel';
import { useNavigate } from 'react-router-dom';
import LoadingCard from '../../components/landingpage/loadingCard';
import NavBar from '../../components/navbar/navbar';
import Cave from '../../components/cave/cave';
import { useNews } from 'hooks/useNews';
import { mockVideos } from 'mocks/videoMock';
import { useBlogs } from 'hooks/useBlogs';


const LandingPage = () => {
  const navigate = useNavigate();

  // let recentContent;

  // if (loadingBlogs) {
  //   const loadingBlogsCards = [];
  //   for (let i = 0; i < maxVisibleRecentCards; i++) {
  //     loadingBlogsCards.push(
  //       <LoadingCard key={`loadingBlogs-${i}`} className='recent-card'/>
  //     );
  //   }
  //   recentContent = loadingBlogsCards;

  // } else {
  //   recentContent = blogs.map((blog, index) => (
  //     <RecentCard
  //       key={`blog-${index}`}
  //       {...blog}
  //     />
  //   ));
  // }
  //
  //

  function RecentBlogs() {
    const maxVisibleRecentCards = 6
    const { blogs, loading, error } = useBlogs()

    if (loading) return <div></div>
    if (error) return <div>error</div>
    return blogs.map(blog => <RecentCard key={blog.id} blog={blog} />)

  }

  function NewsList() {
    const { news, loading, error } = useNews()

    if (loading) return <div></div>
    if (error) return <div>error</div>
    return <NewsCard newsList={news} />
  }

  return (

    <main className='landing-content'>
      <NavBar />
      <Cave />
      <div className='landing-page'>
        <div className='landing-subSection'>
          <div className='landing-subT-section'>
            <h1 className='landing-subT'>RECIENTES</h1>
            <button className='see-more' onClick={() => navigate('/blog')}>Ver Más <strong>+</strong></button>
          </div>
          <div className='landing-recent-section'>
            <RecentBlogs />
          </div>
        </div>
        <div className='landing-subSection'>
          <div className='landing-subT-section'>
            <h1 className='landing-subT'>AECCTI NEWS</h1>
            <button className='see-more'>Ver Más <strong>+</strong></button>
          </div>
          <div className='landing-news-section'>
            <NewsList />
          </div>
        </div>
        <div className='landing-subSection'>
          <div className='landing-subT-section'>
            <h1 className='landing-subT'>PODCAST ENTERATE!</h1>
            <button className='see-more' onClick={() => navigate('/podcast')}>Ver Más <strong>+</strong></button>
          </div>
          <PodcastCarousel videos={mockVideos} />
          <div className='landing-podcast-section'>

          </div>
        </div>
        <footer> Made with<strong> REACT </strong>by actual live dragons</footer>
      </div>
    </main>
  );
}

export default LandingPage;
