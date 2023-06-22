import React, { PropsWithChildren, createContext, useState } from 'react'
import { TABLE_DATA } from '../constants'
import { ITable } from '../interfaces'
import { noop } from 'lodash'

interface ITableContextProps {
    tableData: ITable[]
    setTableData: React.Dispatch<React.SetStateAction<ITable[]>>
}

export const TableContext = createContext<ITableContextProps>({
    tableData: TABLE_DATA,
    setTableData: noop
})

export const TableContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [ tableData, setTableData ] = useState<ITable[]>(TABLE_DATA)

    return (
        <TableContext.Provider value={{ tableData, setTableData }}>
            {children}
        </TableContext.Provider>
    )
}