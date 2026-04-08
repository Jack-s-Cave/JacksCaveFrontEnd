import { FaGithub, FaLink, FaTwitter } from 'react-icons/fa';
import './author.css'
import NavBar from "components/navbar/navbar";
import { useState } from 'react';

const AuthorPage = () => {
  const tabs = ['TODOS', 'SERIES']
  const [activeTab, setActiveTab] = useState('TODOS');

  return (
    <main>
      <NavBar />
      <section className="author-content">
        <section className="author-sidebar">
          <img 
            className="author-pfp" 
            src="https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg" 
            alt="foto de perfil del autor" 
          />
          <h2 className="author-name">Daniel Rayo</h2>
          <p>Programador en el día 🌞 Dibujante en las noches 🌚</p>
          <ul className='author-socials'>
            <li className='author-social'><FaGithub/> <span>DanielRasho</span></li>
            <li className='author-social'><FaTwitter/> Smaugthur</li>
            <li className='author-social'><FaLink/> danielrasho.github.io/DanielRasho/</li>
          </ul>
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
              <div className="">
              </div>
            ) : (
              <div className="">
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  )
}

export default AuthorPage;
