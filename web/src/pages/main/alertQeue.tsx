import { AiOutlineClose } from 'react-icons/ai'
import { useAlertStore } from '../../features/alertStore'
import '../../styles/alert.css'

export function AlertQueue() {
  // const alerts = [
  //   { type: 'success', message: 'This is a success alert!' },
  //   { type: 'error', message: 'This is an error alert!' }
  // ]
  const alerts = useAlertStore(state => state.alerts)
  const removeAlert = useAlertStore(state => state.removeAlert)
  return (
    <div className="fixed bottom-0 right-0 left-0 p-4 z-10 gap-2 flex flex-col">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`w-full  min-h-[4rem]
            h-fit alert alert-${alert.type} relative`}
        >
          {alert.message}
          <button
            className="absolute top-2 right-2
            rounded-full border border-gray-300
              hover:bg-gray-200 w-6 h-6 grid place-content-center"
            onClick={() => removeAlert(index)}
          >
            <AiOutlineClose />
          </button>
        </div>
      ))}
    </div>
  )
}
