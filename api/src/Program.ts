import { HttpRouter, HttpServer } from "@effect/platform"
import {NodeHttpServer, NodeRuntime} from "@effect/platform-node"
import { Layer } from "effect"
import { createServer } from "http"
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql';
import { AppRouter } from "./http/routes.js"
import { NoteService } from "./services/notes/note.service.js"
import { NoteRepository } from "./services/notes/note.repository.js"

const db = drizzle(process.env.DB_FILE_NAME!);

const Server = NodeHttpServer.layer(createServer, { port: 3000, host:"localhost" })

const Http = HttpRouter.Default.unwrap(HttpServer.serve()).pipe(
  Layer.provide(AppRouter),
  Layer.provide(Server),
  Layer.provide(NoteService.Live),
  Layer.provide(NoteRepository.Live),

)

NodeRuntime.runMain(Layer.launch(Http))