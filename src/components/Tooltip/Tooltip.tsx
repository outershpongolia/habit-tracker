import React, { PropsWithChildren, useCallback, useState } from 'react'
import './Tooltip.scss'

interface ITooltipProps extends PropsWithChildren {
    text: string
}

export const Tooltip: React.FC<ITooltipProps> = ({ text, children }) => {
    const [ isTooltipOpen, setIsTooltipOpen ] = useState(false)

    const handleOpenTooltip = useCallback(() => {
        setIsTooltipOpen(true)
    }, [setIsTooltipOpen])

    const handleCloseTooltip = useCallback(() => {
        setIsTooltipOpen(false)
    }, [setIsTooltipOpen])

    return (
        <div
            className='tooltip__wrapper'
            onMouseEnter={handleOpenTooltip}
            onMouseLeave={handleCloseTooltip}
        >
            <div
                className='tooltip'
                style={{
                    display: isTooltipOpen ? 'flex' : 'none'
                }}
            >
                {text}
            </div>

            {children}
        </div>

    )
}