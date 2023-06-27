import { ETableSize } from "./constants"

export interface ITable {
    id: string
    title: string
    headers: string[]
    size: ETableSize
    items: ITableItem[]
}

export interface ITableItem {
    id: string
    values: any[]
}
