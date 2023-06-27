import { uniqueId } from "lodash"
import { ITable } from "./interfaces"

export enum ERoute {
    DASHBOARD = '/',
    EXPENSES = 'expenses',
    BUDGETING = 'budgeting',
    SETTINGS = 'settings'
}

export const MONTH_LIST = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export enum ETableSize {
    SMALL = 'small',
    BIG = 'big'
}

export enum ETableDataType {
    INCOME = 'income',
    SUMMARY = 'summary',
    PERCENTAGE = 'percentage',
    BILLS = 'bills',
    DEBT = 'debt',
    EXPENSES = 'expenses',
    INVESTEMENTS = 'investements',
    SAVINGS = 'savings'
}

export enum EExpenseType {
    NEEDS = 'needs',
    WANTS = 'wants'
}

export enum ETableRowType {
    HEADER = 'header',
    DATA = 'data',
    TOTAL = 'total'
}

export const DEFAULT_SMALL_TABLE_SIZE = 3
export const DEFAULT_BIG_TABLE_SIZE = 4

export const TABLE_DATA: ITable[] = [
    {
        id: uniqueId(ETableDataType.INCOME),
        title: ETableDataType.INCOME,
        headers: ['income', 'expected', 'actual'],
        size: ETableSize.SMALL,
        items: [
            {
                id: uniqueId('1'),
                values: ['needs', 530, 580]
            },
            {
                id: uniqueId('2'),
                values: ['wants', 200, 180]
            },
            {
                id: uniqueId('3'),
                values: ['savings', 530, 580]
            }
        ]
    },
    // {
    //     title: ETableDataType.SUMMARY,
    //     headers: ['summary', 'budget', 'actual'],
    //     size: ETableSize.SMALL,
    //     items: []
    // },
    // {
    //     title: ETableDataType.PERCENTAGE,
    //     headers: ['type', '%', 'budget'],
    //     size: ETableSize.SMALL,
    //     items: []
    // },
    {
        id: uniqueId(ETableDataType.BILLS),
        title: ETableDataType.BILLS,
        headers: ['bills', 'budget', 'actual', 'type'],
        size: ETableSize.BIG,
        items: [
            {
                id: uniqueId('4'),
                values: ['needs', 530, 580, EExpenseType.NEEDS]
            },
            {
                id: uniqueId('5'),
                values: ['wants', 200, 180, EExpenseType.WANTS]
            },
            {
                id: uniqueId('6'),
                values: ['savings', 530, 580, EExpenseType.NEEDS]
            }
        ]
    },
    // {
    //     title: ETableDataType.DEBT,
    //     headers: ['debt', 'budget', 'actual', 'type'],
    //     size: ETableSize.BIG,
    //     items: []
    // },
    // {
    //     title: ETableDataType.EXPENSES,
    //     headers: ['expenses', 'budget', 'actual', 'type'],
    //     size: ETableSize.BIG,
    //     items: []
    // },
    // {
    //     title: ETableDataType.INVESTEMENTS,
    //     headers: ['investements', 'budget', 'actual', 'type'],
    //     size: ETableSize.BIG,
    //     items: []
    // },
    // {
    //     title: ETableDataType.SAVINGS,
    //     headers: ['savings', 'budget', 'actual', 'type'],
    //     size: ETableSize.BIG,
    //     items: []
    // }
]

export const DEFAULT_BIG_DATA: ITable = {
    id: '',
    title: '',
    headers: [],
    size: ETableSize.BIG,
    items: [
        {
            id: '',
            values: ['', '', '', '']
        }
    ]
}

export const DEFAULT_SMALL_DATA: ITable = {
    id: '',
    title: '',
    headers: [],
    size: ETableSize.SMALL,
    items: [
        {
            id: '',
            values: ['', '', '']
        }
    ]
}

export enum EFieldType {
    TEXT = 'text',
    INPUT = 'input',
    DROPDOWN = 'dropdown'
}