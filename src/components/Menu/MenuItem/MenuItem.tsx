import React, { PropsWithChildren } from 'react'
import './MenuItem.scss'
import { NavLink } from 'react-router-dom'
import { ERoute } from '../../../constants'
import clsx from 'clsx'

interface IMenuItemProps extends PropsWithChildren {
  route: ERoute
  isActive: boolean
}

export const MenuItem: React.FC<IMenuItemProps> = ({ route, isActive, children, }) => {
  return (
    <NavLink
      className={clsx('menu-item', {
        'menu-item_active': isActive
      })}
      to={route}
    >
      {children}
    </NavLink>
  )
}