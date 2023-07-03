import React, { useCallback } from "react"
import './Dashboard.scss'
import { Button } from "../../components/Button/Button"
import { BalanceCard } from "../../components/BalanceCard/BalanceCard"
import { ERoute } from "../../constants"
import { useNavigate } from "react-router-dom"

interface IDashboardProps {}

export const Dashboard: React.FC<IDashboardProps> = () => {
    const navigate = useNavigate()

    const handleNavigateToForm = useCallback((route: ERoute) => {
        return () => navigate(route)
    }, [navigate])

    return (
        <div className="dashboard">
            <div className="dashboard__cards">
                <BalanceCard title='balance' amount={4500} />
                <BalanceCard title='expenses' amount={1400} />
                <BalanceCard title='income' amount={2400} />
            </div>

            <div className="footer">
                <Button label='create new expense' onClick={handleNavigateToForm(ERoute.NEW_EXPENSE)} />
            </div>
        </div>
    )
}