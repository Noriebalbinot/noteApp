import { drizzle } from "drizzle-orm/libsql";
import { Context, Effect, Layer } from "effect";

 const make = Effect.gen(function * () {
   const db = drizzle( process.env.DB_FILE_NAME! );
   return db;
 }).pipe(Effect.withSpan("DatabaseConnection"));

export class DbLive extends Context.Tag("NoteService")<DbLive, Effect.Effect.Success<typeof make>>() {
  static readonly Live = Layer.effect(this, make)
}