import React, { useCallback, useContext, useState } from "react"
import './Menu.scss'
import { ERoute } from "../../constants"
import { MenuItem } from "../MenuItem/MenuItem"
import { UserContext } from "../../context/UserContext"
import { RxDashboard } from 'react-icons/rx'
import { CgProfile } from 'react-icons/cg'
import { HiOutlineLogout } from 'react-icons/hi'
import { FaWallet } from 'react-icons/fa'
import { BsPiggyBank } from 'react-icons/bs'
import { Tooltip } from "../Tooltip/Tooltip"

interface IMenuProps {}

export const Menu: React.FC<IMenuProps> = () => {
    const { setUser } = useContext(UserContext)

    const [ menuItem, setMenuItem ] = useState<ERoute>(ERoute.DASHBOARD)

    const handleLogoutUser = useCallback(() => {
        setUser(null)

        localStorage.setItem('user', '')
    }, [setUser])

    const handleMenuItem = useCallback((route: ERoute) => {
        setMenuItem(route)
    }, [setMenuItem])

    return (
        <div className="menu">
            <MenuItem
                route={ERoute.DASHBOARD}
                onClick={handleMenuItem}
                isActive={menuItem === ERoute.DASHBOARD}
            >
                <Tooltip text='Dashboard'>
                    <RxDashboard className="menu__icon" />
                </Tooltip>
            </MenuItem>

            <MenuItem
                route={ERoute.EXPENSES}
                onClick={handleMenuItem}
                isActive={menuItem === ERoute.EXPENSES}
            >
                
                <Tooltip text='Expenses'>
                    <FaWallet className="menu__icon" />
                </Tooltip>
            </MenuItem>

            <MenuItem
                route={ERoute.BUDGETING}
                onClick={handleMenuItem}
                isActive={menuItem === ERoute.BUDGETING}
            >
                <Tooltip text='Budgeting'>
                    <BsPiggyBank className="menu__icon" />
                </Tooltip>
            </MenuItem>

            <MenuItem
                route={ERoute.PROFILE}
                onClick={handleMenuItem}
                isActive={menuItem === ERoute.PROFILE}
            >
                <Tooltip text='Profile'>
                    <CgProfile className="menu__icon" />
                </Tooltip>
            </MenuItem>

            <div className="menu__logout" onClick={handleLogoutUser}>
                <Tooltip text='Logout'>
                    <HiOutlineLogout className="menu__icon" />
                </Tooltip>
            </div>
        </div>
    )
}