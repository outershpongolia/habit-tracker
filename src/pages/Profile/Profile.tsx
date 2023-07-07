import React, { useContext, useEffect } from "react"
import './Profile.scss'
import { UserContext } from "../../context/UserContext"
import { Tab } from "../../components/Tab/Tab"
import { ERoute } from "../../constants"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader"

interface IProfileProps {}

export const Profile: React.FC<IProfileProps> = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname === ERoute.PROFILE) {
            navigate(ERoute.SETUP)
        }
    }, [pathname, navigate])

    return (
        <div className="profile">
            <ProfileHeader />

            <div className="profile__tabs">
                <Tab label="profile setup" route={ERoute.SETUP}/>
                <Tab label="general" route={ERoute.GENERAL}/>
                <Tab label="user info" route={ERoute.INFO}/>
                <Tab label="security" route={ERoute.SECURITY}/>
            </div>

            <div className="profile__wrapper">
                <Outlet />
            </div>

            
        </div>
    )
}