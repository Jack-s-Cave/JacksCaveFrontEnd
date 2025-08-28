import React, { useState } from 'react';
import { FaYoutube, FaInstagram, FaTiktok, FaSpotify } from 'react-icons/fa';
import { FiFolder, FiSearch } from 'react-icons/fi';
import './podcast.css';

const Podcasts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('TODAS');

  // URLs de YouTube embeds
  const podcastEpisodes = [
    {
      id: 1,
      title: "¿Como ser estudiante y trabajar al mismo tiempo? | EP 2 Ludwing Cano",
      description: "Un podcast de tecnología por estudiantes para estudiantes",
      embedId: "zlSbBsJYFGA",
      category: "TODAS"
    },
    {
      id: 2,
      title: "Desarrollar videojuegos en Guatemala | EP 1 Dennis Aldana",
      description: "Un podcast de tecnología por estudiantes para estudiantes",
      embedId: "qVDqPct6b_k",
      category: "TODAS"
    },
    {
      id: 3,
      title: "Desarrollar videojuegos en Guatemala | EP 1 Dennis Aldana",
      description: "Un podcast de tecnología por estudiantes para estudiantes",
      embedId: "6guzh_QQKJA",
      category: "TODAS"
    }
  ];

  // Listas de reproducción para la sección "LISTAS"
  const playlistsData = [
    {
      id: 1,
      title: "Los Favoritos",
      description: "Los episodios más populares del podcast"
    },
    {
      id: 2,
      title: "Buscar trabajo", 
      description: "Episodios sobre búsqueda de empleo y carrera"
    },
    {
      id: 3,
      title: "Noticias Tech",
      description: "Las últimas noticias del mundo tecnológico"
    }
  ];

  const socialLinks = [
    { 
      icon: <FaYoutube />, 
      url: "https://www.youtube.com/@enTERAte-b8t",
      color: "#FF0000"
    },
    { 
      icon: <FaInstagram />, 
      url: "https://www.instagram.com/enterate.gt_",
      color: "#E4405F"
    },
    { 
      icon: <FaTiktok />, 
      url: "https://www.tiktok.com/@enterate.gt?lang=es-419",
      color: "#000000"
    }
  ];

  const tabs = ['LISTAS', 'TODAS'];

  return (
    <div className="podcasts-page">
      {/* Hero Section con imagen de fondo */}
      <section className="hero-section-podcasts">
        <div className="hero-overlay">
          <img 
            src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&h=600&fit=crop" 
            alt="Gas Station Illustration"
            className="hero-background"
          />
        </div>
      </section>

      {/* Sección ¿Quiénes Somos? */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2 className="about-title">¿QUIÉNES SOMOS?</h2>
            <p className="about-description">
              Since My Favorite Murder launched in January of 2016, Karen 
              Kilgariff and Georgia Hardstark have shared their lifelong 
              interest in true crime stories and have covered infamous serial 
              killers, mysterious cold cases, captivating cults, incredible 
              survivor stories and important events from history.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="about-logo">
            {/* Placeholder cuadrado para el logo */}
            <div className="logo-placeholder">
              <span>Logo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="tabs-section">
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
      </section>

      {/* Publicaciones Section */}
      <section className="publications-section">
        <div className="publications-container">
          <div className="sidebar">
            <h3 className="sidebar-title">
        <FiFolder className="folder-icon" />
        Publicaciones
      </h3>
      <div className="year-filters">
        <label className="year-filter">
          <input type="checkbox" defaultChecked />
          <span>2017</span>
        </label>
        <label className="year-filter">
          <input type="checkbox" defaultChecked />
          <span>2018</span>
        </label>
        <label className="year-filter">
          <input type="checkbox" />
          <span>2019</span>
        </label>
        <label className="year-filter">
          <input type="checkbox" />
          <span>2020</span>
        </label>
        <label className="year-filter">
          <input type="checkbox" />
          <span>2021</span>
        </label>
            </div>
          </div>

          <div className="content-area">
            <div className="search-bar">
              <div className="search-input-wrapper">
                <FiSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="search-input"
                />
              </div>
              <span className="post-count">(3 posts)</span>
            </div>

            <div className="podcasts-grid">
              {activeTab === 'LISTAS' ? (
                // Mostrar listas de reproducción
                <div className="playlists-grid">
                  {playlistsData.map((playlist) => (
                    <div key={playlist.id} className="playlist-card">
                      <div className="playlist-cover">
                        <div className="cover-placeholder">
                          <span>Portada</span>
                        </div>
                      </div>
                      <div className="playlist-info">
                        <h3 className="playlist-title">{playlist.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Mostrar episodios de podcasts en 2 columnas
                <div className="episodes-grid">
                  {podcastEpisodes.map((episode) => (
                    <div key={episode.id} className="podcast-card">
                      <div className="podcast-video">
                        <iframe
                          width="100%"
                          height="200"
                          src={`https://www.youtube.com/embed/${episode.embedId}`}
                          title={episode.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="podcast-info">
                        <h3 className="podcast-title">{episode.title}</h3>
                        <p className="podcast-description">{episode.description}</p>
                        <div className="podcast-links">
                          <div className="platform-links">
                            <a href="#" className="platform-link youtube-link">
                              <FaYoutube /> Youtube
                            </a>
                            <a href="#" className="platform-link spotify-link">
                              <FaSpotify /> Spotify
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Podcasts;