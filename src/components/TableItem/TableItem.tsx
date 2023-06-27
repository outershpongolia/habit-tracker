import React, { useCallback, useContext, useState } from "react"
import './TableItem.scss'
import { Input } from "../Input/Input"
import { EFieldType } from "../../constants"
import clsx from "clsx"
import { noop } from "lodash"
import { TableContext } from "../../context/TableContext"

interface ITableItemProps {
    value: string
    index: number
    id?: string
    maxLength?: number
    clickable?: boolean
}

export const TableItem: React.FC<ITableItemProps> = ({ id, value, index, maxLength, clickable }) => {
    const { tableData, setTableData } = useContext(TableContext)

    const [ inputValue, setInputValue ] = useState('')
    const [ fieldType, setFieldType ] = useState(EFieldType.TEXT)
    const [ valueToShow, setValueToShow ] = useState(value)

    const handleInputOnChange = useCallback((value: string) => {
        setInputValue(value)
    }, [setInputValue])

    const handleChangeFieldToInput = useCallback(() => {
        setFieldType(EFieldType.INPUT)
    }, [setFieldType])

    const handleSaveInput = useCallback(() => {
        setTableData(tableData => {
            const data = tableData.find(x => x.items.some(x => x.id === id))

            const updatedData = data?.items.map(x => {
                return x.id === id ? {...x, values: x.values.map((value, i) => i === index ? inputValue : value)} : x
            })

            if (!updatedData) {
                return tableData
            }

            return tableData.map(item => {
                if (item.items.some(x => x.id === id)) {
                    return {...item, items: updatedData}
                }
                
                return item
            })
        })

        setFieldType(EFieldType.TEXT)
        setValueToShow(inputValue)
    }, [setFieldType, setTableData, index, inputValue, id, setValueToShow])

    console.log({valueToShow})
    console.log({value})

    return (
        <div className={clsx('table-item', {'table-item_input': fieldType === EFieldType.INPUT})}>
            {fieldType === EFieldType.TEXT &&
                <div className="table-item__text" onClick={clickable ? handleChangeFieldToInput : noop}>{valueToShow}</div>
            }

            {fieldType === EFieldType.INPUT &&
                <Input
                    value={inputValue}
                    maxLength={maxLength || 20}
                    onChange={handleInputOnChange}
                    onClick={handleSaveInput}
                />
            }
        </div>
    )
}