import { useEffect, useState } from "react"
import { membersService } from "services/membersService"
import { Member } from "types/members"

export function useMembers() {
  const [currentMembers, setCurrentMembers] = useState<Member[]>([])
  const [previousMembers, setPreviousMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setTimeout(() => {
      Promise.all([
        membersService.getCurrentMembers(),
        membersService.getPreviousMembers()
      ])
        .then(([current, previous]) => {
          setCurrentMembers(current)
          setPreviousMembers(previous)
        })
        .catch(e => setError(e.message))
        .finally(() => setLoading(false))
    }, 1500)
  }, [])

  return { currentMembers, previousMembers, loading, error }
}
