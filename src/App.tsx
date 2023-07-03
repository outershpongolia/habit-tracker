import { Route, Routes, useLocation } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { ERoute } from './constants'
import { Expenses } from './pages/Expenses/Expenses'
import { ExpenseContextProvider } from './context/ExpenseContext'
import { Menu } from './components/Menu/Menu'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AlertContextProvider } from './context/AlertContext'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { useMemo } from 'react'
import { NewExpense } from './pages/NewExpense/NewExpense'

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  const location = useLocation()

  const setMainClassName = useMemo(() => {
    if (
      location.pathname === ERoute.LANDING_PAGE
      || location.pathname ===ERoute.LOGIN
      || location.pathname === ERoute.REGISTER
      || location.pathname === ERoute.NEW_EXPENSE
    ) {
      return 'main main_default'
    }

    return 'main'
  }, [location])

  return (
    <div className="app">
      <AlertContextProvider>
        {location.pathname === ERoute.DASHBOARD
        || location.pathname === ERoute.EXPENSES
        || location.pathname === ERoute.BUDGETING
        ? <Menu /> : null
        }

        <main className={setMainClassName}>
          {/* General routes */}
          <Routes>
            <Route element={<LandingPage />} path={ERoute.LANDING_PAGE} />
            <Route element={<Login />} path={ERoute.LOGIN} />
            <Route element={<Register />} path={ERoute.REGISTER} />
          </Routes>

          {/* User routes */}
          <ExpenseContextProvider>
            <Routes>
              <Route element={<NewExpense />} path={ERoute.NEW_EXPENSE} />
              <Route element={<Dashboard />} path={ERoute.DASHBOARD} />
              <Route element={<Expenses />} path={ERoute.EXPENSES} />
            </Routes>
          </ExpenseContextProvider>
        </main>

        <ToastContainer />
      </AlertContextProvider>
    </div>
  )
}

export default App
