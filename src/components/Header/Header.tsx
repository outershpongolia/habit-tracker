import React from "react";
import './Header.scss'
import { NavLink } from "react-router-dom";
import { ERoute } from "../../constants";

interface IHeaderProps {}

export const Header: React.FC<IHeaderProps> = () => {
    return (
        <div className="header">
            <NavLink className='header__link' to={ERoute.DASHBOARD}>Dashboard</NavLink>
            <NavLink className='header__link' to={ERoute.EXPENSES}>Expenses</NavLink>
            <NavLink className='header__link' to={ERoute.BUDGETING}>Budgeting</NavLink>
        </div>
    )
}