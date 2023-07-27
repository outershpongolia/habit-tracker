import React, { PropsWithChildren } from 'react'
import './ProfileSetup.scss'
import { MdMoreHoriz } from 'react-icons/md'

interface IProfileSetupProps extends PropsWithChildren {
    title: string
    description: string
    type?: string
}

export const ProfileSetup: React.FC<IProfileSetupProps> = ({ title, description, type, children }) => {
    return (
        <div className={`profile-setup profile-setup_${type}`}>
            <div className='profile-setup__header'>
                <div className='profile-setup__title'>
                    {title}

                    <MdMoreHoriz className='more-icon' onClick={() => null} />
                </div>

                <div className='profile-setup__text'>
                    {description}
                </div>
            </div>

            {children}
        </div>
    )
}