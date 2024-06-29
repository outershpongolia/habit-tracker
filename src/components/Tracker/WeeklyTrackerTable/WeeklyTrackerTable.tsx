import React from "react"
import { TrackerCell } from "../TrackerCell/TrackerCell"
import { ITable } from "../../../interfaces"
import { uniqueId } from "lodash"

interface IWeeklyTrackerTableProps {
  tableData: ITable
}

export const WeeklyTrackerTable: React.FC<IWeeklyTrackerTableProps> = ({ tableData }) => {
  return (
    <table>
      <thead>
        {/* horizontal labels - days of week */}
        <tr className="tracker__horizontal">
          {/* first empty cell */}
          <TrackerCell />

          {tableData.labels.horizontal.map(label => {
            return (
              <TrackerCell
                key={uniqueId(label)}
                label={label}
              />
            )
          })}
        </tr>
      </thead>

      <tbody className="tracker__body">
        {tableData.labels.vertical.map(row => {
          return (
            <tr
              key={uniqueId(row.toString())}
              className="tracker__horizontal"
            >
              {/* vertical labels - habits */}
              <TrackerCell label={row.toString()} />

              {tableData.cells?.map(cell => {
                if (!cell) return null

                // functional cells
                return (
                  <TrackerCell
                    key={cell.id}
                    id={cell.id}
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