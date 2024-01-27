import React from "react"
import './Selector.scss'
import { SelectorOption } from "./SelectorOption/SelectorOption"
import { ISelectorOption } from "../../interfaces"
import { ETrackerType } from "../../constants"

interface ISelectorProps {
  label: string
  value: ETrackerType | string
  options: ISelectorOption[]
  onChooseOption: (option: ISelectorOption) => void
}

export const Selector: React.FC<ISelectorProps> = ({ label, value, options, onChooseOption }) => {
  return (
    <div className="selector">
      <div className="selector__label">
        {label}
      </div>

      <div className="selector__options">
        {options.map(option => {
          return (
            <SelectorOption
              option={option}
              isActive={value === option.value}
              onChooseOption={onChooseOption}
            />
          )
        })}
      </div>
    </div>
  )
}