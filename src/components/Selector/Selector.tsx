import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
import './Selector.scss'
import { SelectorOption } from "./SelectorOption/SelectorOption"
import { IoIosArrowDown } from 'react-icons/io'
import { UserContext } from "../../context/UserContext"

interface ISelectorProps {
    options: string[]
    isLabeled?: boolean
}

export const Selector: React.FC<ISelectorProps> = ({ options, isLabeled }) => {
    const { setInputData, user } = useContext(UserContext)

    // const [ selectedOption, setSelectedOption ] = useState(options[options.findIndex(x => x === user?.data?.currency.code) || 0])
    const [ isSelectorOpen, setIsSelectorOpen ] = useState(false)
    
    const selectorRef = useRef<HTMLDivElement>(null)

    const handleToggleSelector = useCallback(() => {
        setIsSelectorOpen(isSelectorOpen => !isSelectorOpen)
    }, [setIsSelectorOpen])

    const handleChooseOption = useCallback((option: string) => {
        // setSelectedOption(option)

        setIsSelectorOpen(false)
    }, [setIsSelectorOpen])

    useEffect(() => {
        // setInputData(inputData => {
        //     // const chosenCurrency = currencyData.find(x => x.code === selectedOption)

        //     return {
        //         ...inputData,
        //         currency: chosenCurrency ? chosenCurrency : null
        //     }
        // })
    }, [setInputData])

    return (
        <div
            className="selector__wrapper"
            ref={selectorRef}
            style={{
                width: isLabeled ? 'inherit' : 'fit-content',
                borderRadius: isLabeled
                    ? isSelectorOpen ? '0 10px 0 0' : '0 10px 10px 0'
                    : isSelectorOpen ? '10px 10px 0 0' : '10px'
            }}
        >
            <div
                className='selector'
                onClick={handleToggleSelector}
            >
                {/* {selectedOption} */}

                <IoIosArrowDown
                    style={{
                        transform: isSelectorOpen ? 'rotate(180deg)' : undefined
                    }}
                />
            </div>

            {isSelectorOpen &&
                <div
                    className="selector__menu"
                    style={{
                        top: selectorRef?.current?.clientHeight
                    }}
                >
                    {options && options.map(option => {
                        if (option) {
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