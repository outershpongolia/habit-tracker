import React, { PropsWithChildren } from "react"
import './CustomDrawer.scss'
import { Drawer } from "antd"

interface ICustomDrawerProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
}

export const CustomDrawer: React.FC<ICustomDrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
    >
      {children}
    </Drawer>
  )
}