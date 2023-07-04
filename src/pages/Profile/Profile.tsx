import React, { useContext, useEffect } from "react"
import './Profile.scss'
import { UserContext } from "../../context/UserContext"
import { Tab } from "../../components/Tab/Tab"
import { ERoute } from "../../constants"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

interface IProfileProps {}

export const Profile: React.FC<IProfileProps> = () => {
    const { user } = useContext(UserContext)

    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname === ERoute.PROFILE) {
            navigate(ERoute.SETUP)
        }
    }, [pathname, navigate])

    if (!user) return <></>

    return (
        <div className="profile">
            <div className="profile__header">
                <div className="profile__avatar">
                    {user.data && user.data.avatar && 
                        <img className="profile__avatar-img" src={URL.createObjectURL(user.data.avatar)} alt="Avatar" />
                    }
                </div>

                <div>
                    <div className="profile__name profile__text">{user.name}</div>
                    <div className="profile__email profile__text">{user.email}</div>
                </div>
            </div>

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