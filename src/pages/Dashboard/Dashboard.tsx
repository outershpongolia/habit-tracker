import React, { useContext } from "react"
import './Dashboard.scss'
import { Button } from "../../components/Button/Button"
import { Popup } from "../../components/Popup/Popup"
import { NewExpenseForm } from "../../components/Form/NewExpenseForm/NewExpenseForm"
import { BalanceCard } from "../../components/BalanceCard/BalanceCard"
import { EPopup } from "../../constants"
import { FormContext } from "../../context/FormContext"

interface IDashboardProps {}

export const Dashboard: React.FC<IDashboardProps> = () => {
    const { openPopup, handleOpenPopup } = useContext(FormContext)

    return (
        <div className="dashboard">
            <div className="dashboard__cards">
                <BalanceCard title='balance' amount={4500} />
                <BalanceCard title='expenses' amount={1400} />
                <BalanceCard title='income' amount={2400} />
            </div>

            <div className="footer">
                <Button label='create new expense' onClick={handleOpenPopup(EPopup.EXPENSE)} />
            </div>

            {openPopup === EPopup.EXPENSE &&
                <Popup>
                    <NewExpenseForm />
                </Popup>
            }
        </div>
    )
}