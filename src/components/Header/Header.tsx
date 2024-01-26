import React from 'react'
import './Header.scss'

interface IHeaderProps {}

export const Header: React.FC<IHeaderProps> = () => {
  return (
    <div className='header'>
      <div className='header__wrapper'>
        Habit Tracker
      </div>
    </div>
  )
}