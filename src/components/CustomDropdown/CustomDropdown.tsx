import React, { PropsWithChildren } from "react"
import './CustomDropdown.scss'
import { Dropdown, Space } from "antd"
import clsx from "clsx"
import { ItemType } from "antd/es/menu/hooks/useItems"

interface ICustomDropdownProps extends PropsWithChildren {
  items: ItemType[]
  disabled: boolean
  className?: string
}

export const CustomDropdown: React.FC<ICustomDropdownProps> = ({ items, disabled, className, children }) => {
  return (
    <Dropdown
      className={clsx("custom-dropdown", className)}
      trigger={['click']}
      menu={{items: items}}
      disabled={disabled}
    >
      <th className="custom-dropdown__item">
        <Space>
          {children}
        </Space>
      </th>
    </Dropdown>
  )
}
