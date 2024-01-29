import React from 'react'
import './Input.scss'
import clsx from 'clsx'

interface IInputProps extends React.ComponentProps<'input'> {}

export const Input: React.FC<IInputProps> = ({
  value,
  name,
  type,
  maxLength,
  onChange,
  placeholder,
  autoFocus,
  onKeyDown,
  className
}) => {
  return (
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
  )
}