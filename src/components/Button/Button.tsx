import React from 'react'
import './Button.scss'
import { isDisabled } from '@testing-library/user-event/dist/utils'

interface IButtonProps {
    label: string
    onClick: () => void
    isDisabled?: boolean
    className?: string
}

export const Button: React.FC<IButtonProps> = ({ label, onClick, isDisabled, className }) => {
    return (
        <button
            className={`button ${className}`}
            type='button'
            onClick={onClick}
            disabled={isDisabled}
        >
            {label}
        </button>
    )
}