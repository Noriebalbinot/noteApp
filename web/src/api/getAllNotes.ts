import axios, { type AxiosResponse } from "axios";
import type { Note } from "./notes";

export async function getAllNotes(): Promise<AxiosResponse<Note[]>> {
  return await axios.get('/notes/all')
}