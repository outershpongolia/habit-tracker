import React, { useCallback, useContext, useState } from 'react'
import { Input } from '../../components/Input/Input'
import { ILogin, IUser } from '../../interfaces'
import { login } from '../../api/users'
import { Form } from '../../components/Form/Form'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_LOGIN_FORM, ERoute, EStatus } from '../../constants'
import { AlertContext } from '../../context/AlertContext'
import { FormFooter } from '../../components/Form/FormFooter/FormFooter'
import { UserContext } from '../../context/UserContext'

interface ILoginProps {}

export const Login: React.FC<ILoginProps> = () => {
    const { handleToast, errorMessage, setErrorMessage } = useContext(AlertContext)
    const { setUser } = useContext(UserContext)

    const [ inputValue, setInputValue ] = useState<ILogin>(DEFAULT_LOGIN_FORM)

    const navigate = useNavigate()

    const handleInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(inputValue => {
            return {
                ...inputValue,
                [e.target.name]: e.target.value
            }
        })

        setErrorMessage('')
    }, [setInputValue, setErrorMessage])

    const handleSubmitForm = useCallback(() => {
        login(inputValue)
            .then((res) => {
                if (res.status === 'error') {
                    handleToast(EStatus.ERROR, res.message)
                    setErrorMessage(res.message)
                    return
                }
                
                const userData: IUser = res.data
                localStorage.setItem('user', JSON.stringify(userData))
                setUser(userData)

                handleToast(EStatus.SUCCESS, 'Login successful.')
                navigate(ERoute.DASHBOARD)
            })
            .catch(console.error)
    }, [inputValue, navigate, setUser, handleToast, setErrorMessage])

    return (
        <div className='form-page'>
            <Form title="Login to your account." onClick={handleSubmitForm} error={errorMessage && errorMessage}>
                <Input
                    value={inputValue.email}
                    type='email'
                    name='email'
                    placeholder="test@test.com"
                    onChange={handleInputOnChange}
                    label='email:'
                    autoFocus
                />

                <Input
                    value={inputValue.password}
                    type='password'
                    name='password'
                    onChange={handleInputOnChange}
                    label='password:'
                />

            </Form>

            <FormFooter text="You don't have an account?" link="Create your account here." route={ERoute.REGISTER} />
        </div>
    )
}