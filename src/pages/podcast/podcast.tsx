import NavBar from '../../components/navbar/navbar';
import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FiFolder, FiSearch } from 'react-icons/fi';
import './podcast.css';
import PodcastEpisodesList from 'components/podcast/podcastEpisodeList';
import { usePodcastCrew } from 'hooks/usePodcastCrew';

const Podcasts = () => {
  const { crew } = usePodcastCrew();

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
                <PodcastEpisodesList />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Podcasts;
