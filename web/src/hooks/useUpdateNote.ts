import { useMutation  } from "@tanstack/react-query"
import { updateNote } from "../api/updateNote"
import { useAllNotes } from "./useNotes"
import { useNoteById } from "./useNoteById"
import { useEditNoteStore } from "../features/editNote"
import { useAlertStore } from "../features/alertStore"


export const useUpdateNote = () => {
  const {refetch} = useAllNotes()
  const id = useEditNoteStore(state => state.id)
  const {refetch:refetchid} = useNoteById(id ?? 0)
  const alert = useAlertStore(state => state.addAlert)
  const mutate = useMutation({
    mutationKey: ['updateNote'],
    mutationFn: updateNote,
    onSuccess: () => {
      refetch()
      refetchid()
      alert({ type: 'success', message: 'Note updated successfully!' })
    },
    onError: () => {
      alert({ type: 'error', message: 'Failed to update note.' })
    }
  })
  return mutate
}