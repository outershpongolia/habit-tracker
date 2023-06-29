import React, { useCallback, useContext, useState } from "react"
import './Dashboard.scss'
import { Button } from "../../components/Button/Button"
import { Popup } from "../../components/Popup/Popup"
import { NewExpenseForm } from "../../components/NewExpenseForm/NewExpenseForm"
import { ExpenseContext } from "../../context/ExpenseContext"

interface IDashboardProps {}

export const Dashboard: React.FC<IDashboardProps> = () => {
    const { isPopupOpen, setIsPopupOpen } = useContext(ExpenseContext)

    const handleOpenPopup = useCallback(() => {
        setIsPopupOpen(true)
    }, [setIsPopupOpen])

    const handleClosePopup = useCallback(() => {
        setIsPopupOpen(false)
    }, [setIsPopupOpen])

    return (
        <div className="dashboard">
            <Button label='create new expense' onClick={handleOpenPopup} />

            {isPopupOpen && 
                <Popup className="dashboard__popup" close={handleClosePopup}>
                    <NewExpenseForm />
                </Popup>
            }
        </div>
    )
}