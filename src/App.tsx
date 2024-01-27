import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ERoute } from './constants'
import { Header } from './components/Header/Header'
import 'react-toastify/dist/ReactToastify.css'
import "react-datepicker/dist/react-datepicker.css"

// Pages
import { Dashboard } from './pages/Dashboard/Dashboard'
import { CreateTracker } from './pages/CreateTracker/CreateTracker'

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
          <Route element={<Dashboard />} path={ERoute.DASHBOARD} />
          <Route element={<CreateTracker />} path={ERoute.CREATE_TRACKER} />
        </Routes>
      </main>

      <ToastContainer />
    </div>
  )
}

export default App
