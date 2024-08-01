import React, { useCallback, useContext, useEffect } from 'react'
import './Dashboard.scss'
import { Button } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_TRACKER, ERoute } from '../../constants'
import { TrackerContext } from '../../context/TrackerContext'

interface IDashboardProps {}

export const Dashboard: React.FC<IDashboardProps> = () => {
  const {setTracker} = useContext(TrackerContext)

  const navigate = useNavigate()

  useEffect(() => {
    setTracker(DEFAULT_TRACKER)
  }, [setTracker])

  const handleNavigateToPage = useCallback(() => {
    navigate(ERoute.CREATE_TRACKER)
  }, [navigate])

  return (
    <div className='dashboard'>
      <Button
        label="Create tracker"
        onClick={handleNavigateToPage}
      />
    </div>
  )
}