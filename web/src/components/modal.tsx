import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  CloseFn: () => void
  children: React.ReactNode
}
export const Modal = ({ isOpen, CloseFn, children }: ModalProps) => {
  if (!isOpen) return null
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        CloseFn()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [CloseFn])
  return (
    <div
      className="modal-overlay"
      onClick={e => {
        ;(e.target as HTMLElement).className === 'modal-overlay' && CloseFn()
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-panel max-w-lg w-full p-8">
        <div>{children}</div>
      </div>
    </div>
  )
}
