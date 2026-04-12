import './tags.css'
import { useState } from 'react';
import NavBar from 'components/navbar/navbar';
import { useTags } from 'hooks/useTags';
import { DateRange } from 'types/filters';
import BlogSidebar from 'components/blog/sidebar';
import SelectedTagsBar from 'components/blog/selectedTagBar';
import { FaMountain } from 'react-icons/fa';
import { useSearch } from 'hooks/useSearch';
import SearchBar from 'components/common/searchbar';
import TagCollection from 'components/tags/tagCollection';

const TagsPage = () => {
  const [range, setRange] = useState<DateRange>({ from: '', to: '' });
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const { query, setQuery, debouncedQuery } = useSearch();
  const { tags } = useTags();

  const toggleTag = (slug: string) =>
    setSelectedSlugs(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );

  const removeTag = (slug: string) =>
    setSelectedSlugs(prev => prev.filter(s => s !== slug));

  return (
    <main>
      <NavBar />
      <div className="sidebar-and-content">
        <BlogSidebar
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
              <button className='confirm-btn'>Confirmar etiquetas</button>
            </section>
            <section className='tag-grid'>
              <TagCollection name='Todas' tags={tags}/>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TagsPage;
