import { ButtonPrimary } from '../../components/button.primary'
import { useNewNoteStore } from '../../features/newNote'

export function Header() {
  const openNewNote = useNewNoteStore(state => state.open)
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <h1
          style={{ color: 'hsl(var(--color-primary))' }}
          className="text-2xl font-bold"
        >
          Teal Notes
        </h1>
        <div className="flex items-center gap-2">
          <ButtonPrimary accessKey="n" onClick={openNewNote}>
            New Note
          </ButtonPrimary>
        </div>
      </div>
    </header>
  )
}
