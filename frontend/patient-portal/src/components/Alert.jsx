import { createContext, useContext, useState } from 'react'

const AlertContext = createContext()

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type = 'error') => {
    setAlert({ message, type })
    setTimeout(() => setAlert(null), 3000)
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alert && (
        <div className={`fixed top-4 right-4 p-4 rounded ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
          {alert.message}
        </div>
      )}
      {children}
    </AlertContext.Provider>
  )
}

export function useAlert() {
  return useContext(AlertContext)
}