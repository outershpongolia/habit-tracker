import React, { useCallback } from 'react'
import './Dashboard.scss'
import { Button } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { ERoute } from '../../constants'

interface IDashboardProps {}

export const Dashboard: React.FC<IDashboardProps> = () => {
  const navigate = useNavigate()

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