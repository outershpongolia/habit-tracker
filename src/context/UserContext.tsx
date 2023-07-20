import React, { PropsWithChildren, createContext, useState } from 'react'
import { IInputData, IUser, IUserData } from '../interfaces'
import { noop } from 'lodash'
import { EMPTY_INPUT_DATA } from '../constants'

interface IUserContextProps {
    user: IUser | null
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
    inputData: IInputData
    setInputData: React.Dispatch<React.SetStateAction<IInputData>>
}

export const UserContext = createContext<IUserContextProps>({
    user: null,
    setUser: noop,
    inputData: EMPTY_INPUT_DATA,
    setInputData: noop
})

export const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [ user, setUser ] = useState<IUser | null>(null)
    const [ inputData, setInputData ] = useState<IInputData>(EMPTY_INPUT_DATA)

    console.log({user})
    console.log({inputData})

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                inputData,
                setInputData
            }}
        >
            {children}
        </UserContext.Provider>
    )
}