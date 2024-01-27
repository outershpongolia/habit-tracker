import React from 'react'
import './DateRange.scss'
import DatePicker from 'react-datepicker'

interface IDateRangeProps {
  startDate: Date
  endDate: Date
  handleChangeStartDay: (date: Date) => void
  handleChangeEndDay: (date: Date) => void
}

export const DateRange: React.FC<IDateRangeProps> = ({
  startDate,
  endDate,
  handleChangeStartDay,
  handleChangeEndDay
}) => {
  return (
    <div className='date-range'>
      <DatePicker
        className='date-range__picker'
        selected={startDate}
        onChange={handleChangeStartDay}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        name=''
      />
      <DatePicker
        className='date-range__picker'
        selected={endDate}
        onChange={handleChangeEndDay}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </div>
  )
}