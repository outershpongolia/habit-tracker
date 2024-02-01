import React, { useCallback, useContext, useState } from 'react'
import './Register.scss'
import { AlertContext } from '../../context/AlertContext'
import { IAuth, IUser } from '../../interfaces'
import { useNavigate } from 'react-router-dom'
import { register } from '../../api/users'
import { checkCodeStatus } from '../../utilities'
import { UserContext } from '../../context/UserContext'
import { Input } from '../../components/Input/Input'
import { DEFAULT_AUTH_OBJECT, ERoute, EStatus } from '../../constants'
import { Button } from '../../components/Button/Button'

interface IRegisterProps {}

export const Register: React.FC<IRegisterProps> = () => {
  const { handleToast, errorMessage, setErrorMessage } = useContext(AlertContext)
  const { setUser } = useContext(UserContext)

  const [ inputValue, setInputValue ] = useState<IAuth>(DEFAULT_AUTH_OBJECT) // put something default object

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
    <div className='register'>
        <Input
            value={inputValue.email}
            name='email'
            placeholder="test@test.com"
            onChange={handleInputOnChange}
            // label='email:'
            autoFocus
        />

        <Input
            value={inputValue.password}
            name='password'
            onChange={handleInputOnChange}
            // label='password:'
        />

        <Input
            value={inputValue.name}
            name='name'
            placeholder="John Smith"
            onChange={handleInputOnChange}
            // label='name:'
        />

        <Button label='Submit' onClick={handleSubmitForm} />
    </div>
  )
}