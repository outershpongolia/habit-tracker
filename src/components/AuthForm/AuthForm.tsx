import React, { useCallback, useContext, useState } from 'react'
import './AuthForm.scss'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { AlertContext } from '../../context/AlertContext'
import { IAuth } from '../../interfaces'
import { useNavigate } from 'react-router-dom'
import { ERoute } from '../../constants'

interface IAuthFormProps {
  inputValue: IAuth
  setInputValue: React.Dispatch<React.SetStateAction<IAuth>>
  onClick: () => void
  isRegister?: boolean
  onNavigate?: () => void
}

export const AuthForm: React.FC<IAuthFormProps> = ({ inputValue, setInputValue, onClick, isRegister, onNavigate }) => {
  const { setErrorMessage } = useContext(AlertContext)

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

  return (
    <div className='auth-form'>
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

      {isRegister && (
        <Input
          value={inputValue.name}
          name='name'
          placeholder="John Smith"
          onChange={handleInputOnChange}
          label='name:'
        />
      )}

      <div className='auth-form__buttons'>
        {!isRegister && (
          <div className='auth-form__text'>
            Don't have an account?

            <span
              className='auth-form__span'
              onClick={onNavigate}
            >
              Register here.
            </span>
          </div>
        )}

        <Button label='Submit' onClick={onClick} />
      </div>
    </div>
  )
}