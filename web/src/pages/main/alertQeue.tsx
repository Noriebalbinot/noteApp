import { useAlertStore } from '../../features/alertStore'

export function AlertQueue() {
  const alerts = useAlertStore(state => state.alerts)
  return (
    <div className="fixed top-0 right-0 p-4 z-10">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`w-screen bg-red-500 h-40 alert-${alert.type}`}
        >
          {alert.message}
        </div>
      ))}
    </div>
  )
}
