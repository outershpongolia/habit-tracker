import React from "react"
import { NavLink } from "react-router-dom"
import { ERoute } from "../../constants"

import './MonthItem.scss'

interface IMonthItemProps {
    month: string
    route: ERoute
}

export const MonthItem: React.FC<IMonthItemProps> = ({ month, route }) => {
    return (
        <NavLink className="month-item" to={route}>
            {month}
        </NavLink>
    )
}