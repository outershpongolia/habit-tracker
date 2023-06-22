import React, { useCallback, useContext } from "react"
import { NavLink } from "react-router-dom"
import { ERoute } from "../../constants"
import { PageContext } from "../../context/PageContext"

import './MonthItem.scss'

interface IMonthItemProps {
    month: string
    route: ERoute
}

export const MonthItem: React.FC<IMonthItemProps> = ({ month, route }) => {
    const { setMonth } = useContext(PageContext)

    const handleSetMonth = useCallback(() => {
        setMonth(month)
    }, [month, setMonth])
    
    return (
        <NavLink className="month-item" to={route} onClick={handleSetMonth}>
            {month}
        </NavLink>
    )
}