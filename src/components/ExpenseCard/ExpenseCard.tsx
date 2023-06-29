import React from "react"
import './ExpenseCard.scss'

interface IExpenseCardProps {
    date: string
    title: string
    description: string
    category: string
    amount: number
    frequency: string
}

export const ExpenseCard: React.FC<IExpenseCardProps> = ({ date, title, description, category, amount, frequency }) => {
    return (
        <div className="expense-card">
            <div className="expense-card__row">
                <div className="expense-card__icon" />

                <div className="expense-card__text">{date}</div>
            </div>

            <div className="expense-card__row expense-card__main">
                <div className="expense-card__frequency">{frequency}</div>

                <div className="expense-card__title">{title}</div>

                <div className="expense-card__text expense-card__description">{description}</div>
            </div>

            <div className="expense-card__row">
                <div className="expense-card__amount">${amount}</div>

                <div className="expense-card__text">#{category}</div>
            </div>
        </div>
    )
}