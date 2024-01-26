import { IDateObject, IInputData, IMonthObject, ITracker } from "./interfaces"
import { convertDate } from "./utilities"

export enum ERoute {
    DASHBOARD = '/',
    DASHBOARD_CONFIG = '/dashboard-config',
    LOGIN = '/login',
    REGISTER = '/register',
    // EXPENSES = '/expenses',
    // BUDGETING = '/budgeting',
    // SETTINGS = '/settings',
    // NEW_EXPENSE = '/new-expense',
    // PROFILE = '/profile',
    // SETUP = 'setup',
    // GENERAL = 'general',
    // INFO = 'info',
    // SECURITY = 'security',
}

export enum EStatus {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
}

export const CURRENT_DATE: IDateObject = convertDate(new Date())

export const DEFAULT_DATE_NOW: IDateObject = {
    day: CURRENT_DATE.day,
    month: CURRENT_DATE.month,
    year: CURRENT_DATE.year
}

export const DEFAULT_TRACKER: ITracker = {
    startDate: DEFAULT_DATE_NOW,
    endDate: DEFAULT_DATE_NOW
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

{/* remove this */}
export const EMPTY_INPUT_DATA: IInputData = {
    newName: '',
    email: '',
    // currency: null,
    category: '',
    totalBalance: 0,
    totalIncome: 0
}
