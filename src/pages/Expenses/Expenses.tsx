import React, { useCallback, useContext } from 'react'
import './Expenses.scss'
import { ExpenseContext } from '../../context/ExpenseContext'
import { ExpenseCard } from '../../components/ExpenseCard/ExpenseCard'

interface IExpensesProps {}

export const Expenses: React.FC<IExpensesProps> = () => {
    const { expenseData } = useContext(ExpenseContext)

    return (
        <div className='expenses'>
            <div className='expenses__list'>
                {expenseData && expenseData.map(expense => {
                    return (
                        <ExpenseCard
                            key={expense.id}
                            date={expense.date}
                            title={expense.title}
                            description={expense.description}
                            category={expense.category}
                            amount={expense.amount}
                            frequency={expense.frequency}
                        />
                    )
                })}
            </div>
        </div>
    )
}