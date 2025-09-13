import { create } from "zustand"



interface Alert {
  message: string
  type: 'success' | 'error' | 'info'
}

interface AlertStore {
  alerts: Alert[]
  addAlert: (alert: Alert) => void
}
export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  addAlert: (alert) => set((state) => {
    setTimeout(() => {
      set((state) => ({ alerts: state.alerts.slice(1) }))
    }, 3000)
    return { alerts: [...state.alerts, alert] }
  }),
}))