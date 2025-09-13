import type { Note } from '../api/notes'

interface CardProps extends React.HTMLAttributes<HTMLButtonElement> {
  note: Note
}

export function Card({ note, ...props }: CardProps) {
  return (
    <button
      tabIndex={1}
      className="card focus:outline-1 p-4 transition-shadow duration-200 hover:shadow-md"
      {...props}
    >
      <h2
        className="text-xl font-semibold mb-2"
        style={{ color: 'hsl(var(--color-foreground))' }}
      >
        {note.title}
      </h2>
      <p style={{ color: 'hsl(var(--color-foreground))' }}>{note.content}</p>
    </button>
  )
}
