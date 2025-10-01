import React, { useState } from 'react';
import './blog.css';
import { FaMountain } from 'react-icons/fa';

// Iconos SVG personalizados
const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

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

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// Datos de ejemplo - reemplazar con llamadas a Strapi en el futuro
const mockPosts = [
  {
    id: 1,
    title: 'Guía de devs para terminar las cosas',
    date: 'Jun 3, 2024',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Productividad', 'Trabajo-remoto', 'Noticias']
  },
  {
    id: 2,
    title: 'Guía de devs para terminar las cosas',
    date: 'Jun 3, 2024',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Productividad', 'Trabajo-remoto', 'Noticias']
  },
  {
    id: 3,
    title: 'Guía de devs para terminar las cosas',
    date: 'Jun 3, 2024',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['SQL', 'Visión por Computadora', 'Machine Learning']
  },
  {
    id: 4,
    title: 'Guía de devs para terminar las cosas',
    date: 'Jun 3, 2024',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Productividad', 'Trabajo-remoto']
  },
  {
    id: 5,
    title: 'Guía de devs para terminar las cosas',
    date: 'Jun 3, 2024',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Productividad', 'Trabajo-remoto']
  },
  {
    id: 6,
    title: 'Guía de devs para terminar las cosas',
    date: 'Jun 3, 2024',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Productividad', 'Trabajo-remoto']
  },
  {
    id: 7,
    title: 'Guía de devs para terminar las cosas',
    date: 'Jun 3, 2024',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Productividad', 'Trabajo-remoto']
  },
  {
    id: 8,
    title: 'Guía de devs para terminar las cosas',
    date: 'Jun 3, 2024',
    author: 'Daniel Rayo',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    tags: ['Productividad', 'Trabajo-remoto']
  }
];

const allTags = [
  'Productividad',
  'React',
  'News',
  'Trabajo Remoto',
  'Tips & Tricks'
];

const Blog: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  return (
    <div className="blog-container">
      {/* Sidebar */}
      <aside className="blog-sidebar">
        {/* Vistas */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">Vistas</h3>
          <div className="view-buttons">
            <button
              onClick={() => setViewMode('grid')}
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            >
              <GridIcon />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
            >
              <ListIcon />
            </button>
          </div>
        </div>

        {/* Fechas */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">
            <CalendarIcon />
            <span>Fechas</span>
          </h3>
          <div className="date-inputs">
            <div className="date-input-group">
              <label>Desde</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="date-input-group">
              <label>Hasta</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Etiquetas Destacadas */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">
            <TagIcon />
            <span>Etiquetas Destacadas</span>
          </h3>
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
          <button className="ver-todas-btn">Ver Todas +</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="blog-main">
        <div className="blog-content">
          <div className="headerTitle">
            <div className="header-left">
              <span><FaMountain /></span>
              <h1 className="blog-header">/</h1>
            </div>
            {/* Post Count */}
            <div className="post-count">
              ({mockPosts.length} posts)
            </div> 
          </div>


          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="selected-tags">
              {selectedTags.map((tag: string) => (
                <div key={tag} className="selected-tag">
                  <span>{tag}</span>
                  <button onClick={() => removeTag(tag)} className="remove-tag-btn">
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Posts Grid */}
          <div className={`posts-grid ${viewMode}`}>
            {mockPosts.map(post => (
              <article key={post.id} className="post-card">
                {/* Header */}
                <div className="post-header">
                  <span className="post-date">{post.date}</span>
                  <span className="post-author">{post.author}</span>
                </div>

                {/* Image */}
                <div className="post-image-container">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image"
                  />
                </div>

                {/* Content */}
                <div className="post-content">
                  <h2 className="post-title">{post.title}</h2>
                  <div className="post-tags">
                    {post.tags.map((tag: string, index: number) => (
                      <span key={index} className="post-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;