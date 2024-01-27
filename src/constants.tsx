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

export enum ETrackerType {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  CUSTOM_DATE_RANGE = 'custom-date-range'
}

export const TRACKER_OPTIONS: ISelectorOption[] = [
  {
    label: 'Weekly',
    value: ETrackerType.WEEKLY,
  },
  {
    label: 'Monthly',
    value: ETrackerType.MONTHLY,
  },
  {
    label: 'Yearly',
    value: ETrackerType.YEARLY,
  },
  {
    label: 'Custom date range',
    value: ETrackerType.CUSTOM_DATE_RANGE,
  },
]

export const DAYS_IN_WEEK = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]

export const CURRENT_DATE: IDateObject = convertDate(new Date())

export const DEFAULT_DATE_NOW: IDateObject = {
  day: CURRENT_DATE.day,
  month: CURRENT_DATE.month,
  year: CURRENT_DATE.year
}

export const DEFAULT_TRACKER: ITracker = {
  startDate: DEFAULT_DATE_NOW,
  endDate: DEFAULT_DATE_NOW,
  type: TRACKER_OPTIONS[0],
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
