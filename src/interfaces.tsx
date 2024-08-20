import { EStatus, ETimeFormat } from "./constants"

{/* Config interface */}
export interface IAuth {
  email:             string
  password:          string
  categories:        ICategory[]
  name?:             string
}
export interface IApiResponse<T=any> {
  statusCode:        number
  status:            EStatus.ERROR | EStatus.SUCCESS
  data:              T
  message:           string
}
export interface IUser {
  _id:               string
  id:                string
  email:             string
  name:              string
  categories:        ICategory[]
}

{/* Date interface */}
export interface IDateRange {
  startDate:         Date | null
  endDate:           Date | null
}

{/* Form interface */}
export interface IStep {
  header:            string
  content:           React.ReactNode
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
  timeData:          ITimeData[]
  dateCreated:       Date
  dateUpdated:       Date
  category:          ICategory | null
}
export interface ILegend {
  id:                string
  status:            string
  color:             string
  selected:          boolean
  predefined?:       boolean
}
export interface ITimeData {
  status:            string
  color:             string
  date:              number
}
export interface ICategory {
  value:             string
  color:             string
}