import { FaGithub, FaLink, FaTwitter, FaInstagram } from 'react-icons/fa';
import './author.css'
import NavBar from "components/navbar/navbar";
import { useState } from 'react';
import { useBlogs } from 'hooks/useBlogs';
import BlogList from 'components/blog/blogList';
import { useLocation, useParams } from 'react-router-dom';
import { useAuthor } from 'hooks/useAuthor';
import ErrorMessage from 'components/common/errorMessage';

const AuthorAvatar = ({ name, avatar }: { name: string, avatar?: string }) => {
  if (avatar) return <img className="author-pfp" src={avatar} alt={name} />;
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="author-pfp author-pfp--placeholder">
      {initials}
    </div>
  );
}

const AuthorPage = () => {
  const tabs = ['TODOS', 'SERIES']
  const [activeTab, setActiveTab] = useState('TODOS');
  const { name } = useParams<{ name: string }>();
  const { state } = useLocation();
  const decodedName = decodeURIComponent(name ?? '');

  const { author, loading: authorLoading, error: authorError } = useAuthor(
    state?.author ? '' : decodedName
  );
  const resolvedAuthor = state?.author ?? author;

  const { blogs, loading: blogsLoading, error: blogsError } = useBlogs({
    authorName: resolvedAuthor?.name ?? decodedName
  });

  if (authorLoading) return <main><NavBar /></main>;
  if (authorError || !resolvedAuthor) return <main><NavBar /><ErrorMessage message="Autor no encontrado" /></main>;

  const getSocialHandle = (url: string): string => {
    try {
      const path = new URL(url).pathname;
      return path.replace(/\//g, '');
    } catch {
      return url;
    }
  }

  return (
    <main>
      <NavBar />
      <section className="author-content">
        <section className="author-sidebar">
          <AuthorAvatar name={resolvedAuthor.name} avatar={resolvedAuthor.avatar} />
          <h2 className="author-name">{resolvedAuthor.name}</h2>
          <p>{resolvedAuthor.bio}</p>
          {resolvedAuthor.socialMedia && (
            <ul className='author-socials'>
              {resolvedAuthor.socialMedia.github && (
                <li className='author-social'>
                  <FaGithub />
                  <span>{resolvedAuthor.socialMedia.github}</span>
                </li>
              )}
              {resolvedAuthor.socialMedia.twitter && (
                <li className='author-social'>
                  <FaTwitter />
                  <span>{resolvedAuthor.socialMedia.twitter}</span>
                </li>
              )}
              {resolvedAuthor.socialMedia.website && (
                <li className='author-social'>
                  <FaLink />
                  <span>{resolvedAuthor.socialMedia.website}</span>
                </li>
              )}
              {resolvedAuthor.socialMedia.instagram && (
                <li className='author-social'>
                  <FaInstagram />
                  <span>{getSocialHandle(resolvedAuthor.socialMedia.instagram)}</span>
                </li>
              )}
            </ul>
          )}
        </section>
        <section className="authors-blogs">
          <div className="tabs-nav">
            {tabs.map((tab) => (
              <button 
                key={tab} 
                className={`tab-btn ${tab === activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="blogs">
            {activeTab === 'TODOS' ? (
              <div className="posts-list">
                <BlogList blogs={blogs} loading={blogsLoading} error={blogsError} />
              </div>
            ) : (
              <div className="">
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
};

export default AuthorPage;
