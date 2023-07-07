import React, { useCallback, useContext, useEffect, useState } from "react"
import './Selector.scss'
import { SelectorOption } from "./SelectorOption/SelectorOption"
import { IoIosArrowDown } from 'react-icons/io'
import { UserContext } from "../../context/UserContext"
import currencies from '../../assets/currencies.json'
import { ICurrency } from "../../interfaces"

interface ISelectorProps {
    options: string[]
}

const currencyData: ICurrency[] = currencies.currencies

export const Selector: React.FC<ISelectorProps> = ({ options }) => {
    const { setUser } = useContext(UserContext)

    const [ selectedOption, setSelectedOption ] = useState(options[0])
    const [ isSelectorOpen, setIsSelectorOpen ] = useState(false)

    const handleToggleSelector = useCallback(() => {
        setIsSelectorOpen(isSelectorOpen => !isSelectorOpen)
    }, [setIsSelectorOpen])

    const handleChooseOption = useCallback((option: string) => {
        setSelectedOption(option)

        setIsSelectorOpen(false)
    }, [setSelectedOption, setIsSelectorOpen])

    useEffect(() => {
        setUser(user => {
            if (!user) return null

            const chosenCurrency = currencyData.find(x => x.code === selectedOption)

            return {
                ...user,
                data: {
                    ...user.data,
                    currency: chosenCurrency ? chosenCurrency : null
                }
            }
        })
    }, [selectedOption])

    return (
        <div
            className="selector__wrapper"
            style={{
                borderRadius: isSelectorOpen ? '10px 10px 0 0' : '10px'
            }}
        >
            <div
                className="selector"
                onClick={handleToggleSelector}
            >
                {selectedOption}

                <IoIosArrowDown
                    style={{
                        transform: isSelectorOpen ? 'rotate(180deg)' : undefined
                    }}
                />
            </div>

            {isSelectorOpen &&
                <div className="selector__menu">
                    {options && options.map(option => {
                        if (option === selectedOption) {
                            return null
                        }

                        return (
                            <SelectorOption
                                key={option}
                                option={option}
                                onChooseOption={handleChooseOption}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}