import React, { useCallback, useContext, useEffect, useState } from "react"
import './FirstStep.scss'
import { TrackerContext } from "../../../context/TrackerContext"
import { Selector } from "../../../components/Selector/Selector"
import { DAYS_IN_WEEK, ETimeFormat, TIME_FORMAT_OPTIONS } from "../../../constants"
import { IDateObject, ISelectorOption } from "../../../interfaces"
import { DateRange, Week } from "../../../components/DateSelect/DateSelect"
import { convertDate } from "../../../utilities"

interface IFirstStepProps {}

export const FirstStep: React.FC<IFirstStepProps> = () => {
  const {setTracker} = useContext(TrackerContext)

  const [selectorOption, setSelectorOption] = useState<ISelectorOption>()
  const [startDay, setStartDay] = useState('')
  const [dateRange, setDateRange] = useState<{startDate: Date, endDate: Date}>({
    startDate: new Date(),
    endDate: new Date()
  })

  useEffect(() => {
    setTracker(tracker => {
      switch (selectorOption?.value) {
        case ETimeFormat.CUSTOM_DATE_RANGE:
          return {
            ...tracker,
            timeFormat: selectorOption.value,
            timeFormatOptions: {
              startDate: convertDate(dateRange.startDate),
              endDate: convertDate(dateRange.endDate),
            }
          }

        case ETimeFormat.WEEK:
          return {
            ...tracker,
            timeFormat: selectorOption.value,
            timeFormatOptions: {
              startDay: startDay
            }
          }

        default:
          return tracker
      }
    })
  }, [dateRange, setTracker, selectorOption, startDay])

  const handleChangeStartDay = useCallback((date: Date) => {
    setDateRange(currentOptions => {
      return {
        ...currentOptions,
        startDate: date
      }
    })
  }, [])

  const handleChangeEndDay = useCallback((date: Date) => {
    setDateRange(currentOptions => {
      return {
        ...currentOptions,
        endDate: date
      }
    })
  }, [])

  const handleChooseOption = useCallback((option: ISelectorOption) => {
    setSelectorOption(option)
  }, [])

  const handleSelectStartDay = useCallback((value?: string | undefined) => {
    if (value) {
      setStartDay(value)
    }
  }, [])

  return (
    <div className="first-step">
      <div className="first-step__section">
        <Selector
          label="Choose time format for your tracker:"
          value={selectorOption?.value || ''}
          options={TIME_FORMAT_OPTIONS}
          onChooseOption={handleChooseOption}
        />
      </div>

      <div className="first-step__section">
        {selectorOption?.value === ETimeFormat.WEEK && (
          <Week
            days={DAYS_IN_WEEK}
            value={startDay}
            onClick={handleSelectStartDay}
          />
        )}

        {selectorOption?.value === ETimeFormat.CUSTOM_DATE_RANGE && (
          <DateRange
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            handleChangeStartDay={handleChangeStartDay}
            handleChangeEndDay={handleChangeEndDay}
          />
        )}
      </div>
    </div>
  )
}