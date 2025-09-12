import { HttpRouter, HttpServerRequest, HttpServerResponse } from "@effect/platform";
import { Effect, Layer, pipe, Schema } from "effect";
import { CreateNoteSchema, UpdateNoteSchema } from "src/domain/notes.model.js";
import { NoteService } from "src/services/notes/note.service.js";


export class NoteRouter extends HttpRouter.Tag("notes")<NoteRouter>() {}

const Params = Schema.Struct({
  id: Schema.String
});


enum Routes {
  all = "/all",
  id = "/:id",
  create = "/create",
  edit = "/edit/:id",
  delete = "/delete/:id",
}


const getAllNotes = NoteRouter.use((router) => pipe(
    NoteService,
    Effect.flatMap((service) =>
      router.get(
        Routes.all,
        Effect.gen(function* () {
          const notes = yield* service.getAllNotes()
          return yield* HttpServerResponse.json(notes)
        }).pipe(
          Effect.catchTags({
            ParseError: (error) =>
              HttpServerResponse.json({ message: "Invalid request data for fetching all notes", details: error.message }, { status: 400 }),
            HttpBodyError: (error) =>
              HttpServerResponse.json(
                { message: "Error processing request body while fetching all notes", details: error.reason },
                { status: 400 }
              ),

          }),
          Effect.withSpan("GetAllNotesRoute")
        )
      )
    )
  )
);

const GetNoteById = NoteRouter.use((router) =>
  pipe(
    NoteService,
    Effect.flatMap((service) =>
      router.get(
        Routes.id,
        Effect.gen(function* () {
          const { id } = yield* HttpRouter.schemaPathParams(Params)
          const note = yield* service.getNoteById(~~id)
          return yield* HttpServerResponse.json(note)
        }).pipe(
          Effect.catchTags({
            ParseError: (error) =>
              HttpServerResponse.json({ message: "Invalid request data for fetching note by ID", details: error.message }, { status: 400 }),
            HttpBodyError: (error) =>
              HttpServerResponse.json(
                { message: "Error processing request body while fetching note by ID", details: error.reason },
                { status: 400 }
              ),
          }),
          Effect.withSpan("GetNoteByIdRoute")
        )
      )
    )
  )
)

const DeleteNoteById = NoteRouter.use((router) =>
  pipe(
    NoteService,
    Effect.flatMap((service) =>
      router.del(
        Routes.id,
        Effect.gen(function* () {
          const { id } = yield* HttpRouter.schemaPathParams(Params)
          const message = yield* service.deleteNote(~~id)
          return yield* HttpServerResponse.json({ message })
        }).pipe(
          Effect.catchTags({
            ParseError: (error) =>
              HttpServerResponse.json({ message: "Invalid request data for deleting note by ID", details: error.message }, { status: 400 }),
            HttpBodyError: (error) =>
              HttpServerResponse.json(
                { message: "Error processing request body while deleting note by ID", details: error.reason },
                { status: 400 }
              ),
          }),
          Effect.withSpan("DeleteNoteByIdRoute")
        )
      )
    )
  )
)

const CreateNote = NoteRouter.use((router) =>
  pipe(
    NoteService,
    Effect.flatMap((service) =>
      router.post(
        Routes.create,
        Effect.gen(function* () {
          const body = yield* HttpServerRequest.schemaBodyJson(CreateNoteSchema)
          const newNote = yield* service.addNote(body)
          return yield* HttpServerResponse.json(newNote)
        }).pipe(
          Effect.catchTags({
            ParseError: (error) =>
              HttpServerResponse.json({ message: "Invalid request data for creating note", details: error.message }, { status: 400 }),
            RequestError: (error) =>
              HttpServerResponse.json({ message: "Request error while creating note", details: error.message }, { status: 400 }),
            HttpBodyError: (error) =>
              HttpServerResponse.json({ message: "Error processing request body while creating note", details: error.reason }, { status: 400 }),
          }),
          Effect.withSpan("CreateNoteRoute")
        )
      )
    )
  )
)

const UpdateNote = NoteRouter.use((router) =>
  pipe(
    NoteService,
    Effect.flatMap((service) =>
      router.patch(
        Routes.edit,
        Effect.gen(function* () {
          const body = yield* HttpServerRequest.schemaBodyJson(UpdateNoteSchema)
          const updatedNote = yield* service.updateNote(body)
          return yield* HttpServerResponse.json(updatedNote)
        }).pipe(
          Effect.catchTags({
            ParseError: (error) =>
              HttpServerResponse.json({ message: "Invalid request data for updating note", details: error.message }, { status: 400 }),
            RequestError: (error) =>
              HttpServerResponse.json({ message: "Request error while updating note", details: error.message }, { status: 400 }),
            HttpBodyError: (error) =>
              HttpServerResponse.json({ message: "Error processing request body while updating note", details: error.reason }, { status: 422 }),
          }),
          Effect.withSpan("UpdateNoteRoute")
        )
      )
    )
  )
)


export const NoteRoutes = Layer.mergeAll(getAllNotes,CreateNote,UpdateNote,DeleteNoteById, GetNoteById).pipe(
  Layer.provideMerge(NoteRouter.Live)
)