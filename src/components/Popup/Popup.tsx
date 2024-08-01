import React, { PropsWithChildren } from 'react'
import './Popup.scss'

interface IPopupProps extends PropsWithChildren {}

export const Popup: React.FC<IPopupProps> = ({ children }) => {
  return (
    <div className='popup__wrapper'>
      <div className='popup'>
        {children}
      </div>
    </div>
  )
}