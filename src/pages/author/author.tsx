import { FaGithub, FaLink, FaTwitter, FaInstagram } from 'react-icons/fa';
import './author.css'
import NavBar from "components/navbar/navbar";
import { useState } from 'react';
import { useBlogs } from 'hooks/useBlogs';
import BlogList from 'components/blog/blogList';
import { useLocation, useParams } from 'react-router-dom';
import { useAuthor } from 'hooks/useAuthor';

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

  if (authorLoading) return <p>Cargando autor...</p>;
  if (authorError || !resolvedAuthor) return <p>Autor no encontrado</p>;

  return (
    <main>
      <NavBar />
      <section className="author-content">
        <section className="author-sidebar">
          <img 
            className="author-pfp" 
            src={resolvedAuthor.avatar} 
            alt={`foto de perfil de ${resolvedAuthor.name}`} 
          />
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
                  <span>{resolvedAuthor.socialMedia.instagram}</span>
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
