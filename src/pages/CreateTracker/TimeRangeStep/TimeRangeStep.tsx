import React, { useCallback, useContext, useState } from "react"
import './TimeRangeStep.scss'
import { DateSelect, EDateLabel } from "../../../components/DateSelect/DateSelect"
import { TrackerContext } from "../../../context/TrackerContext"
import { ETimeFormat } from "../../../constants";

interface ITimeRangeStepProps {}

export const TimeRangeStep: React.FC<ITimeRangeStepProps> = ({  }) => {
  const {tracker, setTracker} = useContext(TrackerContext)

  const [dateRange, setDateRange] = useState<{startDate: Date, endDate?: Date}>({
    startDate: new Date()
  })

  const handleChangeDate = useCallback((name: string) => {
    return (date: Date) => {
      setTracker(tracker => {
        if (name === EDateLabel.START_DATE) {
          return {
            ...tracker,
            timeFormatOptions: {
              ...tracker.timeFormatOptions,
              startDate: date,
            }
          }
        }

        if (name === EDateLabel.END_DATE) {
          return {
            ...tracker,
            timeFormatOptions: {
              ...tracker.timeFormatOptions,
              endDate: ETimeFormat.WEEK === tracker.timeFormat ? null : date
            }
          }
        }

        return tracker
      })
    }
  }, [setTracker])

  console.log({tracker})

  return (
    <div className="time-range-step">
      <div className="second-step__section">
        <DateSelect
          type={tracker?.timeFormat}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate || null}
          onChangeDate={handleChangeDate}
        />
      </div>
    </div>
  )
}