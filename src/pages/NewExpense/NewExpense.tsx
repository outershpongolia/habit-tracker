import React, { useCallback, useContext, useState } from "react"
import { Input } from "../../components/Input/Input"
import { IExpense } from "../../interfaces"
import { DEFAULT_EXPENSE, ERoute, EStatus } from "../../constants"
import { ExpenseContext } from "../../context/ExpenseContext"
import { uniqueId } from "lodash"
import { Form } from "../../components/Form/Form"
import { AlertContext } from "../../context/AlertContext"
import { FormFooter } from "../../components/Form/FormFooter/FormFooter"

interface INewExpenseProps {}

export const NewExpense: React.FC<INewExpenseProps> = () => {
    const { setExpenseData } = useContext(ExpenseContext)
    const { handleToast } = useContext(AlertContext)

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

        handleToast(EStatus.SUCCESS, 'New expense created.')
    }, [setExpenseData, inputValue, handleToast])

    return (
        <div className="form-page">
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

            <FormFooter text="Return to" link="dashboard." route={ERoute.DASHBOARD} />
        </div>
    )
}