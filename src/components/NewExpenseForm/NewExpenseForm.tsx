import React, { useCallback, useContext, useState } from "react"
import './NewExpenseForm.scss'
import { Input } from "../Input/Input"
import { IExpense } from "../../interfaces"
import { DEFAULT_EXPENSE } from "../../constants"
import { Button } from "../Button/Button"
import { ExpenseContext } from "../../context/ExpenseContext"
import { uniqueId } from "lodash"

interface INewExpenseFormProps {}

export const NewExpenseForm: React.FC<INewExpenseFormProps> = () => {
    const { setExpenseData, setIsPopupOpen } = useContext(ExpenseContext)

    const [ inputValue, setInputValue ] = useState<IExpense>(DEFAULT_EXPENSE)

    const handleInputOnChange = useCallback((value: string | number, name: string) => {
        setInputValue(inputValue => {
            return {
                ...inputValue,
                id: uniqueId(),
                [name]: value
            }
        })
    }, [setInputValue])

    const handleSubmitForm = useCallback(() => {
        setExpenseData(expenseData => {
            return [
                ...expenseData,
                inputValue
            ]
        })

        setIsPopupOpen(false)
    }, [setExpenseData, inputValue, setIsPopupOpen])

    return (
        <div className="new-expense-form">
            <div className="new-expense-form__title">Create your new expanse tracker card.</div>

            <Input
                value={inputValue.category}
                name='category'
                maxLength={12}
                placeholder="#important"
                onChange={handleInputOnChange}
                label='category'
            />

            <Input
                value={inputValue.title}
                name='title'
                maxLength={12}
                placeholder="Bills"
                onChange={handleInputOnChange}
                label='title'
            />

            <Input
                value={inputValue.description}
                name='description'
                maxLength={88}
                placeholder="electricity, water and greenery"
                onChange={handleInputOnChange}
                label='description'
            />

            <Input
                value={inputValue.amount || ''}
                name='amount'
                maxLength={25}
                placeholder="220"
                onChange={handleInputOnChange}
                label='amount'
            />

            <Input
                value={inputValue.date}
                name='date'
                maxLength={25}
                placeholder="31.07.1996."
                onChange={handleInputOnChange}
                label='date'
            />

            <div className="new-expense-form__button">
                <Button label="submit" onClick={handleSubmitForm} />
            </div>
        </div>
    )
}