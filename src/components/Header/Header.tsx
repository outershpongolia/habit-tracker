import React, { PropsWithChildren } from 'react'
import './Header.scss'

interface IHeaderProps extends PropsWithChildren {
  label: string
}

export const Header: React.FC<IHeaderProps> = ({ label, children }) => {
  return (
    <div className='header'>
      <div className='header__label'>
        {label}
      </div>

      {children}
    </div>
  )
}