import React, { useContext, useEffect, useMemo, useState } from 'react'
import './ProfileHeader.scss'
import { UserContext } from '../../context/UserContext'
import { uniqueId } from 'lodash'
import { checkIfImageExists } from '../../utilities'

interface IProfileHeaderProps {}

export const ProfileHeader: React.FC<IProfileHeaderProps> = () => {
    const { user } = useContext(UserContext)

    const [ imageExist, setImageExist ] = useState(false)

    const imageUrl = useMemo(() => `${process.env.REACT_APP_BASE_URL}/images/${user?.id}.jpg?a=${uniqueId()}`, [user])

    useEffect(() => {
        checkIfImageExists(imageUrl, setImageExist)
    }, [imageUrl, setImageExist])

    if (!user) return <></>

    return (
        <div className='profile-header'>
            <div className='profile-header__container'>
                <div className="profile-header__avatar">
                    {imageExist &&
                        <img
                            className="profile-header__avatar-img"
                            src={imageUrl}
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