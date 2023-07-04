import React, { useCallback, useContext } from "react";
import './Menu.scss'
import { ERoute } from "../../constants";
import { MenuItem } from "../MenuItem/MenuItem";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

interface IMenuProps {}

export const Menu: React.FC<IMenuProps> = () => {
    const { setUser } = useContext(UserContext)

    const navigate = useNavigate()

    const handleLogoutUser = useCallback(() => {
        setUser(null)

        navigate(ERoute.LANDING_PAGE)
    }, [setUser, navigate])

    return (
        <div className="menu">
            <MenuItem
                title='Dashboard'
                route={ERoute.DASHBOARD}
            />

            <MenuItem
                title='Expenses'
                route={ERoute.EXPENSES}
            />

            <MenuItem
                title='Budgeting'
                route={ERoute.BUDGETING}
            />

            <MenuItem
                title='Profile'
                route={ERoute.PROFILE}
            />

            <div className="menu__logout" onClick={handleLogoutUser}>LOG OUT</div>
        </div>
    )
}