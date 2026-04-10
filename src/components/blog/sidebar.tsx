import DateRangePicker from "components/common/daterangepicker";
import { TagFilter } from "components/common/tagFilter";
import { GridIcon, ListIcon, TagIcon } from "lucide-react";
import { ViewMode } from "types/blog";
import { DateRange, Tag } from "types/filters";

type BlogSidebarProps = {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
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
  return (
    <aside className="blog-sidebar">
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
      <div className="sidebar-section">
      </div>
      <div className="sidebar-section">
        <DateRangePicker label="Fechas" value={range} onChange={onRangeChange} />
        <h3 className="sidebar-title">
          <span>Etiquetas Destacadas</span>
          <TagIcon />
        </h3>
        <TagFilter tags={tags} selectedSlugs={selectedSlugs} onToggle={onToggleTag}/>
        <button 
          className="ver-todas-btn"
          aria-label="Ver todas las etiquetas"
        >
          Ver Todas +
        </button>
      </div>
    </aside>
  )
}

export default BlogSidebar
