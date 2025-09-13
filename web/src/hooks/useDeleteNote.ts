
import { useMutation  } from "@tanstack/react-query"
import { deleteNote } from "../api/deleteNote"
import { useAllNotes } from "./useNotes"


export const useDeleteNote = () => {
  const {refetch} = useAllNotes()
  const mutate = useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: deleteNote,
    onSuccess: () => {
      refetch()
    },
  })
  return mutate
}