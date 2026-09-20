import { BASE_URL } from 'services/api';

// Media library URLs come back relative ("/uploads/photo.jpg") with the local
// upload provider, so on the frontend's own origin they resolve to the wrong
// server (which answers with index.html). Make them absolute against the
// backend. Absolute URLs (e.g. from a cloud storage provider) are returned
// unchanged.
export function mediaUrl(url: string): string {
  return url.startsWith('/') ? `${BASE_URL ?? ''}${url}` : url;
}
