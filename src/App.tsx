import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { ERoute } from './constants'
import { TrackerPage } from './pages/TrackerPage/TrackerPage'

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  return (
    <div className="app">
      <main>
        <Routes>
          <Route element={<LandingPage />} path={ERoute.LANDING_PAGE} />
          <Route element={<TrackerPage />} path={ERoute.TRACKER_PAGE} />
        </Routes>
      </main>
    </div>
  )
}

export default App
