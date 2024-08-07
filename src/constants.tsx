import { v4 } from "uuid"
import { ITracker, IAuth, ILegend } from "./interfaces"

export enum ERoute {
  DASHBOARD = '/',
  CREATE_TRACKER = '/create-tracker',
  REGISTER = '/register',
  LOGIN = '/login',
  EDIT_TRACKER = '/edit-tracker'
}

export enum EStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export const DEFAULT_AUTH_OBJECT: IAuth = {
  email: '',
  password: '',
  name: '',
}

export enum ETimeFormat {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  CUSTOM_DATE_RANGE = 'custom-date-range'
}

export const TIME_FORMAT_DATA = [
  {
    label: 'week',
    timeFormat: ETimeFormat.WEEK
  },
  {
    label: 'month',
    timeFormat: ETimeFormat.MONTH
  },
  {
    label: 'year',
    timeFormat: ETimeFormat.YEAR
  },
  {
    label: 'custom date',
    timeFormat: ETimeFormat.CUSTOM_DATE_RANGE
  },
]

export const DEFAULT_TRACKER: ITracker = {
  id: v4(),
  userId: '',
  name: '',
  description: '',
  habits: [],
  timeFormat: null,
  timeFormatOptions: {
    startDate: null,
    endDate: null
  },
  legend: [],
  timeData: []
}

export const PREDEFINED_LEGEND_ARRAY: ILegend[] = [
  {
    id: v4(),
    status: 'completed',
    color: '#BEDB39',
    selected: false,
    predefined: true
  },
  {
    id: v4(),
    status: 'incomplete',
    color: '#00A388',
    selected: false,
    predefined: true
  }
]
