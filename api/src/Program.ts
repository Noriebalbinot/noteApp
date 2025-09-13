import { HttpRouter, HttpServer } from "@effect/platform"
import {NodeHttpServer, NodeRuntime} from "@effect/platform-node"
import { Layer } from "effect"
import { createServer } from "http"
import 'dotenv/config'
import { AppRouter } from "./http/routes.js"
import { NoteService } from "./services/notes/note.service.js"
import { NoteRepository } from "./services/notes/note.repository.js"
import { DbLive } from "./db/database.js"


const Server = NodeHttpServer.layer(createServer, { port: 3000, host:"localhost" })

const Http = HttpRouter.Default.unwrap(HttpServer.serve()).pipe(
  Layer.provide(AppRouter),
  Layer.provide(Server),
  Layer.provide(NoteService.Live),
  Layer.provide(NoteRepository.Live),
  Layer.provide(DbLive.Live),

)

NodeRuntime.runMain(Layer.launch(Http))