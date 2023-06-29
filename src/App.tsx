import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { ERoute } from './constants'
import { Expenses } from './pages/Expenses/Expenses'
import { ExpenseContextProvider } from './context/ExpenseContext'
import { Menu } from './components/Menu/Menu'

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  return (
    <div className="app">
        <ExpenseContextProvider>
          <Menu />
          <main>
            <Routes>
              <Route element={<Dashboard />} path={ERoute.DASHBOARD} />
              <Route element={<Expenses />} path={ERoute.EXPENSES} />
            </Routes>
          </main>
        </ExpenseContextProvider>
    </div>
  )
}

export default App
