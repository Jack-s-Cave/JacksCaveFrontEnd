import { useEffect, useState } from 'react';
import MarkdownRenderer from '../../helpers/markdownRenderer';
import './blogpost.css';
import SeriesCard from '../../components/blog/seriesCard';
import { IoShareSocial } from "react-icons/io5";
import NavBar from '../../components/navbar/navbar';
import { useParams } from 'react-router-dom'
import { useBlogById } from 'hooks/useBlogs';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>()
  const { blog, loading, error } = useBlogById(Number(id))
  const [content, setContent] = useState('');

  const [visibleSeriesCount, setVisibleSeriesCount] = useState(3); 
  const name_series = "Serie de Prueba";
  const autor = "Daniel Rayo";
  const blog_name = "Como utilizar REACT";
  const fecha = "Jun 3, 2024";

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

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>
  if (!blog) return null

  return (
    <main>
      <NavBar />
      <div className='blog-post'>

        {/* Contenido Markdown */}
        <div className='blogpost-container'>
          <div className='blog-header'>
            <h1 className='blog-title'>{blog.title}</h1>
            <div className='header-info'>
              <div className='author-info'>
                <img 
                  src="https://images.icon-icons.com/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png" 
                  alt={blog.author}
                  className="author-avatar"
                />
                <p><strong>{blog.author}</strong> • {blog.date}</p>
              </div>
              <div className='share-section'>
                <button className="share-btn"><IoShareSocial /> Share</button>
              </div>
            </div>
          </div>
          <MarkdownRenderer markdownContent={blog.content} />
        </div>

        {/* Serie */}
        <div className='blogpost-subsection'>
          <div className='blogpost-subsection-header'>
            <h1>De la serie "{blog.series ?? 'Sin serie'}"</h1>
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
            <h1>Escrito por {blog.author}</h1>
          </div>
          <div className='by-author-section'>
            {/* TODO: posts del mismo autor */}
          </div>
        </div>

        {/* Otros Posts */}
        <div className='blogpost-subsection'>
          <div className='blogpost-subsection-header'>
            <h1>Otros Posts interesantes</h1>
          </div>
          <div className='interesting-section'>
            {/* TODO: posts relacionados */}
          </div>
        </div>

      </div>
    </main>
  );
};

export default BlogPost;
