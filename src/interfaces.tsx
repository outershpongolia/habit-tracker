import { ETimeFormat } from "./constants"

export interface IDateObject {
  day:          number
  month:        number
  year:         number
}

export interface IMonthObject {
  label:        string
  value:        number
  numberOfDays: number
  // TO DO: think of a better ways to get number of days for each month and then this can be removed because
  // {label, value} is already ISelectorOption
}

export interface IStartDay {
  startDay:     string
}

export interface ITableLabel {
  columns:      number[]
  rows:         string[] | number[]
}

export interface ITableCell {
  id:           string
  color?:       string
}

export interface ITable {
  labels:       ITableLabel
  cells:        ITableCell[]
}

export interface IStep {
  header:       string
  content:      React.ReactNode
}

export interface ISelectorOption {
  label:        string
  value:        ETimeFormat | string
}

export interface IDateRange {
  startDate:    IDateObject
  endDate:      IDateObject
}

export interface ITracker {
  id:                string
  timeFormat:        ETimeFormat
  timeFormatOptions: IDateRange | IStartDay | null    // TO DO: here comes options for year and month
}

export interface IUser {
  _id:          string
  id:           string
  email:        string
  name:         string
}
