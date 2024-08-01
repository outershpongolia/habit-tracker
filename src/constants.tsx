import { v4 } from "uuid"
import { ITracker, ITable, IAuth, ILegendOptions } from "./interfaces"

export enum ERoute {
  DASHBOARD = '/',
  CREATE_TRACKER = '/create-tracker',
  REGISTER = '/register',
  LOGIN = '/login',
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

export const DAYS_IN_WEEK = [
  {
    label: 'Monday',
    value: 1
  },
  {
    label: 'Tuesday',
    value: 2
  },
  {
    label: 'Wednesday',
    value: 3
  },
  {
    label: 'Thursday',
    value: 4
  },
  {
    label: 'Friday',
    value: 5
  },
  {
    label: 'Saturday',
    value: 6
  },
  {
    label: 'Sunday',
    value: 7
  }
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
  legend: {
    selectedLegend: [],
    customLegend: []
  }
}

export const PREDEFINED_LEGEND_ARRAY: ILegendOptions[] = [
  {
    id: v4(),
    status: 'completed',
    color: '#BEDB39',
    predefined: true
  },
  {
    id: v4(),
    status: 'incomplete',
    color: '#00A388',
    predefined: true
  }
]

export const DEFAULT_TABLE_DATA: ITable = {
  labels: {
    horizontal: [],
    vertical: []
  },
  cells: []
}
