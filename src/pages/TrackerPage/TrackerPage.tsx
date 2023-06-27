import React, { useCallback, useContext } from 'react'
import './TrackerPage.scss'
import { Table } from '../../components/Table/Table'
import { ETableDataType, ETableSize } from '../../constants'
import { TableContext } from '../../context/TableContext'

interface ITrackerPageProps {}

export const TrackerPage: React.FC<ITrackerPageProps> = () => {
    const { tableData } = useContext(TableContext)

    const handleFindData = useCallback((title: ETableDataType) => {
        if (!tableData) {
            return null
        }

        return tableData.find(x => x.title === title)
    }, [ tableData ])

    return (
        <div className='tracker-page'>
            <div className='tracker-page__column'>

                <Table
                    tableData={handleFindData(ETableDataType.INCOME)}
                    tableSize={ETableSize.SMALL}
                />

                <Table
                    tableData={handleFindData(ETableDataType.PERCENTAGE)}
                    tableSize={ETableSize.SMALL}
                />
            </div>

            <div className='tracker-page__column'>
                <Table
                    tableData={handleFindData(ETableDataType.EXPENSES)}
                    tableSize={ETableSize.BIG}
                />
            </div>

            <div className='tracker-page__column'>
                <Table
                    tableData={handleFindData(ETableDataType.BILLS)}
                    tableSize={ETableSize.BIG}
                />
            </div>
        </div>
    )
}