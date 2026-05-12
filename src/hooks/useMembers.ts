import { useEffect, useState } from "react";
import { membersService } from "services/membersService";
import { Member } from "types/members";

export function useMembersByYear(year: string) {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setMembers([])
    membersService.getMembersByYear(year)
      .then(setMembers)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [year])
  
  return { members, loading, error }
}
