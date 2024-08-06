import { EStatus, ETimeFormat } from "./constants"

{/* Config interface */}
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
  trackers:     ITracker[]
}

{/* Date interface */}
export interface IDateRange {
  startDate:    Date | number | null
  endDate:      Date | number | null
}
export interface IMonthObject {
  label:        string
  value:        number
  numberOfDays: number
  // TO DO: think of a better ways to get number of days for each month and then this can be removed because
}

{/* Form interface */}
export interface IStep {
  header:       string
  content:      React.ReactNode
}

{/* Table interface */}
export interface ITableLabel {
  horizontal:      string[]
  vertical:         string[] | number[]
}
export interface ITableCell {
  id:           string
  date:         Date
  color?:       string
}
export interface ITable {
  labels:       ITableLabel
  cells:        ITableCell[]
}

{/* Tracker interface */}
export interface ITracker {
  id:                string
  userId:            string
  name:              string
  description?:      string
  habits:            string[] | []
  timeFormat:        ETimeFormat | null
  timeFormatOptions: IDateRange
  legend:            ILegend[]
  timeData:          ITimeData[] | null
}
export interface ILegend {
  id:                  string
  status:              string
  color:               string
  selected:            boolean
  predefined?:         boolean
}
export interface ITimeData {
  status:              string
  color:               string
  date:                number
}