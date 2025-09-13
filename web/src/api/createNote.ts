import axios, { type AxiosResponse } from "axios";
import type { CreateNoteData, Note } from "./notes";


export async function createNote(data: CreateNoteData): Promise<AxiosResponse<Note>> {
  return await axios.post('/notes/create', data)
}