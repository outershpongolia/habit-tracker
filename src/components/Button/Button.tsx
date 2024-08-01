import React from 'react'
import './Button.scss'
import clsx from 'clsx'

interface IButtonProps {
  label: string
  onClick: () => void
  variety?: 'primary' | 'secondary'
  isDisabled?: boolean
  icon?: React.ReactNode
  className?: string
}

export const Button: React.FC<IButtonProps> = ({
  label,
  onClick,
  variety,
  icon,
  isDisabled,
  className
}) => {
  return (
    <button
      className={clsx('button', className, `button_${variety}`)}
      type='button'
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon} {label}
    </button>
  )
}