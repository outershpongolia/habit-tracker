import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import './style/styles.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { AlertContextProvider } from './context/AlertContext'
import { UserContextProvider } from './context/UserContext'
import { TrackerContextProvider } from './context/TrackerContext'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertContextProvider>
        <UserContextProvider>
          <TrackerContextProvider>
            <App />
            <ToastContainer />
          </TrackerContextProvider>
        </UserContextProvider>
      </AlertContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
