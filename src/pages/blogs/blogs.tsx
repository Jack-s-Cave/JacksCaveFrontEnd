import { useState } from 'react';
import './blogs.css';
import { FaMountain } from 'react-icons/fa';
import SearchBar from '../../components/common/searchbar';
import NavBar from '../../components/navbar/navbar';
import { useBlogs } from 'hooks/useBlogs';
import { ViewMode } from 'types/blog';
import { useSearch } from 'hooks/useSearch';
import { useTags } from 'hooks/useTags';
import { DateRange } from 'types/filters';
import BlogSidebar from 'components/blog/sidebar';
import SelectedTagsBar from 'components/blog/selectedTagBar';
import BlogGrid from 'components/blog/blogGrid';
import BlogList from 'components/blog/blogList';

const Blogs = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [range, setRange] = useState<DateRange>({ from: '', to: '' });
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const { tags } = useTags();
  const { query, setQuery, debouncedQuery } = useSearch();
  const { blogs, loading, error } = useBlogs({
    from: range.from,
    to: range.to,
    tagLabels: selectedSlugs,
    query: debouncedQuery
  });

  const toggleTag = (slug: string) =>
    setSelectedSlugs(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
  );

  const removeTag = (slug: string) =>
    setSelectedSlugs(prev => prev.filter(s => s !== slug));

  return (
    <div className="blog-container">
      <NavBar centerComponent={<SearchBar value={query} onChange={setQuery} />} />
      <div className='sidebar-and-content'>
        <BlogSidebar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          range={range}
          onRangeChange={setRange}
          selectedSlugs={selectedSlugs}
          onToggleTag={toggleTag}
          tags={tags}
        />
        <main className="blog-main">
          <div className="blog-content">
            <div className="headerTitle">
              <div className="header-left">
                <span><FaMountain /></span>
                <h1 className="blog-header">/</h1>
              </div>
              <div className="post-count" aria-live="polite"> ({blogs.length} posts) </div>
            </div>
            <SelectedTagsBar selectedSlugs={selectedSlugs} onRemove={removeTag} />
            {viewMode === 'grid' ? (
              <div className='posts-grid' role="feed">
                <BlogGrid blogs={blogs} loading={loading} error={error} />
              </div>
            ) : (
              <div className="posts-list">
                <BlogList blogs={blogs} loading={loading} error={error} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Blogs;
