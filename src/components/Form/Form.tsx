import React, { PropsWithChildren } from 'react'
import './Form.scss'
import { Button } from '../Button/Button'

interface IFormProps extends PropsWithChildren {
    title: string
    onClick: () => void
    error?: string
}

export const Form: React.FC<IFormProps> = ({ title, onClick, error, children }) => {
    return (
        <div className='form'>
            <div className="form__title">{title}</div>

            {children}

            {error &&
                <div>{error}</div>
            }

            <div className="form__button">
                <Button label="submit" onClick={onClick} />
            </div>
        </div>
    )
}