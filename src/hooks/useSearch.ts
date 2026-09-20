import { useState, useEffect } from 'react'

export function useSearch(delay = 300) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebounced] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(query), delay)
    return () => clearTimeout(timeout)
  }, [query, delay])

  return { query, setQuery, debouncedQuery }
}
