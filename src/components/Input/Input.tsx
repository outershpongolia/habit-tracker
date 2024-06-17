import React from 'react'
import './Input.scss'
import clsx from 'clsx'

interface IInputProps extends React.ComponentProps<'input'> {
  label?: string
}

export const Input: React.FC<IInputProps> = ({
  value,
  name,
  type,
  maxLength,
  onChange,
  placeholder,
  autoFocus,
  label,
  className
}) => {
  return (
    <div className='input__wrapper'>
      {label && <div className='input__label'>{label}</div>}

      <input
        className={clsx('input', className)}
        type={type || 'text'}
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