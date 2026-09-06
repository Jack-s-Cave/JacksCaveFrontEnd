import './sidebar.css'
import DateRangePicker from "components/common/daterangepicker";
import { TagFilter } from "components/common/tagFilter";
import { GridIcon, ListIcon, TagIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { ViewMode } from "types/blog";
import { DateRange, Tag } from "types/filters";

type BlogSidebarProps = {
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  range: DateRange;
  onRangeChange: (range: DateRange) => void;
  selectedSlugs: string[];
  onToggleTag: (slug: string) => void;
  tags: Tag[];
}

const BlogSidebar = ({
  viewMode, onViewModeChange,
  range, onRangeChange,
  selectedSlugs, onToggleTag,
  tags
}: BlogSidebarProps) => {
  const navigate = useNavigate()

  return (
    <aside className="blog-sidebar">
      {viewMode && onViewModeChange && (
        <div className="sidebar-section">
          <h3 className="sidebar-title">Vistas</h3>
          <div className="view-buttons">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              aria-label="Vista en cuadrícula"
              title="Vista en cuadrícula"
            >
              <GridIcon />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              aria-label="Vista en lista"
              title="Vista en lista"
            >
              <ListIcon />
            </button>
          </div>
        </div>
      )}
      <div className="sidebar-section">
      </div>
      <div className="sidebar-section">
        <DateRangePicker label="Fechas" value={range} onChange={onRangeChange} />
        <h3 className="sidebar-title">Etiquetas seleccionadas<TagIcon /></h3>
          <TagFilter tags={tags.filter(tag => selectedSlugs.includes(tag.label))} selectedSlugs={selectedSlugs} onToggle={onToggleTag}/>
        <button 
          className="ver-todas-btn"
          aria-label="Ver todas las etiquetas"
          onClick={() => {navigate('/tags')}}
        >
          Seleccionar etiquetas
        </button>
      </div>
    </aside>
  )
}

export default BlogSidebar
