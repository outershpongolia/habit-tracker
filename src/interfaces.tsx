import { ETrackerType } from "./constants"

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
  value:        ETrackerType | string
}

export interface ITracker {
  startDate:    IDateObject
  endDate:      IDateObject
  type?:         ISelectorOption
}

export interface IUser {
  _id:          string
  id:           string
  email:        string
  name:         string
}
