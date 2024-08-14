import React, { PropsWithChildren } from "react"
import './CustomDropdown.scss'
import { Dropdown } from "antd"
import clsx from "clsx"
import { ItemType } from "antd/es/menu/hooks/useItems"

interface ICustomDropdownProps extends PropsWithChildren {
  items: ItemType[]
  disabled: boolean
  className?: string
  itemClassName?: string
  placement?: "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight" | "top" | "bottom" | undefined
}

export const CustomDropdown: React.FC<ICustomDropdownProps> = ({ items, disabled, className, itemClassName, children, placement }) => {
  return (
    <Dropdown
      className={clsx("custom-dropdown", className)}
      trigger={['click']}
      menu={{ items: items }}
      disabled={disabled}
      placement={placement}
    >
      <div className={clsx("custom-dropdown__item", itemClassName)}>
        {children}
      </div>
    </Dropdown>
  )
}
