import React, { useCallback } from 'react'
import './Button.scss'
import clsx from 'clsx'

interface IButtonProps {
  label: string
  onClick: (value?: string) => void
  isDisabled?: boolean
  isActive?: boolean
  className?: string
}

export const Button: React.FC<IButtonProps> = ({ label, onClick, isDisabled, isActive, className }) => {
  const handleOnClick = useCallback((e: React.MouseEvent) => {
    onClick(e.currentTarget.textContent?.toLocaleLowerCase() || undefined)
  }, [onClick])

  return (
    <button
      className={clsx('button', className, isActive && 'button_active')}
      type='button'
      onClick={handleOnClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  )
}