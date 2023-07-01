import { Route, Routes, useLocation } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { ERoute } from './constants'
import { Expenses } from './pages/Expenses/Expenses'
import { ExpenseContextProvider } from './context/ExpenseContext'
import { Menu } from './components/Menu/Menu'
import { LandingPage } from './pages/LandingPage/LandingPage'
import clsx from 'clsx'
import { FormContextProvider } from './context/FormContext'

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  const location = useLocation()

  return (
    <div className="app">
      <FormContextProvider>
        <ExpenseContextProvider>
          {location.pathname !== ERoute.LANDING_PAGE &&
            <Menu />
          }

          <main
            className={clsx('main', {
              'main_landing': location.pathname === ERoute.LANDING_PAGE
            })}
          >
            <Routes>
              <Route element={<LandingPage />} path={ERoute.LANDING_PAGE} />
              <Route element={<Dashboard />} path={ERoute.DASHBOARD} />
              <Route element={<Expenses />} path={ERoute.EXPENSES} />
            </Routes>
          </main>
        </ExpenseContextProvider>
      </FormContextProvider>
    </div>
  )
}

export default App
