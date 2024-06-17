import React, { useCallback, useContext, useState } from 'react'
import '../Auth.scss'
import { AlertContext } from '../../../context/AlertContext'
import { IAuth, IUser } from '../../../interfaces'
import { useNavigate } from 'react-router-dom'
import { register } from '../../../api/users'
import { checkCodeStatus } from '../../../utilities'
import { UserContext } from '../../../context/UserContext'
import { DEFAULT_AUTH_OBJECT, ERoute, EStatus } from '../../../constants'
import { AuthForm } from '../../../components/AuthForm/AuthForm'

interface IRegisterProps {}

export const Register: React.FC<IRegisterProps> = () => {
  const { handleToast, setErrorMessage } = useContext(AlertContext)
  const { setUser } = useContext(UserContext)

  const [ inputValue, setInputValue ] = useState<IAuth>(DEFAULT_AUTH_OBJECT)

  const navigate = useNavigate()

  const handleSubmitForm = useCallback(() => {
    register(inputValue)
      .then(checkCodeStatus<IUser>(setUser, setErrorMessage))
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))

        handleToast(EStatus.SUCCESS, "Registration completed.")
        navigate(ERoute.DASHBOARD)
      })
      .catch(console.error)
  }, [inputValue, navigate, setUser, setErrorMessage, handleToast])

  return (
    <div className='auth'>
      <AuthForm
        onClick={handleSubmitForm}
        setInputValue={setInputValue}
        inputValue={inputValue}
        isRegister
      />
    </div>
  )
}