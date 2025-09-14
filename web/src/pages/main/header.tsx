import { AiOutlinePlus } from 'react-icons/ai'
import { ButtonPrimary } from '../../components/button.primary'
import { H1Title } from '../../components/h1.title'
import { useNewNoteStore } from '../../features/newNote'

export function Header() {
  const openNewNote = useNewNoteStore(state => state.open)
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="flex items-center gap-2">
          <ButtonPrimary
            accessKey="n"
            className="w-full  flex  gap-2 items-center"
            onClick={openNewNote}
          >
            <AiOutlinePlus />
            New Note
          </ButtonPrimary>
        </div>

        <H1Title>Notes App</H1Title>

        <div></div>
      </div>
    </header>
  )
}
