import { XIcon } from "lucide-react";

type SelectedTagsBarProps = {
    selectedSlugs: string[];
    onRemove: (slug: string) => void;
}

const SelectedTagsBar = ({ selectedSlugs, onRemove }: SelectedTagsBarProps) => {
    if (selectedSlugs.length === 0) return null;

    return (
        <div className="selected-tags" role="list" aria-label="Tags seleccionados">
            {selectedSlugs.map((tag) => (
                <div key={tag} className="selected-tag" role="listitem">
                    <span>{tag}</span>
                    <button
                        onClick={() => onRemove(tag)}
                        className="remove-tag-btn"
                        aria-label={`Remover filtro ${tag}`}
                        title={`Remover ${tag}`}
                    >
                        <XIcon />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SelectedTagsBar;
