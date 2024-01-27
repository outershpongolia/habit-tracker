import React, { useCallback, useContext, useEffect, useState } from "react"
import './FirstStep.scss'
import { TrackerContext } from "../../../context/TrackerContext"
import { convertDate } from "../../../utilities"
import { Selector } from "../../../components/Selector/Selector"
import { DAYS_IN_WEEK, ETrackerType, TRACKER_OPTIONS } from "../../../constants"
import { ISelectorOption } from "../../../interfaces"
import { DateRange, Week } from "../../../components/DateSelect/DateSelect"

interface IFirstStepProps {}

export const FirstStep: React.FC<IFirstStepProps> = () => {
  const {setTracker} = useContext(TrackerContext)

  const [selectorOption, setSelectorOption] = useState<ISelectorOption>()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startDay, setStartDay] = useState(DAYS_IN_WEEK[0])

  const handleChooseOption = useCallback((option: ISelectorOption) => {
    setSelectorOption(option)
  }, [])

  useEffect(() => {
    setTracker(tracker => {
      return {
        ...tracker,
        startDate: convertDate(startDate),
        endDate: convertDate(endDate),
        type: selectorOption
      }
    })
  }, [startDate, endDate, setTracker, selectorOption])

  const handleChangeStartDay = useCallback((date: Date) => {
    setStartDate(date)
  }, [])

  const handleChangeEndDay = useCallback((date: Date) => {
    setEndDate(date)
  }, [])

  const handleSelectStartDay = useCallback((value?: string | undefined) => {
    if (value) {
      setStartDay(value)
    }
  }, [])

  return (
    <div className="first-step">
      <div className="first-step__selector">
        <Selector
          label="Choose a type of your tracker:"
          value={selectorOption?.value || ''}
          options={TRACKER_OPTIONS}
          onChooseOption={handleChooseOption}
        />
      </div>

      <div className="first-step__config">
        {selectorOption?.value === ETrackerType.WEEKLY && (
          <Week
            days={DAYS_IN_WEEK}
            value={startDay}
            onClick={handleSelectStartDay}
          />
        )}

        {selectorOption?.value === ETrackerType.CUSTOM_DATE_RANGE && (
          <DateRange
            startDate={startDate}
            endDate={endDate}
            handleChangeStartDay={handleChangeStartDay}
            handleChangeEndDay={handleChangeEndDay}
          />
        )}
      </div>
    </div>
  )
}