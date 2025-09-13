export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export type CreateNoteData = Omit<Note, "id" | "created_at" | "updated_at">;
export type UpdateNoteData = Omit<Note, "created_at" | "updated_at">;