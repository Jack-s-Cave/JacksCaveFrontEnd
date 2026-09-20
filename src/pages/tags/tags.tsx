import './tags.css'
import { useState } from 'react';
import NavBar from 'components/navbar/navbar';
import { useSelectedTags, useTags } from 'hooks/useTags';
import { DateRange } from 'types/filters';
import BlogSidebar from 'components/blog/sidebar';
import SelectedTagsBar from 'components/blog/selectedTagBar';
import { FaMountain } from 'react-icons/fa';
import { useSearch } from 'hooks/useSearch';
import SearchBar from 'components/common/searchbar';
import TagCollection from 'components/tags/tagCollection';
import { useNavigate } from 'react-router-dom';
import { ViewMode } from 'types/blog';

const TagsPage = () => {
  const [range, setRange] = useState<DateRange>({ from: '', to: '' });
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const { tags } = useTags();
  const { selectedSlugs, toggleTag, removeTag } = useSelectedTags(tags)
  const { query, setQuery } = useSearch();
  const navigate = useNavigate()

  return (
    <main>
      <NavBar />
      <div className="sidebar-and-content">
        <BlogSidebar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          range={range}
          onRangeChange={setRange}
          selectedSlugs={selectedSlugs}
          onToggleTag={toggleTag}
          tags={tags}
        />
        <div className="tags-content">
          <header>
            <div className="header-title">
              <span><FaMountain /></span>
              <h2>/ Tags</h2>
            </div>
            <SelectedTagsBar selectedSlugs={selectedSlugs} onRemove={removeTag} />
          </header>
          <div className="all-tags">
            <section className="search-tags">
              <SearchBar value={query} onChange={setQuery} />
              <button className='confirm-btn' onClick={() => {navigate('/blogs')}}>Confirmar etiquetas</button>
            </section>
            <section className='tag-grid'>
              <TagCollection name='Todas' tags={tags} selectedSlugs={selectedSlugs} onToggle={toggleTag}/>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TagsPage;
