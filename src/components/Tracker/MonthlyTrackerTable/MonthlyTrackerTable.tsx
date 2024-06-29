import React, { useMemo } from "react"
import './MonthlyTrackerTable.scss'
import { TrackerCell } from "../TrackerCell/TrackerCell"
import { ITable } from "../../../interfaces"
import { uniqueId } from "lodash"

interface IMonthlyTrackerTableProps {
  tableData: ITable
}

export const MonthlyTrackerTable: React.FC<IMonthlyTrackerTableProps> = ({ tableData }) => {
  // map weeks of every month
  const weeksInMonth = useMemo(() => {
    return tableData.cells?.map((_, index) => {
      return index % 7 === 0 ? tableData.cells?.slice(index, index + 7) : null
    }).filter(Boolean)
  }, [tableData])

  return (
    <table className="monthly-tracker-table">
      <thead>
        {/* horizontal labels - months */}
        <tr className="tracker__horizontal">
          {/* first empty cell */}
          <TrackerCell
            className="monthly-tracker-table__cell"
          />

          {tableData.labels.horizontal.map((x, index) => {
            if (index === tableData.labels.horizontal.length - 1) return null

            return (
              <TrackerCell
                className="monthly-tracker-table__cell"
                width={`${100 / (tableData.labels.horizontal.length - 1)}%`}
                key={uniqueId(x)}
                label={x}
              />
            )
          })}
        </tr>
      </thead>

      <tbody className="tracker__body monthly-tracker-table__body">
        <tr
          className="tracker__horizontal monthly-tracker-table__column"
        >
          {tableData.labels.vertical.map(x => {
            return <TrackerCell className="monthly-tracker-table__cell" label={x.toString()} />
          })}
        </tr>

        {weeksInMonth.map(x => {
          return (
            <tr key={uniqueId()} className="tracker__horizontal monthly-tracker-table__column">
              {x && x.map(cell => {
                
                return (
                  <TrackerCell
                    key={cell.id}
                    id={cell.id}
                    date={cell.date}
                    // onClick={handleEditCell}
                  />
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}