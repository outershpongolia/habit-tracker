import React, { useContext, useEffect, useState } from "react"
import './FourthStep.scss'
import { TrackerContext } from "../../../context/TrackerContext"
import { Tracker } from "../../../components/Tracker/Tracker"
import { ITable } from "../../../interfaces"
import { DAYS_IN_WEEK, DEFAULT_TABLE_DATA, ETimeFormat, MONTH_LIST } from "../../../constants"
import { generateTableCells, makeArrayOfNumbers } from "../../../utilities"
import { max } from "lodash"

interface IFourthStepProps {}

export const FourthStep: React.FC<IFourthStepProps> = () => {
  const {tracker} = useContext(TrackerContext)

  const [tableData, setTableData] = useState<ITable>(DEFAULT_TABLE_DATA)

  useEffect(() => {
    setTableData(tableData => {
      if (!tracker) return tableData

      switch (tracker.timeFormat) {
        case ETimeFormat.WEEK:
          const columnDays = DAYS_IN_WEEK.map(day => day.label[0])
          return {
            labels: {
              columns: columnDays,
              rows: tracker.habits
            },
            cells: generateTableCells(DAYS_IN_WEEK.map(day => day.value) as number[])
          }

        case ETimeFormat.MONTH || ETimeFormat.CUSTOM_DATE_RANGE:
          const months = MONTH_LIST.filter(month =>
            tracker.timeFormatOptions
            && (month.value >= tracker.timeFormatOptions.startDate.month)
            && tracker.timeFormatOptions.endDate
            && (month.value <= tracker.timeFormatOptions.endDate.month)
          )
          const maxColumns = max(months.map(month => month.numberOfDays))
          const columns = makeArrayOfNumbers(maxColumns || 31)

          return {
            labels: {
              columns: columns,
              rows: months.map(month => month.label)
            },
            cells: generateTableCells(columns)
          }

        default:
          return tableData
      }
    })
  }, [tracker])

  return (
    <div className="fourth-step">
      <Tracker
        tableData={tableData}
      />
    </div>
  )
}