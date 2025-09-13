import { ButtonPrimary } from '../../components/button.primary'
import { ButtonSecondary } from '../../components/button.secondary'
import { H1Title } from '../../components/h1.title'
import { Modal } from '../../components/modal'
import { useEditNoteStore } from '../../features/editNote'
import { useDeleteNote } from '../../hooks/useDeleteNote'
import { useNoteById } from '../../hooks/useNoteById'
import { useUpdateNote } from '../../hooks/useUpdateNote'

export function ModalEditNote() {
  const isOpen = useEditNoteStore(state => state.isOpen)
  const close = useEditNoteStore(state => state.close)
  const id = useEditNoteStore(state => state.id)
  const { data } = useNoteById(id ?? 0)
  const { mutate } = useUpdateNote()
  const { mutate: deleteNote } = useDeleteNote()
  return (
    <Modal isOpen={isOpen} CloseFn={close}>
      <form
        className=" w-full gap-2 flex flex-col"
        onSubmit={e => {
          e.preventDefault()
          const form = e.target as HTMLFormElement
          const title = (form.elements[0] as HTMLInputElement).value
          const content = (form.elements[1] as HTMLTextAreaElement).value
          id && mutate({ id, title, content })
          close()
        }}
      >
        <H1Title>Edit Note</H1Title>
        <input
          type="text"
          className="border p-2 mb-2 rounded-xl"
          placeholder="Title"
          defaultValue={data?.data.title}
          autoFocus
        />
        <textarea
          className="border p-2 mb-2 rounded-xl resize-none"
          placeholder="Content"
          defaultValue={data?.data.content}
        />
        <div className="w-full flex gap-2">
          <ButtonPrimary className="w-full" type="submit">
            Edit Note
          </ButtonPrimary>
          <ButtonSecondary className="w-full" type="button" onClick={close}>
            Cancel
          </ButtonSecondary>
          <ButtonSecondary
            className="w-full"
            type="button"
            onClick={() => {
              id && deleteNote(id)
              close()
            }}
          >
            Delete
          </ButtonSecondary>
        </div>
      </form>
    </Modal>
  )
}
