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
}

export interface IUpload {
    userId: string
    files: string
}