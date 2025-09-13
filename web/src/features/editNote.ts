import { create } from 'zustand'

interface EditNoteStore {
  isOpen: boolean
  id: number | null
  open: (id: number) => void
  close: () => void
}

export const useEditNoteStore = create<EditNoteStore>((set) => ({
  isOpen: false,
  id: null,
  open: (id) => set({ isOpen: true, id }),
  close: () => set({ isOpen: false, id: null }),
}))
