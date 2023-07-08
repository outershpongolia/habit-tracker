import React, { useCallback, useContext } from "react"
import './Menu.scss'
import { ERoute } from "../../constants"
import { MenuItem } from "../MenuItem/MenuItem"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom"

import { RxDashboard } from 'react-icons/rx'
import { CgProfile } from 'react-icons/cg'
import { HiOutlineLogout } from 'react-icons/hi'
import { FaWallet } from 'react-icons/fa'
import { BsPiggyBank } from 'react-icons/bs'

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
            >
                <RxDashboard className="menu__icon" />
            </MenuItem>

            <MenuItem
                title='Expenses'
                route={ERoute.EXPENSES}
            >
                <FaWallet className="menu__icon menu__icon_filled" />
            </MenuItem>

            <MenuItem
                title='Budgeting'
                route={ERoute.BUDGETING}
            >
                <BsPiggyBank className="menu__icon menu__icon_filled" />
            </MenuItem>

            <MenuItem
                title='Profile'
                route={ERoute.PROFILE}
            >
                <CgProfile className="menu__icon" />
            </MenuItem>

            <div className="menu__logout" onClick={handleLogoutUser}>
                <HiOutlineLogout className="menu__icon" />
            </div>
        </div>
    )
}