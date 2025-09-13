import type { AxiosResponse } from "axios";
import axios from "axios";


export async function deleteNote(id: number): Promise<AxiosResponse<void>> {
  return await axios.delete(`/notes/delete/${id}`)
}