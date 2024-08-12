import React, { useCallback, useState } from "react"
import './Menu.scss'
import { ERoute } from "../../constants"
import { MenuItem } from "./MenuItem/MenuItem"
import { CgProfile } from 'react-icons/cg'
import { HiOutlineLogout } from 'react-icons/hi'
import { RiHomeLine } from "react-icons/ri";
import { SlSettings } from "react-icons/sl";
import { IoAnalytics } from "react-icons/io5";
import { LotusIcon } from "../../icons/LotusIcon"

interface IMenuProps {}

export const Menu: React.FC<IMenuProps> = () => {
  const [ menuItem, setMenuItem ] = useState<ERoute>(ERoute.DASHBOARD)

  const handleMenuItem = useCallback((route: ERoute) => {
    setMenuItem(route)
  }, [setMenuItem])

  return (
    <div className="menu">
      <LotusIcon color="#c8abe6" />

      <div className="menu__section">
        <MenuItem
          route={ERoute.DASHBOARD}
          onClick={handleMenuItem}
          isActive={menuItem === ERoute.DASHBOARD}
        >
          <RiHomeLine className="menu__icon" />
        </MenuItem>
        <MenuItem
          route={ERoute.ANALYTICS}
          onClick={handleMenuItem}
          isActive={menuItem === ERoute.ANALYTICS}
        >
          <IoAnalytics className="menu__icon" />
        </MenuItem>
        <MenuItem
          route={ERoute.PROFILE}
          onClick={handleMenuItem}
          isActive={menuItem === ERoute.PROFILE}
        >
          <CgProfile className="menu__icon" />
        </MenuItem>
      </div>

      <div className="menu__section">
        <MenuItem
          route={ERoute.SETTINGS}
          onClick={handleMenuItem}
          isActive={menuItem === ERoute.SETTINGS}
        >
          <SlSettings className="menu__icon" />
        </MenuItem>
        <MenuItem
          route={null}
          onClick={handleMenuItem}
        >
          <HiOutlineLogout className="menu__icon" />
        </MenuItem>
      </div>
    </div>
)
}

