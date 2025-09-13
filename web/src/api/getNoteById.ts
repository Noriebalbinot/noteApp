import axios, { type AxiosResponse } from "axios"
import type { Note } from "./notes"

export async function getNoteById(id: number): Promise<AxiosResponse<Note>> {
    return await axios.get(`/notes/${id}`)
}
