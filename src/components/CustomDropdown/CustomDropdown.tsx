import React, { PropsWithChildren } from "react"
import './CustomDropdown.scss'
import { Dropdown } from "antd"
import clsx from "clsx"
import { ItemType } from "antd/es/menu/hooks/useItems"

interface ICustomDropdownProps extends PropsWithChildren {
  items: ItemType[]
  disabled: boolean
  className?: string
  width?: number | string
}

export const CustomDropdown: React.FC<ICustomDropdownProps> = ({ items, disabled, className, width, children }) => {
  return (
    <Dropdown
      className={clsx("custom-dropdown", className)}
      trigger={['click']}
      menu={{ items: items }}
      disabled={disabled}
    >
      <div
        className="custom-dropdown__item"
        style={{ width: width }}
      >
        {children}
      </div>
    </Dropdown>
  )
}
