import React, { PropsWithChildren } from 'react'
import './MenuItem.scss'
import { NavLink } from 'react-router-dom'
import { ERoute } from '../../constants'
import { IconType } from 'react-icons'

interface IMenuItemProps extends PropsWithChildren {
    title: string
    route: ERoute
}

export const MenuItem: React.FC<IMenuItemProps> = ({ title, route, children }) => {
    return (
        <NavLink
            className='menu-item'
            to={route}
        >
            {children}
        </NavLink>
    )
}