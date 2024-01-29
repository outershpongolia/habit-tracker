import React, { useCallback } from 'react'
import './SelectorOption.scss'
import { ISelectorOption } from '../../../interfaces'
import clsx from 'clsx'

interface ISelectorOptionProps {
  option: ISelectorOption
  isActive: boolean
  onChooseOption: (option: ISelectorOption) => void
  isDisabled?: boolean 
  className?: string
}

export const SelectorOption: React.FC<ISelectorOptionProps> = ({
  option,
  isActive,
  onChooseOption,
  isDisabled,
  className
}) => {
  const handleChooseOption = useCallback(() => {
    onChooseOption(option)
  }, [onChooseOption, option])

  return (
    <div
      className={clsx('selector-option',
        isActive && 'selector-option_active',
        isDisabled && 'selector-option_disabled',
        className
      )}
      onClick={handleChooseOption}
    >
      <div className='selector-option__circle' />

      {option.label}
    </div>
  )
}