import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Main } from './pages/main'

// Create a single QueryClient instance outside the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // reasonable defaults; tune as needed
      refetchOnWindowFocus: false,
      retry: 2
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <Main />
      </div>
    </QueryClientProvider>
  )
}

export default App
