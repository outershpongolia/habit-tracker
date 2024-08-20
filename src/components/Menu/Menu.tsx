import React from "react"
import './Menu.scss'
import { ERoute } from "../../constants"
import { useLocation } from "react-router-dom"
import { MenuItem } from "./MenuItem/MenuItem"

// Icons
import { CgProfile } from 'react-icons/cg'
import { RiHomeLine } from "react-icons/ri"
import { SlSettings } from "react-icons/sl"
import { IoAnalytics } from "react-icons/io5"
import { LotusIcon } from "../../icons/LotusIcon"

interface IMenuProps {}

export const Menu: React.FC<IMenuProps> = () => {
  const location = useLocation()

  return (
    <div className="menu">
      <LotusIcon color="#c8abe6" />

      <div className="menu__group">
        <MenuItem
          route={ERoute.DASHBOARD}
          isActive={location.pathname === ERoute.DASHBOARD}
        >
          <RiHomeLine className="menu__icon" />
        </MenuItem>
        <MenuItem
          route={ERoute.ANALYTICS}
          isActive={location.pathname === ERoute.ANALYTICS}
        >
          <IoAnalytics className="menu__icon" />
        </MenuItem>
        <MenuItem
          route={ERoute.PROFILE}
          isActive={location.pathname === ERoute.PROFILE}
        >
          <CgProfile className="menu__icon" />
        </MenuItem>
      </div>

      <MenuItem
        route={ERoute.SETTINGS}
        isActive={location.pathname === ERoute.SETTINGS}
      >
        <SlSettings className="menu__icon" />
      </MenuItem>
    </div>
)
}

