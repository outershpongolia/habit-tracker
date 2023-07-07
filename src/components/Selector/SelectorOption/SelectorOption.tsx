import React, { useCallback } from 'react'
import './SelectorOption.scss'

interface ISelectorOptionProps {
    option: string
    onChooseOption: (option: string) => void
    className?: string
}

export const SelectorOption: React.FC<ISelectorOptionProps> = ({ option, onChooseOption, className }) => {
    const handleChooseOption = useCallback(() => {
        onChooseOption(option)
    }, [onChooseOption, option])

    return (
        <div
            className='selector-option'
            onClick={handleChooseOption}
        >
            {option}
        </div>
    )
}