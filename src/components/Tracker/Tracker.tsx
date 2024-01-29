import React, { useCallback } from "react"
import './Tracker.scss'
import { ITable } from "../../interfaces"
import { TrackerCell } from "./TrackerCell/TrackerCell"
import { uniqueId } from "lodash"

interface ITrackerProps {
  tableData: ITable
}

export const Tracker: React.FC<ITrackerProps> = ({ tableData }) => {
  const handleEditCell = useCallback((id: string) => {
    // TO DO: functionality for cells
    console.log({id})
  }, [])

  if (!tableData) return <></>

  return (
    <table className="tracker">
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
  )
}