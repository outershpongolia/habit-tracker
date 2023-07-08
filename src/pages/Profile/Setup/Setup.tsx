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
import { ProfileSetup } from '../../../components/ProfileSetup/ProfileSetup'

interface ISetupProps {}

const currencyData: ICurrency[] = currencies.currencies

export const Setup: React.FC<ISetupProps> = () => {
    const { user, setUser } = useContext(UserContext)

    const [ inputValue, setInputValue ] = useState({
        category: '',
        totalBalance: 0,
        totalIncome: 0
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
    }, [inputValue, setUser])

    const handleCategoryOnEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // make something like a filter hook and handle this with that
            handleAddCategory()
        }
    }, [handleAddCategory])

    const currencyCodes = useMemo(() => {
        // write func in utils to make this reusable for other parts of currency data as well
        return currencyData.map(curr => curr.code)
    }, [])

    const handleSaveTotalData = useCallback(() => {
        setUser(user => {
            if (!user) return null

            return {
                ...user,
                data: {
                    ...user.data,
                    totalBalance: inputValue.totalBalance,
                    totalIncome: inputValue.totalIncome
                }
            }
        })
    }, [setUser, inputValue])

    if (!user) return <></>

    return (
        <div className='setup'>
            <div className='setup__wrapper'>
                {/* CURRENCY */}
                <ProfileSetup
                    title='Currency'
                    description='Input your preffered currency.'
                    type='currency'
                >
                    <Selector options={currencyCodes} />
                </ProfileSetup>

                {/* TOTALS */}
                <ProfileSetup
                    title='Totals'
                    description='This is the main data of your profile. Input your total balance and total income.'
                    type='totals'
                >
                    <Input
                        label="total balance"
                        value={inputValue.totalBalance}
                        onChange={handleInputOnChange}
                    />

                    <Input
                        label="total income"
                        value={inputValue.totalIncome}
                        onChange={handleInputOnChange}
                    />
                </ProfileSetup>

                {/* CATEGORIES */}
                <ProfileSetup
                    title='Categories'
                    description='Press enter to add tags or click the ADD button.'
                    type='category'
                >
                    <div className='setup__input-wrapper'>
                        <Input
                            label="add category"
                            value={inputValue.category}
                            onChange={handleInputOnChange}
                            name='category'
                            onKeyDown={handleCategoryOnEnter}
                        />

                        <Button className='setup__button' label='add' onClick={handleAddCategory} />
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
                </ProfileSetup>
            </div>

            <Button
                className='setup__button'
                label="save data"
                onClick={handleSaveTotalData}
            />
        </div>
    )
}