
import { Context, Effect, Layer, Schema } from "effect"
import { SqlResolver, SqlSchema } from "@effect/sql"
// import { InsertMovieSchema, Movie, UpdateMovieSchema } from "../models/movie.model"
import { dbLive } from "src/db/database.js"
import { NotesTable } from "src/db/schema.js"
import { InsertNoteSchema, Note, UpdateNoteSchema } from "src/domain/notes.model.js"
import { eq } from "drizzle-orm"




const make = Effect.gen(function* () {
  const sql = dbLive


  const AddNote = yield* SqlResolver.ordered("InsertNote", {
    Request: InsertNoteSchema,
    Result: Note,
    execute: (requests) => Effect.gen(function* () {
      const query = yield* Effect.promise(() => {
  return Promise.resolve(sql.insert(NotesTable).values(requests).returning())
})
      return query
    }),
  }).pipe(Effect.withSpan("AddNoteResolver"))

  const DeleteNote = yield* SqlResolver.ordered("DeleteNote", {
    Request: Schema.Number,
    Result: Schema.Struct({ id: Schema.Number }),
    execute: (requests) => Effect.gen(function* () {
      const query = yield* Effect.promise(() => {
  return Promise.resolve(sql.delete(NotesTable).where(eq(NotesTable.id, requests[0])).returning())
})
      return query
    }),

  }).pipe(Effect.withSpan("DeleteNoteResolver"))

  const UpdateNote = yield* SqlResolver.ordered("UpdateNote", {
    Request: UpdateNoteSchema,
    Result: Note,
    execute: (requests) =>Effect.gen(function* () {
      const query = yield* Effect.promise(() => {
  return Promise.resolve(sql.update(NotesTable).set({
    title: requests[0].title,
    content: requests[0].content,
  }).where(eq(NotesTable.id, requests[0].id)).returning())
})
      return query
    }),
  }).pipe(Effect.withSpan("UpdateNoteResolver"))

  const GetNoteById = yield* SqlResolver.findById("GetNoteById", {
    Id: Schema.Number,
    Result: Note,
    ResultId: (result) => result.id,
    execute: (ids) =>Effect.gen(function* () {
      const query = yield* Effect.promise(() => {
  return Promise.resolve(sql.select().from(NotesTable).where(eq(NotesTable.id, ids[0])))
})
      return query
    }),
  }).pipe(Effect.withSpan("GetNoteByIdResolver"))

  const GetAllNotes = SqlSchema.findAll({
    Request: Schema.Void,
    Result: Note,
    execute: () =>Effect.gen(function* () {
      const query = yield* Effect.promise(() => {
  return Promise.resolve(sql.select().from(NotesTable))
})
      return query
    }).pipe(Effect.withSpan("getAllNotesResolver")),
  })


  return {
    addNote: AddNote.execute,
    GetNoteById: GetNoteById.execute,
    getAllNotes: GetAllNotes,
    updateNote: UpdateNote.execute,
    deleteNote: DeleteNote.execute,
  } as const
})

export class NoteRepository extends Context.Tag("NoteRepository")<NoteRepository, Effect.Effect.Success<typeof make>>() {
  static readonly Live = Layer.effect(this, make)
}