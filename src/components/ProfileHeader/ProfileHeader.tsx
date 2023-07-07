import React, { useCallback, useContext } from 'react'
import './ProfileHeader.scss'
import { UserContext } from '../../context/UserContext'
import { ImExit } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { ERoute } from '../../constants'

interface IProfileHeaderProps {}

export const ProfileHeader: React.FC<IProfileHeaderProps> = () => {
    const { user } = useContext(UserContext)

    const navigate = useNavigate()

    const handleNavigate = useCallback(() => {
        navigate(ERoute.DASHBOARD)
    }, [navigate])

    if (!user) return <></>

    return (
        <div className='profile-header'>
            <div className='profile-header__container'>
                <div className="profile-header__avatar">
                    {user.data && user.data.avatar && 
                        <img
                            className="profile-header__avatar-img"
                            src={URL.createObjectURL(user.data.avatar)}
                            alt="Avatar"
                        />
                    }
                </div>

                <div>
                    <div className="profile-header__name">{user.name}</div>
                    <div className="profile-header__email">{user.email}</div>
                </div>
            </div>

            <div className='profile-header__container'>
                <ImExit className='profile-header__icon' onClick={handleNavigate} />
            </div>
        </div>
    )
}