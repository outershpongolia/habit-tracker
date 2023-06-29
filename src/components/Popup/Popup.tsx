import React, { PropsWithChildren } from 'react'
import './Popup.scss'
import { CgClose } from 'react-icons/cg'

interface IPopupProps extends PropsWithChildren {
    close: () => void
    className?: string
}

export const Popup: React.FC<IPopupProps> = ({ close, className, children }) => {
    return (
        <div className='popup'>
            <div className={`popup__container ${className}`}>
                <CgClose className='popup__close' onClick={close} />

                {children}
            </div>
        </div>
    )
}