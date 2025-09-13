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
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-panel max-w-lg w-full p-8">
        <div>{children}</div>
        <div className="mt-4 flex justify-end gap-2"></div>
      </div>
    </div>
  )
}
