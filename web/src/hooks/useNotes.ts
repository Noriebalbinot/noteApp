
import { useQuery } from "@tanstack/react-query"
import { getAllNotes } from "../api/getAllNotes"


export const useAllNotes = () => {
  const query = useQuery({
    queryKey: ['allNotes'],
    queryFn: getAllNotes,
  })
  return query
}