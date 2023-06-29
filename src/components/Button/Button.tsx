import React from 'react'
import './Button.scss'

interface IButtonProps {
    label: string
    onClick: () => void
}

export const Button: React.FC<IButtonProps> = ({ label, onClick }) => {
    return (
        <button
            className='button'
            type='button'
            onClick={onClick}
        >
            {label}
        </button>
    )
}