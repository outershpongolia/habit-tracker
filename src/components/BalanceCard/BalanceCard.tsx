import React from 'react'
import './BalanceCard.scss'
import { MdMoreHoriz } from 'react-icons/md'

interface IBalanceCardProps {
    title: string
    amount: number
    currency: string
    onClick?: () => void
}

export const BalanceCard: React.FC<IBalanceCardProps> = ({ title, amount, currency, onClick }) => {
    return (
        <div className='balance-card'>
            <div className='balance-card__title'>
                <div className='balance-card__text'>total {title}</div>

                <MdMoreHoriz className='more-icon' onClick={onClick} />
            </div>

            <div className='balance-card__amount'>{currency}{amount}</div>
        </div>
    )
}