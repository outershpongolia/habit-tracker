import React, { PropsWithChildren, useContext } from 'react'
import './Popup.scss'
import { CgClose } from 'react-icons/cg'
import { FormContext } from '../../context/FormContext'

interface IPopupProps extends PropsWithChildren {
    className?: string
}

export const Popup: React.FC<IPopupProps> = ({ className, children }) => {
    const { handleClosePopup } = useContext(FormContext)
    
    return (
        <div className='popup'>
            <div className={`popup__container ${className}`}>
                <CgClose className='popup__close' onClick={handleClosePopup} />

                {children}
            </div>
        </div>
    )
}