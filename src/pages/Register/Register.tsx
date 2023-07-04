import React, { useCallback, useContext, useState } from 'react'
import { Form } from '../../components/Form/Form'
import { Input } from '../../components/Input/Input'
import { IRegister, IUser } from '../../interfaces'
import { DEFAULT_REGISTRATION_FORM, ERoute, EStatus } from '../../constants'
import { register } from '../../api/users'
import { checkCodeStatus } from '../../utilities'
import { useNavigate } from 'react-router-dom'
import { AlertContext } from '../../context/AlertContext'
import { FormFooter } from '../../components/Form/FormFooter/FormFooter'
import { UserContext } from '../../context/UserContext'

interface IRegisterProps {}

export const Register: React.FC<IRegisterProps> = () => {
    const { handleToast, errorMessage, setErrorMessage } = useContext(AlertContext)
    const { setUser } = useContext(UserContext)

    const [ inputValue, setInputValue ] = useState<IRegister>(DEFAULT_REGISTRATION_FORM)

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
        register(inputValue)
            .then(
                checkCodeStatus<IUser>(setUser, setErrorMessage)
            )
            .then(res => {
                console.log('STATUS', res.status)
                if (res.status === 'error') {
                    handleToast(EStatus.ERROR, res.message)
                    return
                }
                handleToast(EStatus.SUCCESS, "Registration completed.")
                navigate(ERoute.DASHBOARD)
            })
            .catch(console.error)
    }, [inputValue, navigate, setUser, setErrorMessage, handleToast])

    return (
        <div className='form-page'>
            <Form title="You don't have a profile? Register here." onClick={handleSubmitForm} error={errorMessage && errorMessage}>
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

            <FormFooter text="Already have an account?" link="Log in here." route={ERoute.LOGIN}  />
        </div>
    )
}