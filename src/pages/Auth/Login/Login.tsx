import React, { useCallback, useContext, useState } from 'react'
import '../Auth.scss'
import { AlertContext } from '../../../context/AlertContext'
import { IAuth, IUser } from '../../../interfaces'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../api/users'
import { checkCodeStatus } from '../../../utilities'
import { UserContext } from '../../../context/UserContext'
import { DEFAULT_AUTH_OBJECT, ERoute, EStatus } from '../../../constants'
import { AuthForm } from '../AuthForm/AuthForm'

interface ILoginProps {}

export const Login: React.FC<ILoginProps> = () => {
  const { handleToast, setErrorMessage } = useContext(AlertContext)
  const { setUser } = useContext(UserContext)

  const [ inputValue, setInputValue ] = useState<IAuth>(DEFAULT_AUTH_OBJECT)

  const navigate = useNavigate()

  const handleSubmitForm = useCallback(() => {
    login(inputValue)
      .then(checkCodeStatus<IUser>(setUser, setErrorMessage))
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))

        handleToast(EStatus.SUCCESS, "Login successful.")
        navigate(ERoute.DASHBOARD)
      })
      .catch(console.error)
  }, [inputValue, navigate, setUser, setErrorMessage, handleToast])

  const handleNavigateToRegister = useCallback(() => {
    navigate(ERoute.REGISTER)
  }, [navigate])

  return (
    <div className='auth'>
      <AuthForm
        onClick={handleSubmitForm}
        setInputValue={setInputValue}
        inputValue={inputValue}
        onNavigate={handleNavigateToRegister}
      />
    </div>
  )
}