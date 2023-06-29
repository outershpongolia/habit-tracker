import React, { useCallback } from 'react'
import './Input.scss'
import { BiCheckCircle } from 'react-icons/bi'

interface IInputProps {
    value: string | number
    name: string
    maxLength: number
    onChange: (value: string | number, name: string) => void
    label?: string
    placeholder?: string
    className?: string
}

export const Input: React.FC<IInputProps> = ({ value, name, maxLength, onChange, label, placeholder, className }) => {
    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value, e.target.name)
    }, [onChange])

    return (
        <div className='input__wrapper'>
            {label && <div className='input__label'>{label}</div>}

            <input
                className={`input ${className}`}
                type="text"
                name={name}
                value={value}
                onChange={handleOnChange}
                placeholder={placeholder}
                maxLength={maxLength}
                autoFocus
            />
        </div>
    )
}