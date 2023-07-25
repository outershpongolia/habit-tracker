import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { ERoute } from './constants'
import { Expenses } from './pages/Expenses/Expenses'
import { Menu } from './components/Menu/Menu'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { useContext, useEffect, useMemo } from 'react'
import { NewExpense } from './pages/NewExpense/NewExpense'
import { UserContext } from './context/UserContext'
import { Profile } from './pages/Profile/Profile'
import { isEmpty } from 'lodash'
import { General } from './pages/Profile/General/General'
import { Setup } from './pages/Profile/Setup/Setup'

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  const { setUser, user } = useContext(UserContext)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const setMainClassName = useMemo(() => {
    if (
      pathname === ERoute.LANDING_PAGE //....... no user page
      || pathname === ERoute.LOGIN //........... form
      || pathname === ERoute.REGISTER //........ form
      || pathname === ERoute.NEW_EXPENSE //..... form
    ) {
      return 'main main_default'
    }

    return 'main'
  }, [pathname])

  useEffect(() => {
    console.log({user})
    if (user) return

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

    if (isEmpty(currentUser)) {
      navigate(ERoute.LOGIN)

      return
    }

    setUser(currentUser)
    navigate(ERoute.DASHBOARD)
  }, [setUser, navigate, user])

  return (
    <div className="app">
      {pathname === ERoute.DASHBOARD
      || pathname === ERoute.EXPENSES
      || pathname === ERoute.BUDGETING
      || pathname.includes(ERoute.PROFILE)
      ? <Menu />
      : null
      }

      <main className={setMainClassName}>
        <Routes>
          {/* No user pages */}
          <Route element={<LandingPage />} path={ERoute.LANDING_PAGE} />
          <Route element={<Login />} path={ERoute.LOGIN} />
          <Route element={<Register />} path={ERoute.REGISTER} />

          {/* Menu pages */}
          <Route element={<Dashboard />} path={ERoute.DASHBOARD} />
          <Route element={<Expenses />} path={ERoute.EXPENSES} />
          <Route element={<NewExpense />} path={ERoute.NEW_EXPENSE} />
          <Route element={<Profile />} path={ERoute.PROFILE}>
            {/* Profile setup pages */}
            <Route element={<Setup />} path={ERoute.SETUP} />
            <Route element={<General />} path={ERoute.GENERAL} />
            <Route element={<></>} path={ERoute.INFO} />
            <Route element={<></>} path={ERoute.SECURITY} />
          </Route>
        </Routes>
      </main>

      <ToastContainer />
    </div>
  )
}

export default App
