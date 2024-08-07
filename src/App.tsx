import { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { ToastContainer } from 'react-toastify'
import { ERoute } from './constants'
import { Header } from './components/Header/Header'
import { UserContext } from './context/UserContext'

// Pages
import { Dashboard } from './pages/Dashboard/Dashboard'
import { CreateTracker } from './pages/CreateTracker/CreateTracker'
import { Register } from './pages/Auth/Register/Register'
import { Login } from './pages/Auth/Login/Login'

// External lib styles
import 'react-toastify/dist/ReactToastify.css'

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    if (isEmpty(user)) {
      navigate(ERoute.LOGIN)

      return
    }

    setUser(user)
    navigate(ERoute.DASHBOARD)
  }, [])

  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
          <Route element={<Register />} path={ERoute.REGISTER} />
          <Route element={<Login />} path={ERoute.LOGIN} />
          <Route element={<Dashboard />} path={ERoute.DASHBOARD} />
          <Route element={<CreateTracker />} path={ERoute.CREATE_TRACKER} />
        </Routes>
      </main>

      <ToastContainer />
    </div>
  )
}

export default App
