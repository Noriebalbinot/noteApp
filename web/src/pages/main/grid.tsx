import { Card } from '../../components/card'
import { useEditNoteStore } from '../../features/editNote'
import { useAllNotes } from '../../hooks/useNotes'

export function Grid() {
  const { data } = useAllNotes()
  const openEdit = useEditNoteStore(state => state.open)
  return (
    <main className="app-main">
      {/* TODO: list / editor will live here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Placeholder cards for visual proof */}
        {data?.data.map(note => (
          <Card key={note.id} note={note} onClick={() => openEdit(note.id)} />
        ))}
      </div>
    </main>
  )
}
