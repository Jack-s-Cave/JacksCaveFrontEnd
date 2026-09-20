import { useEffect, useMemo, useState } from "react";
import { membersService, AsociacionYear } from "services/membersService";

export function useAsociaciones() {
  const [entries, setEntries] = useState<AsociacionYear[]>([])
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    membersService.getAll()
      .then(data => {
        const sorted = [...data].sort((a, b) => b.year - a.year)
        setEntries(sorted)
        if (sorted.length > 0) setSelectedYear(sorted[0].year)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const years = useMemo(() => entries.map(e => e.year), [entries])
  const members = useMemo(
    () => entries.find(e => e.year === selectedYear)?.members ?? [],
    [entries, selectedYear]
  )

  return { years, selectedYear, setSelectedYear, members, loading, error }
}
