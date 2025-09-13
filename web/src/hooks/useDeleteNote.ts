
import { useMutation  } from "@tanstack/react-query"
import { deleteNote } from "../api/deleteNote"
import { useAllNotes } from "./useNotes"
import { useAlertStore } from "../features/alertStore"


export const useDeleteNote = () => {
  const {refetch} = useAllNotes()
  const alert = useAlertStore(state => state.addAlert)
  const mutate = useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: deleteNote,
    onSuccess: () => {
      refetch()
      alert({ type: 'success', message: 'Note deleted successfully!' })
    },
    onError: () => {
      alert({ type: 'error', message: 'Failed to delete note.' })
    }
  })
  return mutate
}