import { uniqueId } from "lodash"
import { IExpense } from "./interfaces"

export enum ERoute {
    LANDING_PAGE = '/',
    DASHBOARD = '/dashboard',
    EXPENSES = '/expenses',
    BUDGETING = '/budgeting',
    SETTINGS = '/settings',
    LOGIN = '/login',
    REGISTER = '/register',
    NEW_EXPENSE = '/new-expense',
    PROFILE = '/profile'
}

export enum EStatus {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
}

export const DEFAULT_LOGIN_FORM = {
    email: '',
    password: ''
}

export const DEFAULT_REGISTRATION_FORM = {
    ...DEFAULT_LOGIN_FORM,
    name: ''
}

export const MONTH_LIST = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const DEFAULT_EXPENSE: IExpense = {
    id: '',
    category: '',
    title: '',
    description: '',
    icon: '',
    frequency: '',
    date: '',
    amount: 0,
}

export const EXPENSES_LIST: IExpense[] = [
    {
        id: uniqueId(),
        category: 'important',
        title: 'bills',
        description: 'pay every month',
        amount: 50,
        icon: '',
        frequency: 'monthly',
        date: '12.09.2023.'
    },
    {
        id: uniqueId(),
        category: 'personal wishes',
        title: 'trip',
        description: 'lets go traveling around the world!',
        amount: 100,
        icon: '',
        frequency: 'yearly',
        date: '03.01.2024.'
    },
    {
        id: uniqueId(),
        category: 'life',
        title: 'food',
        description: 'meet, vegetables, fruit, fish...',
        amount: 200,
        icon: '',
        frequency: 'weekly',
        date: '14.07.2023.'
    }
]
