import React, { useCallback, useState } from 'react'
import { Form } from '../Form'
import { Input } from '../../Input/Input'
import { IRegister, IUser } from '../../../interfaces'

interface IRegistrationFormProps {}

export const RegistrationForm: React.FC<IRegistrationFormProps> = () => {
    const [ user, setUser ] = useState<IUser>()
    const [ inputValue, setInputValue ] = useState<IRegister>({
        email: '',
        password: '',
        name: ''
    })

    const handleInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(inputValue => {
            return {
                ...inputValue,
                [e.target.name]: e.target.value
            }
        })
    }, [setInputValue])

    const handleSubmitForm = useCallback(() => {
        // here comes register(...)
    }, [])

    return (
        <Form title="You don't have a profile? Register here." onClick={handleSubmitForm}>
            <Input
                value={inputValue.email}
                name='email'
                placeholder="test@test.com"
                onChange={handleInputOnChange}
                label='email:'
                autoFocus
            />

            <Input
                value={inputValue.password}
                name='password'
                onChange={handleInputOnChange}
                label='password:'
            />

            <Input
                value={inputValue.name}
                name='name'
                placeholder="John Smith"
                onChange={handleInputOnChange}
                label='name:'
            />
        </Form>
    )
}