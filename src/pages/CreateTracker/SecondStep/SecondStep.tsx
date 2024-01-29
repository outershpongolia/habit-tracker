import React, { useCallback, useContext, useEffect, useState } from "react"
import './SecondStep.scss'
import { TrackerContext } from "../../../context/TrackerContext"
import { Selector } from "../../../components/Selector/Selector"
import { ETimeFormat, TIME_FORMAT_OPTIONS } from "../../../constants"
import { ISelectorOption } from "../../../interfaces"
import { convertDate } from "../../../utilities"
import { DateSelect } from "../../../components/DateSelect/DateSelect"

interface ISecondStepProps {}

export const SecondStep: React.FC<ISecondStepProps> = () => {
  const {setTracker} = useContext(TrackerContext)

  const [selectorOption, setSelectorOption] = useState<ISelectorOption>(TIME_FORMAT_OPTIONS[0])
  const [dateRange, setDateRange] = useState<{startDate: Date, endDate?: Date}>({
    startDate: new Date()
  })

  useEffect(() => {
    if (!selectorOption) return

    setTracker(tracker => {
      return {
        ...tracker,
        timeFormat: selectorOption.value as ETimeFormat,
        timeFormatOptions: {
          startDate: convertDate(dateRange.startDate),
          endDate: selectorOption?.value === ETimeFormat.WEEK || !dateRange.endDate
            ? null
            : convertDate(dateRange.endDate)
        }
      }
    })
  }, [dateRange, setTracker, selectorOption])

  // Choose time format option for tracker
  const handleChooseOption = useCallback((option: ISelectorOption) => {
    setSelectorOption(option)

    setTracker(tracker => {
      return {
        ...tracker,
        timeFormatOptions: null,
        habits: []
      }
    })
  }, [setTracker])

  const handleChangeDate = useCallback((name: string) => {
    return (date: Date) => {
      setDateRange(dateRange => {
        if (selectorOption?.value === ETimeFormat.WEEK) {
          return {
            startDate: date
          }
        }

        return {
          ...dateRange,
          [name]: date
        }
      })
    }
  }, [selectorOption])

  return (
    <div className="second-step">
      <div className="second-step__section">
        <Selector
          label="Choose time format for your tracker:"
          value={selectorOption?.value as ETimeFormat || ''}
          options={TIME_FORMAT_OPTIONS}
          onChooseOption={handleChooseOption}
        />
      </div>

      <div className="second-step__section">
        {selectorOption && (
          <DateSelect
            type={
              selectorOption.value === ETimeFormat.MONTH
                ? ETimeFormat.MONTH
                : selectorOption.value === ETimeFormat.YEAR
                  ? ETimeFormat.YEAR
                  : selectorOption.value === ETimeFormat.WEEK
                    ? ETimeFormat.WEEK
                    : ETimeFormat.CUSTOM_DATE_RANGE
            }
            startDate={dateRange.startDate}
            endDate={dateRange.endDate || null}
            onChangeDate={handleChangeDate}
          />
        )}
      </div>
    </div>
  )
}