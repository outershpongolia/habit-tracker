import React, { useCallback, useContext } from "react"
import './Dashboard.scss'
import { Button } from "../../components/Button/Button"
import { BalanceCard } from "../../components/BalanceCard/BalanceCard"
import { ERoute } from "../../constants"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

interface IDashboardProps {}

export const Dashboard: React.FC<IDashboardProps> = () => {
    const { user } = useContext(UserContext)

    const navigate = useNavigate()

    const handleNavigateToForm = useCallback((route: ERoute) => {
        return () => navigate(route)
    }, [navigate])

    console.log({user})

    if (!user) return <></>

    return (
        <div className="dashboard">
            <div className="dashboard__cards">
                <BalanceCard
                    title='balance'
                    amount={user.data.totalBalance}
                    currency={user.data.currency?.symbol || ''}
                />
                <BalanceCard
                    title='expenses'
                    amount={1400}
                    currency={user.data.currency?.symbol || ''}
                />
                <BalanceCard
                    title='income'
                    amount={user.data.totalIncome}
                    currency={user.data.currency?.symbol || ''}
                />
            </div>

            <div className="footer">
                <Button label='create new expense' onClick={handleNavigateToForm(ERoute.NEW_EXPENSE)} />
            </div>
        </div>
    )
}