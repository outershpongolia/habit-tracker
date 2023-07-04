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
import { UserContextProvider } from './context/UserContext'

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  const { pathname } = useLocation()

  const setMainClassName = useMemo(() => {
    if (
      pathname === ERoute.LANDING_PAGE
      || pathname ===ERoute.LOGIN
      || pathname === ERoute.REGISTER
      || pathname === ERoute.NEW_EXPENSE
    ) {
      return 'main main_default'
    }

    return 'main'
  }, [pathname])

  return (
    <div className="app">
      <AlertContextProvider>
        <UserContextProvider>
          <ExpenseContextProvider>
            {pathname === ERoute.DASHBOARD
            || pathname === ERoute.EXPENSES
            || pathname === ERoute.BUDGETING
            ? <Menu /> : null
            }

            <main className={setMainClassName}>
              <Routes>
                <Route element={<LandingPage />} path={ERoute.LANDING_PAGE} />
                <Route element={<Login />} path={ERoute.LOGIN} />
                <Route element={<Register />} path={ERoute.REGISTER} />
                <Route element={<NewExpense />} path={ERoute.NEW_EXPENSE} />
                <Route element={<Dashboard />} path={ERoute.DASHBOARD} />
                <Route element={<Expenses />} path={ERoute.EXPENSES} />
              </Routes>
            </main>

            <ToastContainer />
          </ExpenseContextProvider>
        </UserContextProvider>
      </AlertContextProvider>
    </div>
  )
}

export default App
