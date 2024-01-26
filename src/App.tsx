import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { ERoute } from './constants'
import { Header } from './components/Header/Header'
import 'react-toastify/dist/ReactToastify.css'
import "react-datepicker/dist/react-datepicker.css"
import { DashboardConfig } from './pages/Dashboard/DashboardConfig/DashboardConfig'

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
          <Route element={<Dashboard />} path={ERoute.DASHBOARD} />
          <Route element={<DashboardConfig />} path={ERoute.DASHBOARD_CONFIG} />
        </Routes>
      </main>

      <ToastContainer />
    </div>
  )
}

export default App
