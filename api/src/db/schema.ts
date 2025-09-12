import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";



export const NotesTable = sqliteTable("notes", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  content: text().notNull(),
  createdAt: text().default("(CURRENT_TIMESTAMP)"),
  updatedAt: text().default("(CURRENT_TIMESTAMP)").$onUpdate(()=>"(CURRENT_TIMESTAMP)"),
});