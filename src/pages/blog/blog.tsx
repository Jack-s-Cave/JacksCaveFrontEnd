/**
 * Blog Component
 * 
 * Componente principal para la visualización de posts de blog con capacidades de filtrado.
 * Permite alternar entre vista de cuadrícula y lista, filtrar por tags y rango de fechas.
 * 
 * @module Blog
 * @author Daniel Rayo
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import './blog.css';
import { FaMountain } from 'react-icons/fa';
import BlogCard from '../../components/blog/blogCard';
import LoadingCard from '../../components/landingpage/loadingCard';
import SearchBar from '../../components/common/searchbar';
import { useSearch } from '../../hooks/useSearch';
import NavBar from '../../components/navbar/navbar';
import DateRangePicker from '../../components/common/daterangepicker';

// ============================================================================
// ICONOS SVG PERSONALIZADOS
// ============================================================================

/**
 * Icono de vista en cuadrícula (grid)
 * Representa el modo de visualización en rejilla de 2x2
 * 
 * @returns {JSX.Element} Elemento SVG del icono de cuadrícula
 */
const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

/**
 * Icono de vista en lista
 * Representa el modo de visualización en lista vertical
 * 
 * @returns {JSX.Element} Elemento SVG del icono de lista
 */
const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

/**
 * Icono de calendario
 * Utilizado para representar la sección de filtros de fecha
 * 
 * @returns {JSX.Element} Elemento SVG del icono de calendario
 */
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

/**
 * Icono de etiqueta (tag)
 * Representa las categorías o etiquetas de los posts
 * 
 * @returns {JSX.Element} Elemento SVG del icono de etiqueta
 */
const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

/**
 * Icono de cerrar (X)
 * Utilizado para remover tags seleccionados
 * 
 * @returns {JSX.Element} Elemento SVG del icono de cerrar
 */
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ============================================================================
// TIPOS DE DATOS
// ============================================================================

/**
 * Interfaz que define la estructura de un post de blog
 * 
 * @interface BlogPost
 * @property {number} id - Identificador único del post
 * @property {string} title - Título del post
 * @property {string} date - Fecha de publicación en formato "MMM D, YYYY"
 * @property {string} author - Nombre del autor del post
 * @property {string} image - URL de la imagen destacada del post
 * @property {string[]} tags - Array de etiquetas asociadas al post
 */
export interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

/**
 * Tipo para los modos de visualización disponibles
 * 
 * @typedef {'grid' | 'list'} ViewMode
 * @description
 * - 'grid': Muestra los posts en una cuadrícula responsive
 * - 'list': Muestra los posts en una lista vertical
 */
type ViewMode = 'grid' | 'list';

// ============================================================================
// DATOS MOCK
// ============================================================================

/**
 * Datos de ejemplo para posts del blog
 * 
 * @constant {BlogPost[]} mockPosts
 * @description
 * Array de posts simulados para desarrollo y testing.
 * TODO: Reemplazar con llamadas a API de Strapi en producción
 * 
 * @example
 * // Estructura esperada de cada post
 * {
 *   id: 1,
 *   title: 'Título del post',
 *   date: 'Jun 3, 2024',
 *   author: 'Nombre Autor',
 *   image: 'https://example.com/image.jpg',
 *   tags: ['Tag1', 'Tag2']
 * }
 */
const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Guía de devs para terminar las cosas',
    date: '2025-12-01',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Productividad', 'Trabajo-remoto', 'Noticias']
  },
  {
    id: 2,
    title: 'Cómo utilizar React de manera sencilla',
    date: '2026-01-10',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Front-End', 'TypeScript', 'Tutorial', 'Desarrollo']
  },
  {
    id: 3,
    title: 'Las bases de Git y GitHub para trabajar en equipo',
    date: '2026-02-10',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Git', 'Soft skills']
  },
  {
    id: 4,
    title: 'Creación de APIs con arquitectura hexagonal',
    date: '2026-03-10',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Back-End', 'Arquitectura', 'Desarrollo']
  },
  {
    id: 5,
    title: 'Cómo conseguir un trabajo que pague en dólares',
    date: '2026-04-10',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Productividad', 'Trabajo-remoto']
  },
  {
    id: 6,
    title: 'Cómo conseguir trabajo con gente de Europa',
    date: '2026-05-10',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Productividad', 'Trabajo-remoto']
  },
  {
    id: 7,
    title: 'Guía de devs para terminar las cosas',
    date: '2026-06-10',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Productividad', 'Trabajo-remoto']
  },
  {
    id: 8,
    title: 'Guía de devs para terminar las cosas',
    date: '2026-07-10',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Productividad', 'Trabajo-remoto']
  }
];

/**
 * Lista de todas las etiquetas disponibles para filtrado
 * 
 * @constant {string[]} allTags
 * @description
 * Tags predefinidos que se muestran en el sidebar para filtrar posts.
 * TODO: Cargar dinámicamente desde la base de datos
 */
const allTags: string[] = [
  'Productividad',
  'Front-End',
  'Git',
  'Trabajo-remoto',
  'Tips & Tricks'
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Componente Blog
 * 
 * @component
 * @description
 * Componente principal que renderiza la interfaz del blog con:
 * - Sidebar de filtros (vista, fechas, tags)
 * - Área principal con grid/lista de posts
 * - Sistema de filtrado interactivo
 * 
 * @returns {JSX.Element} Interfaz completa del blog
 * 
 * @example
 * // Uso básico
 * <Blog />
 * 
 * @features
 * - Cambio entre vista grid y lista
 * - Filtrado por tags múltiples
 * - Filtrado por rango de fechas
 * - Diseño responsive
 * - Soporte para tema claro/oscuro
 */
const Blog: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [dateFrom, setDateFrom] = useState<string>('');

  const [dateTo, setDateTo] = useState<string>('');

  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const toggleTag = (tag: string): void => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  };

  const removeTag = (tag: string): void => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  useEffect(() => {
    // Simular traer datos del back
    const fetchBlogs = async () => {
      setLoading(true)

      setTimeout(() => {
        setBlogs(mockPosts)
        setLoading(false)
      }, 1500)
    }

    fetchBlogs()
  }, [])

  // Hook del funcionamiento de la serch bar, donde se incluye la lista sobre la que se quiere buscar 
  // y el filtro que se quiere aplicar a la misma
  const { query, setQuery, results } = useSearch(
    mockPosts,
    (blog, query) =>
      blog.title.toLowerCase().includes(query) ||
      blog.tags.some(tag => tag.toLowerCase().includes(query))
  )

  const filteredBlogs = mockPosts.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(query.toLowerCase())

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every(tag => blog.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  const maxVisibleCards = 8

  let blogContent

  if (loading) {
    const loadingCards = []

    for (let i = 0; i < maxVisibleCards; i++) {
      loadingCards.push(
        <LoadingCard key={`loading-${i}`} className="post-card-loading" />
      )
    }

    blogContent = loadingCards
  } else {
    blogContent = filteredBlogs.map((post) => (
      <BlogCard
        key={`post-${post.id}`}
        post={post}
      />
    ))
  }

  // ============================================================================
  // RENDERIZADO DEL COMPONENTE
  // ============================================================================

  return (
    <div className="blog-container">
      <NavBar centerComponent={<SearchBar value={query} onChange={setQuery} />}/>
      {/* ========================================================================
          SIDEBAR - PANEL LATERAL DE FILTROS
          ======================================================================== */}
      <div className='sidebar-and-content'>
        <aside className="blog-sidebar">

          {/* --------------------------------------------------------------------
            SECCIÓN: SELECTOR DE VISTA
            -------------------------------------------------------------------- */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Vistas</h3>
            <div className="view-buttons">
              {/* Botón para vista en cuadrícula */}
              <button
                onClick={() => setViewMode('grid')}
                className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                aria-label="Vista en cuadrícula"
                title="Vista en cuadrícula"
              >
                <GridIcon />
              </button>

              {/* Botón para vista en lista */}
              <button
                onClick={() => setViewMode('list')}
                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                aria-label="Vista en lista"
                title="Vista en lista"
              >
                <ListIcon />
              </button>
            </div>
          </div>

          {/* --------------------------------------------------------------------
            SECCIÓN: FILTRO POR FECHAS
            -------------------------------------------------------------------- */}
          <div className="sidebar-section">
          </div>

          {/* --------------------------------------------------------------------
            SECCIÓN: FILTRO POR ETIQUETAS
            -------------------------------------------------------------------- */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">
              <span>Etiquetas Destacadas</span>
              <TagIcon />
            </h3>

            {/* Lista de checkboxes para cada tag */}
            <div className="tags-list">
              {allTags.map((tag: string) => (
                <label key={tag} className="tag-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>

            {/* Botón para ver todas las etiquetas (funcionalidad futura) */}
            <button 
              className="ver-todas-btn"
              aria-label="Ver todas las etiquetas"
            >
              Ver Todas +
            </button>
          </div>
        </aside>

        {/* ========================================================================
          ÁREA PRINCIPAL - CONTENIDO DEL BLOG
          ======================================================================== */}
        <main className="blog-main">
          <div className="blog-content">

            {/* --------------------------------------------------------------------
              HEADER - TÍTULO Y CONTADOR DE POSTS
              -------------------------------------------------------------------- */}
            <div className="headerTitle">
              <div className="header-left">
                <span><FaMountain /></span>
                <h1 className="blog-header">/</h1>
              </div>


              {/* Muestra el número total de posts */}
              <div className="post-count" aria-live="polite">
                ({mockPosts.length} posts)
              </div> 
            </div>

            {/* --------------------------------------------------------------------
              TAGS SELECCIONADOS - BADGES REMOVIBLES
              -------------------------------------------------------------------- */}
            {selectedTags.length > 0 && (
              <div className="selected-tags" role="list" aria-label="Tags seleccionados">
                {selectedTags.map((tag: string) => (
                  <div key={tag} className="selected-tag" role="listitem">
                    <span>{tag}</span>
                    <button 
                      onClick={() => removeTag(tag)} 
                      className="remove-tag-btn"
                      aria-label={`Remover filtro ${tag}`}
                      title={`Remover ${tag}`}
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* --------------------------------------------------------------------
              GRID/LISTA DE POSTS
              -------------------------------------------------------------------- */}
            <div className={`posts-grid ${viewMode}`} role="feed" aria-label="Posts del blog">
              {blogContent}
            </div>
          </div>
        </main>
      </div>
      </div>
  );
};

export default Blog;
