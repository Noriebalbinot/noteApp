import {  useMutation,   } from "@tanstack/react-query"
import { createNote } from "../api/createNote"
import { useAllNotes } from "./useNotes";
import { useAlertStore } from "../features/alertStore";


export const useCreateNote = () => {
  const {refetch} = useAllNotes()
  const alert = useAlertStore(state => state.addAlert)
  const mutate = useMutation({
    mutationKey: ['createNote'],
    mutationFn: createNote,
    onSuccess: () =>{
      refetch()
      alert({ type: 'success', message: 'Note created successfully!' })
    },
    onError: () =>{
      alert({ type: 'error', message: 'Failed to create note.' })
    }
  })
  
  return mutate
}