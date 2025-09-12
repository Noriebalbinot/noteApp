import { Effect, pipe,Option, Context, Layer } from "effect"
import { NoteRepository } from "./note.repository.js"




const make = Effect.gen(function* () {
  const repo = yield* NoteRepository


  const getAllNotes = repo.getAllNotes
  const getNoteById = (id: number)=> pipe(
    repo.GetNoteById(id),
    Effect.map(
      Option.match({
        onNone: () => "Note not Found",
        onSome: (note) => note
      }
      )
    )
  )

  const addNote = repo.addNote 
  const updateNote = repo.updateNote
  const deleteNote = (id:number)=> Effect.gen(function*(){
    const deleted = yield* repo.GetNoteById(id)

      if (Option.isNone(deleted)) {
        return `Note with ID: ${id} not found`
      } else {
        yield* repo.deleteNote(id)
        return `Note with ID: ${id} deleted successfully`
      }
    }
    )
  return { getAllNotes,
    getNoteById,
    addNote,
    updateNote,
    deleteNote
  }

  // return repo
})

export class NoteService extends Context.Tag("NoteService")<NoteService, Effect.Effect.Success<typeof make>>() {
  static readonly Live = Layer.effect(this, make)
}