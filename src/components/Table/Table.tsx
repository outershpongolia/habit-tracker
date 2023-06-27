import React, { useEffect, useState } from 'react'
import './Table.scss'
import { DEFAULT_BIG_DATA, DEFAULT_BIG_TABLE_SIZE, DEFAULT_SMALL_DATA, ETableRowType, ETableSize } from '../../constants'
import { ITable } from '../../interfaces'
import { uniqueId } from 'lodash'
import { TableRow } from '../TableRow/TableRow'

interface ITableProps {
  tableData: ITable | null | undefined
  tableSize: ETableSize
  className?: string
}

export const Table: React.FC<ITableProps> = ({  tableData, tableSize, className }) => {
  const [ rowData, setRowData ] = useState<any[]>([])

  useEffect(() => {
    if (!tableData) {
      return
    }

    // if (tableData.items.length === 0) {
    //   return tableSize === ETableSize.BIG
    //     ? DEFAULT_BIG_DATA.items.map(x => x.values)
    //     : DEFAULT_SMALL_DATA.items.map(x => x.values)
    // }

    tableData.items.map(x => {
      setRowData(rowData => {
        if (rowData.find(item => item.id === x.id)) {
          return rowData
        }

        return [
          ...rowData,
          {
            id: x.id,
            values: x.values
          }
        ]
      })
    })
  }, [tableData, setRowData])

  return (
    <div className={`table ${className}`}>
      {tableData && <TableRow data={tableData.headers} tableSize={tableData.size} rowType={ETableRowType.HEADER} />}

      {rowData && rowData.map(x => {
        return (
          <TableRow
            key={uniqueId(x.toString())}
            id={x.id}
            data={x.values}
            tableSize={x.values.length < DEFAULT_BIG_TABLE_SIZE ? ETableSize.SMALL : ETableSize.BIG}
            rowType={ETableRowType.DATA}
          />
        )
      })}
    </div>
  )
}