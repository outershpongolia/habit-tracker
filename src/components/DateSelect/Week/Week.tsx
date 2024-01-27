import React from 'react'
import './Week.scss'
import { uniqueId } from 'lodash'
import { Button } from '../../Button/Button'

interface IWeekProps {
  days: string[]
  value: string
  onClick: (value?: string) => void
}

export const Week: React.FC<IWeekProps> = ({ days, value, onClick }) => {
  return (
    <div className='week'>
      <div className='week__label'>
        Choose a starting day of your tracker:
      </div>

      <div className='week__days'>
        {days.map(day => {
          return (
            <Button
              key={uniqueId(day)}
              label={day}
              onClick={onClick}
              isActive={value === day}
            />
          )
        })}
      </div>
    </div>
  )
}