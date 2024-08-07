import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.scss'
import { DEFAULT_TRACKER } from '../../constants'
import { TrackerContext } from '../../context/TrackerContext'
import { getTrackers } from '../../api/tracker'
import { UserContext } from '../../context/UserContext'
import { Loader } from '../../components/Loader/Loader'
import { TrackerStamp } from '../../components/Tracker/TrackerStamp/TrackerStamp'

interface IDashboardProps {}

export const Dashboard: React.FC<IDashboardProps> = () => {
  const {user} = useContext(UserContext)
  const {setCurrentTracker, setTrackersArray, trackersArray} = useContext(TrackerContext)

  const [isLoading, setIsLoading] = useState(false)

  // const navigate = useNavigate()

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
  }, [setCurrentTracker, user, setTrackersArray, setIsLoading])

  return (
    <div className='dashboard'>
      {isLoading && <Loader />}

      <div className='dashboard__list'>
        {trackersArray && trackersArray.map(tracker => {
          return (
            <TrackerStamp
              key={tracker.id}
              name={tracker.name}
              startDate={tracker.timeFormatOptions.startDate}
              endDate={tracker.timeFormatOptions.endDate}
              description={tracker.description}
            />
          )
        })}
      </div>
    </div>
  )
}