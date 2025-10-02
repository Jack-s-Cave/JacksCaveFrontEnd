import React, { useEffect, useState } from 'react';
import MarkdownRenderer from '../../helpers/markdownRenderer';
import './blogpost.css';
import RecentCard from '../../components/landingpage/recentCard';
import SeriesCard from '../../components/blog/seriesCard';
import { IoShareSocial } from "react-icons/io5";

const BlogPost: React.FC = () => {
  const [content, setContent] = useState('');
  const [visibleSeriesCount, setVisibleSeriesCount] = useState(3); // 👈 Por defecto 3 visibles
  const name_series = "Serie de Prueba";
  const autor = "Daniel Rayo";
  const blog_name = "Como utilizar REACT";
  const fecha = "Jun 3, 2024";

  useEffect(() => {
    fetch('/test_blogpost/blog.md')
      .then(res => res.text())
      .then(setContent)
      .catch(err => console.error(err));
  }, []);

  const seriesPosts = [
    {
      date: "Oct 30, 2024",
      author: "Francis Aguilar",
      title: "Título Placeholder un poco más largo para pruebas",
      imageSrc: "https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg",
      tags: ["tags", "gato", "jeje", "gato2", "gato3", "gato4"]
    },
    {
      date: "Jun 3, 2025",
      author: "Gustavo Gonzales",
      title: "Título Placeholder un poco más largo para pruebas",
      imageSrc: "https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg",
      tags: ["Sanitas", "Tecnologia", "Videojuegos", "gato2", "gato3", "gato4"]
    },
    {
      date: "Jun 3, 2025",
      author: "Daniel Rayo",
      title: "Título Placeholder un poco más largo para pruebas un poco mas por si acaso",
      imageSrc: "https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg",
      tags: ["tags", "gato", "jeje", "gato2", "gato3", "gato4", "prueba"]
    },
    {
      date: "Jul 12, 2025",
      author: "Ana Torres",
      title: "Otro post placeholder adicional",
      imageSrc: "https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg",
      tags: ["extra", "demo"]
    },
    {
      date: "Ago 20, 2025",
      author: "Luis Pérez",
      title: "Quinto post placeholder",
      imageSrc: "https://static-live.nmas.com.mx/nmas-news/styles/corte_16_9/cloud-storage/2023-08/perrito-cheems-nombre-real-significado.jpg?itok=XiN5ZKI6",
      tags: ["ultimo", "test"]
    }
  ];

  const authorPosts = seriesPosts.slice(0, 3); 
  const interestingPosts = seriesPosts.slice(0, 3);

  const handleSeeMore = () => {
    setVisibleSeriesCount(prev =>
      prev >= seriesPosts.length ? 3 : Math.min(prev + 2, seriesPosts.length)
    );
  };

  return (
    <div className='blog-post'>

      {/* Contenido Markdown */}
      <div className='blog-container' style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
        <div className='blog-header'>
          <h1 className='blog-title'>{blog_name}</h1>
          <div className='header-info'>
            <div className='author-info'>
              <img 
                src="https://images.icon-icons.com/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png" 
                alt={autor}
                className="author-avatar"
              />
              <p><strong>{autor}</strong> • {fecha}</p>
            </div>
            <div className='share-section'>
               <button className="share-btn"> <IoShareSocial /> Share</button>
            </div>
          </div>
        </div>
        <MarkdownRenderer markdownContent={content} />
      </div>

      {/* Serie */}
      <div className='blogpost-subsection'>
        <div className='blogpost-subsection-header'>
          <h1>De la serie "{name_series}"</h1>
        </div>
        <ul className='series-timeline'>
          {seriesPosts.slice(0, visibleSeriesCount).map((post, i) => (
            <li key={i}>
              <SeriesCard {...post} />
            </li>
          ))}
        </ul>
        <div className="timeline-footer">
          <button className="see-more-btn" onClick={handleSeeMore}>
            {visibleSeriesCount >= seriesPosts.length ? "Ver menos" : "Ver más"}
          </button>
        </div>
      </div>

      {/* Autor */}
      <div className='blogpost-subsection'>
        <div className='blogpost-subsection-header'>
          <h1>Escrito por {autor}</h1>
        </div>
        <div className='by-author-section'>
          {authorPosts.map((post, i) => (
            <RecentCard key={i} {...post} />
          ))}
        </div>
      </div>

      {/* Otros Posts */}
      <div className='blogpost-subsection'>
        <div className='blogpost-subsection-header'>
          <h1>Otros Posts interesantes</h1>
        </div>
        <div className='interesting-section'>
          {interestingPosts.map((post, i) => (
            <RecentCard key={i} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
