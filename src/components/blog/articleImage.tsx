import { resolveInternalImageUrl } from 'helpers/mediaUrl';

type ArticleImageProps = {
  src?: unknown;
  alt?: string;
};

// <img> for images inside article markdown. Renders only images from the
// site's own media library and drops everything else (see
// resolveInternalImageUrl for why).
const ArticleImage = ({ src, alt }: ArticleImageProps) => {
  const resolved = resolveInternalImageUrl(src);
  if (!resolved) return null;
  return <img src={resolved} alt={alt ?? ''} loading="lazy" />;
};

export default ArticleImage;
