import React, { PropsWithChildren, createContext, useCallback, useState } from 'react'
import { IInputData, IUser } from '../interfaces'
import { noop } from 'lodash'
import { EMPTY_INPUT_DATA } from '../constants'

interface IUserContextProps {
    user: IUser | null
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
    inputData: IInputData
    setInputData: React.Dispatch<React.SetStateAction<IInputData>>
    handleInputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const UserContext = createContext<IUserContextProps>({
    user: null,
    setUser: noop,
    inputData: EMPTY_INPUT_DATA,
    setInputData: noop,
    handleInputOnChange: noop
})

export const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [ user, setUser ] = useState<IUser | null>(null)
    const [ inputData, setInputData ] = useState<IInputData>(EMPTY_INPUT_DATA)

    const handleInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(inputData => {
            return {
                ...inputData,
                [e.target.name]: e.target.value
            }
        })
    }, [setInputData])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                inputData,
                setInputData,
                handleInputOnChange
            }}
        >
            {children}
        </UserContext.Provider>
    )
}