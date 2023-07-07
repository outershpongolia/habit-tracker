import React, { useCallback, useContext, useMemo, useState } from 'react'
import './Setup.scss'
import { Input } from '../../../components/Input/Input'
import { Button } from '../../../components/Button/Button'
import { UserContext } from '../../../context/UserContext'
import { Category } from '../../../components/Category/Category'
import { uniqueId } from 'lodash'
import currencies from '../../../assets/currencies.json'
import { ICurrency } from '../../../interfaces'
import { Selector } from '../../../components/Selector/Selector'

interface ISetupProps {}

const currencyData: ICurrency[] = currencies.currencies

export const Setup: React.FC<ISetupProps> = () => {
    const { user, setUser } = useContext(UserContext)

    const [ inputValue, setInputValue ] = useState({
        category: ''
    })

    const handleInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(inputValue => {
            return {
                ...inputValue,
                [e.target.name]: e.target.value
            }
        })
    }, [setInputValue])

    const handleDeleteCategory = useCallback((category: string) => {
        setUser(user => {
            if (!user) return null

            return {
                ...user,
                data: {
                    ...user.data,
                    categories: user.data.categories.filter(x => x !== category)
                }
            }
        })
    }, [setUser])

    const handleAddCategory = useCallback(() => {
        setUser(user => {
            if (!user) return null

            return {
                ...user,
                data: {
                    ...user.data,
                    categories: [...user.data.categories, inputValue.category]
                }
            }
        })

        setInputValue(inputValue => {
            return {
                ...inputValue,
                category: ''
            }
        })
    }, [inputValue])

    const currencyCodes = useMemo(() => {
        return currencyData.map(curr => curr.code)
    }, [])

    if (!user) return <></>

    return (
        <div className='setup'>
            {/* TOTALS */}
            <div className='setup__container setup__container_total'>
                <Selector options={currencyCodes} />

                <Input
                    label="total balance"
                />

                <Input
                    label="total income"
                />

                <Button className='setup__button' label="save" onClick={() => null} />
            </div>

            {/* CATEGORIES */}
            <div className='setup__container setup__container_category'>
                <div className='setup__categories'>
                    <div className='setup__categories-info'>
                        These are categories for your expenses:
                    </div>

                    <div className='setup__categories-wrapper'>
                        {user.data.categories.map(category => {
                            return (
                                <Category
                                    key={uniqueId(category)}
                                    category={category}
                                    onDeleteCategory={handleDeleteCategory}
                                />
                            )
                        })}
                    </div>
                </div>

                <Input
                    label="add category"
                    value={inputValue.category}
                    onChange={handleInputOnChange}
                    name='category'
                />

                <Button className='setup__button' label='add' onClick={handleAddCategory} />
            </div>

            {/* ... */}
            <div className='setup__container setup__container_category'>
                <Input
                    label="add nesto"
                />
            </div>
        </div>
    )
}