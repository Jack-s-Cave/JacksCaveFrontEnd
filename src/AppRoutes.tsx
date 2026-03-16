// AppRoutes.tsx
import { Route, Routes } from 'react-router-dom';
import LandingPage from 'pages/landing/landing';
import Podcast from 'pages/podcast/podcast';
import AboutUs from 'pages/aboutUs/aboutus';
import BlogPost from 'pages/blogpost/blogpost';
import Blogs from 'pages/blogs/blogs';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/podcast" element={<Podcast/>}/>
      <Route path="/aboutus" element={<AboutUs/>}/>
      <Route path="/blogpost" element={<BlogPost/>}/>
    </Routes>
  );
};

export default AppRoutes;
