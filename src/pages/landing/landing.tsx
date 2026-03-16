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

function RecentBlogs() {
  const max_visible_blogs = 6
  const { blogs, loading, error } = useBlogs()
  if (loading) return (
    <>
      {[...Array(max_visible_blogs)].map((_, i) => <LoadingCard key={i} className='recent-card' />)}
    </>
  )
  if (error) return <div>error</div>
  return blogs.map(blog => <RecentCard key={blog.id} blog={blog} />)
}

function NewsList() {
  const { news, loading, error } = useNews()
  if (loading) return <div></div>
  if (error) return <div>error</div>
  return <NewsCard newsList={news} />
}

const LandingPage = () => {
  const navigate = useNavigate();

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
        </div>
        <footer> Made with<strong> REACT </strong>by actual live dragons</footer>
      </div>
    </main>
  );
}

export default LandingPage;
