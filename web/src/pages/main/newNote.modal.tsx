import { useCallback } from 'react'
import { ButtonPrimary } from '../../components/button.primary'
import { ButtonSecondary } from '../../components/button.secondary'
import { H1Title } from '../../components/h1.title'
import { Modal } from '../../components/modal'
import { useNewNoteStore } from '../../features/newNote'
import { useCreateNote } from '../../hooks/useCreateNote'
import { useValidadeForm } from '../../hooks/useValidadeForm'

export function ModalNewNote() {
  const isOpen = useNewNoteStore(state => state.isOpen)
  const close = useNewNoteStore(state => state.close)
  const { mutate } = useCreateNote()
  const validateForm = useValidadeForm()

  const submitHandle = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const form = new FormData(e.target as HTMLFormElement)
      const title = form.get('title') as string
      const content = form.get('content') as string
      if (!validateForm(title, content)) {
        return
      }
      mutate({ title, content })
      close()
    },
    [validateForm, mutate, close]
  )
  return (
    <Modal isOpen={isOpen} CloseFn={close}>
      <form className=" w-full flex flex-col" onSubmit={submitHandle}>
        <H1Title>New Note</H1Title>
        <input
          className="border p-2 mb-2 rounded-xl"
          name="title"
          type="text"
          autoFocus
          placeholder="Title"
          required
        />
        <textarea
          className="border p-2 mb-2 rounded-xl resize-none"
          name="content"
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
