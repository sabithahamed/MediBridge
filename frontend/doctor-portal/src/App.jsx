import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { AlertProvider } from './components/Alert'

function App() {
  return (
    <AlertProvider>
      <RouterProvider router={router} />
    </AlertProvider>
  )
}

export default App