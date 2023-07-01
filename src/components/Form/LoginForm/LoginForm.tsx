import React, { useCallback, useState } from 'react'
import { Input } from '../../Input/Input'
import { ILogin, IUser } from '../../../interfaces'
import { login } from '../../../api/users'
import { checkCodeStatus } from '../../../utilities'
import { Form } from '../Form'
import { useNavigate } from 'react-router-dom'
import { ERoute } from '../../../constants'

interface ILoginProps {}

export const LoginForm: React.FC<ILoginProps> = () => {
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ user, setUser ] = useState<IUser>()
    const [ inputValue, setInputValue ] = useState<ILogin>({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(inputValue => {
            return {
                ...inputValue,
                [e.target.name]: e.target.value
            }
        })

        setErrorMessage('')
    }, [setInputValue])

    const handleSubmitForm = useCallback(() => {
        login(inputValue)
            .then(
                checkCodeStatus<IUser>(setUser, setErrorMessage)
            )
            .then((res) => {
                console.log({res})
                if (res.status === 'error') return
                navigate(ERoute.DASHBOARD)
            })
            .catch(console.error)
    }, [inputValue, setErrorMessage, navigate])

    return (
        <Form title="Login to your account." onClick={handleSubmitForm} error={errorMessage && errorMessage}>
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
        </Form>
    )
}