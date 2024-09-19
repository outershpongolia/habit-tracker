import React, { useCallback, useEffect, useState } from 'react'
import './Input.scss'
import clsx from 'clsx'

interface IInputProps {
  value: string
  name: string
  label: string
  onChange: (value: string, name: string) => void
  type?: string
  maxLength?: number
  autoFocus?: boolean
  info?: string
  className?: string
}

export const Input: React.FC<IInputProps> = ({
  value,
  name,
  type,
  maxLength,
  onChange,
  autoFocus,
  label,
  info,
  className
}) => {
  const [focus, setFocus] = useState(false)

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, e.target.name)
  }, [onChange])

  useEffect(() => {
    if (value) {
      setFocus(true)
    }
  }, [value])

  const handleOnFocus = useCallback(() => {
    setFocus(true)
  }, [])

  const handleOnBlur = useCallback(() => {
    if (!value) {
      setFocus(false)
    }
  }, [value])

  return (
    <div className='input__wrapper'>
      <input
        className={clsx('input', className, focus && "input_active")}
        type={type || 'text'}
        name={name}
        value={value}
        onChange={handleOnChange}
        maxLength={maxLength}
        autoFocus={autoFocus}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />

      {label &&
        <div className={clsx('input__label', focus && 'input__label_active')}>
          {label}
        </div>
      }

      {info &&
        // TO DO: add props object for info: {content, color, position??: left, right, center}
        <div className="input__info">
          {info}
        </div>
      }
    </div>
  )
}