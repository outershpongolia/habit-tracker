import React from "react"
import './Dashboard.scss'
import { ERoute } from "../../constants"
import { NavLink } from "react-router-dom"

interface IDashboardProps {}

export const Dashboard: React.FC<IDashboardProps> = () => {
    return (
        <div className="landing-page">
            <NavLink className='landing-page__link' to={ERoute.DASHBOARD}>Find your tracker here</NavLink>
        </div>
    )
}