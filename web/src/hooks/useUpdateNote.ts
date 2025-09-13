import { useMutation  } from "@tanstack/react-query"
import { updateNote } from "../api/updateNote"
import { useAllNotes } from "./useNotes"
import { useNoteById } from "./useNoteById"
import { useEditNoteStore } from "../features/editNote"


export const useUpdateNote = () => {
  const {refetch} = useAllNotes()
  const id = useEditNoteStore(state => state.id)
  const {refetch:refetchid} = useNoteById(id ?? 0)
  const mutate = useMutation({
    mutationKey: ['updateNote'],
    mutationFn: updateNote,
    onSuccess: () => {
      refetch()
      refetchid()
    },
  })
  return mutate
}