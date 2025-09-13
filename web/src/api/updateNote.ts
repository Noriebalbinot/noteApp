import type { AxiosResponse } from "axios";
import type { Note, UpdateNoteData } from "./notes";
import axios from "axios";


export async function updateNote(data: UpdateNoteData): Promise<AxiosResponse<Note>> {
  return await axios.patch(`/notes/edit/${data.id}`, data)
}