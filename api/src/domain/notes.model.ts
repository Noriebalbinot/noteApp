import { HttpClientResponse } from "@effect/platform"
import { Schema } from "effect"

export class Note extends Schema.Class<Note>("Note")({
  id: Schema.Number,
  title: Schema.String,
  content: Schema.String,
  created_at: Schema.DateFromSelf,
  updated_at: Schema.DateFromSelf,
}) {}

export const InsertNoteSchema = Schema.Struct({
  title: Schema.String,
  content: Schema.String,
})

export type InsertNoteType = Schema.Schema.Type<typeof InsertNoteSchema>

export const CreateNoteSchema = Schema.Struct({
  title: Schema.String,
  content: Schema.String,
})

export type CreateNoteType = Schema.Schema.Type<typeof CreateNoteSchema>

export const UpdateNoteSchema = Schema.Struct({
  id: Schema.Number,
  title: Schema.String,
  content: Schema.String,
  created_at: Schema.DateFromSelf,
  updated_at: Schema.DateFromSelf,
})

export type UpdateNoteType = Schema.Schema.Type<typeof UpdateNoteSchema>

export class ApiNoteSchema extends Schema.Class<ApiNoteSchema>("ApiNoteSchema")({
  Title: Schema.String,
  Content: Schema.String,
  CreatedAt: Schema.DateFromSelf,
  UpdatedAt: Schema.DateFromSelf,
}) {
  static decodeResponse = HttpClientResponse.schemaBodyJson(ApiNoteSchema)
}


export type ApiNoteType = Schema.Schema.Type<typeof ApiNoteSchema>