import React, { useCallback } from 'react'
import './FormFooter.scss'
import { ERoute } from '../../../constants'
import { useNavigate } from 'react-router-dom'

interface IFormFooterProps {
    text: string
    link: string
    route: ERoute
}

export const FormFooter: React.FC<IFormFooterProps> = ({ text, link, route }) => {
    const navigate = useNavigate()

    const handleNavigate = useCallback(() => {
        navigate(route)
    }, [navigate])

    return (
        <div className='form-footer'>
            {text}

            <span
                className='form-footer__link'
                onClick={handleNavigate}
            >
                {link}
            </span>
        </div>
    )
}