import React, { useContext } from 'react'
import './ProfileHeader.scss'
import { UserContext } from '../../context/UserContext'

interface IProfileHeaderProps {}

export const ProfileHeader: React.FC<IProfileHeaderProps> = () => {
    const { user } = useContext(UserContext)

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

            {/* <div className='profile-header__container'>
                
            </div> */}
        </div>
    )
}