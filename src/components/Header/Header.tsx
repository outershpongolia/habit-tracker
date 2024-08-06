import React, { useCallback, useContext } from 'react'
import './Header.scss'
import { ERoute } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button'
import { UserContext } from '../../context/UserContext'

interface IHeaderProps {}

export const Header: React.FC<IHeaderProps> = () => {
  const {user} = useContext(UserContext)
  const navigate = useNavigate()

  const handleNavigateToPage = useCallback((route: ERoute) => {
    navigate(route)
  }, [navigate])

  return (
    <div className='header'>
      <div className='header__wrapper'>
        <div
          className='header__logo'
          onClick={() => navigate(0)}
        >
          Habit Tracker
        </div>

        {user &&
          <Button
            label="Create tracker"
            onClick={() => handleNavigateToPage(ERoute.CREATE_TRACKER)}
          />
        }
      </div>
    </div>
  )
}