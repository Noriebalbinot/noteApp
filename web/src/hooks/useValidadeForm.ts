import { useAlertStore } from "../features/alertStore"

export const useValidadeForm = () => {
    const alert = useAlertStore(state => state.addAlert)
  return (title: string, content: string) => {
  if (content.trim().length === 0) {
    alert({ message: 'Content cannot be empty', type: 'error' })
    return false
  }
  if (title.trim().length === 0) {
    alert({ message: 'Title cannot be empty', type: 'error' })
    return false
  }
  if (title.length > 100) {
    alert({
      message: 'Title cannot be longer than 100 characters',
      type: 'error'
    })
    return false
  }
  if (content.length > 255) {
    alert({
      message: 'Content cannot be longer than 255 characters',
      type: 'error'
    })
    return  false
  }
  return true
}}