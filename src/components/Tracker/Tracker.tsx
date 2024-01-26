import React, { useCallback, useEffect, useState } from "react"
import './Tracker.scss'
import { ITable, ITracker } from "../../interfaces"
import { TrackerCell } from "./TrackerCell/TrackerCell"
import { generateLabelsForTable, generateTableCells } from "../../utilities"
import { uniqueId } from "lodash"

interface ITrackerProps {
  data: ITracker
}

export const Tracker: React.FC<ITrackerProps> = ({ data }) => {
  const [tableData, setTableData] = useState<ITable>()

  useEffect(() => {
    const tableLabels = generateLabelsForTable(data.startDate.month, data.endDate.month)
    const tableCells = generateTableCells(tableLabels.columns)

    setTableData({ labels: tableLabels, cells: tableCells })
  }, [data])

  const handleEditCell = useCallback((id: string) => {
    // functionality for cells
    // console.log({id})
  }, [])

  return (
    <table className="tracker">
      <thead className="tracker__header">
        {/* this is the first row of table - numbers of days */}
        <tr className="tracker__row">
          <TrackerCell />
          {tableData?.labels.columns.map(col => {
            {/* days label horizontal */}
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
        {tableData?.labels.rows.map(row => {
          return (
            <tr
              key={uniqueId(row.toString())}
              className="tracker__row"
            >
              {/* months label vertical */}
              <TrackerCell label={row.toString()[0]} />

              {/* functional cells */}
              {tableData.cells.map(cell => {
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