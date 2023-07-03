import React, { useCallback } from 'react'
import './LandingPage.scss'
import { Button } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { ERoute } from '../../constants'

interface ILandingPageProps {}

export const LandingPage: React.FC<ILandingPageProps> = () => {
    const navigate = useNavigate()

    const handleNavigateToForm = useCallback((route: ERoute) => {
        return () => navigate(route)
    }, [navigate])

    return (
        <div className='landing-page'>
            <div className='landing-page__title'>Welcome to the Expense Tracker</div>

            <div className="footer">
                <Button label='login' onClick={handleNavigateToForm(ERoute.LOGIN)} />
                <Button label='register' onClick={handleNavigateToForm(ERoute.REGISTER)} />
            </div>
        </div>
    )
}