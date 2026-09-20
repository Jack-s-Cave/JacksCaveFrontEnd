import NavBar from '../../components/navbar/navbar';
import { useEffect, useMemo, useState } from 'react';
import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FiFolder, FiSearch } from 'react-icons/fi';
import './podcast.css';
import PodcastEpisodesList from 'components/podcast/podcastEpisodeList';
import { usePodcastCrew } from 'hooks/usePodcastCrew';
import { useAllPodcastEpisodes } from 'hooks/usePodcast';
import ErrorMessage from 'components/common/errorMessage';
import Spinner from 'components/common/spinner';

const Podcasts = () => {
  const { crew } = usePodcastCrew();
  const { episodes, loading, error } = useAllPodcastEpisodes();

  const years = useMemo(
    () => Array.from(new Set(episodes.map(e => new Date(e.date).getFullYear()))).sort((a, b) => b - a),
    [episodes]
  );
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [yearsInitialized, setYearsInitialized] = useState(false);

  useEffect(() => {
    if (!yearsInitialized && years.length > 0) {
      setSelectedYears(years);
      setYearsInitialized(true);
    }
  }, [years, yearsInitialized]);

  const toggleYear = (year: number) => {
    setSelectedYears(prev => prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const visibleEpisodes = useMemo(() => {
    const byYear = episodes.filter(e => selectedYears.includes(new Date(e.date).getFullYear()));
    const q = searchQuery.trim().toLowerCase();
    if (!q) return byYear;
    return byYear.filter(e => e.title.toLowerCase().includes(q));
  }, [episodes, selectedYears, searchQuery]);

  // TODO: re-enable playlists view in a future release.
  // const [activeTab, setActiveTab] = useState('TODAS');
  // const playlistsData = [
  //   {
  //     id: 1,
  //     title: "Los Favoritos",
  //     description: "Los episodios más populares del podcast"
  //   },
  //   {
  //     id: 2,
  //     title: "Buscar trabajo",
  //     description: "Episodios sobre búsqueda de empleo y carrera"
  //   },
  //   {
  //     id: 3,
  //     title: "Noticias Tech",
  //     description: "Las últimas noticias del mundo tecnológico"
  //   }
  // ];

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

  // TODO: re-enable playlists view in a future release.
  // const tabs = ['LISTAS', 'TODAS'];

  return (
    <main className='podcasts-content'>
      <NavBar />
      <div className="podcasts-page">
        <section className="hero-section-podcasts">
          <div className="hero-overlay">
            {crew?.heroImage && (
              <img
                src={crew.heroImage}
                alt="Podcast Image"
                className="hero-background"
              />
            )}
          </div>
        </section>

        <section className="about-section">
          <div className="about-container">
            <div className="about-content">
              <h2 className="about-title">¿QUIÉNES SOMOS?</h2>
              <p className="about-description">
                {crew?.proposito ?? 'Cargando...'}
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
              <div className="logo-placeholder">
                <span>Logo</span>
              </div>
            </div>
          </div>
        </section>

        {/* TODO: re-enable playlists view in a future release.
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
        */}

        <section className="publications-section">
          <div className="publications-container">
            <div className="sidebar">
              <h3 className="sidebar-title">
                <FiFolder className="folder-icon" />
                Publicaciones
              </h3>
              <div className="year-filters">
                {years.map(year => (
                  <label key={year} className="year-filter">
                    <input
                      type="checkbox"
                      checked={selectedYears.includes(year)}
                      onChange={() => toggleYear(year)}
                    />
                    <span>{year}</span>
                  </label>
                ))}
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <span className="post-count">({visibleEpisodes.length} posts)</span>
              </div>

              <div className="podcasts-grid">
                {/* TODO: re-enable playlists view in a future release.
                {activeTab === 'LISTAS' ? (
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
                    <PodcastEpisodesList />
                  )}
                */}
                {loading
                  ? <Spinner />
                  : error
                    ? <ErrorMessage />
                    : <PodcastEpisodesList episodes={visibleEpisodes} />
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Podcasts;
