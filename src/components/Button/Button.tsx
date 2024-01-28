import React from 'react'
import './Button.scss'
import clsx from 'clsx'

interface IButtonProps {
  label: string
  onClick: () => void
  isDisabled?: boolean
  isActive?: boolean
  className?: string
}

export const Button: React.FC<IButtonProps> = ({
  label,
  onClick,
  isDisabled,
  isActive,
  className
}) => {
  return (
    <button
      className={clsx('button', className, isActive && 'button_active')}
      type='button'
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  )
}