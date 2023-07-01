import React, { useContext } from 'react'
import './LandingPage.scss'
import { Button } from '../../components/Button/Button'
import { EPopup } from '../../constants'
import { Popup } from '../../components/Popup/Popup'
import { LoginForm } from '../../components/Form/LoginForm/LoginForm'
import { FormContext } from '../../context/FormContext'
import { RegistrationForm } from '../../components/Form/RegistrationForm/RegistrationForm'

interface ILandingPageProps {}

export const LandingPage: React.FC<ILandingPageProps> = () => {
    const { openPopup, handleOpenPopup } = useContext(FormContext)

    return (
        <div className='landing-page'>
            <div className='landing-page__title'>Welcome to the Expense Tracker</div>

            <div className="footer">
                <Button label='login' onClick={handleOpenPopup(EPopup.LOGIN)} />
                <Button label='register' onClick={handleOpenPopup(EPopup.REGISTER)} />
            </div>

            {openPopup === EPopup.LOGIN &&
                <Popup>
                    <LoginForm />
                </Popup>
            }

            {openPopup === EPopup.REGISTER &&
                <Popup>
                    <RegistrationForm />
                </Popup>
            }
        </div>
    )
}