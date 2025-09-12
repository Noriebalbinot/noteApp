import { drizzle } from "drizzle-orm/libsql";
import { Context, Effect, Layer } from "effect";

export const dbLive = drizzle( process.env.DB_FILE_NAME! );
