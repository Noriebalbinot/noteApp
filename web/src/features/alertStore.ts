import { create } from "zustand"



interface AlertInternal {
  message: string
  type: 'success' | 'error' | 'info'
  timeoutId: ReturnType<typeof setTimeout>
}

export type Alert = Omit<AlertInternal, 'timeoutId'>

interface AlertStore {
  alerts: AlertInternal[]
  addAlert: (alert: Alert) => void
  removeAlert: (id: number) => void
}
export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  addAlert: (alert) => set((state) => {
    const time = setTimeout(() => {
      set((state) => ({ alerts: state.alerts.slice(1) }))
    }, 3000)
    return { alerts: [...state.alerts, { ...alert, timeoutId: time }] }
  }),
  removeAlert: (id) => set((state) => {
    clearTimeout(state.alerts[id]?.timeoutId)
    return { alerts: state.alerts.filter((_, index) => index !== id) }
  })
}))