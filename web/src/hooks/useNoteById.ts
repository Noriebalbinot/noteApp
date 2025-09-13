
import { useQuery } from "@tanstack/react-query"
import { getNoteById } from "../api/getNoteById"


export const useNoteById = (id:number) => {
  const query = useQuery({
    queryKey: ['note', id],
    queryFn: () =>getNoteById(id),
  })
  return query
}