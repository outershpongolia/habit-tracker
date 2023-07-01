import React, { useCallback, useContext, useState } from "react"
import { Input } from "../../Input/Input"
import { IExpense } from "../../../interfaces"
import { DEFAULT_EXPENSE } from "../../../constants"
import { ExpenseContext } from "../../../context/ExpenseContext"
import { uniqueId } from "lodash"
import { FormContext } from "../../../context/FormContext"
import { Form } from "../Form"

interface INewExpenseFormProps {}

export const NewExpenseForm: React.FC<INewExpenseFormProps> = () => {
    const { setExpenseData } = useContext(ExpenseContext)
    const { handleClosePopup } = useContext(FormContext)

    const [ inputValue, setInputValue ] = useState<IExpense>(DEFAULT_EXPENSE)

    const handleInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(inputValue => {
            return {
                ...inputValue,
                id: uniqueId(),
                [e.target.name]: e.target.value
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

        handleClosePopup()
    }, [setExpenseData, inputValue, handleClosePopup])

    return (
        <Form title="Create your new expanse tracker card." onClick={handleSubmitForm}>
            <Input
                value={inputValue.category}
                name='category'
                maxLength={12}
                placeholder="#important"
                onChange={handleInputOnChange}
                label='category'
                autoFocus
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
                value={inputValue.amount || ''}
                name='amount'
                maxLength={25}
                placeholder="$220"
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

            <Input
                value={inputValue.description}
                name='description'
                maxLength={88}
                placeholder="electricity, water and greenery"
                onChange={handleInputOnChange}
                label='description'
            />
        </Form>
    )
}