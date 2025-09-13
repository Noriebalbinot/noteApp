interface ButtonSecondaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}
import '../styles/buttons.css'

export function ButtonDelete({ children, ...props }: ButtonSecondaryProps) {
  return (
    <button
      {...props}
      className={
        'btn-delete font-medium py-2 px-4 shadow-sm transition-colors duration-200 border border-transparent ' +
        (props.className ? ` ${props.className}` : '')
      }
    >
      {children}
    </button>
  )
}
