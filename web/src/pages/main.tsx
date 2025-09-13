import { AlertQueue } from './main/alertQeue'
import { ModalEditNote } from './main/editNote.modal'
import { Grid } from './main/grid'
import { Header } from './main/header'
import { ModalNewNote } from './main/newNote.modal'

export function Main() {
  return (
    <>
      <Header />
      <Grid />
      <ModalNewNote />
      <ModalEditNote />
      <AlertQueue />
    </>
  )
}
