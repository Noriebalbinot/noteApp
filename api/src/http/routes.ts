import { HttpRouter } from "@effect/platform"
import { Effect, Layer } from "effect"
import { NoteRouter, NoteRoutes } from "./notes/notes.routes.js"

export const AppRouter = HttpRouter.Default.use((router) =>
  Effect.gen(function* () {
    yield* router.mount("/notes", yield* NoteRouter.router)
  })
).pipe(Layer.provide(NoteRoutes))