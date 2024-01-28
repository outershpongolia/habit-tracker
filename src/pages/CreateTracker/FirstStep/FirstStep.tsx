import React, { useCallback, useContext, useEffect, useState } from "react"
import './FirstStep.scss'
import { TrackerContext } from "../../../context/TrackerContext"
import { Selector } from "../../../components/Selector/Selector"
import { ETimeFormat, TIME_FORMAT_OPTIONS } from "../../../constants"
import { ISelectorOption } from "../../../interfaces"
import { convertDate } from "../../../utilities"
import { DateSelect } from "../../../components/DateSelect/DateSelect"

interface IFirstStepProps {}

export const FirstStep: React.FC<IFirstStepProps> = () => {
  const {setTracker} = useContext(TrackerContext)

  const [selectorOption, setSelectorOption] = useState<ISelectorOption>()
  const [dateRange, setDateRange] = useState<{startDate: Date, endDate: Date}>({
    startDate: new Date(),
    endDate: new Date()
  })

  useEffect(() => {
    setTracker(tracker => {
      return {
        ...tracker,
        timeFormat: selectorOption?.value as ETimeFormat,
        timeFormatOptions: {
          startDate: convertDate(dateRange.startDate),
          endDate: convertDate(dateRange.endDate),
        }
      }
    })
  }, [dateRange, setTracker, selectorOption])

  const handleChooseOption = useCallback((option: ISelectorOption) => {
    setSelectorOption(option)
  }, [])

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
        {selectorOption && (
          <DateSelect
            type={
              selectorOption.value === ETimeFormat.MONTH
                ? "month-range"
                : selectorOption.value === ETimeFormat.YEAR
                  ? "year-range"
                  : selectorOption.value === ETimeFormat.WEEK
                    ? "week-range"
                    : "date-range"
            }
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChangeStartDay={handleChangeStartDay}
            onChangeEndDay={handleChangeEndDay}
          />
        )}
      </div>
    </div>
  )
}