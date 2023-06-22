import React, { useCallback, useContext, useState } from "react"
import './TableItem.scss'
import { Input } from "../Input/Input"
import { EFieldType } from "../../constants"
import clsx from "clsx"
import { noop } from "lodash"
import { TableContext } from "../../context/TableContext"

interface ITableItemProps {
    item: string
    maxLength?: number
    clickable?: boolean
}

export const TableItem: React.FC<ITableItemProps> = ({ item, maxLength, clickable }) => {
    const { tableData, setTableData } = useContext(TableContext)

    const [ inputValue, setInputValue ] = useState('')
    const [ fieldType, setFieldType ] = useState(EFieldType.TEXT)

    const handleInputOnChange = useCallback((value: string) => {
        setInputValue(value)
    }, [setInputValue])

    const handleChangeFieldToInput = useCallback(() => {
        setFieldType(EFieldType.INPUT)
    }, [setFieldType])

    const handleSaveInput = useCallback(() => {
        // formula for saving and displaying new input value
        // ...

        setFieldType(EFieldType.TEXT)
    }, [setFieldType])

    console.log({tableData})

    return (
        <div className={clsx('table-item', {'table-item_input': fieldType === EFieldType.INPUT})}>
            {fieldType === EFieldType.TEXT &&
                <div className="table-item__text" onClick={clickable ? handleChangeFieldToInput : noop}>{item}</div>
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