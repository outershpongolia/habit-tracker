import { noop } from 'lodash'
import React, { PropsWithChildren, createContext, useState } from 'react'

interface IPageContextProps {
    month: string
    setMonth: React.Dispatch<React.SetStateAction<string>>
}

export const PageContext = createContext<IPageContextProps>({
    month: '',
    setMonth: noop
})

export const PageContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [ month, setMonth ] = useState('')

    return (
        <PageContext.Provider value={{ month, setMonth }}>
            {children}
        </PageContext.Provider>
    )
}