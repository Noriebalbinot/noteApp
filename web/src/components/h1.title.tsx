interface H1TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function H1Title({ children, ...props }: H1TitleProps) {
  return (
    <h1
      {...props}
      style={{ color: 'hsl(var(--color-primary))' }}
      className="text-2xl font-bold"
    >
      {children}
    </h1>
  )
}
