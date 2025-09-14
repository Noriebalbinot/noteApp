import { useCallback } from 'react'
import { ButtonPrimary } from '../../components/button.primary'
import { ButtonSecondary } from '../../components/button.secondary'
import { H1Title } from '../../components/h1.title'
import { Modal } from '../../components/modal'
import { useEditNoteStore } from '../../features/editNote'
import { useDeleteNote } from '../../hooks/useDeleteNote'
import { useNoteById } from '../../hooks/useNoteById'
import { useUpdateNote } from '../../hooks/useUpdateNote'
import { useValidadeForm } from '../../hooks/useValidadeForm'
import { ButtonDelete } from '../../components/button.delete'
import { AiOutlineClose } from 'react-icons/ai'
import { MdDelete, MdEdit } from 'react-icons/md'

export function ModalEditNote() {
  const isOpen = useEditNoteStore(state => state.isOpen)
  const close = useEditNoteStore(state => state.close)
  const id = useEditNoteStore(state => state.id)
  const { data } = useNoteById(id ?? 0)
  const { mutate } = useUpdateNote()
  const { mutate: deleteNote } = useDeleteNote()
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
      id && mutate({ id, title, content })
      close()
    },
    [validateForm, id, mutate, close]
  )

  return (
    <Modal isOpen={isOpen} CloseFn={close}>
      <form className=" w-full gap-2 flex flex-col" onSubmit={submitHandle}>
        <H1Title>Edit Note</H1Title>
        <input
          type="text"
          className="border p-2 mb-2 rounded-xl"
          placeholder="Title"
          name="title"
          defaultValue={data?.data.title}
          autoFocus
        />
        <textarea
          className="border p-2 mb-2 rounded-xl resize-none"
          placeholder="Content"
          name="content"
          defaultValue={data?.data.content}
        />
        <div className="w-full flex gap-2">
          <ButtonPrimary
            className="w-full  flex  gap-2 items-center"
            type="submit"
          >
            <MdEdit />
            Edit Note
          </ButtonPrimary>
          <ButtonSecondary
            className="w-full  flex  gap-2 items-center"
            type="button"
            onClick={close}
          >
            <AiOutlineClose />
            Cancel
          </ButtonSecondary>
          <ButtonDelete
            className="w-full  flex  gap-2 items-center"
            type="button"
            onClick={() => {
              id && deleteNote(id)
              close()
            }}
          >
            <MdDelete />
            Delete
          </ButtonDelete>
        </div>
      </form>
    </Modal>
  )
}
