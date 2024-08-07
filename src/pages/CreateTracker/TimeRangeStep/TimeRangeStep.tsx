import React, { useCallback, useContext, useState } from "react"
import './TimeRangeStep.scss'
import { DateSelect } from "../../../components/DateSelect/DateSelect"
import { TrackerContext } from "../../../context/TrackerContext"
import { ETimeFormat } from "../../../constants";
import dayjs, { Dayjs } from 'dayjs'

interface ITimeRangeStepProps {}

export const TimeRangeStep: React.FC<ITimeRangeStepProps> = () => {
  const {currentTracker, setCurrentTracker} = useContext(TrackerContext)

  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs(currentTracker.timeFormatOptions.startDate ? currentTracker.timeFormatOptions.startDate : new Date()),
    dayjs(currentTracker.timeFormatOptions.endDate ? currentTracker.timeFormatOptions.endDate : new Date())
  ])

  const handleChangeDate = useCallback((dateRange: [string, string]) => {
    const [ startDate, endDate ] = [...dateRange]

    const [ formattedStartDate, formattedEndDate ] = dateRange.map(x => dayjs(x))

    setCurrentTracker(tracker => {
      return {
        ...tracker,
        timeFormatOptions: {
          startDate: new Date(startDate),
          endDate: new Date(endDate)
        }
      }
    })

    setDateRange([formattedStartDate, formattedEndDate])
  }, [setCurrentTracker, setDateRange])

  return (
    <div className="time-range-step">
      <DateSelect
        type={currentTracker.timeFormat as ETimeFormat}
        values={dateRange}
        handleChangeDate={handleChangeDate}
      />
    </div>
  )
}