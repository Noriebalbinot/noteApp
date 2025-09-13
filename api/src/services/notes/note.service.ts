import { Effect, pipe,Option, Context, Layer, Data } from "effect"
import { NoteRepository } from "./note.repository.js"


class NotFoundedNote extends Data.TaggedError("NotFoundedNote")<{id: number}> {}

const make = Effect.gen(function* () {
  const repo = yield* NoteRepository


  const getAllNotes = repo.getAllNotes
  const getNoteById = (id: number)=> pipe(
    repo.GetNoteById(id),
    Effect.map(
      Option.match({
        onNone: () => {},
        onSome: (note) => note
      }
      )
    )
  )

  const addNote = repo.addNote
  const updateNote = ({id, title, content}: {id: number; title: string; content: string; }) => Effect.gen(function* () {
    const updated = yield* repo.GetNoteById(id)

    if (Option.isNone(updated)) {
      return yield* Effect.fail(new NotFoundedNote({ id }))
    }
    return yield* repo.updateNote({ id, title, content })
  })
  const deleteNote = (id:number)=> Effect.gen(function*(){
    const deleted = yield* repo.GetNoteById(id)

      if (Option.isNone(deleted)) {
        return yield* Effect.fail(new NotFoundedNote({ id }))
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