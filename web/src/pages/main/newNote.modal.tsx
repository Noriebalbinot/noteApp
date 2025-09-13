import { ButtonPrimary } from '../../components/button.primary'
import { ButtonSecondary } from '../../components/button.secondary'
import { Modal } from '../../components/modal'
import { useAlertStore } from '../../features/alertStore'
import { useNewNoteStore } from '../../features/newNote'
import { useCreateNote } from '../../hooks/useCreateNote'

export function ModalNewNote() {
  const isOpen = useNewNoteStore(state => state.isOpen)
  const close = useNewNoteStore(state => state.close)
  const { mutate } = useCreateNote()
  const addalert = useAlertStore(state => state.addAlert)
  return (
    <Modal isOpen={isOpen} CloseFn={close}>
      <form
        className=" w-full flex flex-col"
        onSubmit={e => {
          e.preventDefault()
          const form = e.target as HTMLFormElement
          const title = (form.elements[0] as HTMLInputElement).value
          const content = (form.elements[1] as HTMLTextAreaElement).value
          content.trim().length === 0
            ? addalert({ message: 'Content cannot be empty', type: 'error' })
            : mutate({ title, content })
          // close()
        }}
      >
        <input
          className="border p-2 mb-2 rounded-xl"
          type="text"
          autoFocus
          placeholder="Title"
          required
        />
        <textarea
          className="border p-2 mb-2 rounded-xl resize-none"
          placeholder="Content"
          required
        />
        <div className="w-full flex gap-2">
          <ButtonPrimary className="w-full" type="submit">
            Create Note
          </ButtonPrimary>
          <ButtonSecondary className="w-full" type="button" onClick={close}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    </Modal>
  )
}
