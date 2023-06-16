import React from "react"
import { MonthItem } from "../../components/MonthItem/MonthItem"
import { ERoute, MONTH_LIST } from "../../constants"

import './LandingPage.scss'

interface ILandingPageProps {}

export const LandingPage: React.FC<ILandingPageProps> = () => {
    return (
        <div className="landing-page">
            <div className="landing-page__wrapper">
                {MONTH_LIST.map(month => <MonthItem month={month} route={ERoute.TRACKER_PAGE} />)}
            </div>
        </div>
    )
}