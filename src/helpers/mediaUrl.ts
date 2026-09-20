import { BASE_URL } from 'services/api';

// Media library URLs come back relative ("/uploads/photo.jpg") with the local
// upload provider, so on the frontend's own origin they resolve to the wrong
// server (which answers with index.html). Make them absolute against the
// backend. Absolute URLs (e.g. from a cloud storage provider) are returned
// unchanged.
export function mediaUrl(url: string): string {
  return url.startsWith('/') ? `${BASE_URL ?? ''}${url}` : url;
}

// Anything that could be used to climb out of /uploads/: "..", backslashes
// (treated as "/" by browsers and some servers), and percent-encoded dots,
// slashes or backslashes. Markdown parsers percent-encode some of these
// before we see them, so both forms are checked. Strapi's own upload URLs
// (name_hash.ext) never need any of them.
const hasPathTricks = (url: string): boolean => /\\|%5c|%2f|%2e|\.\./i.test(url);

// Article bodies are written by Writers, so their image URLs are untrusted.
// Only images from this site's own media library are allowed - never images
// hosted elsewhere: they leak readers' IP and referrer to a third party and
// can be swapped after an Editor has approved the article. Returns the
// absolute URL to render, or null if the image must not be shown.
// (If media moves to a cloud provider, allow that provider's origin here.)
export function resolveInternalImageUrl(src: unknown): string | null {
  if (typeof src !== 'string' || hasPathTricks(src)) return null;
  if (src.startsWith('/uploads/')) return mediaUrl(src);
  if (BASE_URL && src.startsWith(`${BASE_URL}/uploads/`)) return src;
  return null;
}
