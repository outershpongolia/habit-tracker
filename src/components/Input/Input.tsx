import React, { useCallback } from 'react'
import './Input.scss'
import { BiCheckCircle } from 'react-icons/bi'

interface IInputProps {
    value: string
    maxLength: number
    onChange: (value: string) => void
    onClick: () => void
    name?: string
    placeholder?: string
    className?: string
}

export const Input: React.FC<IInputProps> = ({ value, name, maxLength, onChange, onClick, placeholder, className }) => {
    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }, [ onChange ])

    return (
        <div className='input__wrapper'>
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

            <BiCheckCircle className='input__icon' onClick={onClick} />
        </div>
    )
}