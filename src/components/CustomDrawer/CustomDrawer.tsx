import React, { PropsWithChildren } from "react"
import './CustomDrawer.scss'
import { Drawer } from "antd"

interface ICustomDrawerProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  className?: string
  size?: 'default' | 'large'
}

export const CustomDrawer: React.FC<ICustomDrawerProps> = ({
  isOpen,
  onClose,
  children,
  size='default',
  className
}) => {
  return (
    <Drawer
      className={className}
      open={isOpen}
      onClose={onClose}
      size={size}
    >
      {children}
    </Drawer>
  )
}