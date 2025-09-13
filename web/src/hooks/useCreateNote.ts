import {  useMutation,   } from "@tanstack/react-query"
import { createNote } from "../api/createNote"
import { useAllNotes } from "./useNotes";


export const useCreateNote = () => {
  const {refetch} = useAllNotes()
  const mutate = useMutation({
    mutationKey: ['createNote'],
    mutationFn: createNote,
    onSuccess: () =>{
      refetch()
    }
  })
  
  return mutate
}