import React, { useCallback, useContext, useEffect, useState } from "react"
import './FirstStep.scss'
import { DateSelect } from "../../../components/DateSelect/DateSelect"
import { TrackerContext } from "../../../context/TrackerContext"
import { start } from "repl"
import { convertDate } from "../../../utilities"

interface IFirstStepProps {}

export const FirstStep: React.FC<IFirstStepProps> = () => {
  const {setTracker} = useContext(TrackerContext)

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    setTracker(tracker => {
      return {
        ...tracker,
        startDate: convertDate(startDate),
        endDate: convertDate(endDate)
      }
    })
  }, [startDate, endDate])

  const handleChangeStartDay = useCallback((date: Date) => {
    setStartDate(date)
  }, [])

  const handleChangeEndDay = useCallback((date: Date) => {
    setEndDate(date)
  }, [])

  return (
    <div className="first-step">
      <div>Set configuration for your tracker</div>
      <DateSelect
        startDate={startDate}
        endDate={endDate}
        handleChangeStartDay={handleChangeStartDay}
        handleChangeEndDay={handleChangeEndDay}
      />
    </div>
  )
}