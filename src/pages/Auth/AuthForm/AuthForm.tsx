import React, { useCallback, useContext } from 'react'
import './AuthForm.scss'
import { Input } from '../../../components/Input/Input'
import { Button } from '../../../components/Button/Button'
import { AlertContext } from '../../../context/AlertContext'
import { IAuth } from '../../../interfaces'
interface IAuthFormProps {
  title: string
  inputValue: IAuth
  setInputValue: React.Dispatch<React.SetStateAction<IAuth>>
  onClick: () => void
  isRegister?: boolean
  onNavigate?: () => void
}

export const AuthForm: React.FC<IAuthFormProps> = ({ title, inputValue, setInputValue, onClick, isRegister, onNavigate }) => {
  const { setErrorMessage } = useContext(AlertContext)

  const handleInputOnChange = useCallback((value: string, name: string) => {
    setInputValue(inputValue => {
      return {
        ...inputValue,
        [name]: value
      }
    })

    setErrorMessage('')
  }, [setInputValue, setErrorMessage])

  return (
    <div className='auth-form'>
      <div className='auth-form__title'>
        {title}
      </div>

      {isRegister && (
        <Input
          value={inputValue.name || ''}
          name='name'
          onChange={handleInputOnChange}
          label='name'
        />
      )}

      <Input
        value={inputValue.email}
        name='email'
        onChange={handleInputOnChange}
        label='email'
        autoFocus
      />

      <Input
        value={inputValue.password}
        name='password'
        onChange={handleInputOnChange}
        label='password'
        type='password'
      />

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