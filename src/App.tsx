import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { ERoute } from './constants'
import { TrackerPage } from './pages/TrackerPage/TrackerPage'
import { PageContextProvider } from './context/PageContext'
import { TableContextProvider } from './context/TableContext'

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  return (
    <div className="app">
      <PageContextProvider>
        <TableContextProvider>
          <main>
            <Routes>
              <Route element={<LandingPage />} path={ERoute.LANDING_PAGE} />
              <Route element={<TrackerPage />} path={ERoute.TRACKER_PAGE} />
            </Routes>
          </main>
        </TableContextProvider>
      </PageContextProvider>
    </div>
  )
}

export default App
