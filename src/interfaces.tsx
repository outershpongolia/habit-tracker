export interface IDateObject {
    day:          number
    month:        number
    year:         number
}

export interface IMonthObject {
    label:        string
    value:        number
    numberOfDays: number

}
export interface ITableLabel {
    columns: number[]
    rows: string[] | number[]
}

export interface ITableCell {
    id: string
    color?: string
}

export interface ITable {
    labels: ITableLabel
    cells: ITableCell[]
}

export interface IStep {
    header: string
    content: React.ReactNode
}

// export interface ITableCell {
//     columns: columns,
//       rows: months,
//       id: v4()
// }

export interface ITracker {
    startDate:    IDateObject
    endDate:      IDateObject
}

export interface IUser {
    _id:          string
    id:           string
    email:        string
    name:         string
}

export interface IInputData {
    newName:      string
    email:        string
    category:     string
    totalBalance: number
    totalIncome:  number
}
