import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { ERoute } from './constants'
import { TrackerPage } from './pages/TrackerPage/TrackerPage'
import { TableContextProvider } from './context/TableContext'
import { Header } from './components/Header/Header'

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  return (
    <div className="app">
        <TableContextProvider>
          <Header />
          <main>
            <Routes>
              <Route element={<Dashboard />} path={ERoute.DASHBOARD} />
              <Route element={<TrackerPage />} path={ERoute.EXPENSES} />
            </Routes>
          </main>
        </TableContextProvider>
    </div>
  )
}

export default App
