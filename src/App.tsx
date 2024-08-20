import { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { ERoute } from './constants'
import { UserContext } from './context/UserContext'
import { Menu } from './components/Menu/Menu'

// Pages
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Register } from './pages/Auth/Register/Register'
import { Login } from './pages/Auth/Login/Login'
import { CreateTracker } from './pages/CreateTracker/CreateTracker'
import { EditTracker } from './pages/EditTracker/EditTracker'
import { Profile } from './pages/Profile/Profile'
import { Settings } from './pages/Settings/Settings'

// External lib styles
import 'react-toastify/dist/ReactToastify.css'

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  const { user, setUser } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    if (isEmpty(user)) {
      navigate(ERoute.LOGIN)

      return
    }

    setUser(user)
    navigate(ERoute.DASHBOARD)
  }, [setUser])

  return (
    <div className="app">
      {user && <Menu />}

      <main>
        <Routes>
          <Route element={<Register />} path={ERoute.REGISTER} />
          <Route element={<Login />} path={ERoute.LOGIN} />
          <Route element={<Dashboard />} path={ERoute.DASHBOARD} />
          <Route element={<CreateTracker />} path={ERoute.CREATE_TRACKER} />
          <Route element={<EditTracker />} path={`${ERoute.EDIT_TRACKER}/:id`} />
          <Route element={<Profile />} path={ERoute.PROFILE} />
          <Route element={<Settings />} path={ERoute.SETTINGS} />
        </Routes>
      </main>
    </div>
  )
}

export default App
