import React from 'react'
import './Input.scss'

interface IInputProps extends React.ComponentProps<'input'> {
    label: string
}

export const Input: React.FC<IInputProps> = ({ value, name, type, maxLength, onChange, label, placeholder, autoFocus, className }) => {
    return (
        <div className='input__wrapper'>
            <div className='input__label'>{label}</div>

            <input
                className={`input ${className}`}
                type={type}
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