import { useEffect, useState } from 'react';
import { Author } from '../types/author';
import { authorService } from '../services/authorService';

export const useAuthor = (name: string) => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    authorService.getByName(name)
      .then(found => setAuthor(found ?? null))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [name]);

  return { author, loading, error };
};
