import React, { PropsWithChildren, useCallback } from 'react'
import './MenuItem.scss'
import { NavLink } from 'react-router-dom'
import { ERoute } from '../../../constants'
import clsx from 'clsx'

interface IMenuItemProps extends PropsWithChildren {
  route: ERoute | null
  onClick: (route: ERoute) => void
  isActive?: boolean
}

export const MenuItem: React.FC<IMenuItemProps> = ({ route, children, isActive, onClick }) => {
  const handleOnClick = useCallback(() => {
    if (!route) return

    onClick(route)
  }, [onClick, route])

  return (
    <NavLink
      className={clsx('menu-item', {
          'menu-item_active': isActive
      })}
      to={route || ''}
      onClick={handleOnClick}
    >
      {children}
    </NavLink>
  )
}