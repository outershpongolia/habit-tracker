import React, { useCallback, useContext } from 'react'
import './Dashboard.scss'
import { Button } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { ERoute } from '../../constants'
import { UserContext } from '../../context/UserContext'

interface IDashboardProps {}

export const Dashboard: React.FC<IDashboardProps> = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const handleNavigateToPage = useCallback(() => {
    navigate(ERoute.CREATE_TRACKER)
  }, [navigate])

  console.log({user})

  return (
    <div className='dashboard'>
      <Button
        label="Create tracker"
        onClick={handleNavigateToPage}
      />
    </div>
  )
}