import React, { useCallback, useContext, useEffect, useState } from "react"
import './Tracker.scss'
import { ITable } from "../../interfaces"
import { TrackerCell } from "./TrackerCell/TrackerCell"
import { max, uniqueId } from "lodash"
import { DAYS_IN_WEEK, DEFAULT_TABLE_DATA, ETimeFormat, MONTH_LIST } from "../../constants"
import { generateTableCells, makeArrayOfNumbers } from "../../utilities"
import { TrackerContext } from "../../context/TrackerContext"

interface ITrackerProps {}

export const Tracker: React.FC<ITrackerProps> = () => {
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
            // && (month.value >= tracker.timeFormatOptions.startDate.month)
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

  const handleEditCell = useCallback((id: string) => {
    // TO DO: functionality for cells
    console.log({id})
  }, [])

  if (!tableData) return <></>

  return (
    <div className="tracker">
      <div className="tracker__title">
        {tracker.name ? tracker.name : 'Tracker Title'}
      </div>

      <table>
        <thead className="tracker__header">
          {/* this is the first row of table - numbers of days */}
          <tr className="tracker__row">
            <TrackerCell className="tracker__row-label" />
            {tableData.labels.columns.map(col => {
              // days label horizontal
              return (
                <TrackerCell
                  key={uniqueId(col.toString())}
                  label={col.toString()}
                />
              )
            })}
          </tr>
        </thead>

        <tbody className="tracker__body">
          {tableData.labels.rows.map(row => {
            return (
              <tr
                key={uniqueId(row.toString())}
                className="tracker__row"
              >
                {/* months label vertical */}
                <TrackerCell className="tracker__row-label" label={row.toString()} />

                {tableData.cells.map(cell => {
                  // functional cells
                  return (
                    <TrackerCell
                      key={cell.id}
                      id={cell.id}
                      onClick={handleEditCell}
                    />
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}