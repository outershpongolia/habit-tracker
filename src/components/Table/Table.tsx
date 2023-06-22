import React, { useMemo } from 'react'
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
  const tableDataList = useMemo(() => {
    if (!tableData) {
      return null
    }

    if (tableData.items.length === 0) {
      return tableSize === ETableSize.BIG
        ? DEFAULT_BIG_DATA.items.map(x => x.values)
        : DEFAULT_SMALL_DATA.items.map(x => x.values)
    }

    return tableData.items.map(x => x.values)
  }, [tableData, tableSize])

  return (
    <div className={`table ${className}`}>
      {tableData && <TableRow data={tableData.headers} tableSize={tableData.size} rowType={ETableRowType.HEADER} />}

      {tableDataList && tableDataList.map(x => {
        return (
          <TableRow
            key={uniqueId(x.toString())}
            data={x}
            tableSize={x.length < DEFAULT_BIG_TABLE_SIZE ? ETableSize.SMALL : ETableSize.BIG}
            rowType={ETableRowType.DATA}
          />
        )
      })}
    </div>
  )
}