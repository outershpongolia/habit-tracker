import React from 'react'
import './BalanceCard.scss'
import { MdMoreHoriz } from 'react-icons/md'

interface IBalanceCardProps {
    title: string
    amount: number
    onClick?: () => void
}

export const BalanceCard: React.FC<IBalanceCardProps> = ({ title, amount, onClick }) => {
    return (
        <div className='balance-card'>
            <div className='balance-card__title'>
                <div className='balance-card__text'>total {title}</div>

                <MdMoreHoriz className='balance-card__icon' onClick={onClick} />
            </div>

            <div className='balance-card__amount'>${amount}</div>
        </div>
    )
}