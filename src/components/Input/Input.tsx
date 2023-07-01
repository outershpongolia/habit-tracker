import React, { useCallback } from 'react'
import './Input.scss'

interface IInputProps extends React.ComponentProps<'input'> {
    label?: string
}

export const Input: React.FC<IInputProps> = ({ value, name, maxLength, onChange, label, placeholder, autoFocus, className }) => {
    return (
        <div className='input__wrapper'>
            {label && <div className='input__label'>{label}</div>}

            <input
                className={`input ${className}`}
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                autoFocus={autoFocus}
            />
        </div>
    )
}