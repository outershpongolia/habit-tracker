import React from 'react'
import './MenuItem.scss'
import { NavLink } from 'react-router-dom'
import { ERoute } from '../../constants'

interface IMenuItemProps {
    title: string
    route: ERoute
}

export const MenuItem: React.FC<IMenuItemProps> = ({ title, route }) => {
    return (
        <NavLink
            className='menu-item'
            to={route}
        >
            {title}
        </NavLink>
    )
}