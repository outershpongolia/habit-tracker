import React, { useCallback, useContext } from "react"
import './TimeFormatStep.scss'
import { TrackerContext } from "../../../context/TrackerContext"
import { TimeFormatCard } from "../../../components/TimeFormatCard/TimeFormatCard"
import { ETimeFormat, TIME_FORMAT_DATA } from "../../../constants"
import { uniqueId } from "lodash"

interface ITimeFormatStepProps {}

export const TimeFormatStep: React.FC<ITimeFormatStepProps> = () => {
  const {tracker, setTracker} = useContext(TrackerContext)

  const handleChooseTimeFormat = useCallback((timeFormat: ETimeFormat) => {
    setTracker(tracker => {
      return {
        ...tracker,
        timeFormat: timeFormat,
        timeFormatOptions: {
          startDate: null,
          endDate: null
        }
      }
    })
  }, [setTracker])

  return (
    <div className="second-step">
      {TIME_FORMAT_DATA.map(x => {
        return (
          <TimeFormatCard
            key={uniqueId(x.timeFormat)}
            label={x.label}
            timeFormat={x.timeFormat}
            onClick={handleChooseTimeFormat}
            isActive={tracker?.timeFormat === x.timeFormat}
          />
        )
      })}
    </div>
  )
}