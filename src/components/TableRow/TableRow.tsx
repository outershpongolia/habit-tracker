import React from "react"
import './TableRow.scss'
import { uniqueId } from "lodash"
import { TableItem } from "../TableItem/TableItem"
import clsx from "clsx"
import { ETableRowType, ETableSize } from "../../constants"

interface ITableRowProps {
    data: any[]
    tableSize: ETableSize
    id?: string
    rowType?: ETableRowType
}

export const TableRow: React.FC<ITableRowProps> = ({ id, data, tableSize, rowType }) => {
    return (
        <div 
            className={clsx('table-row', {
                'table-row_header': rowType === ETableRowType.HEADER,
                'table-row_small': tableSize === ETableSize.SMALL
            })}
        >
            {data && data.map(x => {
                return (
                    <TableItem
                        key={uniqueId(x)}
                        id={id}
                        index={data.indexOf(x)}
                        value={x}
                        maxLength={16}
                        clickable={rowType === ETableRowType.DATA}
                    />
                )
            })}
        </div>
    )
}