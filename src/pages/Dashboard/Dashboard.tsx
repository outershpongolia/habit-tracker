import React, { useCallback, useContext, useEffect, useState } from 'react'
import './Dashboard.scss'
import { DEFAULT_TRACKER, ERoute } from '../../constants'
import { TrackerContext } from '../../context/TrackerContext'
import { getTrackers } from '../../api/tracker'
import { UserContext } from '../../context/UserContext'
import { Loader } from '../../components/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { Button } from '../../components/Button/Button'
import { TrackerList } from './TrackerList/TrackerList'

interface IDashboardProps {}

export const Dashboard: React.FC<IDashboardProps> = () => {
  const {user} = useContext(UserContext)
  const {setCurrentTracker, setTrackersArray, trackersArray, categories} = useContext(TrackerContext)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    setIsLoading(true)

    getTrackers({ userId: user.id })
      .then(res => {
        setTrackersArray(res.data)
      })
      .catch(err => {
        throw new Error(err)
      })
      .finally(() => setIsLoading(false))

    setCurrentTracker(DEFAULT_TRACKER)
  }, [setCurrentTracker, user, setTrackersArray, setIsLoading, categories])

  const handleNavigateToTracker = useCallback((id: string) => {
    const targetTracker = trackersArray.find(x => x.id === id)

    if (!targetTracker) return

    setCurrentTracker(targetTracker)

    navigate(`${ERoute.EDIT_TRACKER}/${targetTracker.id}`, {state: {id: targetTracker.id}});
  }, [trackersArray, navigate, setCurrentTracker])

  const handleNavigateToPage = useCallback(() => {
    navigate(ERoute.CREATE_TRACKER)
  }, [navigate])

  return (
    <div className='dashboard page'>
      <Header
        label={`Hi ${user?.name}!`}
      >
        <Button
          label="Create tracker"
          onClick={handleNavigateToPage}
        />
      </Header>

      {isLoading
        ? <Loader />
        : <TrackerList
            trackers={trackersArray}
            onClick={handleNavigateToTracker}
          />
        }
    </div>
  )
}