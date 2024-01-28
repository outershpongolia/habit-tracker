import { IDateObject, IMonthObject, ITracker, ISelectorOption } from "./interfaces"
import { convertDate } from "./utilities"

export enum ERoute {
  DASHBOARD = '/',
  CREATE_TRACKER = '/create-tracker',
  LOGIN = '/login',
  REGISTER = '/register'
}

export enum EStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export enum ETimeFormat {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  CUSTOM_DATE_RANGE = 'custom-date-range'
}

export const TIME_FORMAT_OPTIONS: ISelectorOption[] = [
  {
    label: 'Week',
    value: ETimeFormat.WEEK,
  },
  {
    label: 'Month',
    value: ETimeFormat.MONTH,
  },
  {
    label: 'Year',
    value: ETimeFormat.YEAR,
  },
  {
    label: 'Custom date range',
    value: ETimeFormat.CUSTOM_DATE_RANGE,
  },
]

// maybe remove this
export const DAYS_IN_WEEK = [
  {
    label: 'Monday',
    value: 'monday'
  },
  {
    label: 'Tuesday',
    value: 'tuesday'
  },
  {
    label: 'Wednesday',
    value: 'wednesday'
  },
  {
    label: 'Thursday',
    value: 'thursday'
  },
  {
    label: 'Friday',
    value: 'friday'
  },
  {
    label: 'Saturday',
    value: 'saturday'
  },
  {
    label: 'Sunday',
    value: 'sunday'
  }
]

export const CURRENT_DATE: IDateObject = convertDate(new Date())

export const DEFAULT_DATE_NOW: IDateObject = {
  day: CURRENT_DATE.day,
  month: CURRENT_DATE.month,
  year: CURRENT_DATE.year
}

export const DEFAULT_TRACKER: ITracker = {
  id: '',
  timeFormat: ETimeFormat.WEEK,
  timeFormatOptions: null
}

export const MONTH_LIST: IMonthObject[] = [
  {
    label: "January",
    value: 1,
    numberOfDays: 31
  },
  {
    label: "February",
    value: 2,
    numberOfDays: 28
  },
  {
    label: "March",
    value: 3,
    numberOfDays: 31
  },
  {
    label: "April",
    value: 4,
    numberOfDays: 30
  },
  {
    label: "May",
    value: 5,
    numberOfDays: 31
  },
  {
    label: "June",
    value: 6,
    numberOfDays: 30
  },
  {
    label: "July",
    value: 7,
    numberOfDays: 31
  },
  {
    label: "August",
    value: 8,
    numberOfDays: 31
  },
  {
    label: "September",
    value: 9,
    numberOfDays: 30
  },
  {
    label: "October",
    value: 10,
    numberOfDays: 31
  },
  {
    label: "November",
    value: 11,
    numberOfDays: 30
  },
  {
    label: "December",
    value: 12,
    numberOfDays: 31
  }
]
