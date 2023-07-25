import React, { useCallback, useContext, useEffect, useState } from 'react'
import './Setup.scss'
import { Input } from '../../../components/Input/Input'
import { Button } from '../../../components/Button/Button'
import { UserContext } from '../../../context/UserContext'
import { Category } from '../../../components/Category/Category'
import { uniqueId } from 'lodash'
import { Selector } from '../../../components/Selector/Selector'
import { ProfileSetup } from '../../../components/ProfileSetup/ProfileSetup'
import { getCurrencyCodes } from '../../../utilities'
import { updateUser } from '../../../api/users'

interface ISetupProps {}

export const Setup: React.FC<ISetupProps> = () => {
    const { user, setUser, inputData, setInputData, handleInputOnChange } = useContext(UserContext)

    const [ selectedCategories, setSelectedCategories ] = useState<string[]>(user?.data?.categories || [])

    const handleDeleteCategory = useCallback((category: string) => {
        if (!category) return

        setSelectedCategories(selectedCategories => selectedCategories.filter(x => x !== category))
    }, [setSelectedCategories])

    const handleAddCategory = useCallback(() => {
        setSelectedCategories(selectedCategories => {
            if (selectedCategories.includes(inputData.category.toLowerCase())) return selectedCategories

            return [
                ...selectedCategories,
                inputData.category.toLowerCase()
            ]
        })

        setInputData(inputData => {
            return {
                ...inputData,
                category: ''
            }
        })
    }, [inputData, setSelectedCategories])

    const handleCategoryOnEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // make something like a filter hook and handle this with that
            handleAddCategory()
        }
    }, [handleAddCategory])

    const handleSaveData = useCallback(() => {
        setUser(user => {
            if (!user) return null

            return {
                ...user,
                data: {
                    ...user.data,
                    totalBalance: inputData.totalBalance,
                    totalIncome: inputData.totalIncome,
                    categories: selectedCategories,
                    currency: inputData.currency || user.data.currency
                }
            }
        })
    }, [setUser, inputData, selectedCategories])

    useEffect(() => {
        if (!user?.data) return

        updateUser(user.data, user.email)
    }, [user])

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
                    <Selector options={getCurrencyCodes()} />
                </ProfileSetup>

                {/* TOTALS */}
                <ProfileSetup
                    title='Totals'
                    description='This is the main data of your profile. Input your total balance and total income.'
                    type='totals'
                >
                    <Input
                        label="total balance"
                        value={inputData.totalBalance || ''}
                        onChange={handleInputOnChange}
                        placeholder={`${user.data.currency.symbol}${user.data.totalBalance}`}
                        name='totalBalance'
                    />

                    <Input
                        label="total income"
                        value={inputData.totalIncome || ''}
                        onChange={handleInputOnChange}
                        placeholder={`${user.data.currency.symbol}${user.data.totalIncome}`}
                        name='totalIncome'
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
                            value={inputData.category}
                            onChange={handleInputOnChange}
                            name='category'
                            onKeyDown={handleCategoryOnEnter}
                        />

                        <Button className='setup__button' label='add' onClick={handleAddCategory} />
                    </div>

                    <div className='setup__categories-wrapper'>
                        {selectedCategories && selectedCategories.map(category => {
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
                onClick={handleSaveData}
            />
        </div>
    )
}