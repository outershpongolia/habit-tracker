import React, { useContext, useEffect, useState } from "react"
import './Tracker.scss'
import { ITable } from "../../interfaces"
import { DAYS_IN_WEEK, DEFAULT_TABLE_DATA, ETimeFormat } from "../../constants"
import { generateTableCells } from "../../utilities"
import { TrackerContext } from "../../context/TrackerContext"
import { addWeeks, eachDayOfInterval, eachMonthOfInterval } from "date-fns"
import { WeeklyTrackerTable } from "./WeeklyTrackerTable/WeeklyTrackerTable"
import { MonthlyTrackerTable } from "./MonthlyTrackerTable/MonthlyTrackerTable"

interface ITrackerProps {}

export const Tracker: React.FC<ITrackerProps> = () => {
  const {tracker} = useContext(TrackerContext)

  const [tableData, setTableData] = useState<ITable>(DEFAULT_TABLE_DATA)

  useEffect(() => {
    setTableData(tableData => {
      if (!tracker) return tableData

      const daysInterval = eachDayOfInterval({
        start: (tracker.timeFormatOptions.startDate || 0),
        end: ETimeFormat.WEEK === tracker.timeFormat
          ? addWeeks((tracker.timeFormatOptions.startDate || 0), 1)
          : (tracker.timeFormatOptions.endDate || 0)
      })

      console.log({daysInterval})

      switch (tracker.timeFormat) {
        case ETimeFormat.WEEK:
          const columnLabels = daysInterval.map(day => {
            const dayToString = day.toDateString().slice(0, 3) as string
            return dayToString
          })

          return {
            labels: {
              horizontal: columnLabels as string[],
              vertical: tracker.habits
            },
            cells: generateTableCells(daysInterval)
          }

        case ETimeFormat.MONTH || ETimeFormat.CUSTOM_DATE_RANGE:
          const monthColumnLabels = eachMonthOfInterval({
            start: (tracker.timeFormatOptions.startDate || 0),
            end: (tracker.timeFormatOptions.endDate || 0)
          }).map(x => x.toDateString().slice(3, 7))

          return {
            labels: {
              horizontal: monthColumnLabels as unknown as string[],
              vertical: DAYS_IN_WEEK.map(day => day.label.slice(0, 3))
            },
            cells: generateTableCells(daysInterval)
          }

        default:
          return tableData
      }
    })
  }, [tracker])

  // const handleEditCell = useCallback((id: string) => {
  //   // TO DO: functionality for cells
  //   console.log({id})
  // }, [])

  return (
    <div className="tracker">
      <div className="tracker__title">
        {tracker.name}
      </div>

      {tracker?.timeFormat === ETimeFormat.WEEK
        ? <WeeklyTrackerTable tableData={tableData} />
        : <MonthlyTrackerTable tableData={tableData} />
      }
    </div>
  )
}