import React from "react";
import './Menu.scss'
import { ERoute } from "../../constants";
import { MenuItem } from "../MenuItem/MenuItem";

interface IMenuProps {}

export const Menu: React.FC<IMenuProps> = () => {
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
        </div>
    )
}