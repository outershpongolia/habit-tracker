import React from 'react'
import './DateSelect.scss'
import DatePicker from 'react-datepicker'

interface IDateSelectProps {
  startDate: Date
  endDate: Date
  handleChangeStartDay: (date: Date) => void
  handleChangeEndDay: (date: Date) => void
}

export const DateSelect: React.FC<IDateSelectProps> = ({
  startDate,
  endDate,
  handleChangeStartDay,
  handleChangeEndDay
}) => {
  return (
    <div className='date-select'>
      <DatePicker
        className='date-select__picker'
        selected={startDate}
        onChange={handleChangeStartDay}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        name=''
      />
      <DatePicker
        className='date-select__picker'
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