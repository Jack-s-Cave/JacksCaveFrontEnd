// AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/landing';
import Cave from './components/cave/cave';
import Blog from './pages/blog/blog';
import Podcast from './pages/podcast/podcast';
import AboutUs from './pages/aboutUs/aboutus';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<><Cave /><LandingPage /></>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/podcast" element={<Podcast/>}/>
      <Route path="/aboutus" element={<AboutUs/>}/>
    </Routes>
  );
};

export default AppRoutes;
