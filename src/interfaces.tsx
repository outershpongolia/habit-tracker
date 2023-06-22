import { ETableSize } from "./constants"

export interface ITable {
    title: string
    headers: string[]
    size: ETableSize
    items: ITableItem[]
}

export interface ITableItem {
    id: string
    label: string
    values: any[]
}
