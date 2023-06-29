import React, { PropsWithChildren, createContext, useCallback, useState } from 'react'
import { noop } from 'lodash'
import { EXPENSES_LIST } from '../constants'
import { IExpense } from '../interfaces'

interface IExpenseContextProps {
    expenseData: IExpense[]
    setExpenseData: React.Dispatch<React.SetStateAction<IExpense[]>>
    isPopupOpen: boolean
    setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ExpenseContext = createContext<IExpenseContextProps>({
    expenseData: EXPENSES_LIST,
    setExpenseData: noop,
    isPopupOpen: false,
    setIsPopupOpen: noop
})

export const ExpenseContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [ expenseData, setExpenseData ] = useState<IExpense[]>(EXPENSES_LIST)
    const [ isPopupOpen, setIsPopupOpen ] = useState(false)

    return (
        <ExpenseContext.Provider
            value={{
                expenseData,
                setExpenseData,
                isPopupOpen,
                setIsPopupOpen
            }}
        >
            {children}
        </ExpenseContext.Provider>
    )
}