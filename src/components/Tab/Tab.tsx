import React from "react"
import './Tab.scss'
import { NavLink, useLocation } from "react-router-dom"
import { ERoute } from "../../constants"
import clsx from "clsx"

interface ITabProps {
    route: ERoute
    label: string
}

export const Tab: React.FC<ITabProps> = ({ route, label }) => {
    const { pathname } = useLocation()

    return (
        <NavLink
            className={clsx('tab', pathname.includes(route) && 'tab_active')}
            to={route}
        >
            {label}
        </NavLink>
    )
}