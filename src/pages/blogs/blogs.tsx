import { useState } from 'react';
import './blogs.css';
import { FaMountain } from 'react-icons/fa';
import LoadingCard from '../../components/landingpage/loadingCard';
import SearchBar from '../../components/common/searchbar';
import NavBar from '../../components/navbar/navbar';
import { GridIcon, ListIcon, TagIcon, XIcon } from 'lucide-react';
import { useBlogs } from 'hooks/useBlogs';
import { Blog } from 'types/blog';
import { useSearch } from 'hooks/useSearch';
import BlogCard from 'components/blog/blogCard';
import DateRangePicker from 'components/common/daterangepicker';
import { useDateFilter } from 'hooks/useDateFilter';
import { useTags } from 'hooks/useTags';
import { TagFilter } from 'components/common/tagFilter';

type ViewMode = 'grid' | 'list';

function BlogList({ blogs, loading, error }: {
  blogs: Blog[]
  loading: boolean
  error: string | null
}) {
  const max_visible_blogs = 6
  if (error) return <div>error</div>
  if (loading) return (
    <>
      {[...Array(max_visible_blogs)].map((_, i) => (
        <LoadingCard key={i} className='blog-card' />
      ))}
    </>
  )
  return blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
}

const Blogs = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { blogs, loading, error } = useBlogs()
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  const { tags } = useTags()

  const { range, setRange, filtered } = useDateFilter(blogs, 'date')

  const { query, setQuery, results } = useSearch(
    blogs,
    (blog, query) =>
      blog.title.toLowerCase().includes(query) ||
      blog.tags.some(tag => tag.label.toLowerCase().includes(query))
  )

  const filteredBlogs = results.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.tags.some(tag => tag.label.toLowerCase().includes(query.toLowerCase()))
    return matchesSearch
  })

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag))
  }

  return (
    <div className="blog-container">
      <NavBar centerComponent={<SearchBar value={query} onChange={setQuery} />}/>
      <div className='sidebar-and-content'>
        <aside className="blog-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Vistas</h3>
            <div className="view-buttons">
              <button
                onClick={() => setViewMode('grid')}
                className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                aria-label="Vista en cuadrícula"
                title="Vista en cuadrícula"
              >
                <GridIcon />
              </button>
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
          <div className="sidebar-section">
          </div>
          <div className="sidebar-section">
            <DateRangePicker label="Fechas" value={range} onChange={setRange} />
            <h3 className="sidebar-title">
              <span>Etiquetas Destacadas</span>
              <TagIcon />
            </h3>
            <TagFilter tags={tags} selectedSlugs={selectedSlugs} onToggle={toggleTag}/>
            <button 
              className="ver-todas-btn"
              aria-label="Ver todas las etiquetas"
            >
              Ver Todas +
            </button>
          </div>
        </aside>
        <main className="blog-main">
          <div className="blog-content">
            <div className="headerTitle">
              <div className="header-left">
                <span><FaMountain /></span>
                <h1 className="blog-header">/</h1>
              </div>
              <div className="post-count" aria-live="polite">
                ({filteredBlogs.length} posts)
              </div> 
            </div>
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
            <div className='posts-grid' role="feed" aria-label="Posts del blog">
              <BlogList blogs={filteredBlogs} loading={loading} error={error}/>
            </div>
          </div>
        </main>
      </div>
      </div>
  );
};

export default Blogs;
