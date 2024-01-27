import React from 'react'
import './Week.scss'
import { uniqueId } from 'lodash'
import { Button } from '../../Button/Button'
import { ISelectorOption } from '../../../interfaces'

interface IWeekProps {
  days: ISelectorOption[]
  value: string
  onClick: (value?: string) => void
}

export const Week: React.FC<IWeekProps> = ({ days, value, onClick }) => {
  return (
    <div className='week'>
      <div className='week__label'>
        Select starting day of the week:
      </div>

      <div className='week__days'>
        {days.map(day => {
          return (
            <Button
              key={uniqueId(day.value)}
              label={day.label}
              onClick={onClick}
              isActive={value === day.value}
            />
          )
        })}
      </div>
    </div>
  )
}