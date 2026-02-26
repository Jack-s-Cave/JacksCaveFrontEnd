import { useEffect, useState } from "react"

export function useSearch<T>(
  items: T[], // Se utiliza template para poder reutilizar el componente en varias páginas
  searchFn: (item: T, query: string) => boolean,
  delay = 300
) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<T[]>(items)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query) {
        setResults(items)
        return
      }

      const lowerCase = query.toLowerCase()
      const filtered = items.filter(item =>
        searchFn(item, lowerCase)
      )

      setResults(filtered)
    }, delay)

    return () => clearTimeout(timeout)
  }, [query, items, searchFn, delay])

  return { query, setQuery, results }
}
