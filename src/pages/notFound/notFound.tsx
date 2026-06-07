import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from 'components/navbar/navbar';
import './notFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="not-found-page">
      <NavBar />
      <div className="not-found-content">
        <div className="not-found-text">
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Página no encontrada</h2>
          <p className="not-found-description">Lo que buscas se perdió en la cueva.</p>
          <button className="not-found-btn" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
        <div className="not-found-cave-wrapper">
          <img
            className="not-found-cave"
            src={isDark ? '/cave_imgs/OUT-dark.svg' : '/cave_imgs/OUT-light.svg'}
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
    </main>
  );
};

export default NotFound;
