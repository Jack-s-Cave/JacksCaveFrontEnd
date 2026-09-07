import { useEffect, useState } from "react";
import { asociacionInfoService } from "services/asociacionInfoService";
import { AsociacionInfo } from "types/asociacionInfo";

export function useAsociacionInfo() {
  const [info, setInfo] = useState<AsociacionInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    asociacionInfoService.get()
      .then(setInfo)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { info, loading, error }
}
