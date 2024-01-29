import React, { useMemo } from 'react'
import './DateSelect.scss'
import DatePicker from 'react-datepicker'
import { ETimeFormat } from '../../constants'

interface IDateSelectProps {
  type: ETimeFormat
  startDate: Date
  endDate: Date | null
  onChangeDate: (name: string) => (date: Date) => void
}

export const DateSelect: React.FC<IDateSelectProps> = ({
  type,
  startDate,
  endDate,
  onChangeDate
}) => {
  const generateDateFormat = useMemo(() => {
    switch (type) {
      case ETimeFormat.MONTH:
        return "MM/yyyy"

      case ETimeFormat.YEAR:
        return "yyyy"

      case ETimeFormat.WEEK:
        return "I/R"

      default:
        return undefined
    }
  }, [type])

  return (
    <div className='date-range'>
      <DatePicker
        selected={startDate}
        onChange={onChangeDate('startDate')}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat={generateDateFormat}
        showMonthYearPicker={type === ETimeFormat.MONTH}
        showYearPicker={type === ETimeFormat.YEAR}
        showWeekNumbers={type === ETimeFormat.WEEK}
        showWeekPicker={type === ETimeFormat.WEEK}
        minDate={new Date()}
        inline
      />

      {type !== ETimeFormat.WEEK && (
        <DatePicker
          selected={endDate}
          onChange={onChangeDate('endDate')}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          dateFormat={generateDateFormat}
          showMonthYearPicker={type === ETimeFormat.MONTH}
          showYearPicker={type === ETimeFormat.YEAR}
          minDate={new Date()}
          inline
        />
      )}
    </div>
  )
}