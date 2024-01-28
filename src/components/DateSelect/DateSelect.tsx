import React, { useMemo } from 'react'
import './DateSelect.scss'
import DatePicker from 'react-datepicker'

interface IDateSelectProps {
  type: 'date-range' | 'month-range' | 'year-range' | 'week-range'
  startDate: Date
  endDate: Date
  onChangeStartDay: (date: Date) => void
  onChangeEndDay: (date: Date) => void
}

export const DateSelect: React.FC<IDateSelectProps> = ({
  type,
  startDate,
  endDate,
  onChangeStartDay,
  onChangeEndDay
}) => {
  const generateDateFormat = useMemo(() => {
    switch (type) {
      case 'month-range':
        return "MM/yyyy"

      case 'year-range':
        return "yyyy"

      case 'week-range':
        return "I/R"

      default:
        return undefined
    }
  }, [type])

  return (
    <div className='date-range'>
      <DatePicker
        className='date-range__picker'
        selected={startDate}
        onChange={onChangeStartDay}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat={generateDateFormat}
        showMonthYearPicker={type === 'month-range'}
        showYearPicker={type === 'year-range'}
        showWeekNumbers={type === 'week-range'}
        showWeekPicker={type === 'week-range'}
      />
      {type !== 'week-range' && (
        <DatePicker
          className='date-range__picker'
          selected={endDate}
          onChange={onChangeEndDay}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat={generateDateFormat}
          showMonthYearPicker={type === 'month-range'}
          showYearPicker={type === 'year-range'}
        />
      )}
    </div>
  )
}