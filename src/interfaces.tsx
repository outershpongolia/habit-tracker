export interface IExpense {
    id: string
    category: string
    title: string
    amount: number
    date: string
    description: string
    frequency?: string
    icon?: string
}

export interface ILogin {
    email: string
    password: string
}

export interface IRegister {
    email: string
    password: string
    name: string
}

export interface IUser {
    _id: string
    id: string
    email: string
    name: string
    data: IUserData
}

export interface IUserData {
    categories: string[]
    currency: ICurrency
    totalBalance: number
    totalIncome: number
    totalExpenses: number
    avatar?: File | null
}

export interface IInputData {
    avatar: File | null
    currency: ICurrency | null
    category: string
    totalBalance: number
    totalIncome: number
}

export interface ICurrency {
    code: string
    name: string
    symbol: string
    decimalPlaces: number
    decimalSeparator: string
    thousandSeparator: string
    symbolPlacement: string
    negativePattern: string
}

export interface IUpload {
    userId: string
    files: string
}
