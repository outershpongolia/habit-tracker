import { EStatus, ETimeFormat } from "./constants"

export interface IAuth {
  email:        string
  password:     string
  name?:        string
}
export interface IApiResponse<T=any> {
  statusCode:   number
  status:       EStatus.ERROR | EStatus.SUCCESS
  data:         T
  message:      string
}
export interface IUser {
  _id:          string
  id:           string
  email:        string
  name:         string
}

{/* Date interface */}
export interface IDateRange {
  startDate:    IDateObject | null
  endDate:      IDateObject | null
}
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

{/* Form interface */}
export interface IStep {
  header:       string
  content:      React.ReactNode
}

{/* Table interface */}
export interface ITableLabel {
  columns:      string[] | number[]
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

{/* Tracker interface */}
export interface ITracker {
  id:                string
  name:              string
  description?:      string
  habits:            string[] | []
  timeFormat:        ETimeFormat | null
  timeFormatOptions: IDateRange
}
